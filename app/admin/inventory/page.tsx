import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminInventoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="inventory" searchParams={searchParams} />;
}
