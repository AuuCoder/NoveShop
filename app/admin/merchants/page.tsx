import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminMerchantsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="merchants" searchParams={searchParams} />;
}
