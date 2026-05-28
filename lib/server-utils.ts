import { randomBytes } from "node:crypto";

export function generateOrderNo() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  return `NS${timestamp}${randomBytes(3).toString("hex").toUpperCase()}`;
}

export function generateToken(length = 18) {
  return randomBytes(length).toString("base64url");
}
