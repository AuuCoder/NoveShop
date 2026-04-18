import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsProfilePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" viewKey="profile" searchParams={searchParams} />;
}
