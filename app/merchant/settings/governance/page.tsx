import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsGovernancePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" viewKey="governance" searchParams={searchParams} />;
}
