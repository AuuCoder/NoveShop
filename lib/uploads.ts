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

// ============================================================
// 发货文件（私有存储）
// 与公开图片不同，发货文件存到非公开目录，只能通过校验订单归属的下载路由获取，
// 避免卡密文件被任意访问。库存里只保存一个不含路径的“存储键”(storage key)。
// ============================================================

export const MAX_DELIVERY_FILE_BYTES = 50 * 1024 * 1024; // 50MB

// 存储键格式：纯文件名（时间戳-随机.原扩展名），不含任何路径分隔符。
const DELIVERY_KEY_PATTERN = /^[a-z0-9]+-[a-f0-9]+(?:\.[a-z0-9]+)?$/i;

function getDeliveryRoot() {
  return path.resolve(process.cwd(), getEnv().deliveryDir);
}

function sanitizeFileExtension(originalName: string) {
  const ext = path.extname(originalName).slice(1).toLowerCase();
  // 只保留字母数字扩展名，最长 8 位，避免奇怪/危险的后缀。
  return /^[a-z0-9]{1,8}$/.test(ext) ? ext : "";
}

export type SavedDeliveryFile = {
  storageKey: string;
  fileName: string;
  size: number;
};

/**
 * 保存一个发货文件到私有目录，返回存储键 + 原始文件名 + 大小。
 */
export async function saveDeliveryFile(file: File): Promise<SavedDeliveryFile> {
  if (!(file instanceof File) || file.size === 0) {
    throw new UploadValidationError("请选择要上传的发货文件。");
  }

  if (file.size > MAX_DELIVERY_FILE_BYTES) {
    throw new UploadValidationError("发货文件大小不能超过 50MB。");
  }

  const root = getDeliveryRoot();
  await mkdir(root, { recursive: true });

  const extension = sanitizeFileExtension(file.name);
  const storageKey = `${Date.now().toString(36)}-${randomBytes(10).toString("hex")}${
    extension ? `.${extension}` : ""
  }`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(root, storageKey), buffer);

  return {
    storageKey,
    fileName: file.name.trim().slice(0, 200) || storageKey,
    size: file.size,
  };
}

export function isDeliveryStorageKey(value: string | null | undefined): value is string {
  return typeof value === "string" && DELIVERY_KEY_PATTERN.test(value);
}

const MAX_DELIVERY_FILES_PER_IMPORT = 200;

export type CardImportMode = "lines" | "single" | "file";

export function parseCardImportMode(value: unknown): CardImportMode {
  return value === "single" || value === "file" ? value : "lines";
}

/**
 * 解析入库表单里序列化的发货文件清单（隐藏字段中的 JSON 数组）。
 * 只保留存储键合法的条目，并限制最大数量。
 */
export function parseDeliveryFilesField(value: string | null | undefined): SavedDeliveryFile[] {
  if (!value) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(value);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const files: SavedDeliveryFile[] = [];

  for (const item of parsed) {
    if (typeof item !== "object" || item === null) {
      continue;
    }

    const record = item as Record<string, unknown>;
    const storageKey = typeof record.storageKey === "string" ? record.storageKey : "";

    if (!isDeliveryStorageKey(storageKey)) {
      continue;
    }

    const fileName =
      typeof record.fileName === "string" && record.fileName.trim()
        ? record.fileName.trim().slice(0, 200)
        : storageKey;
    const size = Number(record.size);

    files.push({
      storageKey,
      fileName,
      size: Number.isFinite(size) && size > 0 ? Math.floor(size) : 0,
    });

    if (files.length >= MAX_DELIVERY_FILES_PER_IMPORT) {
      break;
    }
  }

  return files;
}

/**
 * 把存储键解析成磁盘绝对路径，并确保不越出私有目录。非法键返回 null。
 */
export function resolveDeliveryFilePath(storageKey: string) {
  if (!isDeliveryStorageKey(storageKey)) {
    return null;
  }

  const root = getDeliveryRoot();
  const resolved = path.resolve(root, storageKey);
  const rootWithSep = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (!resolved.startsWith(rootWithSep)) {
    return null;
  }

  return resolved;
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

