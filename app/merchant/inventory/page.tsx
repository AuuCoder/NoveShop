import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantInventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="inventory" searchParams={searchParams} />;
}
