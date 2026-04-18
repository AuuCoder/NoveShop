import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminPaymentAnalysisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="payments" viewKey="analysis" searchParams={searchParams} />;
}
