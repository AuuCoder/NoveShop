import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsStorefrontPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" viewKey="storefront" searchParams={searchParams} />;
}
