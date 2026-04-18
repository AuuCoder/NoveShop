import { ProductSaleMode } from "@prisma/client";
import HomePageClient from "@/app/home-page-client";
import { listMerchantStorefronts } from "@/lib/merchant-account";
import { listPlatformActiveProducts } from "@/lib/shop";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const search = await searchParams;
  const [platformProducts, merchantStores] = await Promise.all([
    listPlatformActiveProducts(),
    listMerchantStorefronts(),
  ]);
  const keyword = search.q?.trim().toLowerCase() ?? "";
  const filteredProducts = keyword
    ? platformProducts.filter((product) =>
        [
          product.name,
          product.summary ?? "",
          product.description ?? "",
          ...product.skus.map((sku) => `${sku.name} ${sku.summary ?? ""}`),
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      )
    : platformProducts;
  const totalStock = platformProducts.reduce((sum, product) => sum + product.stock.available, 0);
  const totalSkuCount = platformProducts.reduce((sum, product) => sum + product.skus.length, 0);
  const totalMerchantProducts = merchantStores.reduce(
    (sum, store) => sum + store.paymentProfile.productCount,
    0,
  );
  const totalMerchantSkuCount = merchantStores.reduce(
    (sum, store) => sum + store.paymentProfile.skuCount,
    0,
  );
  const activeMerchantPaymentCount = merchantStores.filter(
    (store) => store.paymentProfile.isActive,
  ).length;
  const multiSkuProductCount = platformProducts.filter(
    (product) => product.saleMode === ProductSaleMode.MULTI,
  ).length;
  const highlightedProducts = (
    keyword && filteredProducts.length > 0 ? filteredProducts.slice(0, 3) : platformProducts.slice(0, 3)
  ).map((product) => ({
    id: product.id,
    name: product.name,
    ownerId: product.paymentProfile?.ownerId ?? null,
    saleMode: product.saleMode,
    skus: product.skus.map((sku) => ({
      id: sku.id,
      name: sku.name,
      summary: sku.summary,
    })),
    slug: product.slug,
    startingPriceCents: product.startingPriceCents,
    stockAvailable: product.stock.available,
    summary: product.summary,
  }));
  const featuredMerchants = merchantStores.slice(0, 3).map((merchant) => ({
    id: merchant.id,
    name: merchant.name,
    paymentProfile: {
      featuredProducts: merchant.paymentProfile.featuredProducts.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
      })),
      productCount: merchant.paymentProfile.productCount,
      skuCount: merchant.paymentProfile.skuCount,
    },
  }));

  return (
    <HomePageClient
      activeMerchantPaymentCount={activeMerchantPaymentCount}
      featuredMerchants={featuredMerchants}
      highlightedProducts={highlightedProducts}
      keyword={keyword}
      merchantStoreCount={merchantStores.length}
      multiSkuProductCount={multiSkuProductCount}
      platformProductCount={platformProducts.length}
      totalMerchantProducts={totalMerchantProducts}
      totalMerchantSkuCount={totalMerchantSkuCount}
      totalSkuCount={totalSkuCount}
      totalStock={totalStock}
    />
  );
}
