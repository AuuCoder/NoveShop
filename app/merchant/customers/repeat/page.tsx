import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantCustomersRepeatPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="customers" viewKey="repeat" searchParams={searchParams} />;
}
