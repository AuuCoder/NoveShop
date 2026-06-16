export const PLATFORM_STOREFRONT_ID = "platform";

/**
 * 解码来自动态路由段的 slug。
 *
 * Next.js 在生产构建下会把动态路由参数(params.slug)以 percent-encoded 形式
 * 交给 server component,例如中文 slug「中转站邀请码」到达时是
 * "%E4%B8%AD%E8%BD%AC...". 而数据库里存的是中文原文,精确匹配会落空导致 404。
 * 这里统一解码后再查库。对已是明文的英文 slug 解码无副作用;遇到非法的裸 %
 * 序列时 decodeURIComponent 会抛错,用 try/catch 回退原值以保证不影响既有链接。
 */
export function decodeStorefrontSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function buildMerchantStorefrontPath(merchantAccountId: string) {
  return `/s/${merchantAccountId}`;
}

export function buildMerchantStorefrontProductPath(merchantAccountId: string, slug: string) {
  return `${buildMerchantStorefrontPath(merchantAccountId)}/products/${slug}`;
}

export function isPlatformStorefrontId(merchantAccountId: string) {
  return merchantAccountId === PLATFORM_STOREFRONT_ID;
}

export function buildPlatformStorefrontPath() {
  return buildMerchantStorefrontPath(PLATFORM_STOREFRONT_ID);
}

export function buildPlatformProductPath(slug: string) {
  return `${buildPlatformStorefrontPath()}/products/${slug}`;
}

export function buildLegacyProductPath(slug: string) {
  return `/products/${slug}`;
}

export function buildStorefrontPath(merchantAccountId?: string | null) {
  return merchantAccountId
    ? buildMerchantStorefrontPath(merchantAccountId)
    : buildPlatformStorefrontPath();
}

export function buildStorefrontProductPath(slug: string, merchantAccountId?: string | null) {
  return merchantAccountId
    ? buildMerchantStorefrontProductPath(merchantAccountId, slug)
    : buildPlatformProductPath(slug);
}

export function getStorefrontPathsForProduct(slug: string, merchantAccountId?: string | null) {
  if (!merchantAccountId) {
    return [
      buildPlatformStorefrontPath(),
      buildPlatformProductPath(slug),
      buildLegacyProductPath(slug),
    ];
  }

  return [
    buildMerchantStorefrontPath(merchantAccountId),
    buildMerchantStorefrontProductPath(merchantAccountId, slug),
    buildLegacyProductPath(slug),
  ];
}
