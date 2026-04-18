import { notFound } from "next/navigation";
import { StorefrontPageClient } from "@/app/storefront-page-client";
import {
  getMerchantAccountWithProfileById,
  listMerchantStorefronts,
} from "@/lib/merchant-account";
import {
  getMerchantStorefrontAnnouncement,
  getPlatformStorefrontAnnouncement,
} from "@/lib/storefront-announcement";
import { listActiveProductsByMerchant, listPlatformActiveProducts } from "@/lib/shop";
import {
  buildPlatformStorefrontPath,
  isPlatformStorefrontId,
  buildStorefrontPath,
} from "@/lib/storefront";

export default async function MerchantStorefrontPage({
  params,
  searchParams,
}: {
  params: Promise<{ merchantId: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { merchantId } = await params;
  const search = await searchParams;
  const platformStore = isPlatformStorefrontId(merchantId);
  const [merchant, products, merchantStores, platformAnnouncement] = await Promise.all([
    platformStore ? Promise.resolve(null) : getMerchantAccountWithProfileById(merchantId),
    platformStore ? listPlatformActiveProducts() : listActiveProductsByMerchant(merchantId),
    listMerchantStorefronts(),
    platformStore ? getPlatformStorefrontAnnouncement() : Promise.resolve(null),
  ]);

  if (!platformStore && (!merchant || !merchant.isActive)) {
    notFound();
  }

  const storefrontPath = buildStorefrontPath(platformStore ? null : merchant!.id);
  const announcement = platformStore
    ? platformAnnouncement
    : getMerchantStorefrontAnnouncement(merchant);
  const announcementSnapshot = announcement
    ? {
        body: announcement.body,
        enabled: announcement.enabled,
        title: announcement.title,
        updatedAt: announcement.updatedAt?.toISOString() ?? null,
      }
    : null;
  const productSnapshots = products.map((product) => ({
    description: product.description ?? null,
    id: product.id,
    name: product.name,
    saleMode: product.saleMode,
    slug: product.slug,
    startingPriceCents: product.startingPriceCents,
    stock: {
      available: product.stock.available,
    },
    summary: product.summary ?? null,
    skus: product.skus.map((sku) => ({
      id: sku.id,
      name: sku.name,
      priceCents: sku.priceCents,
      stock: {
        available: sku.stock.available,
      },
      summary: sku.summary ?? null,
    })),
  }));

  return (
    <StorefrontPageClient
      announcement={announcementSnapshot}
      merchantId={merchantId}
      merchantName={merchant?.name ?? null}
      paymentProfileActive={platformStore ? true : Boolean(merchant?.paymentProfile?.isActive)}
      paymentProfileConfigured={platformStore ? true : Boolean(merchant?.paymentProfile)}
      peerStoreCount={merchantStores.length}
      platformStore={platformStore}
      products={productSnapshots}
      searchKeyword={search.q?.trim() ?? ""}
      storefrontPath={platformStore ? buildPlatformStorefrontPath() : storefrontPath}
    />
  );
}
