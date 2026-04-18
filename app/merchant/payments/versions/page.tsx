import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantPaymentsVersionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="payments" viewKey="versions" searchParams={searchParams} />;
}
