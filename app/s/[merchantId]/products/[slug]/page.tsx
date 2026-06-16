import { notFound } from "next/navigation";
import { ProductDetailView } from "@/app/products/product-detail-view";
import { getMerchantAccountWithProfileByHandleOrId } from "@/lib/merchant-account";
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
  decodeStorefrontSlug,
  isPlatformStorefrontId,
} from "@/lib/storefront";

export default async function MerchantStorefrontProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ merchantId: string; slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { merchantId: rawMerchantId, slug: rawSlug } = await params;
  const merchantId = decodeStorefrontSlug(rawMerchantId);
  const slug = decodeStorefrontSlug(rawSlug);
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

  const merchant = await getMerchantAccountWithProfileByHandleOrId(merchantId);

  if (!merchant || !merchant.isActive) {
    notFound();
  }

  const product = await getMerchantStorefrontProductBySlug(merchant.id, slug);

  if (!product) {
    notFound();
  }

  const checkoutChannelConfig = await getCheckoutChannelConfiguration(product.paymentProfileId);
  const storefrontHandle = merchant.slug ?? merchant.id;

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
      backHref={buildMerchantStorefrontPath(storefrontHandle)}
      platformStore={false}
      returnPath={buildMerchantStorefrontProductPath(storefrontHandle, product.slug)}
      storefrontName={merchant.name}
    />
  );
}
