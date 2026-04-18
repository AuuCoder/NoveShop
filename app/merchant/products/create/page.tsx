import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantProductsCreatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="products" viewKey="create" searchParams={searchParams} />;
}
