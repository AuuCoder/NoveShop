import { createHmac, timingSafeEqual } from "node:crypto";

export interface OrderQueryAccessPayload {
  publicTokens: string[];
  expiresAt: number;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret)
    .update(`noveshop-order-query:v1:${payload}`)
    .digest("hex");
}

export function encodeOrderQueryAccess(payload: OrderQueryAccessPayload, secret: string) {
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${encoded}.${sign(encoded, secret)}`;
}

export function decodeOrderQueryAccess(value: string | undefined, secret: string) {
  if (!value) return null;
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;
  if (!/^[a-f0-9]{64}$/.test(signature)) return null;

  const expected = sign(encoded, secret);
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as OrderQueryAccessPayload;
    if (
      !Array.isArray(payload.publicTokens) ||
      payload.publicTokens.some((token) => typeof token !== "string" || !token.trim()) ||
      !Number.isFinite(payload.expiresAt) ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
