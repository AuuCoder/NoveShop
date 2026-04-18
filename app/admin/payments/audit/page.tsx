import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminPaymentAuditPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="payments" viewKey="audit" searchParams={searchParams} />;
}
