import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantPaymentsMonitoringPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="payments" viewKey="monitoring" searchParams={searchParams} />;
}
