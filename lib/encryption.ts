import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { getEnv } from "@/lib/env";

const ENCRYPTED_PREFIX = "enc:v1";

function getEncryptionKey() {
  return createHash("sha256").update(getEnv().dataEncryptionKey).digest();
}

export function isEncryptedValue(value: string | null | undefined) {
  return typeof value === "string" && value.startsWith(`${ENCRYPTED_PREFIX}:`);
}

export function encryptText(value: string) {
  if (!value || isEncryptedValue(value)) {
    return value;
  }

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    ENCRYPTED_PREFIX,
    iv.toString("base64url"),
    tag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(":");
}

export function decryptText(value: string, label = "敏感数据") {
  if (!isEncryptedValue(value)) {
    return value;
  }

  const encodedPayload = value.slice(ENCRYPTED_PREFIX.length + 1);
  const [ivRaw, tagRaw, payloadRaw] = encodedPayload.split(":");

  if (!ivRaw || !tagRaw || !payloadRaw) {
    throw new Error(`${label}加密格式无效。`);
  }

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      getEncryptionKey(),
      Buffer.from(ivRaw, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(tagRaw, "base64url"));

    return Buffer.concat([
      decipher.update(Buffer.from(payloadRaw, "base64url")),
      decipher.final(),
    ]).toString("utf8");
  } catch (error) {
    const detail =
      error instanceof Error && error.message.trim()
        ? ` 原始错误：${error.message.trim()}`
        : "";

    throw new Error(
      `${label}解密失败。当前服务的 DATA_ENCRYPTION_KEY 与写入这条数据时使用的密钥不一致，或数据库中的密文已损坏。${detail}`,
    );
  }
}

export function encryptOptionalText(value: string | null | undefined) {
  if (value == null) {
    return null;
  }

  return value ? encryptText(value) : value;
}

export function decryptOptionalText(value: string | null | undefined, label = "敏感数据") {
  if (value == null) {
    return null;
  }

  return value ? decryptText(value, label) : value;
}
