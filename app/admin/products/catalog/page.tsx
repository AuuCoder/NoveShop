import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminProductsCatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="products" viewKey="catalog" searchParams={searchParams} />;
}
