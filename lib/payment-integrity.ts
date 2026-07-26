import { normalizeChannelCode } from "@/lib/payment-channels";

function normalizeOptionalString(value: unknown) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || null;
}

export function parseRemoteAmountCents(value: unknown) {
  const normalized =
    typeof value === "string"
      ? value.trim()
      : typeof value === "number" && Number.isFinite(value)
        ? String(value)
        : "";

  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, fraction = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) ? cents : null;
}

export function assertNovaPayOrderIntegrity(
  order: { orderNo: string; amountCents: number; channelCode: string },
  remoteOrder: Record<string, unknown>,
) {
  const externalOrderId = normalizeOptionalString(remoteOrder.externalOrderId);
  const amountCents = parseRemoteAmountCents(remoteOrder.amount);
  const channelCode = normalizeOptionalString(remoteOrder.channelCode);

  if (externalOrderId !== order.orderNo) {
    throw new Error("NovaPay 返回的外部订单号与本地订单不一致，已拒绝更新订单状态。");
  }

  if (amountCents === null || amountCents !== order.amountCents) {
    throw new Error("NovaPay 返回的支付金额与本地订单不一致，已拒绝更新订单状态。");
  }

  if (!channelCode || normalizeChannelCode(channelCode) !== normalizeChannelCode(order.channelCode)) {
    throw new Error("NovaPay 返回的支付通道与本地订单不一致，已拒绝更新订单状态。");
  }
}
