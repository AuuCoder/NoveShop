import { redirect } from "next/navigation";
import { MerchantConsoleView } from "@/app/merchant/console-view";
import {
  buildMerchantHref,
  getMerchantTabView,
  normalizeMerchantTab,
  type MerchantTab,
} from "@/app/merchant/modules";
import { getEnv } from "@/lib/env";
import { requireMerchantSession } from "@/lib/merchant-session";
import { getMerchantOwnedPaymentProfile, listPaymentProfileRevisionSummaries } from "@/lib/payment-profile";
import { getMerchantDashboardData, getMerchantPaymentOperationsData } from "@/lib/shop";

export type MerchantConsoleSearchValue = string | string[] | undefined;
export type MerchantConsoleSearch = Record<string, MerchantConsoleSearchValue>;
type MerchantConsoleSearchParams = Promise<MerchantConsoleSearch>;

function getSearchValue(value: MerchantConsoleSearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export async function MerchantConsolePage({
  currentTab,
  viewKey,
  searchParams,
}: {
  currentTab: MerchantTab;
  viewKey?: string;
  searchParams: MerchantConsoleSearchParams;
}) {
  const merchant = await requireMerchantSession();
  const search = await searchParams;
  const normalizedSearch = Object.fromEntries(
    Object.entries(search).map(([key, value]) => [key, getSearchValue(value)]),
  ) as Record<string, string | undefined>;

  if (typeof normalizedSearch.tab === "string") {
    redirect(
      buildMerchantHref(normalizeMerchantTab(normalizedSearch.tab), {
        error: normalizedSearch.error,
        success: normalizedSearch.success,
      }),
    );
  }

  const env = getEnv();
  const currentView = getMerchantTabView(currentTab, viewKey);
  const [paymentProfile, dashboard, paymentOperations] = await Promise.all([
    getMerchantOwnedPaymentProfile(merchant.id),
    getMerchantDashboardData(merchant.id),
    currentTab === "payments"
      ? getMerchantPaymentOperationsData(merchant.id, normalizedSearch)
      : Promise.resolve(null),
  ]);
  const paymentProfileRevisions =
    currentTab === "payments" && paymentProfile
      ? await listPaymentProfileRevisionSummaries({
          paymentProfileId: paymentProfile.id,
          take: 12,
        })
      : [];

  return (
    <MerchantConsoleView
      currentTab={currentTab}
      currentView={currentView}
      search={normalizedSearch}
      env={env}
      merchant={merchant}
      paymentProfile={paymentProfile}
      paymentProfileRevisions={paymentProfileRevisions}
      dashboard={dashboard}
      paymentOperations={paymentOperations}
    />
  );
}
