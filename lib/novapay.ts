import { createHmac, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/lib/env";
import { normalizeChannelCode } from "@/lib/payment-channels";

export interface NovaPayMerchantConfig {
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  defaultChannelCode: string;
}

interface NovaPayOrderPayload {
  id: string;
  externalOrderId: string;
  status: string;
  providerStatus: string | null;
  gatewayOrderId: string | null;
  checkoutUrl: string | null;
  hostedCheckoutUrl: string | null;
  paymentMode: string | null;
  channelCode: string;
  amount: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface NovaPayResponse {
  created?: boolean;
  order: NovaPayOrderPayload;
}

function requireNovaPayConfig(config?: Partial<NovaPayMerchantConfig>) {
  const env = getEnv();
  const fallbackConfig = env.allowEnvPaymentProfileBootstrap
    ? {
        merchantCode: env.novaPayMerchantCode,
        apiKey: env.novaPayApiKey,
        apiSecret: env.novaPayApiSecret,
      }
    : {
        merchantCode: "",
        apiKey: "",
        apiSecret: "",
      };
  const resolved = {
    baseUrl: env.novaPayBaseUrl,
    merchantCode: config?.merchantCode?.trim() || fallbackConfig.merchantCode,
    apiKey: config?.apiKey?.trim() || fallbackConfig.apiKey,
    apiSecret: config?.apiSecret?.trim() || fallbackConfig.apiSecret,
    defaultChannelCode: normalizeChannelCode(config?.defaultChannelCode?.trim() || env.defaultChannelCode),
  };
  const missing = [
    ["NovaPay merchantCode", resolved.merchantCode],
    ["NovaPay apiKey", resolved.apiKey],
    ["NovaPay apiSecret", resolved.apiSecret],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    throw new Error(
      env.allowEnvPaymentProfileBootstrap
        ? `NovaPay 配置不完整，请补齐：${missing.map(([key]) => key).join("、")}`
        : "请先在后台配置至少一个可用的 NovaPay 收款商户，生产环境不再默认回退到环境变量商户配置。",
    );
  }

  return resolved;
}

function signRequest(secret: string, timestamp: string, nonce: string, rawBody: string) {
  return createHmac("sha256", secret)
    .update(`${timestamp}.${nonce}.${rawBody}`)
    .digest("hex");
}

function buildHeaders(rawBody: string, idempotencyKey?: string, config?: Partial<NovaPayMerchantConfig>) {
  const resolved = requireNovaPayConfig(config);
  const timestamp = new Date().toISOString();
  const nonce = `shop_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;

  return {
    "content-type": "application/json",
    "x-novapay-key": resolved.apiKey,
    "x-novapay-timestamp": timestamp,
    "x-novapay-nonce": nonce,
    "x-novapay-signature": signRequest(resolved.apiSecret, timestamp, nonce, rawBody),
    ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
  };
}

async function requestNovaPay<TResponse>(
  path: string,
  payload: Record<string, unknown>,
  idempotencyKey?: string,
  config?: Partial<NovaPayMerchantConfig>,
) {
  const resolved = requireNovaPayConfig(config);
  const rawBody = JSON.stringify(payload);
  const response = await fetch(new URL(path, resolved.baseUrl), {
    method: "POST",
    headers: buildHeaders(rawBody, idempotencyKey, config),
    body: rawBody,
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : {};

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string" ? data.error : `NovaPay 请求失败，状态码 ${response.status}`,
    );
  }

  return data as TResponse;
}

export async function createNovaPayOrder(input: {
  externalOrderId: string;
  amount: string;
  subject: string;
  description?: string | null;
  returnUrl: string;
  callbackUrl: string;
  channelCode?: string;
  metadata?: Record<string, unknown>;
}, config?: Partial<NovaPayMerchantConfig>) {
  const resolved = requireNovaPayConfig(config);
  return requestNovaPay<NovaPayResponse>(
    "/api/payment-orders",
    {
      merchantCode: resolved.merchantCode,
      channelCode: normalizeChannelCode(input.channelCode ?? resolved.defaultChannelCode),
      externalOrderId: input.externalOrderId,
      amount: input.amount,
      subject: input.subject,
      description: input.description ?? undefined,
      returnUrl: input.returnUrl,
      callbackUrl: input.callbackUrl,
      metadata: input.metadata,
    },
    `create_${input.externalOrderId}`,
    config,
  );
}

interface NovaPayInstalledChannelsResponse {
  merchantCode?: string;
  channelCodes?: string[];
  channels?: Array<{ code: string }>;
}

/**
 * 查询某商户在 NovaPay 实际"已安装且启用"的支付渠道编码。
 * 用 GET /api/payments/channels/installed,沿用商户签名鉴权(GET 无 body,rawBody 为空串)。
 * 返回规范化后的渠道编码数组。
 */
export async function listNovaPayInstalledChannelCodes(
  config?: Partial<NovaPayMerchantConfig>,
): Promise<string[]> {
  const resolved = requireNovaPayConfig(config);
  const url = new URL("/api/payments/channels/installed", resolved.baseUrl);
  url.searchParams.set("merchantCode", resolved.merchantCode);

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders("", undefined, config),
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : {};

  if (!response.ok) {
    throw new Error(
      typeof data.error === "string"
        ? data.error
        : `NovaPay 渠道查询失败，状态码 ${response.status}`,
    );
  }

  const payload = data as NovaPayInstalledChannelsResponse;
  const codes =
    payload.channelCodes ?? payload.channels?.map((channel) => channel.code) ?? [];

  return codes.map((code) => normalizeChannelCode(code)).filter(Boolean);
}

// 按商户号缓存"已安装渠道",降低每次打开商品页都打 NovaPay 的开销。
const INSTALLED_CHANNELS_CACHE_TTL_MS = 60_000;
const installedChannelsCache = new Map<string, { expiresAt: number; codes: string[] }>();

/**
 * listNovaPayInstalledChannelCodes 的带缓存版本(60 秒 TTL,按 merchantCode 区分)。
 * 命中缓存直接返回;未命中或过期才真正请求 NovaPay,成功后写回缓存。
 * 请求失败时直接抛出,由上层决定回退策略(不污染缓存)。
 */
export async function listNovaPayInstalledChannelCodesCached(
  config?: Partial<NovaPayMerchantConfig>,
): Promise<string[]> {
  const resolved = requireNovaPayConfig(config);
  const cacheKey = resolved.merchantCode;
  const now = Date.now();
  const cached = installedChannelsCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.codes;
  }

  const codes = await listNovaPayInstalledChannelCodes(config);
  installedChannelsCache.set(cacheKey, {
    expiresAt: now + INSTALLED_CHANNELS_CACHE_TTL_MS,
    codes,
  });

  return codes;
}


export interface NovaPayRegistryBridgeProvision {
  merchantCode: string;
  apiKeyId: string;
  apiKeySecret: string;
  notifySecret: string;
  channelCode: string;
}

export async function provisionNovaPayRegistryBridge(): Promise<NovaPayRegistryBridgeProvision> {
  const env = getEnv();
  const response = await fetch(new URL("/api/internal/bootstrap/registry-bridge", env.novaPayBaseUrl), {
    method: "POST",
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as Record<string, unknown>) : {};

  if (!response.ok || data.success !== true || !data.bridge || typeof data.bridge !== "object") {
    throw new Error(
      typeof data.error === "string"
        ? data.error
        : `NovaPay bridge provisioning failed with status ${response.status}.`,
    );
  }

  const bridge = data.bridge as Record<string, unknown>;
  const merchantCode = typeof bridge.merchantCode === "string" ? bridge.merchantCode.trim() : "";
  const apiKeyId = typeof bridge.apiKeyId === "string" ? bridge.apiKeyId.trim() : "";
  const apiKeySecret = typeof bridge.apiKeySecret === "string" ? bridge.apiKeySecret.trim() : "";
  const notifySecret = typeof bridge.notifySecret === "string" ? bridge.notifySecret.trim() : "";
  const channelCode = normalizeChannelCode(
    typeof bridge.channelCode === "string" ? bridge.channelCode.trim() : "",
  );

  if (!merchantCode || !apiKeyId || !apiKeySecret || !channelCode) {
    throw new Error("NovaPay bridge provisioning returned incomplete credentials.");
  }

  return {
    merchantCode,
    apiKeyId,
    apiKeySecret,
    notifySecret,
    channelCode,
  };
}

export async function queryNovaPayOrder(orderReference: string, config?: Partial<NovaPayMerchantConfig>) {
  const resolved = requireNovaPayConfig(config);
  return requestNovaPay<NovaPayResponse>(`/api/payment-orders/${encodeURIComponent(orderReference)}`, {
    merchantCode: resolved.merchantCode,
    sync: true,
  }, undefined, config);
}

export async function closeNovaPayOrder(orderReference: string, config?: Partial<NovaPayMerchantConfig>) {
  const resolved = requireNovaPayConfig(config);
  return requestNovaPay<NovaPayResponse>(
    `/api/payment-orders/${encodeURIComponent(orderReference)}/close`,
    {
      merchantCode: resolved.merchantCode,
    },
    `close_${orderReference}`,
    config,
  );
}

export function verifyNovaPayCallbackSignature(
  rawBody: string,
  timestamp: string,
  signature: string,
  notifySecret?: string | null,
) {
  const env = getEnv();
  const secret =
    notifySecret ?? (env.allowEnvPaymentProfileBootstrap ? env.novaPayNotifySecret : "");

  if (!secret) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}

export function isNovaPaySuccessStatus(status: string | null | undefined) {
  return status === "SUCCEEDED";
}

export function isNovaPayFailedStatus(status: string | null | undefined) {
  return status === "FAILED" || status === "CANCELLED";
}
