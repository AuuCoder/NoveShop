import { redirect } from "next/navigation";
import { AdminConsoleView } from "@/app/admin/console-view";
import { buildAdminHref, getAdminTabView, normalizeAdminTab, type AdminTab } from "@/app/admin/modules";
import { requireAdminSession } from "@/lib/admin-session";
import { getEnv } from "@/lib/env";
import { listMerchantAccounts } from "@/lib/merchant-account";
import { listPaymentProfileRevisionSummaries, listPaymentProfiles } from "@/lib/payment-profile";
import { EMPTY_STOREFRONT_ANNOUNCEMENT, getPlatformStorefrontAnnouncement } from "@/lib/storefront-announcement";
import { getAdminDashboardData, getAdminPaymentOperationsData } from "@/lib/shop";

type AdminConsoleSearchValue = string | string[] | undefined;
type AdminConsoleSearchParams = Promise<Record<string, AdminConsoleSearchValue>>;

function getSearchValue(value: AdminConsoleSearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export async function AdminConsolePage({
  currentTab,
  viewKey,
  searchParams,
}: {
  currentTab: AdminTab;
  viewKey?: string;
  searchParams: AdminConsoleSearchParams;
}) {
  await requireAdminSession();

  const search = await searchParams;
  const normalizedSearch = Object.fromEntries(
    Object.entries(search).map(([key, value]) => [key, getSearchValue(value)]),
  ) as Record<string, string | undefined>;

  if (typeof normalizedSearch.tab === "string") {
    redirect(
      buildAdminHref(normalizeAdminTab(normalizedSearch.tab), {
        error: normalizedSearch.error,
        success: normalizedSearch.success,
      }),
    );
  }

  const env = getEnv();
  const currentView = getAdminTabView(currentTab, viewKey);
  const [dashboard, paymentProfiles, merchantAccounts, paymentOperations, platformAnnouncement] = await Promise.all([
    getAdminDashboardData(),
    listPaymentProfiles(),
    listMerchantAccounts(),
    currentTab === "payments" ? getAdminPaymentOperationsData(normalizedSearch) : Promise.resolve(null),
    currentTab === "merchants"
      ? getPlatformStorefrontAnnouncement()
      : Promise.resolve(EMPTY_STOREFRONT_ANNOUNCEMENT),
  ]);
  const paymentProfileRevisions =
    currentTab === "merchants" && paymentProfiles.length > 0
      ? await listPaymentProfileRevisionSummaries({
          paymentProfileIds: paymentProfiles.map((profile) => profile.id),
          take: 60,
        })
      : [];

  return (
    <AdminConsoleView
      currentTab={currentTab}
      currentView={currentView}
      search={{
        error: normalizedSearch.error,
        success: normalizedSearch.success,
      }}
      env={env}
      dashboard={dashboard}
      merchantAccounts={merchantAccounts}
      paymentProfiles={paymentProfiles}
      paymentProfileRevisions={paymentProfileRevisions}
      platformAnnouncement={platformAnnouncement}
      paymentOperations={paymentOperations}
    />
  );
}
