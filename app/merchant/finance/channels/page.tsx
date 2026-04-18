import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantFinanceChannelsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="finance" viewKey="channels" searchParams={searchParams} />;
}
