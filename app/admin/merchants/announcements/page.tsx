import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminMerchantAnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="merchants" viewKey="announcements" searchParams={searchParams} />;
}
