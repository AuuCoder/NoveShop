import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="products" searchParams={searchParams} />;
}
