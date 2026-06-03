// Merchant storefront handle (short URL slug) rules and helpers.
//
// A handle lets a merchant store live at /s/<handle> instead of the long cuid id.
// Handles are optional: when absent, the merchant id remains the canonical path.

export const MERCHANT_HANDLE_MIN_LENGTH = 3;
export const MERCHANT_HANDLE_MAX_LENGTH = 32;

// Reserved words that must not be used as a handle, to avoid colliding with
// existing top-level routes or the platform store identifier.
const RESERVED_HANDLES = new Set([
  "platform",
  "admin",
  "merchant",
  "api",
  "store",
  "s",
  "orders",
  "order",
  "products",
  "product",
  "query",
  "uploads",
  "login",
  "register",
  "settings",
  "health",
  "new",
  "create",
  "edit",
]);

const HANDLE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isReservedMerchantHandle(handle: string) {
  return RESERVED_HANDLES.has(handle.toLowerCase());
}

/**
 * Normalizes raw user input into a candidate handle: lowercased, spaces and
 * underscores turned into hyphens, invalid characters stripped, and collapsed
 * hyphens trimmed. Returns "" when nothing usable remains.
 */
export function slugifyMerchantHandle(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Validates and normalizes a handle for storage. Returns `null` for an empty
 * input (meaning "clear the handle"). Throws a user-facing error otherwise.
 */
export function normalizeMerchantHandle(input: string | null | undefined): string | null {
  const raw = String(input ?? "").trim();

  if (!raw) {
    return null;
  }

  const handle = slugifyMerchantHandle(raw);

  if (!handle) {
    throw new Error("店铺简称只能包含字母、数字和连字符。");
  }

  if (handle.length < MERCHANT_HANDLE_MIN_LENGTH) {
    throw new Error(`店铺简称至少需要 ${MERCHANT_HANDLE_MIN_LENGTH} 个字符。`);
  }

  if (handle.length > MERCHANT_HANDLE_MAX_LENGTH) {
    throw new Error(`店铺简称最多 ${MERCHANT_HANDLE_MAX_LENGTH} 个字符。`);
  }

  if (!HANDLE_PATTERN.test(handle)) {
    throw new Error("店铺简称格式不正确，请使用字母、数字和连字符。");
  }

  if (isReservedMerchantHandle(handle)) {
    throw new Error("这个店铺简称是保留词，请换一个。");
  }

  return handle;
}
