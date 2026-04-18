import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantProductsCatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="products" viewKey="catalog" searchParams={searchParams} />;
}
