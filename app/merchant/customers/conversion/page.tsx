import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantCustomersConversionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="customers" viewKey="conversion" searchParams={searchParams} />;
}
