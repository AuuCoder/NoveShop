import { notFound } from "next/navigation";
import { ProductDetailView } from "@/app/products/product-detail-view";
import { getMerchantAccountWithProfileById } from "@/lib/merchant-account";
import { getCheckoutChannelConfiguration } from "@/lib/payment-profile";
import {
  getMerchantStorefrontAnnouncement,
  getMerchantStorefrontContact,
  getPlatformStorefrontAnnouncement,
  getPlatformStorefrontContact,
} from "@/lib/storefront-announcement";
import {
  getMerchantStorefrontProductBySlug,
  getPlatformStorefrontProductBySlug,
} from "@/lib/shop";
import { parseStoredImageList } from "@/lib/uploads";
import { parseContentBlocks } from "@/lib/content-blocks";
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
    const [product, announcement, contact] = await Promise.all([
      getPlatformStorefrontProductBySlug(slug),
      getPlatformStorefrontAnnouncement(),
      getPlatformStorefrontContact(),
    ]);

    if (!product) {
      notFound();
    }

    const checkoutChannelConfig = await getCheckoutChannelConfiguration(product.paymentProfileId);

    return (
      <ProductDetailView
        product={{
          ...product,
          detailImages: parseStoredImageList(product.detailImages),
          contentBlocks: parseContentBlocks(product.contentBlocks),
        }}
        checkoutChannelConfig={checkoutChannelConfig}
        announcement={announcement}
        contact={contact}
        error={search.error}
        backHref={buildPlatformStorefrontPath()}
        platformStore
        returnPath={buildPlatformProductPath(product.slug)}
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
      product={{
        ...product,
        detailImages: parseStoredImageList(product.detailImages),
        contentBlocks: parseContentBlocks(product.contentBlocks),
      }}
      checkoutChannelConfig={checkoutChannelConfig}
      announcement={getMerchantStorefrontAnnouncement(merchant)}
      contact={getMerchantStorefrontContact(merchant)}
      error={search.error}
      backHref={buildMerchantStorefrontPath(merchant.id)}
      platformStore={false}
      returnPath={buildMerchantStorefrontProductPath(merchant.id, product.slug)}
      storefrontName={merchant.name}
    />
  );
}
