"use server";

import { ProductSaleMode, ProductStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, requireAdminSession } from "@/lib/admin-session";
import { buildAdminHref, normalizeAdminTab } from "@/app/admin/modules";
import { getEnv } from "@/lib/env";
import {
  createMerchantAccount,
  deleteMerchantAccount,
  resetMerchantAccountPassword,
  updateMerchantAccount,
} from "@/lib/merchant-account";
import { verifyPassword } from "@/lib/password";
import { assertRateLimit } from "@/lib/rate-limit";
import {
  buildPaymentProfileAuditState,
  captureControlAuditLog,
  describePaymentProfileAuditChange,
  resolvePaymentProfileAuditRisk,
  updateControlAuditReview,
} from "@/lib/control-audit";
import {
  deletePaymentProfile,
  getPaymentProfileById,
  getPaymentProfileRevisionById,
  rollbackPaymentProfileToRevision,
  savePaymentProfile,
} from "@/lib/payment-profile";
import { savePlatformStorefrontAnnouncement } from "@/lib/storefront-announcement";
import {
  clearAvailableCardsForSku,
  createProduct,
  createProductSku,
  deleteCardItem,
  deleteProduct,
  deleteProductSku,
  importCards,
  replayWebhookEventLog,
  refreshOrderByPublicToken,
  runOrderSyncTask,
  updateCardItem,
  updateProduct,
  updateProductSku,
} from "@/lib/shop";
import { buildPlatformStorefrontPath, getStorefrontPathsForProduct } from "@/lib/storefront";

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : "操作失败，请稍后重试。";
}

function parseProductStatus(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "DRAFT");

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

function parseCheckbox(raw: FormDataEntryValue | null) {
  return String(raw ?? "") === "on";
}

function parseOptionalId(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "").trim();
  return value || undefined;
}

function parseOptionalText(raw: FormDataEntryValue | null) {
  const value = String(raw ?? "").trim();
  return value || undefined;
}

function parseAdminTab(raw: FormDataEntryValue | null) {
  return normalizeAdminTab(String(raw ?? ""));
}

function parseControlAuditReviewStatus(raw: FormDataEntryValue | null) {
  return String(raw ?? "").trim() === "REVIEWED" ? "REVIEWED" : "PENDING";
}

