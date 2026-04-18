export type PaymentChannelOption = {
  code: string;
  label: string;
  description: string;
};

export const USDT_PAYMENT_CHANNEL_CODES = [
  "usdt.bsc",
  "usdt.base",
  "usdt.sol",
] as const;

const CHANNEL_CODE_ALIASES: Record<string, string> = {
  "wechat.native": "wxpay.native",
};

const CHANNEL_LABELS: Record<string, { label: string; description: string }> = {
  "alipay.page": {
    label: "支付宝",
    description: "适合网页内直接拉起支付宝收银台。",
  },
  "usdt.base": {
    label: "USDT · Base",
    description: "通过 Base 链完成 USDT 转账支付。",
  },
  "usdt.bsc": {
    label: "USDT · BSC",
    description: "通过 BSC 链完成 USDT 转账支付。",
  },
  "usdt.sol": {
    label: "USDT · Solana",
    description: "通过 Solana 链完成 USDT 转账支付。",
  },
  "wechat.h5": {
    label: "微信 H5",
    description: "适合手机浏览器内拉起微信支付。",
  },
  "wxpay.native": {
    label: "微信扫码",
    description: "适合 PC 或外部设备扫码支付。",
  },
  "wechat.native": {
    label: "微信扫码",
    description: "适合 PC 或外部设备扫码支付。",
  },
  "wechat.jsapi": {
    label: "微信 JSAPI",
    description: "适合公众号或内嵌微信环境支付。",
  },
};

export const PAYMENT_CHANNEL_PRESET_CODES = [
  "alipay.page",
  "usdt.bsc",
  "usdt.base",
  "usdt.sol",
  "wechat.h5",
  "wxpay.native",
  "wechat.jsapi",
];

function splitChannelCodeInput(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeChannelCode(value: string | null | undefined) {
  const normalized = String(value ?? "").trim();
  return CHANNEL_CODE_ALIASES[normalized] ?? normalized;
}

export function isUsdtPaymentChannelCode(value: string | null | undefined) {
  return USDT_PAYMENT_CHANNEL_CODES.includes(
    normalizeChannelCode(value) as (typeof USDT_PAYMENT_CHANNEL_CODES)[number],
  );
}

export function normalizeEnabledChannelCodes(
  value: string | string[] | null | undefined,
  defaultChannelCode?: string | null,
) {
  const preferredDefault = normalizeChannelCode(defaultChannelCode);
  const source = Array.isArray(value)
    ? value.flatMap((item) => splitChannelCodeInput(item))
    : splitChannelCodeInput(String(value ?? ""));
  const deduped = [...new Set(source.map((item) => normalizeChannelCode(item)).filter(Boolean))];

  if (!preferredDefault) {
    return deduped;
  }

  return [preferredDefault, ...deduped.filter((item) => item !== preferredDefault)];
}

export function serializeEnabledChannelCodes(channelCodes: string[]) {
  const normalized = [...new Set(channelCodes.map((item) => normalizeChannelCode(item)).filter(Boolean))];
  return normalized.length > 0 ? normalized.join(",") : null;
}

export function getPaymentChannelOption(code: string): PaymentChannelOption {
  const normalized = normalizeChannelCode(code);
  const preset = CHANNEL_LABELS[normalized];

  if (preset) {
    return {
      code: normalized,
      label: preset.label,
      description: preset.description,
    };
  }

  return {
    code: normalized,
    label: normalized || "未命名通道",
    description: "使用当前通道编码创建 NovaPay 支付订单。",
  };
}

export function buildPaymentChannelOptions(channelCodes: string[]) {
  return channelCodes.map((code) => getPaymentChannelOption(code));
}

export const PAYMENT_CHANNEL_PRESET_OPTIONS = buildPaymentChannelOptions(PAYMENT_CHANNEL_PRESET_CODES);

export function formatPaymentChannelCodes(channelCodes: string[]) {
  return buildPaymentChannelOptions(channelCodes)
    .map((channel) => channel.label)
    .join(" / ");
}
