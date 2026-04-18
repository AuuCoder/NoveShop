"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createShopOrder, refreshOrderByLookup, refreshOrderByPublicToken } from "@/lib/shop";
import { assertRateLimit } from "@/lib/rate-limit";
import { buildStorefrontProductPath } from "@/lib/storefront";

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试。";
}

function normalizeReturnPath(raw: FormDataEntryValue | null, fallback: string) {
  const value = String(raw ?? "").trim();

  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

function stripSearchAndHash(path: string) {
  return path.split("#")[0]?.split("?")[0] || path;
}

function getStorefrontIndexPath(path: string) {
  const pathname = stripSearchAndHash(path);
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "store" && segments[1]) {
    return `/store/${segments[1]}`;
  }

  return null;
}

function appendErrorToPath(path: string, message: string) {
  const pathname = stripSearchAndHash(path);
  const params = new URLSearchParams(path.includes("?") ? path.slice(path.indexOf("?") + 1) : "");
  params.set("error", message);
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export async function createShopOrderAction(formData: FormData) {
  const skuId = String(formData.get("skuId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const channelCode = String(formData.get("channelCode") ?? "");
  const customerEmail = String(formData.get("customerEmail") ?? "");
  const quantity = Number(formData.get("quantity") ?? 1);
  const fallbackPath = slug ? buildStorefrontProductPath(slug) : "/";
  const returnPath = normalizeReturnPath(formData.get("returnPath"), fallbackPath);
  const revalidateTarget = stripSearchAndHash(returnPath);
  const storefrontIndexPath = getStorefrontIndexPath(returnPath);
  let destination = returnPath;

  try {
    await assertRateLimit({
      key: "public:create-order",
      limit: 6,
      windowMs: 60_000,
      message: "下单提交过于频繁，请稍后再试。",
    });

    const order = await createShopOrder({
      skuId,
      channelCode,
      quantity,
      customerEmail,
    });

    if (!order) {
      throw new Error("订单已创建，但暂时无法读取详情，请稍后去查单页查看。");
    }

    revalidatePath("/");
    revalidatePath(revalidateTarget);

    if (storefrontIndexPath) {
      revalidatePath(storefrontIndexPath);
    }

    destination = `/orders/${order.publicToken}`;
  } catch (error) {
    destination = appendErrorToPath(returnPath, getMessage(error));
  }

  redirect(destination);
}

export async function refreshPublicOrderAction(formData: FormData) {
  const publicToken = String(formData.get("publicToken") ?? "");
  let destination = `/orders/${publicToken}`;

  try {
    await assertRateLimit({
      key: "public:refresh-order",
      limit: 12,
      windowMs: 60_000,
      message: "订单刷新过于频繁，请稍后再试。",
    });

    await refreshOrderByPublicToken(publicToken);
    revalidatePath("/");
    revalidatePath("/query");
    revalidatePath("/admin");
  } catch (error) {
    destination = `/orders/${publicToken}?error=${encodeURIComponent(getMessage(error))}`;
  }

  redirect(destination);
}

export async function refreshLookupOrderAction(formData: FormData) {
  const orderNo = String(formData.get("orderNo") ?? "");
  const email = String(formData.get("customerEmail") ?? "");
  let destination = `/query?orderNo=${encodeURIComponent(orderNo)}&email=${encodeURIComponent(email)}`;

  try {
    await assertRateLimit({
      key: "public:lookup-refresh",
      limit: 12,
      windowMs: 60_000,
      message: "查单刷新过于频繁，请稍后再试。",
    });

    await refreshOrderByLookup(orderNo, email);
    revalidatePath("/");
    revalidatePath("/query");
    revalidatePath("/admin");
  } catch (error) {
    destination =
      `/query?orderNo=${encodeURIComponent(orderNo)}&email=${encodeURIComponent(email)}&error=${encodeURIComponent(getMessage(error))}`;
  }

  redirect(destination);
}
