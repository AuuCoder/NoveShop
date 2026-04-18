import { AdminConsolePage } from "@/app/admin/console-page";

export default async function AdminProductsCreatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminConsolePage currentTab="products" viewKey="create" searchParams={searchParams} />;
}
