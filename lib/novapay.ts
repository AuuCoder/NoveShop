import { createHmac, timingSafeEqual } from "node:crypto";
import { getEnv } from "@/lib/env";

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
    defaultChannelCode: config?.defaultChannelCode?.trim() || env.defaultChannelCode,
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
}, config?: Partial<NovaPayMerchantConfig>) {
  const resolved = requireNovaPayConfig(config);
  return requestNovaPay<NovaPayResponse>(
    "/api/payment-orders",
    {
      merchantCode: resolved.merchantCode,
      channelCode: input.channelCode ?? resolved.defaultChannelCode,
      externalOrderId: input.externalOrderId,
      amount: input.amount,
      subject: input.subject,
      description: input.description ?? undefined,
      returnUrl: input.returnUrl,
      callbackUrl: input.callbackUrl,
    },
    `create_${input.externalOrderId}`,
    config,
  );
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
