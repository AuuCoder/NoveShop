import { notFound } from "next/navigation";
import { ProductDetailView } from "@/app/products/product-detail-view";
import { getMerchantAccountWithProfileById } from "@/lib/merchant-account";
import { getCheckoutChannelConfiguration } from "@/lib/payment-profile";
import {
  getMerchantStorefrontAnnouncement,
  getPlatformStorefrontAnnouncement,
} from "@/lib/storefront-announcement";
import {
  getMerchantStorefrontProductBySlug,
  getPlatformStorefrontProductBySlug,
} from "@/lib/shop";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
  buildPlatformProductPath,
  buildPlatformStorefrontPath,
  isPlatformStorefrontId,
} from "@/lib/storefront";

export default async function MerchantStorefrontProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ merchantId: string; slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { merchantId, slug } = await params;
  const search = await searchParams;
  if (isPlatformStorefrontId(merchantId)) {
    const [product, announcement] = await Promise.all([
      getPlatformStorefrontProductBySlug(slug),
      getPlatformStorefrontAnnouncement(),
    ]);

    if (!product) {
      notFound();
    }

    const checkoutChannelConfig = await getCheckoutChannelConfiguration(product.paymentProfileId);

    return (
      <ProductDetailView
        product={product}
        checkoutChannelConfig={checkoutChannelConfig}
        announcement={announcement}
        error={search.error}
        backHref={buildPlatformStorefrontPath()}
        backLabel="返回管理员店铺"
        returnPath={buildPlatformProductPath(product.slug)}
        storefrontName="管理员直营网"
      />
    );
  }

  const [merchant, product] = await Promise.all([
    getMerchantAccountWithProfileById(merchantId),
    getMerchantStorefrontProductBySlug(merchantId, slug),
  ]);

  if (!merchant || !merchant.isActive || !product) {
    notFound();
  }

  const checkoutChannelConfig = await getCheckoutChannelConfiguration(product.paymentProfileId);

  return (
    <ProductDetailView
      product={product}
      checkoutChannelConfig={checkoutChannelConfig}
      announcement={getMerchantStorefrontAnnouncement(merchant)}
      error={search.error}
      backHref={buildMerchantStorefrontPath(merchant.id)}
      backLabel={`返回 ${merchant.name}`}
      returnPath={buildMerchantStorefrontProductPath(merchant.id, product.slug)}
      storefrontName={merchant.name}
    />
  );
}
