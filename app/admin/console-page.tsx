import { redirect } from "next/navigation";
import { AdminConsoleView } from "@/app/admin/console-view";
import { buildAdminHref, getAdminTabView, normalizeAdminTab, type AdminTab } from "@/app/admin/modules";
import { requireAdminSession } from "@/lib/admin-session";
import { getEnv } from "@/lib/env";
import { listMerchantAccounts } from "@/lib/merchant-account";
import { listPaymentProfileRevisionSummaries, listPaymentProfiles } from "@/lib/payment-profile";
import {
  EMPTY_STOREFRONT_ANNOUNCEMENT,
  EMPTY_STOREFRONT_CONTACT,
  getPlatformStorefrontAnnouncement,
  getPlatformStorefrontContact,
} from "@/lib/storefront-announcement";
import { getAdminDashboardData, getAdminPaymentOperationsData } from "@/lib/shop";

type AdminConsoleSearchValue = string | string[] | undefined;
type AdminConsoleSearchParams = Promise<Record<string, AdminConsoleSearchValue>>;

function getSearchValue(value: AdminConsoleSearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export async function AdminConsolePage({
  currentTab,
  viewKey,
  selectedProductId,
  selectedSkuId,
  returnToOverride,
  searchParams,
}: {
  currentTab: AdminTab;
  viewKey?: string;
  selectedProductId?: string;
  selectedSkuId?: string;
  returnToOverride?: string;
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
  const [dashboard, paymentProfiles, merchantAccounts, paymentOperations, platformAnnouncement, platformContact] = await Promise.all([
    getAdminDashboardData(),
    listPaymentProfiles(),
    listMerchantAccounts(),
    currentTab === "payments" ? getAdminPaymentOperationsData(normalizedSearch) : Promise.resolve(null),
    currentTab === "merchants"
      ? getPlatformStorefrontAnnouncement()
      : Promise.resolve(EMPTY_STOREFRONT_ANNOUNCEMENT),
    currentTab === "merchants"
      ? getPlatformStorefrontContact()
      : Promise.resolve(EMPTY_STOREFRONT_CONTACT),
  ]);
  const paymentProfileRevisions =
    currentTab === "merchants" && paymentProfiles.length > 0
      ? await listPaymentProfileRevisionSummaries({
          paymentProfileIds: paymentProfiles.map((profile) => profile.id),
          take: 60,
        })
      : [];

  if (currentTab === "products" && selectedProductId && !dashboard.products.some((product) => product.id === selectedProductId)) {
    redirect(
      buildAdminHref("products", {
        success: normalizedSearch.success,
        error: normalizedSearch.error ?? (normalizedSearch.success ? undefined : "商品不存在或已删除。"),
      }),
    );
  }

  return (
    <AdminConsoleView
      currentTab={currentTab}
      currentView={currentView}
      search={normalizedSearch}
      env={env}
      dashboard={dashboard}
      merchantAccounts={merchantAccounts}
      paymentProfiles={paymentProfiles}
      paymentProfileRevisions={paymentProfileRevisions}
      platformAnnouncement={platformAnnouncement}
      platformContact={platformContact}
      paymentOperations={paymentOperations}
      selectedProductId={selectedProductId}
      selectedSkuId={selectedSkuId}
      productsReturnTo={returnToOverride ?? currentView.href}
    />
  );
}
