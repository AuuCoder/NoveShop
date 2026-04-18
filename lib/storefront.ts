export const PLATFORM_STOREFRONT_ID = "platform";

export function buildMerchantStorefrontPath(merchantAccountId: string) {
  return `/store/${merchantAccountId}`;
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
