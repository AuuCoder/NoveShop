import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantPaymentsAnalysisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="payments" viewKey="analysis" searchParams={searchParams} />;
}
