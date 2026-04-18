import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="products" searchParams={searchParams} />;
}