function normalizeAdminReturnTo(raw: FormDataEntryValue | null) {
  const fallback = buildAdminHref("payments");
  const value = String(raw ?? "").trim();

  if (!value || !value.startsWith("/admin/payments") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

function normalizeAdminConsoleReturnTo(raw: FormDataEntryValue | null, fallback: string) {
  const value = String(raw ?? "").trim();

  if (!value || !value.startsWith("/admin") || value.startsWith("//")) {
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

function revalidateAdminSurface(slugs?: string | Array<string | undefined>) {
  revalidatePath("/");
  revalidatePath("/admin");

  const candidates = Array.isArray(slugs) ? slugs : [slugs];

  for (const slug of [
    ...new Set(
      candidates
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ]) {
    revalidatePath(`/products/${slug}`);
  }
}

function revalidatePaymentSurface() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/payments");
  revalidatePath("/merchant");
  revalidatePath("/merchant/payments");
  revalidatePath("/query");
}

function revalidateMerchantAdminSurface() {
  revalidateAdminSurface();
  revalidatePath("/merchant");
  revalidatePath("/merchant/login");
  revalidatePath("/merchant/register");
}

function buildPaymentProfileAuditDraft(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    merchantCode: String(formData.get("merchantCode") ?? ""),
    apiKey: String(formData.get("apiKey") ?? ""),
    apiSecret: String(formData.get("apiSecret") ?? ""),
    notifySecret: String(formData.get("notifySecret") ?? ""),
    defaultChannelCode: String(formData.get("defaultChannelCode") ?? ""),
    enabledChannelCodes: formData.getAll("enabledChannelCodes").map((value) => String(value)),
    isActive: parseCheckbox(formData.get("isActive")),
    isDefault: parseCheckbox(formData.get("isDefault")),
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

async function getAdminAuditActor() {
  await requireAdminSession();
  return getEnv().adminUsername;
}

async function verifyAdminPassword(password: string, env: ReturnType<typeof getEnv>) {
  if (env.adminPasswordHash.trim()) {
    return verifyPassword(password, env.adminPasswordHash.trim());
  }

  return password === env.adminPassword;
}

export async function loginAction(formData: FormData) {
  try {
    await assertRateLimit({
      key: "admin:login",
      limit: 5,
      windowMs: 5 * 60_000,
      message: "管理员登录尝试过于频繁，请 5 分钟后再试。",
    });
  } catch (error) {
    redirect(`/admin/login?error=${encodeURIComponent(getMessage(error))}`);
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const env = getEnv();

  if (username !== env.adminUsername || !(await verifyAdminPassword(password, env))) {
    redirect("/admin/login?error=账号或密码不正确。");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商品和首个 SKU 已创建。");

  try {
    await createProduct({
      name: String(formData.get("name") ?? ""),
      slugValue: String(formData.get("slug") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      saleMode: parseProductSaleMode(formData.get("saleMode")),
      paymentProfileId: parseOptionalId(formData.get("paymentProfileId")),
      status: parseProductStatus(formData.get("status")),
      initialSkuName: String(formData.get("initialSkuName") ?? ""),
      initialSkuSummary: String(formData.get("initialSkuSummary") ?? ""),
      initialSkuPrice: String(formData.get("initialSkuPrice") ?? ""),
    });

    revalidateAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updateProductAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商品已更新。");

  try {
    const product = await updateProduct({
      productId: String(formData.get("productId") ?? ""),
      name: String(formData.get("name") ?? ""),
      slugValue: String(formData.get("slug") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      saleMode: parseProductSaleMode(formData.get("saleMode")),
      paymentProfileId: parseOptionalId(formData.get("paymentProfileId")),
      status: parseProductStatus(formData.get("status")),
    });

    revalidateAdminSurface([productSlug, product.slug]);
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function createSkuAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "SKU 已创建。");

  try {
    await createProductSku({
      productId: String(formData.get("productId") ?? ""),
      name: String(formData.get("name") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      price: String(formData.get("price") ?? ""),
      enabled: parseCheckbox(formData.get("enabled")),
    });

    revalidateAdminSurface(productSlug);
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updateSkuAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "SKU 已更新。");

  try {
    await updateProductSku({
      skuId: String(formData.get("skuId") ?? ""),
      name: String(formData.get("name") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      price: String(formData.get("price") ?? ""),
      enabled: parseCheckbox(formData.get("enabled")),
    });

    revalidateAdminSurface(productSlug);
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function deleteProductAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商品已删除。");

  try {
    const product = await deleteProduct({
      productId: String(formData.get("productId") ?? ""),
    });

    revalidateAdminSurface([productSlug, product.slug]);
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function deleteSkuAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "SKU 已删除。");

  try {
    const result = await deleteProductSku({
      skuId: String(formData.get("skuId") ?? ""),
    });

    revalidateAdminSurface([productSlug, result.productSlug]);
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function importCardsAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  let destination = buildAdminHref(tab, { success: "卡密已导入。" });

  try {
    await importCards({
      skuId: String(formData.get("skuId") ?? ""),
      batchName: String(formData.get("batchName") ?? ""),
      rawCards: String(formData.get("rawCards") ?? ""),
    });

    revalidateAdminSurface(productSlug);
  } catch (error) {
    destination = buildAdminHref(tab, { error: getMessage(error) });
  }

  redirect(destination);
}

export async function updateCardItemAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  let destination = buildAdminHref(tab, { success: "库存记录已更新。" });

  try {
    await updateCardItem({
      cardItemId: String(formData.get("cardItemId") ?? ""),
      batchName: parseOptionalText(formData.get("batchName")),
      secret: String(formData.get("secret") ?? ""),
    });

    revalidateAdminSurface(productSlug);
  } catch (error) {
    destination = buildAdminHref(tab, { error: getMessage(error) });
  }

  redirect(destination);
}

export async function deleteCardItemAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  let destination = buildAdminHref(tab, { success: "库存记录已删除。" });

  try {
    await deleteCardItem({
      cardItemId: String(formData.get("cardItemId") ?? ""),
    });

    revalidateAdminSurface(productSlug);
  } catch (error) {
    destination = buildAdminHref(tab, { error: getMessage(error) });
  }

  redirect(destination);
}

export async function clearSkuInventoryAction(formData: FormData) {
  const productSlug = String(formData.get("productSlug") ?? "");
  const tab = parseAdminTab(formData.get("tab"));
  let destination = buildAdminHref(tab, { success: "可售库存已清空。" });

  try {
    const result = await clearAvailableCardsForSku({
      skuId: String(formData.get("skuId") ?? ""),
    });

    revalidateAdminSurface(productSlug);
    destination = buildAdminHref(tab, { success: `已清空 ${result.clearedCount} 条可售库存。` });
  } catch (error) {
    destination = buildAdminHref(tab, { error: getMessage(error) });
  }

  redirect(destination);
}

export async function createMerchantAccountAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商户账号已创建。");

  try {
    await createMerchantAccount({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      isActive: parseCheckbox(formData.get("isActive")),
    });

    revalidateMerchantAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updateMerchantAccountAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商户账号已更新。");

  try {
    await updateMerchantAccount({
      merchantAccountId: String(formData.get("merchantAccountId") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      isActive: parseCheckbox(formData.get("isActive")),
    });

    revalidateMerchantAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function deleteMerchantAccountAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商户账号已删除。");

  try {
    await deleteMerchantAccount(String(formData.get("merchantAccountId") ?? ""));
    revalidateMerchantAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function resetMerchantAccountPasswordAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "商户登录密码已重置。");

  try {
    await resetMerchantAccountPassword({
      merchantAccountId: String(formData.get("merchantAccountId") ?? ""),
      newPassword: String(formData.get("newPassword") ?? ""),
    });

    revalidateMerchantAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updatePlatformStorefrontAnnouncementAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "平台店铺公告已更新。");

  try {
    await requireAdminSession();
    await savePlatformStorefrontAnnouncement({
      enabled: parseCheckbox(formData.get("enabled")),
      title: String(formData.get("title") ?? ""),
      body: String(formData.get("body") ?? ""),
    });

    revalidatePath(buildPlatformStorefrontPath());
    revalidatePath("/store/platform/products/[slug]", "page");
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updatePaymentProfileAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const paymentProfileId = parseOptionalId(formData.get("paymentProfileId"));
  const tab = parseAdminTab(formData.get("tab"));
  const draft = buildPaymentProfileAuditDraft(formData);
  const existing = paymentProfileId ? await getPaymentProfileById(paymentProfileId) : null;
  const beforeState = buildPaymentProfileAuditState(existing);
  const attemptedState = buildPaymentProfileAuditState({
    id: existing?.id ?? paymentProfileId ?? null,
    ownerId: existing?.ownerId ?? null,
    ...draft,
  });
  const apiCredentialTouched = existing
    ? draft.apiKey.trim() !== existing.apiKey.trim() || draft.apiSecret.trim() !== existing.apiSecret.trim()
    : draft.apiKey.trim().length > 0 || draft.apiSecret.trim().length > 0;
  const notifySecretTouched = existing
    ? (draft.notifySecret.trim() || null) !== (existing.notifySecret?.trim() || null)
    : draft.notifySecret.trim().length > 0;
  const targetLabel = buildPaymentProfileAuditTargetLabel(draft);
  const changeSummary = paymentProfileId ? "更新 NovaPay 商户配置" : "新增 NovaPay 商户配置";
  const changeDetail = attemptedState
    ? describePaymentProfileAuditChange({
        before: beforeState,
        after: attemptedState,
        apiCredentialTouched,
        notifySecretTouched,
      })
    : "更新支付商户基础信息";
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(
    returnTo,
    "success",
    paymentProfileId ? "支付商户已更新。" : "支付商户已新增。",
  );

  try {
    const profile = await savePaymentProfile({
      paymentProfileId,
      ...draft,
      revision: {
        sourceScope: "ADMIN",
        actorType: "ADMIN_ACCOUNT",
        actorId: adminActor,
        actorLabel: adminActor,
        changeType: paymentProfileId ? "UPDATE" : "CREATE",
        summary: changeSummary,
      },
    });

    revalidatePaymentSurface();
    revalidatePath("/products/[slug]", "page");

    if (attemptedState) {
      const afterState = buildPaymentProfileAuditState(profile);

      await captureControlAuditLog({
        scope: "ADMIN",
        actorType: "ADMIN_ACCOUNT",
        actorId: adminActor,
        actorLabel: adminActor,
        merchantAccountId: profile.ownerId,
        paymentProfileId: profile.id,
        actionType: paymentProfileId ? "PAYMENT_PROFILE_UPDATED" : "PAYMENT_PROFILE_CREATED",
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
  } catch (error) {
    if (attemptedState) {
      await captureControlAuditLog({
        scope: "ADMIN",
        actorType: "ADMIN_ACCOUNT",
        actorId: adminActor,
        actorLabel: adminActor,
        merchantAccountId: existing?.ownerId ?? null,
        paymentProfileId: paymentProfileId ?? null,
        actionType: paymentProfileId ? "PAYMENT_PROFILE_UPDATED" : "PAYMENT_PROFILE_CREATED",
        riskLevel: resolvePaymentProfileAuditRisk({
          before: beforeState,
          after: attemptedState,
          apiCredentialTouched,
          notifySecretTouched,
        }),
        outcome: "FAILED",
        targetType: "PAYMENT_PROFILE",
        targetId: paymentProfileId ?? null,
        targetLabel,
        summary: `${changeSummary}失败`,
        detail: getMessage(error),
        payload: {
          before: beforeState,
          attempted: attemptedState,
        },
      });
    }

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function deletePaymentProfileAction(formData: FormData) {
  const tab = parseAdminTab(formData.get("tab"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "支付商户已删除。");

  try {
    await deletePaymentProfile(String(formData.get("paymentProfileId") ?? ""));
    revalidatePaymentSurface();
    revalidateAdminSurface();
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function rollbackPaymentProfileRevisionAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const revisionId = String(formData.get("revisionId") ?? "").trim();
  const tab = parseAdminTab(formData.get("tab"));
  const rollbackConfirmation = parseOptionalText(formData.get("rollbackConfirmation"));
  const rollbackReason = parseOptionalText(formData.get("rollbackReason"));
  const returnTo = normalizeAdminConsoleReturnTo(formData.get("returnTo"), buildAdminHref(tab));
  let destination = appendMessageToPath(returnTo, "success", "支付商户已回滚到指定版本。");

  const revision = await getPaymentProfileRevisionById(revisionId);

  try {
    if (!revision || !revision.paymentProfile) {
      throw new Error("目标版本不存在，暂时无法回滚。");
    }

    assertRollbackConfirmation({
      expectedToken: `v${revision.version}`,
      confirmation: rollbackConfirmation,
    });

    const profile = await rollbackPaymentProfileToRevision({
      revisionId,
      actor: {
        sourceScope: "ADMIN",
        actorType: "ADMIN_ACCOUNT",
        actorId: adminActor,
        actorLabel: adminActor,
        changeType: "ROLLBACK",
        summary: `回滚到版本 v${revision.version}`,
      },
    });

    revalidatePaymentSurface();
    revalidatePath("/products/[slug]", "page");

    await captureControlAuditLog({
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      merchantAccountId: profile.ownerId,
      paymentProfileId: profile.id,
      actionType: "PAYMENT_PROFILE_ROLLBACK",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "PAYMENT_PROFILE",
      targetId: profile.id,
      targetLabel: buildPaymentProfileAuditTargetLabel(profile),
      summary: "按版本回滚 NovaPay 商户配置",
      detail: rollbackReason
        ? `已回滚到版本 v${revision.version}，由 ${revision.actorLabel} 在 ${revision.sourceScope} 侧生成。回滚原因：${rollbackReason}`
        : `已回滚到版本 v${revision.version}，由 ${revision.actorLabel} 在 ${revision.sourceScope} 侧生成。`,
      payload: {
        revisionId,
        version: revision.version,
        sourceScope: revision.sourceScope,
        sourceActor: revision.actorLabel,
        rollbackReason: rollbackReason ?? null,
      },
    });
  } catch (error) {
    await captureControlAuditLog({
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      paymentProfileId: revision?.paymentProfileId ?? null,
      actionType: "PAYMENT_PROFILE_ROLLBACK",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "PAYMENT_PROFILE",
      targetId: revision?.paymentProfileId ?? null,
      targetLabel: revision?.paymentProfile
        ? buildPaymentProfileAuditTargetLabel(revision.paymentProfile)
        : "支付商户配置",
      summary: "按版本回滚 NovaPay 商户配置失败",
      detail: getMessage(error),
      payload: {
        revisionId,
        version: revision?.version ?? null,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function refreshAdminPaymentOrderAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const publicToken = String(formData.get("publicToken") ?? "").trim();
  const returnTo = normalizeAdminReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await refreshOrderByPublicToken(publicToken);

    revalidatePaymentSurface();

    if (order) {
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    }

    await captureControlAuditLog({
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      merchantAccountId: order?.paymentProfile?.ownerId ?? null,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "PAYMENT_ORDER_REFRESH",
      riskLevel: "MEDIUM",
      outcome: "SUCCEEDED",
      targetType: "SHOP_ORDER",
      targetId: order?.publicToken ?? publicToken,
      targetLabel: order?.orderNo ?? (publicToken || "待识别订单"),
      summary: "手动重查支付订单状态",
      detail: order
        ? `已主动向 NovaPay 重查订单 ${order.orderNo}，并同步最新支付状态。`
        : "已发起订单状态重查。",
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
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      actionType: "PAYMENT_ORDER_REFRESH",
      riskLevel: "MEDIUM",
      outcome: "FAILED",
      targetType: "SHOP_ORDER",
      targetId: publicToken || null,
      targetLabel: publicToken || "待识别订单",
      summary: "手动重查支付订单状态失败",
      detail: getMessage(error),
      payload: {
        publicToken,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function runAdminSyncTaskAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const taskId = String(formData.get("taskId") ?? "").trim();
  const returnTo = normalizeAdminReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await runOrderSyncTask(taskId);

    revalidatePaymentSurface();

    if (order) {
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    }

    await captureControlAuditLog({
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      merchantAccountId: order?.paymentProfile?.ownerId ?? null,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "SYNC_TASK_EXECUTED",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "SYNC_TASK",
      targetId: taskId || null,
      targetLabel: order?.orderNo ? `${order.orderNo} 的补偿任务` : taskId || "支付补偿任务",
      summary: "人工执行支付补偿任务",
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
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      actionType: "SYNC_TASK_EXECUTED",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "SYNC_TASK",
      targetId: taskId || null,
      targetLabel: taskId || "支付补偿任务",
      summary: "人工执行支付补偿任务失败",
      detail: getMessage(error),
      payload: {
        taskId,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function replayAdminCallbackLogAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const logId = String(formData.get("logId") ?? "").trim();
  const returnTo = normalizeAdminReturnTo(formData.get("returnTo"));
  let destination = returnTo;

  try {
    const order = await replayWebhookEventLog(logId);

    revalidatePaymentSurface();

    if (order) {
      revalidatePath(`/orders/${order.publicToken}`);

      for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
        revalidatePath(path);
      }
    }

    await captureControlAuditLog({
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      merchantAccountId: order?.paymentProfile?.ownerId ?? null,
      paymentProfileId: order?.paymentProfile?.id ?? null,
      actionType: "WEBHOOK_REPLAY_EXECUTED",
      riskLevel: "HIGH",
      outcome: "SUCCEEDED",
      targetType: "WEBHOOK_EVENT",
      targetId: logId || null,
      targetLabel: order?.orderNo ? `${order.orderNo} 的回调回放` : logId || "支付回调日志",
      summary: "人工回放 NovaPay 支付回调",
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
      scope: "ADMIN",
      actorType: "ADMIN_ACCOUNT",
      actorId: adminActor,
      actorLabel: adminActor,
      actionType: "WEBHOOK_REPLAY_EXECUTED",
      riskLevel: "HIGH",
      outcome: "FAILED",
      targetType: "WEBHOOK_EVENT",
      targetId: logId || null,
      targetLabel: logId || "支付回调日志",
      summary: "人工回放 NovaPay 支付回调失败",
      detail: getMessage(error),
      payload: {
        logId,
      },
    });

    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}

export async function updateControlAuditReviewAction(formData: FormData) {
  const adminActor = await getAdminAuditActor();
  const logId = String(formData.get("logId") ?? "").trim();
  const returnTo = normalizeAdminReturnTo(formData.get("returnTo"));
  const reviewStatus = parseControlAuditReviewStatus(formData.get("reviewStatus"));
  const reviewNote =
    String(formData.get("reviewNote") ?? "").trim() ||
    (reviewStatus === "REVIEWED" ? "管理员已完成控制面复核。" : "已重新打开，等待继续复核。");
  let destination = returnTo;

  try {
    await updateControlAuditReview({
      logId,
      reviewStatus,
      reviewerType: "ADMIN_ACCOUNT",
      reviewerId: adminActor,
      reviewerLabel: adminActor,
      reviewNote,
    });

    revalidatePaymentSurface();
    destination = appendMessageToPath(
      returnTo,
      "success",
      reviewStatus === "REVIEWED" ? "该审计记录已标记为完成复核。" : "该审计记录已重新打开。",
    );
  } catch (error) {
    destination = appendMessageToPath(returnTo, "error", getMessage(error));
  }

  redirect(destination);
}
