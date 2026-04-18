import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminOrdersFulfilledPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="orders" viewKey="fulfilled" searchParams={searchParams} />;
}
