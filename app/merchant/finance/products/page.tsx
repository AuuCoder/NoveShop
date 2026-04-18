import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantFinanceProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="finance" viewKey="products" searchParams={searchParams} />;
}
