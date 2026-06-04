import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCny(cents: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function parsePriceToCents(raw: string) {
  const normalized = raw.trim();

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("价格格式不正确，请输入类似 29.90 的金额。");
  }

  return Math.round(Number(normalized) * 100);
}

export function normalizeEmail(raw: string) {
  const normalized = raw.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error("请输入有效的邮箱地址。");
  }

  return normalized;
}

export function slugify(raw: string) {
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!normalized) {
    throw new Error("商品别名不能为空。");
  }

  return normalized;
}

export function maskCardSecret(secret: string) {
  if (secret.length <= 8) {
    return secret;
  }

  return `${secret.slice(0, 4)}••••${secret.slice(-4)}`;
}

export function formatDateTime(value: Date | null | undefined) {
  if (!value) {
    return "未发生";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Shanghai",
  }).format(value);
}

export function safeJsonParse(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}
