import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminPaymentExceptionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="payments" viewKey="exceptions" searchParams={searchParams} />;
}
