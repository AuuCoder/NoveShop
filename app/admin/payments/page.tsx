import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="payments" searchParams={searchParams} />;
}
