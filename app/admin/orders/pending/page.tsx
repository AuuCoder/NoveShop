import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminOrdersPendingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="orders" viewKey="pending" searchParams={searchParams} />;
}
