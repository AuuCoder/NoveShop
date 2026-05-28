import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { productId } = await params;
  const search = await searchParams;
  const selectedSkuId = Array.isArray(search.skuId) ? search.skuId[0] : search.skuId;
  const query = selectedSkuId ? `?skuId=${encodeURIComponent(selectedSkuId)}` : "";
  const returnToOverride = `/admin/products/${encodeURIComponent(productId)}${query}`;

  return (
    <AdminConsolePage
      currentTab="products"
      viewKey="catalog"
      selectedProductId={productId}
      selectedSkuId={selectedSkuId}
      returnToOverride={returnToOverride}
      searchParams={Promise.resolve(search)}
    />
  );
}
