import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="orders" searchParams={searchParams} />;
}
