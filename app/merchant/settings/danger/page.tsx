import { MerchantConsolePage } from "@/app/merchant/console-page";

export default async function MerchantSettingsDangerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <MerchantConsolePage currentTab="settings" viewKey="danger" searchParams={searchParams} />;
}
