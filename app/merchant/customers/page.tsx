import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantCustomersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="customers" searchParams={searchParams} />;
}
