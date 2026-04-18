import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantInventoryStockPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="inventory" viewKey="stock" searchParams={searchParams} />;
}
