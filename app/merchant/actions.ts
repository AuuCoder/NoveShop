"use server";

import { ProductSaleMode, ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  MERCHANT_TAB_META,
  MERCHANT_TABS,
  buildMerchantHref,
  normalizeMerchantTab,
  type MerchantTab,
} from "@/app/merchant/modules";
import {
  buildPaymentProfileAuditState,
  captureControlAuditLog,
  describePaymentProfileAuditChange,
  resolvePaymentProfileAuditRisk,
} from "@/lib/control-audit";
import { createMerchantSession, destroyMerchantSession, requireMerchantSession } from "@/lib/merchant-session";
import {
  authenticateMerchantAccount,
  changeMerchantAccountPassword,
  deleteMerchantAccount,
  registerMerchantAccount,
  updateMerchantSelfAccount,
} from "@/lib/merchant-account";
import {
  deleteMerchantOwnedPaymentProfile,
  getPaymentProfileRevisionById,
  getMerchantOwnedPaymentProfile,
  rollbackMerchantOwnedPaymentProfileToRevision,
  saveMerchantOwnedPaymentProfile,
} from "@/lib/payment-profile";
import {
  clearAvailableMerchantCardsForSku,
  createMerchantProduct,
  createMerchantProductSku,
  deleteMerchantCardItem,
  deleteMerchantProduct,
  deleteMerchantProductSku,
  importMerchantCards,
  replayMerchantOwnedWebhookEventLog,
  refreshMerchantOwnedOrderByPublicToken,
  runMerchantOwnedOrderSyncTask,
  updateMerchantCardItem,
  updateMerchantProduct,
  updateMerchantProductSku,
} from "@/lib/shop";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
  getStorefrontPathsForProduct,
} from "@/lib/storefront";
import { assertRateLimit } from "@/lib/rate-limit";
import { saveMerchantStorefrontAnnouncement } from "@/lib/storefront-announcement";

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试。";
}

function parseCheckbox(raw: FormDataEntryValue | null) {
  return String(raw ?? "") === "on";
}

function hasText(raw: FormDataEntryValue | null) {
  return String(raw ?? "").trim().length > 0;
}

function parseOptionalText(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "").trim();
  return value || undefined;
}

function parseProductStatus(raw: FormDataEntryValue | null) {
  const value = String(raw ?? ProductStatus.DRAFT);

  if (
    value !== ProductStatus.DRAFT &&
    value !== ProductStatus.ACTIVE &&
    value !== ProductStatus.ARCHIVED
  ) {
    return ProductStatus.DRAFT;
  }

  return value;
}

function parseProductSaleMode(raw: FormDataEntryValue | null) {
  const value = String(raw ?? ProductSaleMode.SINGLE);
  return value === ProductSaleMode.MULTI ? ProductSaleMode.MULTI : ProductSaleMode.SINGLE;
}

function parseMerchantTab(
  raw: FormDataEntryValue | null,
  fallback: MerchantTab = "overview",
): MerchantTab {
  if (raw == null) {
    return fallback;
  }

  const value = String(raw).trim();

  if (!value) {
    return fallback;
  }

  const parsed = normalizeMerchantTab(value);
  return parsed === "overview" && value !== "overview" ? fallback : parsed;
}

