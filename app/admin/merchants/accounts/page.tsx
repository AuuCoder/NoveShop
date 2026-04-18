import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminMerchantAccountsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="merchants" viewKey="accounts" searchParams={searchParams} />;
}
