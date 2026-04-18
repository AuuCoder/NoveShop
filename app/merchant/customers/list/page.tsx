import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantCustomersListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="customers" viewKey="list" searchParams={searchParams} />;
}
