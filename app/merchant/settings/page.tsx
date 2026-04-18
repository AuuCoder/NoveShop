import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" searchParams={searchParams} />;
}
