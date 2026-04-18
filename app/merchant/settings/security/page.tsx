import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsSecurityPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" viewKey="security" searchParams={searchParams} />;
}
