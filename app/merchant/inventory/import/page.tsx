import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantInventoryImportPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="inventory" viewKey="import" searchParams={searchParams} />;
}
