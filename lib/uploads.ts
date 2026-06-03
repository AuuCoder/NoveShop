import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getEnv } from "@/lib/env";

export const UPLOAD_URL_PREFIX = "/uploads/";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

function getUploadRoot() {
  return path.resolve(process.cwd(), getEnv().uploadDir);
}

export class UploadValidationError extends Error {}

export async function saveUploadedImage(file: File) {
  if (!(file instanceof File) || file.size === 0) {
    throw new UploadValidationError("请选择要上传的图片文件。");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadValidationError("图片大小不能超过 5MB。");
  }

  const extension = ALLOWED_IMAGE_TYPES[file.type];

  if (!extension) {
    throw new UploadValidationError("仅支持 PNG、JPG、WebP、GIF 格式的图片。");
  }

  const root = getUploadRoot();
  await mkdir(root, { recursive: true });

  const fileName = `${Date.now().toString(36)}-${randomBytes(8).toString("hex")}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(root, fileName), buffer);

  return `${UPLOAD_URL_PREFIX}${fileName}`;
}

export function resolveUploadPath(segments: string[]) {
  const root = getUploadRoot();
  const relative = path.join(...segments);
  const resolved = path.resolve(root, relative);
  const rootWithSep = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (resolved !== root && !resolved.startsWith(rootWithSep)) {
    return null;
  }

  return resolved;
}

const CONTENT_TYPE_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

export function getImageContentType(filePath: string) {
  const extension = path.extname(filePath).slice(1).toLowerCase();
  return CONTENT_TYPE_BY_EXTENSION[extension] ?? "application/octet-stream";
}

export function isStoredUploadPath(value: string) {
  return value.startsWith(UPLOAD_URL_PREFIX) && !value.includes("..");
}

const MAX_DETAIL_IMAGES = 12;

export function parseStoredImageList(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(
    (item): item is string => typeof item === "string" && isStoredUploadPath(item),
  );
}

export function serializeImageList(value: string | null | undefined): string | null {
  const urls = parseStoredImageList(value).slice(0, MAX_DETAIL_IMAGES);
  return urls.length > 0 ? JSON.stringify(urls) : null;
}

export function normalizeStoredImagePath(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed && isStoredUploadPath(trimmed) ? trimmed : null;
}

const TELEGRAM_URL_PATTERN = /^https:\/\/t\.me\/[A-Za-z0-9_+/?=&.-]+$/;

export function normalizeTelegramUrl(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (!TELEGRAM_URL_PATTERN.test(trimmed)) {
    throw new UploadValidationError("Telegram 链接需以 https://t.me/ 开头。");
  }

  return trimmed;
}

