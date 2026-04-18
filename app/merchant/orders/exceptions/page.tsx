import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantOrdersExceptionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="orders" viewKey="exceptions" searchParams={searchParams} />;
}
