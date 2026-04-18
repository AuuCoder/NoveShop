import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantPaymentsProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="payments" viewKey="profile" searchParams={searchParams} />;
}
