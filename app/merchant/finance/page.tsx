import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantFinancePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="finance" searchParams={searchParams} />;
}