function normalizeMerchantReturnTo(raw: FormDataEntryValue | null) {
  const fallback = buildMerchantHref("payments");
  const value = String(raw ?? "").trim();

  if (!value || !value.startsWith("/merchant/payments") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

function normalizeMerchantConsoleReturnTo(raw: FormDataEntryValue | null, fallback: string) {
  const value = String(raw ?? "").trim();

  if (!value || !value.startsWith("/merchant") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

function appendMessageToPath(path: string, key: "success" | "error", message: string) {
  const url = new URL(path, "http://localhost");
  url.searchParams.set(key, message);
  const query = url.searchParams.toString();
  return query ? `${url.pathname}?${query}` : url.pathname;
}

function assertRollbackConfirmation(input: {
  expectedToken: string;
  confirmation?: string;
}) {
  const expected = input.expectedToken.trim();
  const received = input.confirmation?.trim() ?? "";

  if (!received || received !== expected) {
    throw new Error(`请输入确认词 ${expected} 后再执行回滚。`);
  }
}

function buildPaymentProfileAuditDraft(formData: FormData, fallbackName?: string) {
  return {
    name: String(formData.get("name") ?? fallbackName ?? ""),
    merchantCode: String(formData.get("merchantCode") ?? ""),
    apiKey: String(formData.get("apiKey") ?? ""),
    apiSecret: String(formData.get("apiSecret") ?? ""),
    notifySecret: String(formData.get("notifySecret") ?? ""),
    defaultChannelCode: String(formData.get("defaultChannelCode") ?? ""),
    enabledChannelCodes: formData.getAll("enabledChannelCodes").map((value) => String(value)),
    isActive: parseCheckbox(formData.get("isActive")),
    isDefault: false,
  };
}

function buildPaymentProfileAuditTargetLabel(input: {
  name?: string | null;
  merchantCode?: string | null;
}) {
  const name = String(input.name ?? "").trim() || "未命名商户";
  const merchantCode = String(input.merchantCode ?? "").trim() || "待填商户号";
  return `${name} · ${merchantCode}`;
}

function revalidateMerchantSurface(
  merchantAccountId: string,
  slugs?: string | Array<string | undefined>,
) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/payments");
  revalidatePath("/query");

  for (const tab of MERCHANT_TABS) {
    revalidatePath(MERCHANT_TAB_META[tab].href);
  }

  revalidatePath(buildMerchantStorefrontPath(merchantAccountId));

  const candidates = Array.isArray(slugs) ? slugs : [slugs];

  for (const slug of [
    ...new Set(
      candidates
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ]) {
    revalidatePath(buildMerchantStorefrontProductPath(merchantAccountId, slug));
  }
}

function redirectMerchant(
  tab: MerchantTab,
  options?: {
    success?: string;
    error?: string;
  },
) {
  redirect(buildMerchantHref(tab, options));
}

export async function registerMerchantAction(formData: FormData) {
  try {
    await assertRateLimit({
      key: "merchant:register",
      limit: 4,
      windowMs: 10 * 60_000,
      message: "商户注册提交过于频繁，请稍后再试。",
    });
  } catch (error) {
    redirect(`/merchant/register?error=${encodeURIComponent(getMessage(error))}`);
  }

  try {
    const merchant = await registerMerchantAccount({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    await createMerchantSession({
      merchantId: merchant.id,
      email: merchant.email,
    });

    redirectMerchant("payments", {
      success: "商户账号已创建，现在可以配置 NovaPay 参数。",
    });
  } catch (error) {
    redirect(`/merchant/register?error=${encodeURIComponent(getMessage(error))}`);
  }
}

export async function loginMerchantAction(formData: FormData) {
  try {
    await assertRateLimit({
      key: "merchant:login",
      limit: 6,
      windowMs: 5 * 60_000,
      message: "商户登录尝试过于频繁，请 5 分钟后再试。",
    });
  } catch (error) {
    redirect(`/merchant/login?error=${encodeURIComponent(getMessage(error))}`);
  }

  try {
    const merchant = await authenticateMerchantAccount({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    await createMerchantSession({
      merchantId: merchant.id,
      email: merchant.email,
    });

    redirect("/merchant");
  } catch (error) {
    redirect(`/merchant/login?error=${encodeURIComponent(getMessage(error))}`);
  }
}

export async function logoutMerchantAction() {
  await destroyMerchantSession();
  redirect("/merchant/login");
}

export async function saveMerchantPaymentProfileAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));
  const existing = await getMerchantOwnedPaymentProfile(merchant.id);
  const draft = buildPaymentProfileAuditDraft(formData, existing?.name ?? merchant.name);
  const beforeState = buildPaymentProfileAuditState(existing);
  const attemptedState = buildPaymentProfileAuditState({
    id: existing?.id ?? null,
    ownerId: merchant.id,
    ...draft,
  });
  const apiCredentialTouched = existing
    ? draft.apiKey.trim() !== existing.apiKey.trim() || draft.apiSecret.trim() !== existing.apiSecret.trim()
    : hasText(formData.get("apiKey")) || hasText(formData.get("apiSecret"));
  const notifySecretTouched = existing
    ? (draft.notifySecret.trim() || null) !== (existing.notifySecret?.trim() || null)
    : hasText(formData.get("notifySecret"));
  const changeSummary = existing ? "商户更新 NovaPay 配置" : "商户新增 NovaPay 配置";
  const changeDetail = attemptedState
    ? describePaymentProfileAuditChange({
        before: beforeState,
        after: attemptedState,
        apiCredentialTouched,
        notifySecretTouched,
      })
    : "更新支付商户基础信息";

  try {
    const profile = await saveMerchantOwnedPaymentProfile({
      merchantAccountId: merchant.id,
      name: draft.name || existing?.name || merchant.name,
      merchantCode: draft.merchantCode,
      apiKey: draft.apiKey,
      apiSecret: draft.apiSecret,
      notifySecret: draft.notifySecret,
      defaultChannelCode: draft.defaultChannelCode,
      enabledChannelCodes: draft.enabledChannelCodes,
      isActive: draft.isActive,
      revision: {
        sourceScope: "MERCHANT",
        actorType: "MERCHANT_ACCOUNT",
        actorId: merchant.id,
        actorLabel: merchant.email,
        changeType: existing ? "UPDATE" : "CREATE",
        summary: changeSummary,
      },
    });

    revalidateMerchantSurface(merchant.id);

    if (attemptedState) {
      const afterState = buildPaymentProfileAuditState(profile);

      await captureControlAuditLog({
        scope: "MERCHANT",
        actorType: "MERCHANT_ACCOUNT",
        actorId: merchant.id,
        actorLabel: merchant.email,
        merchantAccountId: merchant.id,
        paymentProfileId: profile.id,
        actionType: existing ? "PAYMENT_PROFILE_UPDATED" : "PAYMENT_PROFILE_CREATED",
        riskLevel: resolvePaymentProfileAuditRisk({
          before: beforeState,
          after: attemptedState,
          apiCredentialTouched,
          notifySecretTouched,
        }),
        outcome: "SUCCEEDED",
        targetType: "PAYMENT_PROFILE",
        targetId: profile.id,
        targetLabel: buildPaymentProfileAuditTargetLabel(profile),
        summary: changeSummary,
        detail: changeDetail,
        payload: {
          before: beforeState,
          after: afterState,
        },
      });
    }

    redirect(appendMessageToPath(returnTo, "success", "NovaPay 商户参数已保存。"));
  } catch (error) {
    if (attemptedState) {
      await captureControlAuditLog({
        scope: "MERCHANT",
        actorType: "MERCHANT_ACCOUNT",
        actorId: merchant.id,
        actorLabel: merchant.email,
        merchantAccountId: merchant.id,
        paymentProfileId: existing?.id ?? null,
        actionType: existing ? "PAYMENT_PROFILE_UPDATED" : "PAYMENT_PROFILE_CREATED",
        riskLevel: resolvePaymentProfileAuditRisk({
          before: beforeState,
          after: attemptedState,
          apiCredentialTouched,
          notifySecretTouched,
        }),
        outcome: "FAILED",
        targetType: "PAYMENT_PROFILE",
        targetId: existing?.id ?? null,
        targetLabel: buildPaymentProfileAuditTargetLabel({
          name: draft.name || existing?.name || merchant.name,
          merchantCode: draft.merchantCode,
        }),
        summary: `${changeSummary}失败`,
        detail: getMessage(error),
        payload: {
          before: beforeState,
          attempted: attemptedState,
        },
      });
    }

    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function deleteMerchantPaymentProfileAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));

  try {
    await deleteMerchantOwnedPaymentProfile(merchant.id);
    revalidateMerchantSurface(merchant.id);
    redirect(appendMessageToPath(returnTo, "success", "支付商户已删除。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function rollbackMerchantPaymentProfileRevisionAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));
  const revisionId = String(formData.get("revisionId") ?? "").trim();
  const rollbackConfirmation = parseOptionalText(formData.get("rollbackConfirmation"));
  const rollbackReason = parseOptionalText(formData.get("rollbackReason"));
  const revision = await getPaymentProfileRevisionById(revisionId);

  try {
    if (!revision || !revision.paymentProfile) {
      throw new Error("目标版本不存在，暂时无法回滚。");
    }

    assertRollbackConfirmation({
      expectedToken: `v${revision.version}`,
      confirmation: rollbackConfirmation,
    });

    const profile = await rollbackMerchantOwnedPaymentProfileToRevision({
      revisionId,
      merchantAccountId: merchant.id,
      actor: {
        sourceScope: "MERCHANT",
        actorType: "MERCHANT_ACCOUNT",
        actorId: merchant.id,
        actorLabel: merchant.email,
        changeType: "ROLLBACK",
        summary: `商户回滚到版本 v${revision.version}`,
      },
    });

    revalidateMerchantSurface(merchant.id);

    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      paymentProfileId: profile.id,
      actionType: "PAYMENT_PROFILE_ROLLBACK",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "PAYMENT_PROFILE",
      targetId: profile.id,
      targetLabel: buildPaymentProfileAuditTargetLabel(profile),
      summary: "商户按版本回滚 NovaPay 配置",
      detail: rollbackReason
        ? `已回滚到版本 v${revision.version}，保留当前商户独立收款路由。回滚原因：${rollbackReason}`
        : `已回滚到版本 v${revision.version}，保留当前商户独立收款路由。`,
      payload: {
        revisionId,
        version: revision.version,
        rollbackReason: rollbackReason ?? null,
      },
    });

    redirect(appendMessageToPath(returnTo, "success", "NovaPay 商户参数已回滚到指定版本。"));
  } catch (error) {
    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      paymentProfileId: revision?.paymentProfileId ?? null,
      actionType: "PAYMENT_PROFILE_ROLLBACK",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "PAYMENT_PROFILE",
      targetId: revision?.paymentProfileId ?? null,
      targetLabel: revision?.paymentProfile
        ? buildPaymentProfileAuditTargetLabel(revision.paymentProfile)
        : "支付商户配置",
      summary: "商户按版本回滚 NovaPay 配置失败",
      detail: getMessage(error),
      payload: {
        revisionId,
        version: revision?.version ?? null,
      },
    });

    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function createMerchantProductAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await createMerchantProduct({
      merchantAccountId: merchant.id,
      name: String(formData.get("name") ?? ""),
      slugValue: String(formData.get("slug") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      saleMode: parseProductSaleMode(formData.get("saleMode")),
      status: parseProductStatus(formData.get("status")),
      initialSkuName: String(formData.get("initialSkuName") ?? ""),
      initialSkuSummary: String(formData.get("initialSkuSummary") ?? ""),
      initialSkuPrice: String(formData.get("initialSkuPrice") ?? ""),
    });

    revalidateMerchantSurface(merchant.id);
    redirect(appendMessageToPath(returnTo, "success", "商品和首个 SKU 已创建。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function updateMerchantProductAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    const product = await updateMerchantProduct({
      merchantAccountId: merchant.id,
      productId: String(formData.get("productId") ?? ""),
      name: String(formData.get("name") ?? ""),
      slugValue: String(formData.get("slug") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      saleMode: parseProductSaleMode(formData.get("saleMode")),
      status: parseProductStatus(formData.get("status")),
    });

    revalidateMerchantSurface(merchant.id, [productSlug, product.slug]);
    redirect(appendMessageToPath(returnTo, "success", "商品已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function createMerchantSkuAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await createMerchantProductSku({
      merchantAccountId: merchant.id,
      productId: String(formData.get("productId") ?? ""),
      name: String(formData.get("name") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      price: String(formData.get("price") ?? ""),
      enabled: parseCheckbox(formData.get("enabled")),
    });

    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", "SKU 已创建。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function updateMerchantSkuAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await updateMerchantProductSku({
      merchantAccountId: merchant.id,
      skuId: String(formData.get("skuId") ?? ""),
      name: String(formData.get("name") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      price: String(formData.get("price") ?? ""),
      enabled: parseCheckbox(formData.get("enabled")),
    });

    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", "SKU 已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function deleteMerchantProductAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    const product = await deleteMerchantProduct({
      merchantAccountId: merchant.id,
      productId: String(formData.get("productId") ?? ""),
    });

    revalidateMerchantSurface(merchant.id, [productSlug, product.slug]);
    redirect(appendMessageToPath(returnTo, "success", "商品已删除。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function deleteMerchantSkuAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "products");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    const result = await deleteMerchantProductSku({
      merchantAccountId: merchant.id,
      skuId: String(formData.get("skuId") ?? ""),
    });

    revalidateMerchantSurface(merchant.id, [productSlug, result.productSlug]);
    redirect(appendMessageToPath(returnTo, "success", "SKU 已删除。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function importMerchantCardsAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "inventory");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));
  let productSlug = String(formData.get("productSlug") ?? "");

  try {
    const result = await importMerchantCards({
      merchantAccountId: merchant.id,
      skuId: String(formData.get("skuId") ?? ""),
      batchName: String(formData.get("batchName") ?? ""),
      rawCards: String(formData.get("rawCards") ?? ""),
    });

    productSlug = result.productSlug;
    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", `卡密已导入，共 ${result.importedCount} 条。`));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function updateMerchantCardItemAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "inventory");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await updateMerchantCardItem({
      merchantAccountId: merchant.id,
      cardItemId: String(formData.get("cardItemId") ?? ""),
      batchName: parseOptionalText(formData.get("batchName")),
      secret: String(formData.get("secret") ?? ""),
    });

    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", "库存记录已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function deleteMerchantCardItemAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "inventory");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await deleteMerchantCardItem({
      merchantAccountId: merchant.id,
      cardItemId: String(formData.get("cardItemId") ?? ""),
    });

    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", "库存记录已删除。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function clearMerchantSkuInventoryAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseMerchantTab(formData.get("tab"), "inventory");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    const result = await clearAvailableMerchantCardsForSku({
      merchantAccountId: merchant.id,
      skuId: String(formData.get("skuId") ?? ""),
    });

    revalidateMerchantSurface(merchant.id, productSlug);
    redirect(appendMessageToPath(returnTo, "success", `已清空 ${result.clearedCount} 条可售库存。`));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function refreshMerchantPaymentOrderAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const publicToken = String(formData.get("publicToken") ?? "").trim();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await refreshMerchantOwnedOrderByPublicToken(publicToken, merchant.id);

    if (order) {
      revalidateMerchantSurface(merchant.id, order.product.slug);
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    } else {
      revalidateMerchantSurface(merchant.id);
    }

    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "PAYMENT_ORDER_REFRESH",
      riskLevel: "MEDIUM",
      outcome: "SUCCEEDED",
      targetType: "SHOP_ORDER",
      targetId: order?.publicToken ?? publicToken,
      targetLabel: order?.orderNo ?? (publicToken || "待识别订单"),
      summary: "商户手动重查支付订单状态",
      detail: order
        ? `商户已主动重查订单 ${order.orderNo} 的支付状态。`
        : "商户已发起订单状态重查。",
      payload: {
        publicToken,
        orderNo: order?.orderNo ?? null,
        status: order?.status ?? null,
        novapayStatus: order?.novapayStatus ?? null,
      },
    });

    destination = appendMessageToPath(returnTo, "success", "已主动向 NovaPay 重查这笔订单。");
  } catch (error) {
    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      actionType: "PAYMENT_ORDER_REFRESH",
      riskLevel: "MEDIUM",
      outcome: "FAILED",
      targetType: "SHOP_ORDER",
      targetId: publicToken || null,
      targetLabel: publicToken || "待识别订单",
      summary: "商户手动重查支付订单状态失败",
      detail: getMessage(error),
      payload: {
        publicToken,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function runMerchantSyncTaskAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const taskId = String(formData.get("taskId") ?? "").trim();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await runMerchantOwnedOrderSyncTask(taskId, merchant.id);

    if (order) {
      revalidateMerchantSurface(merchant.id, order.product.slug);
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    } else {
      revalidateMerchantSurface(merchant.id);
    }

    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "SYNC_TASK_EXECUTED",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "SYNC_TASK",
      targetId: taskId || null,
      targetLabel: order?.orderNo ? `${order.orderNo} 的补偿任务` : taskId || "支付补偿任务",
      summary: "商户人工执行支付补偿任务",
      detail: order
        ? `补偿任务已执行，订单 ${order.orderNo} 的支付状态已同步。`
        : "补偿任务已执行，并尝试回写最新支付状态。",
      payload: {
        taskId,
        orderNo: order?.orderNo ?? null,
        publicToken: order?.publicToken ?? null,
        status: order?.status ?? null,
      },
    });

    destination = appendMessageToPath(returnTo, "success", "补偿任务已立即执行，并同步了最新支付状态。");
  } catch (error) {
    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      actionType: "SYNC_TASK_EXECUTED",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "SYNC_TASK",
      targetId: taskId || null,
      targetLabel: taskId || "支付补偿任务",
      summary: "商户人工执行支付补偿任务失败",
      detail: getMessage(error),
      payload: {
        taskId,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function replayMerchantCallbackLogAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const logId = String(formData.get("logId") ?? "").trim();
  const returnTo = normalizeMerchantReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await replayMerchantOwnedWebhookEventLog(logId, merchant.id);

    if (order) {
      revalidateMerchantSurface(merchant.id, order.product.slug);
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    } else {
      revalidateMerchantSurface(merchant.id);
    }

    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "WEBHOOK_REPLAY_EXECUTED",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "WEBHOOK_EVENT",
      targetId: logId || null,
      targetLabel: order?.orderNo ? `${order.orderNo} 的回调回放` : logId || "支付回调日志",
      summary: "商户人工回放 NovaPay 支付回调",
      detail: order
        ? `已重新回放订单 ${order.orderNo} 的支付回调，并触发链路重算。`
        : "已按原始回调体重新回放支付通知。",
      payload: {
        logId,
        orderNo: order?.orderNo ?? null,
        publicToken: order?.publicToken ?? null,
        status: order?.status ?? null,
      },
    });

    destination = appendMessageToPath(returnTo, "success", "已按原始回调体重新回放这条支付通知。");
  } catch (error) {
    await captureControlAuditLog({
      scope: "MERCHANT",
      actorType: "MERCHANT_ACCOUNT",
      actorId: merchant.id,
      actorLabel: merchant.email,
      merchantAccountId: merchant.id,
      actionType: "WEBHOOK_REPLAY_EXECUTED",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "WEBHOOK_EVENT",
      targetId: logId || null,
      targetLabel: logId || "支付回调日志",
      summary: "商户人工回放 NovaPay 支付回调失败",
      detail: getMessage(error),
      payload: {
        logId,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updateMerchantProfileAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "settings");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    const updatedMerchant = await updateMerchantSelfAccount({
      merchantAccountId: merchant.id,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
    });

    await createMerchantSession({
      merchantId: updatedMerchant.id,
      email: updatedMerchant.email,
    });

    revalidateMerchantSurface(merchant.id);
    redirect(appendMessageToPath(returnTo, "success", "账号资料已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function changeMerchantPasswordAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "settings");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await changeMerchantAccountPassword({
      merchantAccountId: merchant.id,
      currentPassword: String(formData.get("currentPassword") ?? ""),
      newPassword: String(formData.get("newPassword") ?? ""),
    });

    revalidateMerchantSurface(merchant.id);
    redirect(appendMessageToPath(returnTo, "success", "登录密码已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function updateMerchantStorefrontAnnouncementAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "settings");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));

  try {
    await saveMerchantStorefrontAnnouncement({
      merchantAccountId: merchant.id,
      enabled: parseCheckbox(formData.get("enabled")),
      title: String(formData.get("title") ?? ""),
      body: String(formData.get("body") ?? ""),
    });

    revalidateMerchantSurface(merchant.id);
    revalidatePath("/store/[merchantId]/products/[slug]", "page");
    redirect(appendMessageToPath(returnTo, "success", "店铺公告已更新。"));
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}

export async function deleteMerchantSelfAccountAction(formData: FormData) {
  const merchant = await requireMerchantSession();
  const tab = parseMerchantTab(formData.get("tab"), "settings");
  const returnTo = normalizeMerchantConsoleReturnTo(formData.get("returnTo"), buildMerchantHref(tab));
  const confirmation = String(formData.get("deleteConfirmation") ?? "").trim();

  try {
    if (confirmation !== merchant.email) {
      throw new Error(`请输入当前登录邮箱 ${merchant.email} 作为确认词后再注销账号。`);
    }

    await deleteMerchantAccount(merchant.id);
    await destroyMerchantSession();
    revalidateMerchantSurface(merchant.id);
    revalidatePath("/merchant/login");
    revalidatePath("/merchant/register");
    redirect("/merchant/register?success=商户账号已注销，可以重新注册新的商户。");
  } catch (error) {
    redirect(appendMessageToPath(returnTo, "error", getMessage(error)));
  }
}
