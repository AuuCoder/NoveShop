import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminMerchantProfilesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="merchants" viewKey="profiles" searchParams={searchParams} />;
}
