import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminOrdersExceptionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="orders" viewKey="exceptions" searchParams={searchParams} />;
}
