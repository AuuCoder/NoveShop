import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="overview" searchParams={searchParams} />;
}
