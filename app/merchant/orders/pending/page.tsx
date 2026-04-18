import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantOrdersPendingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="orders" viewKey="pending" searchParams={searchParams} />;
}
