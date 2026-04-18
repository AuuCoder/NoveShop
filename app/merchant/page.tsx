import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="overview" searchParams={searchParams} />;
}
