import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantInventoryLedgerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="inventory" viewKey="ledger" searchParams={searchParams} />;
}
