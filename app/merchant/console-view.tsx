import Link from "next/link";
import { CardItemStatus, ProductSaleMode, ProductStatus, ShopOrderStatus } from "@prisma/client";
import { PaymentChannelConfigFields } from "@/app/payment-channel-config-fields";
import { PaymentOperationsView } from "@/app/payment-operations-view";
import {
  changeMerchantPasswordAction,
  clearMerchantSkuInventoryAction,
  createMerchantProductAction,
  createMerchantSkuAction,
  deleteMerchantCardItemAction,
  deleteMerchantPaymentProfileAction,
  deleteMerchantSelfAccountAction,
  deleteMerchantProductAction,
  deleteMerchantSkuAction,
  importMerchantCardsAction,
  logoutMerchantAction,
  rollbackMerchantPaymentProfileRevisionAction,
  saveMerchantPaymentProfileAction,
  updateMerchantProfileAction,
  updateMerchantStorefrontAnnouncementAction,
  updateMerchantCardItemAction,
  updateMerchantProductAction,
  updateMerchantSkuAction,
} from "@/app/merchant/actions";
import {
  MERCHANT_CONFIGURATION_TABS,
  MERCHANT_OPERATIONS_TABS,
  MERCHANT_TAB_META,
  MERCHANT_TABS,
  buildMerchantHref,
  getMerchantPageSections,
  getMerchantTabViews,
  type MerchantTab,
  type MerchantTabView,
} from "@/app/merchant/modules";
import { getEnv } from "@/lib/env";
import { type MerchantAccountSnapshot } from "@/lib/merchant-account";
import { formatPaymentChannelCodes } from "@/lib/payment-channels";
import { type PaymentProfileRevisionSummary, type PaymentProfileSnapshot } from "@/lib/payment-profile";
import {
  describeOrderAmount,
  getMerchantDashboardData,
  getOrderStatusLabel,
  getOrderStatusTone,
  type PaymentOperationsData,
} from "@/lib/shop";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
} from "@/lib/storefront";
import { formatDateTime, maskCardSecret } from "@/lib/utils";

type MerchantDashboardData = Awaited<ReturnType<typeof getMerchantDashboardData>>;
type MerchantProduct = MerchantDashboardData["products"][number];
type MerchantOrder = MerchantDashboardData["orders"][number];

type DashboardCard = {
  label: string;
  value: number | string;
  detail: string;
  tone: string;
};

type ModuleCard = {
  tab: MerchantTab;
  title: string;
  detail: string;
  helper: string;
};

function getProductStatusLabel(status: ProductStatus) {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "上架中";
    case ProductStatus.ARCHIVED:
      return "已归档";
    case ProductStatus.DRAFT:
    default:
      return "草稿";
  }
}

function getProductStatusTone(status: ProductStatus) {
  switch (status) {
    case ProductStatus.ACTIVE:
      return "success";
    case ProductStatus.ARCHIVED:
      return "warning";
    case ProductStatus.DRAFT:
    default:
      return "muted";
  }
}

function getProductSaleModeLabel(mode: ProductSaleMode) {
  return mode === ProductSaleMode.MULTI ? "多 SKU" : "单商品";
}

function getProductSaleModeCopy(mode: ProductSaleMode) {
  return mode === ProductSaleMode.MULTI
    ? "一个商品下挂多个规格，前台可切换 SKU 购买。"
    : "前台按单商品直购，只展示一个默认规格。";
}

function getSingleModePrimarySku(product: MerchantProduct) {
  return product.skus.find((sku) => sku.enabled) ?? product.skus[0] ?? null;
}

function getInventoryTone(available: number, enabled: boolean) {
  if (!enabled) {
    return "muted";
  }

  if (available <= 5) {
    return "warning";
  }

  return "success";
}

function getInventoryLabel(available: number, enabled: boolean) {
  if (!enabled) {
    return "已停用";
  }

  if (available === 0) {
    return "已售罄";
  }

  if (available <= 5) {
    return "库存告警";
  }

  return "库存正常";
}

function getCardItemStatusTone(status: CardItemStatus) {
  switch (status) {
    case CardItemStatus.SOLD:
      return "success";
    case CardItemStatus.RESERVED:
      return "warning";
    case CardItemStatus.AVAILABLE:
    default:
      return "muted";
  }
}

function getCardItemStatusLabel(status: CardItemStatus) {
  switch (status) {
    case CardItemStatus.SOLD:
      return "已售出";
    case CardItemStatus.RESERVED:
      return "已占用";
    case CardItemStatus.AVAILABLE:
    default:
      return "可售";
  }
}

function getPaymentProfileTone(profile: PaymentProfileSnapshot | null) {
  if (!profile) {
    return "muted";
  }

  return profile.isActive ? "success" : "warning";
}

function getPaymentProfileLabel(profile: PaymentProfileSnapshot | null) {
  if (!profile) {
    return "未配置";
  }

  return profile.isActive ? "启用中" : "已停用";
}

function getPaymentChannelCopy(profile: PaymentProfileSnapshot | null) {
  return profile ? formatPaymentChannelCodes(profile.enabledChannelCodes) : "未配置";
}

function getPaymentProfileRevisionTone(changeType: PaymentProfileRevisionSummary["changeType"]) {
  switch (changeType) {
    case "ROLLBACK":
      return "warning";
    case "CREATE":
      return "success";
    case "UPDATE":
    default:
      return "muted";
  }
}

function getPaymentProfileRevisionLabel(changeType: PaymentProfileRevisionSummary["changeType"]) {
  switch (changeType) {
    case "ROLLBACK":
      return "已回滚";
    case "CREATE":
      return "初始版本";
    case "UPDATE":
    default:
      return "配置更新";
  }
}

function getPaymentProfileRevisionSourceLabel(sourceScope: PaymentProfileRevisionSummary["sourceScope"]) {
  return sourceScope === "MERCHANT" ? "商户中心" : "平台后台";
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function MerchantTabInput({ tab, returnTo }: { tab: MerchantTab; returnTo?: string }) {
  return (
    <>
      <input type="hidden" name="tab" value={tab} />
      {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}
    </>
  );
}

function shouldShowSection(visibleSectionIds: readonly string[] | undefined, sectionId: string) {
  if (!visibleSectionIds || visibleSectionIds.length === 0) {
    return true;
  }

  return visibleSectionIds.includes(sectionId);
}

function MetricGrid({ cards }: { cards: ReadonlyArray<DashboardCard> }) {
  return (
    <section className="admin-stat-grid">
      {cards.map((card) => (
        <article key={card.label} className={`admin-surface admin-stat-card tone-${card.tone}`}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </section>
  );
}

function normalizeSearchValue(value?: string) {
  return value?.trim() ?? "";
}

function parseSelectFilter<TValue extends string>(
  value: string | undefined,
  allowed: readonly TValue[],
  fallback: TValue,
) {
  const normalized = normalizeSearchValue(value) as TValue;
  return allowed.includes(normalized) ? normalized : fallback;
}

function matchesSearchKeyword(values: Array<string | null | undefined>, keyword: string) {
  if (!keyword) {
    return true;
  }

  const normalizedKeyword = keyword.toLowerCase();
  return values.some((value) => String(value ?? "").toLowerCase().includes(normalizedKeyword));
}

function buildFinanceBreakdown(
  orders: MerchantDashboardData["orders"],
  products: MerchantDashboardData["products"],
) {
  const channelMap = new Map<
    string,
    {
      code: string;
      orderCount: number;
      fulfilledCount: number;
      pendingCount: number;
      failedCount: number;
      expiredCount: number;
      paidVolume: number;
    }
  >();
  const productMap = new Map<
    string,
    {
      id: string;
      name: string;
      slug: string;
      orderCount: number;
      fulfilledCount: number;
      pendingCount: number;
      failedCount: number;
      expiredCount: number;
      paidVolume: number;
    }
  >();

  for (const order of orders) {
    const channel =
      channelMap.get(order.channelCode) ??
      {
        code: order.channelCode,
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
      };

    channel.orderCount += 1;

    if (order.status === ShopOrderStatus.FULFILLED) {
      channel.fulfilledCount += 1;
      channel.paidVolume += order.amountCents;
    }

    if (order.status === ShopOrderStatus.PENDING_PAYMENT) {
      channel.pendingCount += 1;
    }

    if (order.status === ShopOrderStatus.FAILED) {
      channel.failedCount += 1;
    }

    if (order.status === ShopOrderStatus.EXPIRED) {
      channel.expiredCount += 1;
    }

    channelMap.set(order.channelCode, channel);

    const product =
      productMap.get(order.productId) ??
      {
        id: order.productId,
        name: order.product.name,
        slug: order.product.slug,
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
      };

    product.orderCount += 1;

    if (order.status === ShopOrderStatus.FULFILLED) {
      product.fulfilledCount += 1;
      product.paidVolume += order.amountCents;
    }

    if (order.status === ShopOrderStatus.PENDING_PAYMENT) {
      product.pendingCount += 1;
    }

    if (order.status === ShopOrderStatus.FAILED) {
      product.failedCount += 1;
    }

    if (order.status === ShopOrderStatus.EXPIRED) {
      product.expiredCount += 1;
    }

    productMap.set(order.productId, product);
  }

  const fulfilledOrders = orders.filter((order) => order.status === ShopOrderStatus.FULFILLED);
  const pendingOrders = orders.filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT);

  return {
    totalOrders: orders.length,
    fulfilledOrders: fulfilledOrders.length,
    pendingOrders: pendingOrders.length,
    failedOrders: orders.filter((order) => order.status === ShopOrderStatus.FAILED).length,
    expiredOrders: orders.filter((order) => order.status === ShopOrderStatus.EXPIRED).length,
    paidVolume: fulfilledOrders.reduce((sum, order) => sum + order.amountCents, 0),
    pendingVolume: pendingOrders.reduce((sum, order) => sum + order.amountCents, 0),
    averagePaidOrderValue:
      fulfilledOrders.length > 0
        ? Math.round(fulfilledOrders.reduce((sum, order) => sum + order.amountCents, 0) / fulfilledOrders.length)
        : 0,
    paidRate: orders.length > 0 ? fulfilledOrders.length / orders.length : 0,
    channelStats: Array.from(channelMap.values()).sort((left, right) => {
      if (right.paidVolume !== left.paidVolume) {
        return right.paidVolume - left.paidVolume;
      }

      return right.orderCount - left.orderCount;
    }),
    productStats: products
      .map((product) => {
        const stats =
          productMap.get(product.id) ??
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            orderCount: 0,
            fulfilledCount: 0,
            pendingCount: 0,
            failedCount: 0,
            expiredCount: 0,
            paidVolume: 0,
          };

        return stats;
      })
      .filter((product) => product.orderCount > 0)
      .sort((left, right) => {
        if (right.paidVolume !== left.paidVolume) {
          return right.paidVolume - left.paidVolume;
        }

        return right.orderCount - left.orderCount;
      }),
  };
}

function buildMerchantInsights(dashboard: MerchantDashboardData) {
  const customerMap = new Map<
    string,
    {
      email: string;
      orderCount: number;
      fulfilledCount: number;
      pendingCount: number;
      failedCount: number;
      expiredCount: number;
      paidVolume: number;
      lastOrderedAt: Date;
    }
  >();
  const channelMap = new Map<
    string,
    {
      code: string;
      orderCount: number;
      fulfilledCount: number;
      pendingCount: number;
      failedCount: number;
      expiredCount: number;
      paidVolume: number;
      lastOrderedAt: Date | null;
    }
  >();
  const productOrderMap = new Map<
    string,
    {
      orderCount: number;
      fulfilledCount: number;
      pendingCount: number;
      failedCount: number;
      expiredCount: number;
      paidVolume: number;
      lastOrderedAt: Date | null;
    }
  >();

  for (const product of dashboard.products) {
    productOrderMap.set(product.id, {
      orderCount: 0,
      fulfilledCount: 0,
      pendingCount: 0,
      failedCount: 0,
      expiredCount: 0,
      paidVolume: 0,
      lastOrderedAt: null,
    });
  }

  for (const order of dashboard.orders) {
    const customer =
      customerMap.get(order.customerEmail) ??
      {
        email: order.customerEmail,
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
        lastOrderedAt: order.createdAt,
      };

    customer.orderCount += 1;
    customer.lastOrderedAt =
      customer.lastOrderedAt > order.createdAt ? customer.lastOrderedAt : order.createdAt;

    if (order.status === ShopOrderStatus.FULFILLED) {
      customer.fulfilledCount += 1;
      customer.paidVolume += order.amountCents;
    }

    if (order.status === ShopOrderStatus.PENDING_PAYMENT) {
      customer.pendingCount += 1;
    }

    if (order.status === ShopOrderStatus.FAILED) {
      customer.failedCount += 1;
    }

    if (order.status === ShopOrderStatus.EXPIRED) {
      customer.expiredCount += 1;
    }

    customerMap.set(order.customerEmail, customer);

    const channelCode = order.channelCode || "未指定通道";
    const channel =
      channelMap.get(channelCode) ??
      {
        code: channelCode,
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
        lastOrderedAt: null,
      };

    channel.orderCount += 1;
    channel.lastOrderedAt =
      channel.lastOrderedAt && channel.lastOrderedAt > order.createdAt
        ? channel.lastOrderedAt
        : order.createdAt;

    if (order.status === ShopOrderStatus.FULFILLED) {
      channel.fulfilledCount += 1;
      channel.paidVolume += order.amountCents;
    }

    if (order.status === ShopOrderStatus.PENDING_PAYMENT) {
      channel.pendingCount += 1;
    }

    if (order.status === ShopOrderStatus.FAILED) {
      channel.failedCount += 1;
    }

    if (order.status === ShopOrderStatus.EXPIRED) {
      channel.expiredCount += 1;
    }

    channelMap.set(channelCode, channel);

    const productStats =
      productOrderMap.get(order.productId) ??
      {
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
        lastOrderedAt: null,
      };

    productStats.orderCount += 1;
    productStats.lastOrderedAt =
      productStats.lastOrderedAt && productStats.lastOrderedAt > order.createdAt
        ? productStats.lastOrderedAt
        : order.createdAt;

    if (order.status === ShopOrderStatus.FULFILLED) {
      productStats.fulfilledCount += 1;
      productStats.paidVolume += order.amountCents;
    }

    if (order.status === ShopOrderStatus.PENDING_PAYMENT) {
      productStats.pendingCount += 1;
    }

    if (order.status === ShopOrderStatus.FAILED) {
      productStats.failedCount += 1;
    }

    if (order.status === ShopOrderStatus.EXPIRED) {
      productStats.expiredCount += 1;
    }

    productOrderMap.set(order.productId, productStats);
  }

  const inventoryRows = dashboard.products
    .flatMap((product) =>
      product.skus.map((sku) => ({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productStatus: product.status,
        saleMode: product.saleMode,
        skuId: sku.id,
        skuName: sku.name,
        skuSummary: sku.summary ?? "",
        enabled: sku.enabled,
        priceCents: sku.priceCents,
        available: sku.stock.available,
        reserved: sku.stock.reserved,
        sold: sku.stock.sold,
      })),
    )
    .sort((left, right) => left.available - right.available || right.sold - left.sold);

  const productPerformance = dashboard.products
    .map((product) => {
      const orderStats = productOrderMap.get(product.id) ?? {
        orderCount: 0,
        fulfilledCount: 0,
        pendingCount: 0,
        failedCount: 0,
        expiredCount: 0,
        paidVolume: 0,
        lastOrderedAt: null,
      };

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        status: product.status,
        saleMode: product.saleMode,
        skuCount: product.skus.length,
        available: product.stock.available,
        reserved: product.stock.reserved,
        sold: product.stock.sold,
        orderCount: orderStats.orderCount,
        fulfilledCount: orderStats.fulfilledCount,
        pendingCount: orderStats.pendingCount,
        failedCount: orderStats.failedCount,
        expiredCount: orderStats.expiredCount,
        paidVolume: orderStats.paidVolume,
        lastOrderedAt: orderStats.lastOrderedAt,
      };
    })
    .sort((left, right) => {
      if (right.paidVolume !== left.paidVolume) {
        return right.paidVolume - left.paidVolume;
      }

      if (right.orderCount !== left.orderCount) {
        return right.orderCount - left.orderCount;
      }

      return left.available - right.available;
    });

  const customerStats = Array.from(customerMap.values()).sort((left, right) => {
    if (right.paidVolume !== left.paidVolume) {
      return right.paidVolume - left.paidVolume;
    }

    if (right.orderCount !== left.orderCount) {
      return right.orderCount - left.orderCount;
    }

    return right.lastOrderedAt.getTime() - left.lastOrderedAt.getTime();
  });

  const channelStats = Array.from(channelMap.values()).sort((left, right) => {
    if (right.paidVolume !== left.paidVolume) {
      return right.paidVolume - left.paidVolume;
    }

    return right.orderCount - left.orderCount;
  });

  const repeatCustomerCount = customerStats.filter((customer) => customer.orderCount > 1).length;
  const paidCustomerCount = customerStats.filter((customer) => customer.fulfilledCount > 0).length;
  const lowStockRows = inventoryRows.filter((row) => row.enabled && row.available <= 5);
  const outOfStockRows = inventoryRows.filter((row) => row.enabled && row.available === 0);
  const activeSkuCount = inventoryRows.filter((row) => row.enabled).length;
  const averagePaidOrderValue =
    dashboard.stats.fulfilledOrders > 0
      ? Math.round(dashboard.stats.paidVolume / dashboard.stats.fulfilledOrders)
      : 0;

  return {
    customerStats,
    channelStats,
    productPerformance,
    inventoryRows,
    lowStockRows,
    outOfStockRows,
    repeatCustomerCount,
    paidCustomerCount,
    activeSkuCount,
    averagePaidOrderValue,
    uniqueCustomers: customerStats.length,
    paidRate:
      dashboard.stats.totalOrders > 0
        ? dashboard.stats.fulfilledOrders / dashboard.stats.totalOrders
        : 0,
    lowStockProductCount: dashboard.products.filter((product) => product.stock.available <= 5).length,
  };
}

type MerchantInsights = ReturnType<typeof buildMerchantInsights>;

function OverviewSection({
  dashboard,
  paymentProfile,
  overviewCards,
  moduleCards,
  insights,
}: {
  dashboard: MerchantDashboardData;
  paymentProfile: PaymentProfileSnapshot | null;
  overviewCards: ReadonlyArray<DashboardCard>;
  moduleCards: ReadonlyArray<ModuleCard>;
  insights: MerchantInsights;
}) {
  const topCustomer = insights.customerStats[0] ?? null;
  const topProduct = insights.productPerformance[0] ?? null;
  const topChannel = insights.channelStats[0] ?? null;

  return (
    <>
      <section className="admin-overview-grid">
        <article className="admin-surface admin-hero-panel">
          <div>
            <span className="admin-soft-tag">Enterprise Merchant Console</span>
            <h2>商户中心现在按经营、客户、财务、收款、账号拆成 8 个业务子模块。</h2>
            <p className="muted-copy">
              这套控制台不再是单页堆表单，而是按企业后台习惯拆成经营总览、商品矩阵、库存监控、订单中心、客户洞察、财务分析、NovaPay
              收款和账号治理。
            </p>
          </div>

          <div className="admin-hero-highlight">
            <div className="admin-highlight-card">
              <span>收款状态</span>
              <strong>{paymentProfile ? paymentProfile.merchantCode : "未配置商户"}</strong>
              <p>
                {paymentProfile
                  ? `当前 ${paymentProfile.isActive ? "已启用" : "已停用"}，可用方式 ${getPaymentChannelCopy(paymentProfile)}`
                  : "先去收款模块完成 NovaPay 参数配置，商品才会绑定到你自己的商户。"}
              </p>
            </div>

            <div className="admin-highlight-card">
              <span>经营规模</span>
              <strong>
                {dashboard.stats.totalOrders} 笔订单 / {insights.uniqueCustomers} 个客户
              </strong>
              <p>
                已绑定 {dashboard.stats.productCount} 个商品、{dashboard.stats.skuCount} 个 SKU，可售库存{" "}
                {dashboard.stats.availableCards} 条。
              </p>
            </div>
          </div>
        </article>

        <div className="admin-stat-grid">
          {overviewCards.map((card) => (
            <article key={card.label} className={`admin-surface admin-stat-card tone-${card.tone}`}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Modules</p>
                <h2 className="order-title">经营模块地图</h2>
              </div>
              <span className="badge muted">8 个子路由</span>
            </div>

            <div className="admin-module-grid">
              {moduleCards.map((card) => (
                <Link key={card.tab} href={buildMerchantHref(card.tab)} className="admin-module-card">
                  <div className="admin-module-card-head">
                    <strong>{card.title}</strong>
                    <span>{MERCHANT_TAB_META[card.tab].icon}</span>
                  </div>
                  <p>{card.detail}</p>
                  <small>{card.helper}</small>
                </Link>
              ))}
            </div>
          </article>

          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Flow</p>
                <h2 className="order-title">推荐操作路径</h2>
              </div>
            </div>

            <div className="admin-step-list">
              <div className="admin-step-item">
                <span>1</span>
                <p>先进入“收款”模块维护 NovaPay 商户号、API Key、API Secret 和默认支付通道。</p>
              </div>
              <div className="admin-step-item">
                <span>2</span>
                <p>再到“商品”模块创建商品，决定它是单商品还是多 SKU，并补齐规格和价格。</p>
              </div>
              <div className="admin-step-item">
                <span>3</span>
                <p>通过“库存”模块盯住可售、占用和已售数量，及时发现低库存和售罄商品。</p>
              </div>
              <div className="admin-step-item">
                <span>4</span>
                <p>商品开始出单后，继续用“订单 / 客户 / 财务”模块看支付表现、客户复购和经营收入。</p>
              </div>
            </div>
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Risk</p>
                <h2 className="order-title">风险与提醒</h2>
              </div>
              <Link href={buildMerchantHref("inventory")} className="button-link">
                去库存中心
              </Link>
            </div>

            {!paymentProfile ? (
              <div className="admin-empty-state">
                <strong>收款参数尚未配置</strong>
                <p>当前还没有商户自己的 NovaPay 参数，先完成收款配置后再创建和上架商品。</p>
              </div>
            ) : null}

            {paymentProfile && !paymentProfile.isActive ? (
              <div className="admin-empty-state">
                <strong>收款商户已停用</strong>
                <p>当前商品仍然绑定这套商户参数，但新的上架操作会被拦截，建议先恢复启用状态。</p>
              </div>
            ) : null}

            {insights.lowStockRows.length === 0 ? (
              <div className="admin-empty-state">
                <strong>暂时没有低库存告警</strong>
                <p>当前启用中的 SKU 库存都比较健康，可以继续观察订单与成交变化。</p>
              </div>
            ) : (
              <div className="admin-step-list">
                {insights.lowStockRows.slice(0, 4).map((row, index) => (
                  <div key={row.skuId} className="admin-step-item">
                    <span>{index + 1}</span>
                    <p>
                      {row.productName} / {row.skuName} 当前仅剩 {row.available} 条可售库存，建议尽快补货或调整商品状态。
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Pulse</p>
                <h2 className="order-title">经营脉搏</h2>
              </div>
            </div>

            <div className="admin-step-list">
              <div className="admin-step-item">
                <span>客</span>
                <p>
                  {topCustomer
                    ? `当前高价值客户是 ${topCustomer.email}，累计 ${topCustomer.orderCount} 笔订单，成交 ${describeOrderAmount(topCustomer.paidVolume)}。`
                    : "还没有客户成交数据，等第一笔订单支付完成后这里会开始沉淀客户画像。"}
                </p>
              </div>
              <div className="admin-step-item">
                <span>品</span>
                <p>
                  {topProduct
                    ? `当前表现最好的商品是 ${topProduct.name}，累计 ${topProduct.orderCount} 笔订单，成交 ${describeOrderAmount(topProduct.paidVolume)}。`
                    : "还没有商品经营数据，创建商品并开始出单后，这里会显示商品贡献。"}
                </p>
              </div>
              <div className="admin-step-item">
                <span>付</span>
                <p>
                  {topChannel
                    ? `主要支付通道是 ${topChannel.code}，成交 ${describeOrderAmount(topChannel.paidVolume)}，共 ${topChannel.orderCount} 笔订单。`
                    : "还没有支付通道数据，订单发起后这里会汇总通道表现。"}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function ProductsSection({
  merchant,
  paymentProfile,
  dashboard,
  insights,
  cards,
  visibleSectionIds,
  returnTo,
}: {
  merchant: MerchantAccountSnapshot;
  paymentProfile: PaymentProfileSnapshot | null;
  dashboard: MerchantDashboardData;
  insights: MerchantInsights;
  cards: ReadonlyArray<DashboardCard>;
  visibleSectionIds?: readonly string[];
  returnTo?: string;
}) {
  const storefrontPath = buildMerchantStorefrontPath(merchant.id);
  const showCreate = shouldShowSection(visibleSectionIds, "products-create");
  const showSignals = shouldShowSection(visibleSectionIds, "products-signals");
  const showCatalog = shouldShowSection(visibleSectionIds, "products-catalog");

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showCreate ? (
            <article id="products-create" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Create</p>
                <h2 className="order-title">创建商品</h2>
              </div>
              <span className="badge muted">默认绑定到我的商户</span>
            </div>

            {!paymentProfile ? (
              <div className="admin-empty-state">
                <strong>先配置 NovaPay 参数</strong>
                <p>先到收款模块把你的商户号和密钥保存好，系统才能把你创建的商品绑定到自己的收款商户。</p>
                <Link href={buildMerchantHref("payments")} className="button-secondary">
                  去配置收款
                </Link>
              </div>
            ) : (
              <form action={createMerchantProductAction} className="inline-form">
                <MerchantTabInput tab="products" returnTo={returnTo} />

                <div className="field">
                  <label htmlFor="name">商品名</label>
                  <input id="name" name="name" placeholder="例如 夸克会员" required />
                </div>

                <div className="inline-grid">
                  <div className="field">
                    <label htmlFor="slug">别名</label>
                    <input id="slug" name="slug" placeholder="留空则自动生成" />
                  </div>
                  <div className="field">
                    <label htmlFor="saleMode">商品模式</label>
                    <select id="saleMode" name="saleMode" defaultValue={ProductSaleMode.SINGLE}>
                      <option value={ProductSaleMode.SINGLE}>单商品</option>
                      <option value={ProductSaleMode.MULTI}>多 SKU</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="status">状态</label>
                    <select id="status" name="status" defaultValue={ProductStatus.DRAFT}>
                      <option value={ProductStatus.DRAFT}>草稿</option>
                      <option value={ProductStatus.ACTIVE}>上架</option>
                      <option value={ProductStatus.ARCHIVED}>归档</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="summary">一句话说明</label>
                  <input id="summary" name="summary" placeholder="例如 秒发 / 自动售后 / 多面值" />
                </div>

                <div className="field">
                  <label htmlFor="description">详情</label>
                  <textarea id="description" name="description" placeholder="补充商品说明、发货规则、售后须知" />
                </div>

                <div className="admin-subsection">
                  <div className="admin-subsection-head">
                    <h3>默认规格</h3>
                    <p className="small-copy">单商品模式使用默认规格，多 SKU 模式从这里开始扩展</p>
                  </div>

                  <div className="inline-grid">
                    <div className="field">
                      <label htmlFor="initialSkuName">SKU 名称</label>
                      <input id="initialSkuName" name="initialSkuName" placeholder="例如 月卡" />
                    </div>
                    <div className="field">
                      <label htmlFor="initialSkuPrice">SKU 售价</label>
                      <input id="initialSkuPrice" name="initialSkuPrice" placeholder="29.90" required />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="initialSkuSummary">SKU 说明</label>
                    <input id="initialSkuSummary" name="initialSkuSummary" placeholder="例如 官方直充 / 自动秒发" />
                  </div>
                </div>

                <button type="submit" className="button">
                  保存商品
                </button>
              </form>
            )}
            </article>
          ) : null}

          {showSignals ? (
            <article id="products-signals" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Signals</p>
                <h2 className="order-title">商品经营提醒</h2>
              </div>
              <Link href={buildMerchantHref("inventory")} className="button-link">
                去库存中心
              </Link>
            </div>

            {insights.lowStockRows.length === 0 ? (
              <div className="admin-empty-state">
                <strong>暂无商品告警</strong>
                <p>你的启用 SKU 还没有出现明显的库存风险，可以先专注于商品定价和规格设计。</p>
              </div>
            ) : (
              <div className="admin-step-list">
                {insights.lowStockRows.slice(0, 4).map((row, index) => (
                  <div key={row.skuId} className="admin-step-item">
                    <span>{index + 1}</span>
                    <p>
                      {row.productName} / {row.skuName} 只剩 {row.available} 条库存，若继续上量建议尽快补充供给。
                    </p>
                  </div>
                ))}
              </div>
            )}
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showCatalog ? (
            <article id="products-catalog" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Catalog</p>
                <h2 className="order-title">我的商品矩阵</h2>
              </div>
              <Link href={storefrontPath} className="button-link">
                打开我的店铺
              </Link>
            </div>

            {dashboard.products.length === 0 ? (
              <div className="admin-empty-state">
                <strong>还没有你自己的商品</strong>
                <p>
                  {paymentProfile
                    ? "现在已经可以由你自己创建商品了。先建一个商品，后面就能继续配 SKU。"
                    : "先保存 NovaPay 参数，再创建属于你自己的商品。"}
                </p>
              </div>
            ) : (
              <div className="admin-product-list">
                {dashboard.products.map((product) => {
                  const singleModeSku = getSingleModePrimarySku(product);

                  return (
                    <article key={product.id} className="admin-product-item">
                      <div className="admin-product-head">
                        <div>
                          <h3>{product.name}</h3>
                          <p className="small-copy">
                            {buildMerchantStorefrontProductPath(merchant.id, product.slug)} · 最近更新{" "}
                            {formatDateTime(product.updatedAt)}
                          </p>
                          <p className="small-copy">{getProductSaleModeCopy(product.saleMode)}</p>
                          <p className="small-copy">
                            当前商户：{paymentProfile ? `${paymentProfile.name} / ${paymentProfile.merchantCode}` : "未配置"}
                          </p>
                        </div>

                        <div className="admin-product-actions">
                          <span className="badge muted">{getProductSaleModeLabel(product.saleMode)}</span>
                          <span className={`badge ${getProductStatusTone(product.status)}`}>
                            {getProductStatusLabel(product.status)}
                          </span>
                          <Link
                            href={buildMerchantStorefrontProductPath(merchant.id, product.slug)}
                            className="button-link"
                          >
                            查看商品
                          </Link>
                        </div>
                      </div>

                      <div className="admin-stock-strip">
                        <div>
                          <span>SKU 数量</span>
                          <strong>{product.skus.length}</strong>
                        </div>
                        <div>
                          <span>可售</span>
                          <strong>{product.stock.available}</strong>
                        </div>
                        <div>
                          <span>已售</span>
                          <strong>{product.stock.sold}</strong>
                        </div>
                      </div>

                      <form action={updateMerchantProductAction} className="inline-form">
                        <MerchantTabInput tab="products" returnTo={returnTo} />
                        <input type="hidden" name="productId" value={product.id} />
                        <input type="hidden" name="productSlug" value={product.slug} />

                        <div className="field">
                          <label>商品名</label>
                          <input name="name" defaultValue={product.name} required />
                        </div>

                        <div className="field">
                          <label>商品别名</label>
                          <input name="slug" defaultValue={product.slug} required />
                        </div>

                        <div className="field">
                          <label>一句话说明</label>
                          <input name="summary" defaultValue={product.summary ?? ""} />
                        </div>

                        <div className="field">
                          <label>详情</label>
                          <textarea name="description" defaultValue={product.description ?? ""} />
                        </div>

                        <div className="field">
                          <label>状态</label>
                          <select name="status" defaultValue={product.status}>
                            <option value={ProductStatus.DRAFT}>草稿</option>
                            <option value={ProductStatus.ACTIVE}>上架</option>
                            <option value={ProductStatus.ARCHIVED}>归档</option>
                          </select>
                        </div>

                        <div className="field">
                          <label>商品模式</label>
                          <select name="saleMode" defaultValue={product.saleMode}>
                            <option value={ProductSaleMode.SINGLE}>单商品</option>
                            <option value={ProductSaleMode.MULTI}>多 SKU</option>
                          </select>
                        </div>

                        <div className="button-row">
                          <button type="submit" className="button-secondary">
                            更新商品
                          </button>

                          <button
                            formAction={deleteMerchantProductAction}
                            formNoValidate
                            type="submit"
                            className="button-link"
                          >
                            删除商品
                          </button>
                        </div>
                      </form>

                      <div className="admin-subsection">
                        <div className="admin-subsection-head">
                          <h3>{product.saleMode === ProductSaleMode.MULTI ? "SKU 配置" : "单商品配置"}</h3>
                          <p className="small-copy">
                            {product.saleMode === ProductSaleMode.MULTI
                              ? `商品最低价：${describeOrderAmount(product.startingPriceCents)}`
                              : "单商品模式下，前台只展示当前启用的默认规格。"}
                          </p>
                        </div>

                        {product.saleMode === ProductSaleMode.MULTI ? (
                          <>
                            <div className="admin-sku-stack">
                              {product.skus.map((sku) => (
                                <form key={sku.id} action={updateMerchantSkuAction} className="admin-sku-card">
                                  <MerchantTabInput tab="products" returnTo={returnTo} />
                                  <input type="hidden" name="skuId" value={sku.id} />
                                  <input type="hidden" name="productSlug" value={product.slug} />

                                  <div className="admin-sku-head">
                                    <div>
                                      <strong>{sku.name}</strong>
                                      <p className="small-copy">
                                        可售 {sku.stock.available} / 占用 {sku.stock.reserved} / 已售 {sku.stock.sold}
                                      </p>
                                    </div>
                                    <span className={`badge ${sku.enabled ? "success" : "muted"}`}>
                                      {sku.enabled ? "启用中" : "已停用"}
                                    </span>
                                  </div>

                                  <div className="inline-grid">
                                    <div className="field">
                                      <label>SKU 名称</label>
                                      <input name="name" defaultValue={sku.name} required />
                                    </div>
                                    <div className="field">
                                      <label>SKU 售价</label>
                                      <input name="price" defaultValue={(sku.priceCents / 100).toFixed(2)} required />
                                    </div>
                                  </div>

                                  <div className="field">
                                    <label>SKU 说明</label>
                                    <input name="summary" defaultValue={sku.summary ?? ""} />
                                  </div>

                                  <label className="admin-check-row">
                                    <input type="checkbox" name="enabled" defaultChecked={sku.enabled} />
                                    <span>启用该 SKU</span>
                                  </label>

                                  <div className="button-row">
                                    <button type="submit" className="button-secondary">
                                      更新 SKU
                                    </button>

                                    <button
                                      formAction={deleteMerchantSkuAction}
                                      formNoValidate
                                      type="submit"
                                      className="button-link"
                                    >
                                      删除 SKU
                                    </button>
                                  </div>
                                </form>
                              ))}
                            </div>

                            <form action={createMerchantSkuAction} className="admin-sku-create">
                              <MerchantTabInput tab="products" returnTo={returnTo} />
                              <input type="hidden" name="productId" value={product.id} />
                              <input type="hidden" name="productSlug" value={product.slug} />

                              <div className="admin-subsection-head">
                                <h3>新增 SKU</h3>
                                <p className="small-copy">继续往这个商品下挂更多规格</p>
                              </div>

                              <div className="inline-grid">
                                <div className="field">
                                  <label>SKU 名称</label>
                                  <input name="name" placeholder="例如 年卡" required />
                                </div>
                                <div className="field">
                                  <label>SKU 售价</label>
                                  <input name="price" placeholder="99.00" required />
                                </div>
                              </div>

                              <div className="field">
                                <label>SKU 说明</label>
                                <input name="summary" placeholder="例如 官方充值 / 可叠加活动" />
                              </div>

                              <label className="admin-check-row">
                                <input type="checkbox" name="enabled" defaultChecked />
                                <span>创建后立即启用</span>
                              </label>

                              <button type="submit" className="button">
                                添加 SKU
                              </button>
                            </form>
                          </>
                        ) : singleModeSku ? (
                          <>
                            <form action={updateMerchantSkuAction} className="admin-sku-card">
                              <MerchantTabInput tab="products" returnTo={returnTo} />
                              <input type="hidden" name="skuId" value={singleModeSku.id} />
                              <input type="hidden" name="productSlug" value={product.slug} />

                              <div className="admin-sku-head">
                                <div>
                                  <strong>{singleModeSku.name}</strong>
                                  <p className="small-copy">
                                    可售 {singleModeSku.stock.available} / 占用 {singleModeSku.stock.reserved} / 已售 {singleModeSku.stock.sold}
                                  </p>
                                </div>
                                <span className={`badge ${singleModeSku.enabled ? "success" : "muted"}`}>
                                  {singleModeSku.enabled ? "启用中" : "已停用"}
                                </span>
                              </div>

                              <div className="inline-grid">
                                <div className="field">
                                  <label>默认规格名称</label>
                                  <input name="name" defaultValue={singleModeSku.name} required />
                                </div>
                                <div className="field">
                                  <label>商品售价</label>
                                  <input
                                    name="price"
                                    defaultValue={(singleModeSku.priceCents / 100).toFixed(2)}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="field">
                                <label>商品说明</label>
                                <input name="summary" defaultValue={singleModeSku.summary ?? ""} />
                              </div>

                              <label className="admin-check-row">
                                <input type="checkbox" name="enabled" defaultChecked={singleModeSku.enabled} />
                                <span>启用该商品</span>
                              </label>

                              <div className="button-row">
                                <button type="submit" className="button-secondary">
                                  更新单商品配置
                                </button>

                                {product.skus.length > 1 ? (
                                  <button
                                    formAction={deleteMerchantSkuAction}
                                    formNoValidate
                                    type="submit"
                                    className="button-link"
                                  >
                                    删除当前默认规格
                                  </button>
                                ) : null}
                              </div>
                            </form>

                            {product.skus.length > 1 ? (
                              <p className="small-copy">
                                当前商品还保留 {product.skus.length - 1} 个额外 SKU；切回多 SKU 模式后会重新出现在前台和后台列表中。
                              </p>
                            ) : null}
                          </>
                        ) : (
                          <div className="admin-empty-state">
                            <strong>缺少默认规格</strong>
                            <p>这个单商品当前没有可管理的默认规格，请先切换为多 SKU 模式补充规格。</p>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function InventorySection({
  dashboard,
  insights,
  cards,
  search,
  visibleSectionIds,
  returnTo,
}: {
  dashboard: MerchantDashboardData;
  insights: MerchantInsights;
  cards: ReadonlyArray<DashboardCard>;
  search: Record<string, string | undefined>;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const inventoryStates = ["all", "low", "out", "healthy", "disabled"] as const;
  const inventoryState = parseSelectFilter(search.inventoryState, inventoryStates, "all");
  const inventoryProduct = normalizeSearchValue(search.inventoryProduct) || "all";
  const inventoryKeyword = normalizeSearchValue(search.inventoryKeyword);
  const showImport = shouldShowSection(visibleSectionIds, "inventory-import");
  const showFilters = shouldShowSection(visibleSectionIds, "inventory-filters");
  const showStock = shouldShowSection(visibleSectionIds, "inventory-stock");
  const showLedger = shouldShowSection(visibleSectionIds, "inventory-ledger");
  const showAlerts = shouldShowSection(visibleSectionIds, "inventory-alerts");
  const filteredInventoryRows = insights.inventoryRows.filter((row) => {
    if (inventoryProduct !== "all" && row.productId !== inventoryProduct) {
      return false;
    }

    if (
      !matchesSearchKeyword(
        [row.productName, row.productSlug, row.skuName, row.skuSummary],
        inventoryKeyword,
      )
    ) {
      return false;
    }

    if (inventoryState === "low") {
      return row.enabled && row.available > 0 && row.available <= 5;
    }

    if (inventoryState === "out") {
      return row.enabled && row.available === 0;
    }

    if (inventoryState === "healthy") {
      return row.enabled && row.available > 5;
    }

    if (inventoryState === "disabled") {
      return !row.enabled;
    }

    return true;
  });
  const filteredAvailable = filteredInventoryRows.reduce((sum, row) => sum + row.available, 0);
  const filteredReserved = filteredInventoryRows.reduce((sum, row) => sum + row.reserved, 0);
  const filteredSold = filteredInventoryRows.reduce((sum, row) => sum + row.sold, 0);
  const availableProducts = dashboard.products.filter((product) => product.skus.length > 0);
  const visibleSkuIds = new Set(filteredInventoryRows.map((row) => row.skuId));
  const filteredInventoryItems = dashboard.inventoryItems.filter((item) => {
    if (!visibleSkuIds.has(item.sku.id)) {
      return false;
    }

    return matchesSearchKeyword(
      [item.product.name, item.product.slug, item.sku.name, item.batchName, item.secret],
      inventoryKeyword,
    );
  });

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showImport ? (
            <article id="inventory-import" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Import</p>
                  <h2 className="order-title">商户入库</h2>
                </div>
                <span className="badge muted">只允许导入自己的 SKU</span>
              </div>

              {availableProducts.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>还没有可入库的商品</strong>
                  <p>先去商品模块创建商品和 SKU，商户才能给自己的规格导入卡密库存。</p>
                </div>
              ) : (
                <form action={importMerchantCardsAction} className="inline-form">
                  <MerchantTabInput tab="inventory" returnTo={returnTo} />

                  <div className="field">
                    <label htmlFor="merchantInventorySkuId">选择 SKU</label>
                    <select id="merchantInventorySkuId" name="skuId" required defaultValue="">
                      <option value="" disabled>
                        先选择一个 SKU
                      </option>
                      {availableProducts.map((product) => (
                        <optgroup key={product.id} label={product.name}>
                          {product.skus.map((sku) => (
                            <option key={sku.id} value={sku.id}>
                              {sku.name} · 可售 {sku.stock.available} · {sku.enabled ? "启用中" : "已停用"}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="merchantInventoryBatchName">批次名</label>
                    <input id="merchantInventoryBatchName" name="batchName" placeholder="例如 商户自采 2026-04" />
                  </div>

                  <div className="field">
                    <label htmlFor="merchantInventoryCards">卡密内容</label>
                    <textarea
                      id="merchantInventoryCards"
                      name="rawCards"
                      placeholder={"一行一条卡密\nCARD-001\nCARD-002"}
                      required
                    />
                  </div>

                  <p className="small-copy">
                    这里的入库权限已经按商户隔离，你只能给自己名下商品的 SKU 入库，不会影响其他商户。
                  </p>

                  <button type="submit" className="button">
                    导入卡密库存
                  </button>
                </form>
              )}
            </article>
          ) : null}

          {showFilters ? (
            <article id="inventory-filters" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Filter</p>
                  <h2 className="order-title">库存筛选</h2>
                </div>
                <Link href={returnTo} className="button-link">
                  重置
                </Link>
              </div>

              <form action={returnTo} method="get" className="inline-form">
                <div className="field">
                  <label htmlFor="inventoryKeyword">关键字</label>
                  <input
                    id="inventoryKeyword"
                    name="inventoryKeyword"
                    defaultValue={inventoryKeyword}
                    placeholder="搜商品名、别名或 SKU"
                  />
                </div>

                <div className="field">
                  <label htmlFor="inventoryProduct">商品</label>
                  <select id="inventoryProduct" name="inventoryProduct" defaultValue={inventoryProduct}>
                    <option value="all">全部商品</option>
                    {dashboard.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="inventoryState">库存状态</label>
                  <select id="inventoryState" name="inventoryState" defaultValue={inventoryState}>
                    <option value="all">全部状态</option>
                    <option value="low">低库存</option>
                    <option value="out">已售罄</option>
                    <option value="healthy">库存健康</option>
                    <option value="disabled">已停用 SKU</option>
                  </select>
                </div>

                <button type="submit" className="button-secondary">
                  应用筛选
                </button>
              </form>

              <div className="admin-stock-strip">
                <div>
                  <span>筛选后可售</span>
                  <strong>{filteredAvailable}</strong>
                </div>
                <div>
                  <span>筛选后占用</span>
                  <strong>{filteredReserved}</strong>
                </div>
                <div>
                  <span>筛选后已售</span>
                  <strong>{filteredSold}</strong>
                </div>
              </div>
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showStock ? (
            <article id="inventory-stock" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">SKU Matrix</p>
                  <h2 className="order-title">SKU 库存矩阵</h2>
                </div>
                <span className="small-copy">企业后台视角下按规格监控库存和销量</span>
              </div>

              {filteredInventoryRows.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的库存记录</strong>
                  <p>可以换一个商品、关键字或库存状态再试，或者先去商品模块补充更多 SKU。</p>
                </div>
              ) : (
                <div className="table-wrap admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>商品 / SKU</th>
                        <th>模式</th>
                        <th>售价</th>
                        <th>库存状态</th>
                        <th>可售</th>
                        <th>占用</th>
                        <th>已售</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryRows.map((row) => (
                        <tr key={row.skuId}>
                          <td>
                            <strong>{row.productName}</strong>
                            <p className="small-copy">{row.skuName}</p>
                          </td>
                          <td>
                            <span className="badge muted">{getProductSaleModeLabel(row.saleMode)}</span>
                          </td>
                          <td>{describeOrderAmount(row.priceCents)}</td>
                          <td>
                            <span className={`badge ${getInventoryTone(row.available, row.enabled)}`}>
                              {getInventoryLabel(row.available, row.enabled)}
                            </span>
                          </td>
                          <td>{row.available}</td>
                          <td>{row.reserved}</td>
                          <td>{row.sold}</td>
                          <td>
                            <form action={clearMerchantSkuInventoryAction} className="admin-compact-actions">
                              <MerchantTabInput tab="inventory" returnTo={returnTo} />
                              <input type="hidden" name="skuId" value={row.skuId} />
                              <input type="hidden" name="productSlug" value={row.productSlug} />
                              <button type="submit" className="button-link">
                                清空可售
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ) : null}

          {showLedger ? (
            <article id="inventory-ledger" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Ledger</p>
                  <h2 className="order-title">库存明细台账</h2>
                </div>
                <span className="small-copy">只展示当前筛选结果下的最近库存记录</span>
              </div>

              {filteredInventoryItems.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的库存明细</strong>
                  <p>换一个筛选条件，或者先给自己的 SKU 导入更多卡密。</p>
                </div>
              ) : (
                <div className="table-wrap admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>商品 / SKU</th>
                        <th>状态</th>
                        <th>批次</th>
                        <th>最近变化</th>
                        <th>卡密 / 操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong>{item.product.name}</strong>
                            <p className="small-copy">{item.sku.name}</p>
                            <p className="small-copy">{describeOrderAmount(item.sku.priceCents)}</p>
                          </td>
                          <td>
                            <span className={`badge ${getCardItemStatusTone(item.status)}`}>
                              {getCardItemStatusLabel(item.status)}
                            </span>
                            <p className="small-copy">{item.sku.enabled ? "SKU 已启用" : "SKU 已停用"}</p>
                          </td>
                          <td>
                            <strong>{item.batchName || "未分批"}</strong>
                            <p className="small-copy">{item.product.slug}</p>
                          </td>
                          <td>
                            <strong>{formatDateTime(item.updatedAt)}</strong>
                            <p className="small-copy">创建于 {formatDateTime(item.createdAt)}</p>
                          </td>
                          <td>
                            {item.status === CardItemStatus.AVAILABLE ? (
                              <form action={updateMerchantCardItemAction} className="admin-compact-form">
                                <MerchantTabInput tab="inventory" returnTo={returnTo} />
                                <input type="hidden" name="cardItemId" value={item.id} />
                                <input type="hidden" name="productSlug" value={item.product.slug} />
                                <input
                                  name="batchName"
                                  defaultValue={item.batchName ?? ""}
                                  placeholder="批次名"
                                  className="admin-compact-input"
                                />
                                <input
                                  name="secret"
                                  defaultValue={item.secret}
                                  placeholder="卡密内容"
                                  className="admin-compact-input admin-code-input"
                                  required
                                />
                                <div className="admin-compact-actions">
                                  <button type="submit" className="button-secondary">
                                    更新
                                  </button>
                                  <button
                                    formAction={deleteMerchantCardItemAction}
                                    type="submit"
                                    className="button-link"
                                  >
                                    删除
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <div className="admin-compact-stack">
                                <strong>{maskCardSecret(item.secret)}</strong>
                                <p className="small-copy">
                                  {item.order ? `${item.order.orderNo} · ${item.order.customerEmail}` : "已进入订单链路"}
                                </p>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ) : null}

          {showAlerts ? (
            <article id="inventory-alerts" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Alerts</p>
                  <h2 className="order-title">库存告警</h2>
                </div>
                <Link href={buildMerchantHref("products")} className="button-link">
                  去商品中心
                </Link>
              </div>

              {insights.lowStockRows.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>当前没有低库存 SKU</strong>
                  <p>启用中的规格库存看起来比较平稳，暂时没有需要立刻处理的售罄风险。</p>
                </div>
              ) : (
                <div className="admin-step-list">
                  {insights.lowStockRows.slice(0, 5).map((row, index) => (
                    <div key={row.skuId} className="admin-step-item">
                      <span>{index + 1}</span>
                      <p>
                        {row.productName} / {row.skuName} 当前 {getInventoryLabel(row.available, row.enabled)}，可售
                        仅剩 {row.available} 条，已售 {row.sold} 条。
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function MerchantOrdersTableSection({
  id,
  kicker,
  title,
  helper,
  emptyTitle,
  emptyDescription,
  orders,
}: {
  id: string;
  kicker: string;
  title: string;
  helper: string;
  emptyTitle: string;
  emptyDescription: string;
  orders: MerchantOrder[];
}) {
  return (
    <article id={id} className="admin-anchor-target admin-surface">
      <div className="admin-section-head">
        <div>
          <p className="admin-section-kicker">{kicker}</p>
          <h2 className="order-title">{title}</h2>
        </div>
        <span className="small-copy">{helper}</span>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <strong>{emptyTitle}</strong>
          <p>{emptyDescription}</p>
        </div>
      ) : (
        <div className="table-wrap admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>订单</th>
                <th>客户</th>
                <th>商品 / SKU</th>
                <th>状态</th>
                <th>金额</th>
                <th>通道</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderNo}</strong>
                    <p className="small-copy">{order.novapayOrderId ?? "尚未生成网关单号"}</p>
                  </td>
                  <td>{order.customerEmail}</td>
                  <td>
                    <strong>{order.product.name}</strong>
                    <p className="small-copy">{order.sku.name}</p>
                  </td>
                  <td>
                    <span className={`badge ${getOrderStatusTone(order.status)}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                    <p className="small-copy">{order.novapayStatus ?? "未同步"}</p>
                  </td>
                  <td>{describeOrderAmount(order.amountCents)}</td>
                  <td>{order.channelCode}</td>
                  <td>{formatDateTime(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}

function OrdersSection({
  dashboard,
  insights,
  cards,
  visibleSectionIds,
}: {
  dashboard: MerchantDashboardData;
  insights: MerchantInsights;
  cards: ReadonlyArray<DashboardCard>;
  visibleSectionIds?: readonly string[];
}) {
  const pendingOrders = dashboard.orders.filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT);
  const fulfilledOrders = dashboard.orders.filter((order) => order.status === ShopOrderStatus.FULFILLED);
  const exceptionOrders = dashboard.orders.filter(
    (order) => order.status === ShopOrderStatus.FAILED || order.status === ShopOrderStatus.EXPIRED,
  );
  const showRecent = shouldShowSection(visibleSectionIds, "orders-recent");
  const showPending = shouldShowSection(visibleSectionIds, "orders-pending");
  const showFulfilled = shouldShowSection(visibleSectionIds, "orders-fulfilled");
  const showExceptions = shouldShowSection(visibleSectionIds, "orders-exceptions");
  const showStatus = shouldShowSection(visibleSectionIds, "orders-status");
  const showChannels = shouldShowSection(visibleSectionIds, "orders-channels");

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showRecent ? (
            <MerchantOrdersTableSection
              id="orders-recent"
              kicker="Orders"
              title="订单流水"
              helper="查看最近订单、客户、商品和支付状态"
              emptyTitle="还没有订单记录"
              emptyDescription="你创建商品并开始出售后，属于你商户的订单就会在这里显示。"
              orders={dashboard.orders}
            />
          ) : null}

          {showPending ? (
            <MerchantOrdersTableSection
              id="orders-pending"
              kicker="Pending"
              title="待支付订单"
              helper="聚焦等待支付完成、仍处于待收状态的订单"
              emptyTitle="没有待支付订单"
              emptyDescription="当前没有等待支付完成的订单。"
              orders={pendingOrders}
            />
          ) : null}

          {showFulfilled ? (
            <MerchantOrdersTableSection
              id="orders-fulfilled"
              kicker="Fulfilled"
              title="已完成订单"
              helper="查看已支付成功并进入成交统计的订单"
              emptyTitle="还没有已完成订单"
              emptyDescription="支付完成后，订单会在这里沉淀为成交记录。"
              orders={fulfilledOrders}
            />
          ) : null}

          {showExceptions ? (
            <MerchantOrdersTableSection
              id="orders-exceptions"
              kicker="Exceptions"
              title="异常订单"
              helper="查看失败、过期和需要关注的订单"
              emptyTitle="没有异常订单"
              emptyDescription="最近订单里没有失败或过期记录。"
              orders={exceptionOrders}
            />
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showStatus ? (
            <article id="orders-status" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Status</p>
                  <h2 className="order-title">状态结构</h2>
                </div>
              </div>

              <div className="admin-step-list">
                <div className="admin-step-item">
                  <span>待</span>
                  <p>
                    待支付订单 {dashboard.stats.pendingOrders} 笔，待收金额{" "}
                    {describeOrderAmount(dashboard.stats.pendingVolume)}。
                  </p>
                </div>
                <div className="admin-step-item">
                  <span>成</span>
                  <p>
                    已完成订单 {dashboard.stats.fulfilledOrders} 笔，累计成交{" "}
                    {describeOrderAmount(dashboard.stats.paidVolume)}。
                  </p>
                </div>
                <div className="admin-step-item">
                  <span>失</span>
                  <p>
                    失败订单 {dashboard.stats.failedOrders} 笔，过期订单 {dashboard.stats.expiredOrders} 笔。
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          {showChannels ? (
            <article id="orders-channels" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Channels</p>
                  <h2 className="order-title">通道表现</h2>
                </div>
              </div>

              {insights.channelStats.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>暂无通道数据</strong>
                  <p>订单发起后，这里会按支付通道汇总订单数量、成交额和最近交易时间。</p>
                </div>
              ) : (
                <div className="admin-sku-stack">
                  {insights.channelStats.slice(0, 5).map((channel) => (
                    <article key={channel.code} className="admin-sku-card">
                      <div className="admin-sku-head">
                        <div>
                          <strong>{channel.code}</strong>
                          <p className="small-copy">
                            {channel.orderCount} 笔订单 / {channel.fulfilledCount} 笔成交
                          </p>
                        </div>
                        <span className="badge muted">{describeOrderAmount(channel.paidVolume)}</span>
                      </div>
                      <p className="small-copy">
                        待支付 {channel.pendingCount} 笔 · 最近订单{" "}
                        {channel.lastOrderedAt ? formatDateTime(channel.lastOrderedAt) : "暂无"}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function CustomersSection({
  insights,
  cards,
  search,
  visibleSectionIds,
  returnTo,
}: {
  insights: MerchantInsights;
  cards: ReadonlyArray<DashboardCard>;
  search: Record<string, string | undefined>;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const customerSegments = ["all", "repeat", "pending", "paid"] as const;
  const customerSegment = parseSelectFilter(search.customerSegment, customerSegments, "all");
  const customerKeyword = normalizeSearchValue(search.customerKeyword);
  const showFilters = shouldShowSection(visibleSectionIds, "customers-filters");
  const showSnapshot = shouldShowSection(visibleSectionIds, "customers-snapshot");
  const showList = shouldShowSection(visibleSectionIds, "customers-list");
  const showRepeat = shouldShowSection(visibleSectionIds, "customers-repeat");
  const showConversion = shouldShowSection(visibleSectionIds, "customers-conversion");
  const filteredCustomers = insights.customerStats.filter((customer) => {
    if (!matchesSearchKeyword([customer.email], customerKeyword)) {
      return false;
    }

    if (customerSegment === "repeat") {
      return customer.orderCount > 1;
    }

    if (customerSegment === "pending") {
      return customer.pendingCount > 0;
    }

    if (customerSegment === "paid") {
      return customer.fulfilledCount > 0;
    }

    return true;
  });
  const filteredRepeatCustomers = filteredCustomers.filter((customer) => customer.orderCount > 1);
  const filteredPendingCustomers = filteredCustomers.filter((customer) => customer.pendingCount > 0);
  const filteredPaidVolume = filteredCustomers.reduce((sum, customer) => sum + customer.paidVolume, 0);
  const filteredOrders = filteredCustomers.reduce((sum, customer) => sum + customer.orderCount, 0);

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showFilters ? (
            <article id="customers-filters" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Filter</p>
                  <h2 className="order-title">客户筛选</h2>
                </div>
                <Link href={returnTo} className="button-link">
                  重置
                </Link>
              </div>

              <form action={returnTo} method="get" className="inline-form">
                <div className="field">
                  <label htmlFor="customerKeyword">客户关键字</label>
                  <input
                    id="customerKeyword"
                    name="customerKeyword"
                    defaultValue={customerKeyword}
                    placeholder="输入邮箱关键词"
                  />
                </div>

                <div className="field">
                  <label htmlFor="customerSegment">客户分层</label>
                  <select id="customerSegment" name="customerSegment" defaultValue={customerSegment}>
                    <option value="all">全部客户</option>
                    <option value="repeat">复购客户</option>
                    <option value="pending">待支付客户</option>
                    <option value="paid">已成交客户</option>
                  </select>
                </div>

                <button type="submit" className="button-secondary">
                  应用筛选
                </button>
              </form>
            </article>
          ) : null}

          {showSnapshot ? (
            <article id="customers-snapshot" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Snapshot</p>
                  <h2 className="order-title">筛选结果</h2>
                </div>
              </div>

              <div className="admin-stock-strip">
                <div>
                  <span>客户数</span>
                  <strong>{filteredCustomers.length}</strong>
                </div>
                <div>
                  <span>关联订单</span>
                  <strong>{filteredOrders}</strong>
                </div>
                <div>
                  <span>累计成交</span>
                  <strong>{describeOrderAmount(filteredPaidVolume)}</strong>
                </div>
              </div>
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showList ? (
            <article id="customers-list" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Customers</p>
                  <h2 className="order-title">客户画像</h2>
                </div>
                <Link href={buildMerchantHref("orders")} className="button-link">
                  去订单中心
                </Link>
              </div>

              {filteredCustomers.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的客户</strong>
                  <p>可以换一个分层或邮箱关键字再试，客户数据会随着订单增长持续沉淀。</p>
                </div>
              ) : (
                <div className="table-wrap admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>客户邮箱</th>
                        <th>总订单</th>
                        <th>已成交</th>
                        <th>待支付</th>
                        <th>累计金额</th>
                        <th>最近下单</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.email}>
                          <td>{customer.email}</td>
                          <td>{customer.orderCount}</td>
                          <td>{customer.fulfilledCount}</td>
                          <td>{customer.pendingCount}</td>
                          <td>{describeOrderAmount(customer.paidVolume)}</td>
                          <td>{formatDateTime(customer.lastOrderedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ) : null}

          {showRepeat ? (
            <article id="customers-repeat" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Repeat</p>
                  <h2 className="order-title">复购客户</h2>
                </div>
              </div>

              {filteredRepeatCustomers.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>暂时没有复购客户</strong>
                  <p>等客户发生第二次下单后，这里会优先展示最有价值的复购人群。</p>
                </div>
              ) : (
                <div className="admin-sku-stack">
                  {filteredRepeatCustomers.slice(0, 5).map((customer) => (
                    <article key={customer.email} className="admin-sku-card">
                      <div className="admin-sku-head">
                        <div>
                          <strong>{customer.email}</strong>
                          <p className="small-copy">
                            {customer.orderCount} 笔订单 / {customer.fulfilledCount} 笔成交
                          </p>
                        </div>
                        <span className="badge success">{describeOrderAmount(customer.paidVolume)}</span>
                      </div>
                      <p className="small-copy">最近成交时间：{formatDateTime(customer.lastOrderedAt)}</p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : null}

          {showConversion ? (
            <article id="customers-conversion" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Conversion</p>
                  <h2 className="order-title">待转化客户</h2>
                </div>
              </div>

              {filteredPendingCustomers.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>当前没有待支付客户</strong>
                  <p>当存在未完成支付的订单时，这里会帮你快速定位还在等待支付的客户。</p>
                </div>
              ) : (
                <div className="admin-sku-stack">
                  {filteredPendingCustomers.slice(0, 5).map((customer) => (
                    <article key={customer.email} className="admin-sku-card">
                      <div className="admin-sku-head">
                        <div>
                          <strong>{customer.email}</strong>
                          <p className="small-copy">
                            待支付 {customer.pendingCount} 笔 / 总订单 {customer.orderCount} 笔
                          </p>
                        </div>
                        <span className="badge warning">待转化</span>
                      </div>
                      <p className="small-copy">最近下单时间：{formatDateTime(customer.lastOrderedAt)}</p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function FinanceSection({
  dashboard,
  cards,
  search,
  visibleSectionIds,
  returnTo,
}: {
  dashboard: MerchantDashboardData;
  cards: ReadonlyArray<DashboardCard>;
  search: Record<string, string | undefined>;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const financeStatuses = ["all", "fulfilled", "pending", "failed", "expired"] as const;
  const financeStatus = parseSelectFilter(search.financeStatus, financeStatuses, "all");
  const financeChannel = normalizeSearchValue(search.financeChannel) || "all";
  const financeProduct = normalizeSearchValue(search.financeProduct) || "all";
  const showFilters = shouldShowSection(visibleSectionIds, "finance-filters");
  const showSummary = shouldShowSection(visibleSectionIds, "finance-summary");
  const showChannels = shouldShowSection(visibleSectionIds, "finance-channels");
  const showProducts = shouldShowSection(visibleSectionIds, "finance-products");
  const filteredOrders = dashboard.orders.filter((order) => {
    if (financeChannel !== "all" && order.channelCode !== financeChannel) {
      return false;
    }

    if (financeProduct !== "all" && order.productId !== financeProduct) {
      return false;
    }

    if (financeStatus === "fulfilled") {
      return order.status === ShopOrderStatus.FULFILLED;
    }

    if (financeStatus === "pending") {
      return order.status === ShopOrderStatus.PENDING_PAYMENT;
    }

    if (financeStatus === "failed") {
      return order.status === ShopOrderStatus.FAILED;
    }

    if (financeStatus === "expired") {
      return order.status === ShopOrderStatus.EXPIRED;
    }

    return true;
  });
  const financeView = buildFinanceBreakdown(filteredOrders, dashboard.products);
  const distinctChannels = Array.from(new Set(dashboard.orders.map((order) => order.channelCode))).sort();

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showFilters ? (
            <article id="finance-filters" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Filter</p>
                  <h2 className="order-title">财务筛选</h2>
                </div>
                <Link href={returnTo} className="button-link">
                  重置
                </Link>
              </div>

              <form action={returnTo} method="get" className="inline-form">
                <div className="field">
                  <label htmlFor="financeChannel">支付通道</label>
                  <select id="financeChannel" name="financeChannel" defaultValue={financeChannel}>
                    <option value="all">全部通道</option>
                    {distinctChannels.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="financeProduct">商品</label>
                  <select id="financeProduct" name="financeProduct" defaultValue={financeProduct}>
                    <option value="all">全部商品</option>
                    {dashboard.products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="financeStatus">订单状态</label>
                  <select id="financeStatus" name="financeStatus" defaultValue={financeStatus}>
                    <option value="all">全部状态</option>
                    <option value="fulfilled">已成交</option>
                    <option value="pending">待支付</option>
                    <option value="failed">失败</option>
                    <option value="expired">过期</option>
                  </select>
                </div>

                <button type="submit" className="button-secondary">
                  应用筛选
                </button>
              </form>
            </article>
          ) : null}

          {showSummary ? (
            <article id="finance-summary" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Summary</p>
                  <h2 className="order-title">筛选结果</h2>
                </div>
              </div>

              <div className="admin-step-list">
                <div className="admin-step-item">
                  <span>收</span>
                  <p>
                    筛选后累计成交 {describeOrderAmount(financeView.paidVolume)}，涉及 {financeView.fulfilledOrders} 笔已成交订单。
                  </p>
                </div>
                <div className="admin-step-item">
                  <span>待</span>
                  <p>
                    当前仍有 {financeView.pendingOrders} 笔待支付订单，金额 {describeOrderAmount(financeView.pendingVolume)}。
                  </p>
                </div>
                <div className="admin-step-item">
                  <span>均</span>
                  <p>
                    筛选后支付成功率 {formatPercent(financeView.paidRate)}，平均客单价{" "}
                    {describeOrderAmount(financeView.averagePaidOrderValue)}。
                  </p>
                </div>
              </div>
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showChannels ? (
            <article id="finance-channels" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Channels</p>
                  <h2 className="order-title">支付通道收入</h2>
                </div>
              </div>

              {financeView.channelStats.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的财务数据</strong>
                  <p>可以切换筛选条件，或者等订单继续累积后再查看通道收入分布。</p>
                </div>
              ) : (
                <div className="table-wrap admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>通道</th>
                        <th>订单</th>
                        <th>已成交</th>
                        <th>待支付</th>
                        <th>失败 / 过期</th>
                        <th>成交金额</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financeView.channelStats.map((channel) => (
                        <tr key={channel.code}>
                          <td>{channel.code}</td>
                          <td>{channel.orderCount}</td>
                          <td>{channel.fulfilledCount}</td>
                          <td>{channel.pendingCount}</td>
                          <td>
                            {channel.failedCount} / {channel.expiredCount}
                          </td>
                          <td>{describeOrderAmount(channel.paidVolume)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ) : null}

          {showProducts ? (
            <article id="finance-products" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Products</p>
                  <h2 className="order-title">商品收入排行</h2>
                </div>
              </div>

              {financeView.productStats.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>暂无商品财务表现</strong>
                  <p>先完成商品创建和订单成交，这里会自动形成商品贡献排行。</p>
                </div>
              ) : (
                <div className="admin-sku-stack">
                  {financeView.productStats.slice(0, 5).map((product) => (
                    <article key={product.id} className="admin-sku-card">
                      <div className="admin-sku-head">
                        <div>
                          <strong>{product.name}</strong>
                          <p className="small-copy">
                            {product.orderCount} 笔订单 / {product.fulfilledCount} 笔成交
                          </p>
                        </div>
                        <span className="badge success">{describeOrderAmount(product.paidVolume)}</span>
                      </div>
                      <p className="small-copy">
                        待支付 {product.pendingCount} 笔 / 失败 {product.failedCount} 笔 / 过期 {product.expiredCount} 笔
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function PaymentsSection({
  merchant,
  env,
  paymentProfile,
  paymentProfileRevisions,
  dashboard,
  cards,
  paymentOperations,
  visibleSectionIds,
  returnTo,
}: {
  merchant: MerchantAccountSnapshot;
  env: ReturnType<typeof getEnv>;
  paymentProfile: PaymentProfileSnapshot | null;
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  dashboard: MerchantDashboardData;
  cards: ReadonlyArray<DashboardCard>;
  paymentOperations: PaymentOperationsData | null;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const showProfile = shouldShowSection(visibleSectionIds, "payments-profile");
  const showRouting = shouldShowSection(visibleSectionIds, "payments-routing");
  const showVersions = shouldShowSection(visibleSectionIds, "payments-versions");
  const showRules = shouldShowSection(visibleSectionIds, "payments-rules");

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showProfile ? (
            <article id="payments-profile" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">NovaPay</p>
                  <h2 className="order-title">{paymentProfile ? "更新商户参数" : "配置商户参数"}</h2>
                </div>
                <span className={`badge ${getPaymentProfileTone(paymentProfile)}`}>
                  {getPaymentProfileLabel(paymentProfile)}
                </span>
              </div>

              <form action={saveMerchantPaymentProfileAction} className="inline-form">
                <MerchantTabInput tab="payments" returnTo={returnTo} />

                <div className="field">
                  <label htmlFor="merchantProfileName">展示名称</label>
                  <input
                    id="merchantProfileName"
                    name="name"
                    defaultValue={paymentProfile?.name ?? merchant.name}
                    placeholder="例如 A 站收款商户"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="merchantCode">商户号</label>
                  <input
                    id="merchantCode"
                    name="merchantCode"
                    defaultValue={paymentProfile?.merchantCode ?? ""}
                    placeholder="mch_xxx"
                    required
                  />
                </div>

                <PaymentChannelConfigFields
                  fieldPrefix="merchantPaymentProfile"
                  defaultChannelCode={paymentProfile?.defaultChannelCode ?? env.defaultChannelCode}
                  enabledChannelCodes={paymentProfile?.enabledChannelCodes ?? [env.defaultChannelCode]}
                />

                <div className="field">
                  <label htmlFor="apiKey">API Key</label>
                  <input
                    id="apiKey"
                    name="apiKey"
                    defaultValue={paymentProfile?.apiKey ?? ""}
                    placeholder="npk_xxx"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="apiSecret">API Secret</label>
                  <input
                    id="apiSecret"
                    name="apiSecret"
                    defaultValue={paymentProfile?.apiSecret ?? ""}
                    placeholder="nps_xxx"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="notifySecret">回调验签密钥</label>
                  <input
                    id="notifySecret"
                    name="notifySecret"
                    defaultValue={paymentProfile?.notifySecret ?? ""}
                    placeholder="可留空；留空时将不校验回调签名"
                  />
                </div>

                <label className="admin-check-row">
                  <input type="checkbox" name="isActive" defaultChecked={paymentProfile?.isActive ?? true} />
                  <span>启用这套商户参数</span>
                </label>

                <p className="small-copy">
                  商户中心只维护你自己的 NovaPay 参数，不会覆盖其他商户。你创建的商品会默认绑定到这套收款商户。
                </p>

                <div className="button-row">
                  <button type="submit" className="button">
                    保存商户参数
                  </button>

                  {paymentProfile ? (
                    <button
                      formAction={deleteMerchantPaymentProfileAction}
                      formNoValidate
                      type="submit"
                      className="button-link"
                    >
                      删除支付商户
                    </button>
                  ) : null}
                </div>
              </form>
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showRouting ? (
            <article id="payments-routing" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Routing</p>
                  <h2 className="order-title">当前收款路由</h2>
                </div>
              </div>

              <div className="admin-step-list">
                <div className="admin-step-item">
                  <span>商</span>
                  <p>当前商户号：{paymentProfile ? paymentProfile.merchantCode : "未配置"}。</p>
                </div>
                <div className="admin-step-item">
                  <span>通</span>
                  <p>默认支付通道：{paymentProfile?.defaultChannelCode ?? env.defaultChannelCode}。</p>
                </div>
                <div className="admin-step-item">
                  <span>选</span>
                  <p>购买页启用方式：{getPaymentChannelCopy(paymentProfile)}。</p>
                </div>
                <div className="admin-step-item">
                  <span>绑</span>
                  <p>当前已有 {dashboard.stats.productCount} 个商品会归属到你这套收款商户参数。</p>
                </div>
                <div className="admin-step-item">
                  <span>更</span>
                  <p>
                    最近更新时间：{paymentProfile ? formatDateTime(paymentProfile.updatedAt) : "尚未保存过参数"}。
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          {showVersions ? (
            <article id="payments-versions" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Versions</p>
                  <h2 className="order-title">配置版本历史</h2>
                </div>
                <span className="badge muted">{paymentProfileRevisions.length} 条</span>
              </div>

              {!paymentProfile ? (
                <div className="admin-empty-state">
                  <strong>还没有可回滚的版本</strong>
                  <p>先保存一套 NovaPay 参数，后续每次更新或回滚都会自动生成新的配置版本。</p>
                </div>
              ) : paymentProfileRevisions.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>当前没有历史版本</strong>
                  <p>这套商户参数已经可以正常使用，但还没有形成可回滚的版本快照。</p>
                </div>
              ) : (
                <div className="admin-merchant-profile-version-list">
                  {paymentProfileRevisions.slice(0, 5).map((revision) => (
                    <article key={revision.id} className="admin-merchant-profile-version-card">
                      <div className="admin-merchant-profile-version-head">
                        <div>
                          <div className="admin-inline-tags">
                            <span className={`badge ${getPaymentProfileRevisionTone(revision.changeType)}`}>
                              {getPaymentProfileRevisionLabel(revision.changeType)}
                            </span>
                            <span className="badge muted">v{revision.version}</span>
                            <span className="badge muted">{formatDateTime(revision.createdAt)}</span>
                          </div>
                          <strong>{revision.summary}</strong>
                          <p className="small-copy">
                            {revision.actorLabel} · {getPaymentProfileRevisionSourceLabel(revision.sourceScope)}
                          </p>
                        </div>

                        <form
                          action={rollbackMerchantPaymentProfileRevisionAction}
                          className="admin-merchant-profile-version-action-form"
                        >
                          <MerchantTabInput tab="payments" returnTo={returnTo} />
                          <input type="hidden" name="revisionId" value={revision.id} />
                          <div className="field admin-merchant-profile-version-field">
                            <label htmlFor={`merchant-rollback-confirm-${revision.id}`}>确认词</label>
                            <input
                              id={`merchant-rollback-confirm-${revision.id}`}
                              name="rollbackConfirmation"
                              placeholder={`输入 v${revision.version}`}
                              required
                            />
                          </div>
                          <div className="field admin-merchant-profile-version-field">
                            <label htmlFor={`merchant-rollback-reason-${revision.id}`}>回滚原因</label>
                            <input
                              id={`merchant-rollback-reason-${revision.id}`}
                              name="rollbackReason"
                              placeholder="例如：商户号切换后支付异常，先恢复上一版"
                            />
                          </div>
                          <button type="submit" className="button-link">
                            回滚到此版本
                          </button>
                        </form>
                      </div>

                      <div className="admin-inline-tags admin-merchant-profile-version-tags">
                        {revision.diffHighlights.map((item) => (
                          <span key={`${revision.id}-${item}`} className="badge muted">
                            {item}
                          </span>
                        ))}
                      </div>

                      <p className="small-copy admin-merchant-profile-version-tip">
                        为避免误操作，回滚前请输入确认词 <strong>v{revision.version}</strong>。
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          ) : null}

          {showRules ? (
            <article id="payments-rules" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Rules</p>
                  <h2 className="order-title">多商户隔离规则</h2>
                </div>
              </div>

              <div className="admin-step-list">
                <div className="admin-step-item">
                  <span>独</span>
                  <p>每个商户只能维护自己的 NovaPay 参数，彼此之间不会共用密钥和商户号。</p>
                </div>
                <div className="admin-step-item">
                  <span>默</span>
                  <p>你在商品中心新建的商品，会默认绑定到自己这套收款参数，不再直接走平台默认商户。</p>
                </div>
                <div className="admin-step-item">
                  <span>停</span>
                  <p>如果你的收款商户被停用，系统会阻止新的商品直接上架，避免订单发起后无法支付。</p>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      {paymentOperations ? (
        <PaymentOperationsView
          scope="merchant"
          data={paymentOperations}
          basePath={returnTo}
          visibleSectionIds={visibleSectionIds}
        />
      ) : null}
    </>
  );
}

function SettingsSection({
  merchant,
  paymentProfile,
  moduleCards,
  cards,
  visibleSectionIds,
  returnTo,
}: {
  merchant: MerchantAccountSnapshot;
  paymentProfile: PaymentProfileSnapshot | null;
  moduleCards: ReadonlyArray<ModuleCard>;
  cards: ReadonlyArray<DashboardCard>;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const showProfile = shouldShowSection(visibleSectionIds, "settings-profile");
  const showSecurity = shouldShowSection(visibleSectionIds, "settings-security");
  const showStorefront = shouldShowSection(visibleSectionIds, "settings-storefront");
  const showGovernance = shouldShowSection(visibleSectionIds, "settings-governance");
  const showShortcuts = shouldShowSection(visibleSectionIds, "settings-shortcuts");
  const showDanger = shouldShowSection(visibleSectionIds, "settings-danger");

  return (
    <>
      <MetricGrid cards={cards} />

      <section className="admin-content-grid">
        <div className="admin-column-stack">
          {showProfile ? (
            <article id="settings-profile" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Account</p>
                  <h2 className="order-title">账号资料</h2>
                </div>
                <span className="badge muted">商户自助账号</span>
              </div>

              <form action={updateMerchantProfileAction} className="inline-form">
                <MerchantTabInput tab="settings" returnTo={returnTo} />

                <div className="inline-grid">
                  <div className="field">
                    <label htmlFor="merchantSettingsName">商户名称</label>
                    <input id="merchantSettingsName" name="name" defaultValue={merchant.name} required />
                  </div>
                  <div className="field">
                    <label htmlFor="merchantSettingsEmail">登录邮箱</label>
                    <input
                      id="merchantSettingsEmail"
                      name="email"
                      type="email"
                      defaultValue={merchant.email}
                      required
                    />
                  </div>
                </div>

                <div className="admin-stock-strip">
                  <div>
                    <span>注册时间</span>
                    <strong>{formatDateTime(merchant.createdAt)}</strong>
                  </div>
                  <div>
                    <span>最近更新</span>
                    <strong>{formatDateTime(merchant.updatedAt)}</strong>
                  </div>
                  <div>
                    <span>收款配置</span>
                    <strong>{paymentProfile ? paymentProfile.name : "未配置"}</strong>
                  </div>
                </div>

                <p className="small-copy">
                  修改邮箱后会自动刷新当前登录态。收款配置不会在这里被覆盖，仍然由“收款中心”独立维护。
                </p>

                <button type="submit" className="button-secondary">
                  更新账号资料
                </button>
              </form>
            </article>
          ) : null}

          {showSecurity ? (
            <article id="settings-security" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Security</p>
                  <h2 className="order-title">登录安全</h2>
                </div>
                <span className="badge warning">Password</span>
              </div>

              <form action={changeMerchantPasswordAction} className="inline-form">
                <MerchantTabInput tab="settings" returnTo={returnTo} />

                <div className="field">
                  <label htmlFor="merchantCurrentPassword">当前密码</label>
                  <input
                    id="merchantCurrentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="输入当前登录密码"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="merchantNewPassword">新密码</label>
                  <input
                    id="merchantNewPassword"
                    name="newPassword"
                    type="password"
                    placeholder="至少 6 位"
                    required
                  />
                </div>

                <p className="small-copy">
                  这里修改的是商户中心登录密码，不会影响 NovaPay 的 API Key、API Secret 或回调密钥。
                </p>

                <button type="submit" className="button-secondary">
                  更新登录密码
                </button>
              </form>
            </article>
          ) : null}
        </div>

        <div className="admin-column-stack">
          {showStorefront ? (
            <article id="settings-storefront" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Storefront</p>
                  <h2 className="order-title">店铺公告</h2>
                </div>
                <span className={`badge ${merchant.storeAnnouncementEnabled ? "success" : "muted"}`}>
                  {merchant.storeAnnouncementEnabled ? "展示中" : "未启用"}
                </span>
              </div>

              <form action={updateMerchantStorefrontAnnouncementAction} className="inline-form">
                <MerchantTabInput tab="settings" returnTo={returnTo} />

                <div className="field">
                  <label htmlFor="merchantAnnouncementTitle">公告标题</label>
                  <input
                    id="merchantAnnouncementTitle"
                    name="title"
                    defaultValue={merchant.storeAnnouncementTitle ?? ""}
                    placeholder="例如 发货时间、补货通知、售后规则"
                  />
                </div>

                <div className="field">
                  <label htmlFor="merchantAnnouncementBody">公告正文</label>
                  <textarea
                    id="merchantAnnouncementBody"
                    name="body"
                    defaultValue={merchant.storeAnnouncementBody ?? ""}
                    placeholder={"支持多行输入，例如：\n1. 本店商品付款后自动发货\n2. 大额订单请先联系客服确认库存"}
                    rows={5}
                  />
                </div>

                <label className="admin-check-row">
                  <input type="checkbox" name="enabled" defaultChecked={merchant.storeAnnouncementEnabled} />
                  <span>在我的店铺首页和商品详情页展示公告</span>
                </label>

                <div className="button-row">
                  <button type="submit" className="button-secondary">
                    保存店铺公告
                  </button>
                  <Link href={buildMerchantStorefrontPath(merchant.id)} className="button-link">
                    查看我的店铺
                  </Link>
                </div>

                <p className="small-copy">
                  公告适合放库存提醒、发货说明、活动通知或售后约定。关闭展示时会保留内容，方便后续再次开启。
                </p>
              </form>
            </article>
          ) : null}

          {showGovernance ? (
            <article id="settings-governance" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Governance</p>
                  <h2 className="order-title">权限边界</h2>
                </div>
              </div>

              <div className="admin-step-list">
                <div className="admin-step-item">
                  <span>品</span>
                  <p>你只能管理自己名下商品的名称、状态、商品模式和 SKU，不会影响其他商户的商品。</p>
                </div>
                <div className="admin-step-item">
                  <span>单</span>
                  <p>你只能查看归属于自己收款商户的订单，客户和财务数据也只按你的商户维度汇总。</p>
                </div>
                <div className="admin-step-item">
                  <span>付</span>
                  <p>你只能维护自己的 NovaPay 参数，商品默认绑定到自己的商户，不再直接调用平台默认商户。</p>
                </div>
                <div className="admin-step-item">
                  <span>隔</span>
                  <p>这套商户中心是多商户隔离模式，商户之间的数据、商品、订单和收款配置彼此独立。</p>
                </div>
              </div>
            </article>
          ) : null}

          {showShortcuts ? (
            <article id="settings-shortcuts" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Quick Links</p>
                  <h2 className="order-title">常用模块</h2>
                </div>
              </div>

              <div className="admin-module-grid">
                {moduleCards
                  .filter((card) => card.tab !== "overview")
                  .slice(0, 6)
                  .map((card) => (
                    <Link key={card.tab} href={buildMerchantHref(card.tab)} className="admin-module-card">
                      <div className="admin-module-card-head">
                        <strong>{card.title}</strong>
                        <span>{MERCHANT_TAB_META[card.tab].icon}</span>
                      </div>
                      <p>{card.detail}</p>
                      <small>{card.helper}</small>
                    </Link>
                  ))}
              </div>
            </article>
          ) : null}

          {showDanger ? (
            <article id="settings-danger" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Danger Zone</p>
                  <h2 className="order-title">注销账号</h2>
                </div>
                <span className="badge warning">谨慎操作</span>
              </div>

              <form action={deleteMerchantSelfAccountAction} className="inline-form">
                <MerchantTabInput tab="settings" returnTo={returnTo} />

                <div className="field">
                  <label htmlFor="merchantDeleteConfirmation">确认词</label>
                  <input
                    id="merchantDeleteConfirmation"
                    name="deleteConfirmation"
                    placeholder={`输入 ${merchant.email}`}
                    required
                  />
                </div>

                <div className="admin-step-list">
                  <div className="admin-step-item">
                    <span>限</span>
                    <p>只有当前账号未绑定支付商户、商品和订单链路时，才允许直接注销。</p>
                  </div>
                  <div className="admin-step-item">
                    <span>退</span>
                    <p>注销成功后会立即退出当前会话，并跳转到商户注册页。</p>
                  </div>
                </div>

                <button type="submit" className="button-link">
                  注销当前商户账号
                </button>
              </form>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}

function MerchantSidebarGroupNav({
  title,
  tabs,
  currentTab,
  currentView,
  currentSections,
}: {
  title: string;
  tabs: readonly MerchantTab[];
  currentTab: MerchantTab;
  currentView: MerchantTabView;
  currentSections: ReturnType<typeof getMerchantPageSections>;
}) {
  const currentTabViews = getMerchantTabViews(currentTab);

  return (
    <div className="admin-sidebar-group">
      <p className="admin-sidebar-title">{title}</p>
      <div className="admin-sidebar-branch-list">
        {tabs.map((tab) => (
          <div key={tab} className={`admin-sidebar-branch${currentTab === tab ? " active" : ""}`}>
            <Link
              href={buildMerchantHref(tab)}
              className={`admin-sidebar-link${currentTab === tab ? " active" : ""}`}
            >
              <span className="admin-sidebar-icon">{MERCHANT_TAB_META[tab].icon}</span>
              <span className="admin-sidebar-link-copy">
                <strong>{MERCHANT_TAB_META[tab].label}</strong>
                <small>{MERCHANT_TAB_META[tab].title}</small>
              </span>
              {currentTab === tab && currentSections.length > 0 ? (
                <span className="admin-sidebar-link-badge">{currentSections.length}</span>
              ) : null}
            </Link>

            {currentTab === tab ? (
              <>
                {currentTabViews.length > 1 ? (
                  <nav className="admin-sidebar-subview-nav">
                    {currentTabViews.map((view) => (
                      <Link
                        key={view.key}
                        href={view.href}
                        className={`admin-sidebar-subview-link${currentView.key === view.key ? " active" : ""}`}
                      >
                        <strong>{view.label}</strong>
                        <small>{view.description}</small>
                      </Link>
                    ))}
                  </nav>
                ) : null}

                {currentSections.length > 0 ? (
                  <nav className="admin-sidebar-section-nav admin-sidebar-section-nav-nested">
                    {currentSections.map((section, index) => (
                      <a key={section.id} href={`#${section.id}`} className="admin-sidebar-section-link nested">
                        <span className="admin-sidebar-section-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="admin-sidebar-section-copy">
                          <strong>{section.label}</strong>
                          <small>{section.description}</small>
                        </span>
                      </a>
                    ))}
                  </nav>
                ) : null}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MerchantConsoleView({
  currentTab,
  currentView,
  search,
  env,
  merchant,
  paymentProfile,
  paymentProfileRevisions,
  dashboard,
  paymentOperations,
}: {
  currentTab: MerchantTab;
  currentView: MerchantTabView;
  search: Record<string, string | undefined>;
  env: ReturnType<typeof getEnv>;
  merchant: MerchantAccountSnapshot;
  paymentProfile: PaymentProfileSnapshot | null;
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  dashboard: MerchantDashboardData;
  paymentOperations: PaymentOperationsData | null;
}) {
  const tabMeta = MERCHANT_TAB_META[currentTab];
  const currentSections = getMerchantPageSections(currentTab).filter((section) =>
    currentView.sectionIds.includes(section.id),
  );
  const currentTabViews = getMerchantTabViews(currentTab);
  const insights = buildMerchantInsights(dashboard);

  const moduleCards: ModuleCard[] = [
    {
      tab: "overview",
      title: "经营总览",
      detail: `${dashboard.stats.productCount} 个商品 / ${dashboard.stats.totalOrders} 笔订单`,
      helper: "看全局经营脉搏、风险提醒和模块入口。",
    },
    {
      tab: "products",
      title: "商品中心",
      detail: `${dashboard.stats.productCount} 个商品 / ${dashboard.stats.skuCount} 个 SKU`,
      helper: "创建商品、切换单商品或多 SKU、继续扩展规格。",
    },
    {
      tab: "inventory",
      title: "库存中心",
      detail: `${dashboard.stats.availableCards} 条可售 / ${insights.lowStockRows.length} 条告警`,
      helper: "查看商品与 SKU 的库存健康度。",
    },
    {
      tab: "orders",
      title: "订单中心",
      detail: `${dashboard.stats.totalOrders} 笔订单 / ${dashboard.stats.pendingOrders} 笔待支付`,
      helper: "核对订单状态、支付结果和通道表现。",
    },
    {
      tab: "customers",
      title: "客户中心",
      detail: `${insights.uniqueCustomers} 个客户 / ${insights.repeatCustomerCount} 个复购`,
      helper: "看客户价值、复购和待转化人群。",
    },
    {
      tab: "finance",
      title: "财务中心",
      detail: `${describeOrderAmount(dashboard.stats.paidVolume)} 成交 / ${describeOrderAmount(dashboard.stats.pendingVolume)} 待收`,
      helper: "按商品和通道看收入与经营结构。",
    },
    {
      tab: "payments",
      title: "收款中心",
      detail: paymentProfile
        ? `${paymentProfile.merchantCode} / ${paymentProfile.isActive ? "启用中" : "已停用"}`
        : "尚未配置收款参数",
      helper: "维护 NovaPay 商户号、密钥和默认支付通道。",
    },
    {
      tab: "settings",
      title: "账号治理",
      detail: `${merchant.name} / 多商户隔离模式`,
      helper: "查看账号资料、权限边界和控制台治理信息。",
    },
  ];

  const overviewCards: DashboardCard[] = [
    {
      label: "商品矩阵",
      value: `${dashboard.stats.productCount} / ${dashboard.stats.skuCount}`,
      detail: `${dashboard.stats.activeCount} 个商品当前上架，适合企业商户持续扩品。`,
      tone: "rose",
    },
    {
      label: "库存健康",
      value: dashboard.stats.availableCards,
      detail: `占用 ${dashboard.stats.reservedCards} / 已售 ${dashboard.stats.soldCards} / 告警 ${insights.lowStockRows.length}`,
      tone: "blue",
    },
    {
      label: "客户规模",
      value: insights.uniqueCustomers,
      detail: `${insights.repeatCustomerCount} 个复购客户 / ${insights.paidCustomerCount} 个已成交客户`,
      tone: "violet",
    },
    {
      label: "成交表现",
      value: describeOrderAmount(dashboard.stats.paidVolume),
      detail: `${dashboard.stats.fulfilledOrders} 笔成交 / 成功率 ${formatPercent(insights.paidRate)}`,
      tone: "gold",
    },
  ];

  const productCards: DashboardCard[] = [
    {
      label: "商品数",
      value: dashboard.stats.productCount,
      detail: `${dashboard.stats.activeCount} 个商品已上架，支持单商品和多 SKU 两种模式。`,
      tone: "rose",
    },
    {
      label: "SKU 数",
      value: dashboard.stats.skuCount,
      detail: `${insights.activeSkuCount} 个 SKU 当前启用，可作为企业商品矩阵继续扩展。`,
      tone: "violet",
    },
    {
      label: "库存告警",
      value: insights.lowStockRows.length,
      detail: `${insights.outOfStockRows.length} 个启用 SKU 已售罄，建议尽快补充供给。`,
      tone: "warning",
    },
    {
      label: "成交金额",
      value: describeOrderAmount(dashboard.stats.paidVolume),
      detail: `商品经营结果会同步反馈到订单、客户和财务模块。`,
      tone: "gold",
    },
  ];

  const inventoryCards: DashboardCard[] = [
    {
      label: "可售库存",
      value: dashboard.stats.availableCards,
      detail: `当前商户全部商品的可售库存总和。`,
      tone: "blue",
    },
    {
      label: "占用库存",
      value: dashboard.stats.reservedCards,
      detail: "这些库存已经被待支付订单锁定，还未真正成交。",
      tone: "violet",
    },
    {
      label: "已售库存",
      value: dashboard.stats.soldCards,
      detail: "已发货或已成交的库存规模，能反映商品动销速度。",
      tone: "gold",
    },
    {
      label: "低库存 SKU",
      value: insights.lowStockRows.length,
      detail: `${insights.lowStockProductCount} 个商品存在低库存风险。`,
      tone: "warning",
    },
  ];

  const orderCards: DashboardCard[] = [
    {
      label: "订单总量",
      value: dashboard.stats.totalOrders,
      detail: "这里统计归属于你商户名下的全部订单。",
      tone: "rose",
    },
    {
      label: "待支付",
      value: dashboard.stats.pendingOrders,
      detail: `待收金额 ${describeOrderAmount(dashboard.stats.pendingVolume)}。`,
      tone: "violet",
    },
    {
      label: "已完成",
      value: dashboard.stats.fulfilledOrders,
      detail: `${describeOrderAmount(dashboard.stats.paidVolume)} 已进入成交统计。`,
      tone: "blue",
    },
    {
      label: "失败 / 过期",
      value: `${dashboard.stats.failedOrders} / ${dashboard.stats.expiredOrders}`,
      detail: "可以结合客户模块和财务模块继续分析转化损失。",
      tone: "warning",
    },
  ];

  const customerCards: DashboardCard[] = [
    {
      label: "客户总数",
      value: insights.uniqueCustomers,
      detail: "按客户邮箱去重后的商户客户数。",
      tone: "rose",
    },
    {
      label: "复购客户",
      value: insights.repeatCustomerCount,
      detail: "至少购买 2 次的客户会被归类为复购。",
      tone: "violet",
    },
    {
      label: "已成交客户",
      value: insights.paidCustomerCount,
      detail: "至少完成 1 笔支付的客户数。",
      tone: "blue",
    },
    {
      label: "平均客单价",
      value: describeOrderAmount(insights.averagePaidOrderValue),
      detail: "基于已完成支付订单计算，帮助你估算客户价值。",
      tone: "gold",
    },
  ];

  const financeCards: DashboardCard[] = [
    {
      label: "累计成交",
      value: describeOrderAmount(dashboard.stats.paidVolume),
      detail: "只统计归属于你商户且已支付完成的订单。",
      tone: "gold",
    },
    {
      label: "待收金额",
      value: describeOrderAmount(dashboard.stats.pendingVolume),
      detail: `${dashboard.stats.pendingOrders} 笔订单仍处于待支付状态。`,
      tone: "violet",
    },
    {
      label: "支付成功率",
      value: formatPercent(insights.paidRate),
      detail: `总订单 ${dashboard.stats.totalOrders} 笔 / 成交 ${dashboard.stats.fulfilledOrders} 笔。`,
      tone: "blue",
    },
    {
      label: "平均客单价",
      value: describeOrderAmount(insights.averagePaidOrderValue),
      detail: "适合结合商品和客户模块一起看经营结构。",
      tone: "rose",
    },
  ];

  const paymentsCards: DashboardCard[] = [
    {
      label: "收款状态",
      value: getPaymentProfileLabel(paymentProfile),
      detail: paymentProfile ? `当前商户号 ${paymentProfile.merchantCode}` : "还没有商户自己的 NovaPay 参数。",
      tone: getPaymentProfileTone(paymentProfile),
    },
    {
      label: "默认通道",
      value: paymentProfile?.defaultChannelCode ?? env.defaultChannelCode,
      detail: "新建订单时默认使用这个支付通道。",
      tone: "blue",
    },
    {
      label: "启用方式",
      value: paymentProfile ? paymentProfile.enabledChannelCodes.length : 0,
      detail: paymentProfile ? getPaymentChannelCopy(paymentProfile) : "还没有可展示的支付方式。",
      tone: "violet",
    },
    {
      label: "绑定商品",
      value: dashboard.stats.productCount,
      detail: "这些商品默认会归属于你这套收款商户。",
      tone: "rose",
    },
    {
      label: "最近更新",
      value: paymentProfile ? formatDateTime(paymentProfile.updatedAt) : "未配置",
      detail: "保存密钥后会自动刷新这个时间。",
      tone: "violet",
    },
  ];

  const settingsCards: DashboardCard[] = [
    {
      label: "账号名",
      value: merchant.name,
      detail: "当前登录的商户账号主体。",
      tone: "rose",
    },
    {
      label: "控制台模块",
      value: MERCHANT_TABS.length,
      detail: `${MERCHANT_OPERATIONS_TABS.length} 个经营模块 + ${MERCHANT_CONFIGURATION_TABS.length} 个基础设施模块。`,
      tone: "violet",
    },
    {
      label: "数据边界",
      value: "多商户隔离",
      detail: "商品、订单、客户和收款参数都按商户维度隔离。",
      tone: "blue",
    },
    {
      label: "收款归属",
      value: paymentProfile ? "独立商户" : "待配置",
      detail: paymentProfile ? "当前商品默认绑定你自己的 NovaPay 商户。" : "完成收款配置后即可切换到独立商户模式。",
      tone: "gold",
    },
  ];

  return (
    <div className="admin-route admin-console-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">M</div>
          <div>
            <p className="admin-sidebar-kicker">Merchant</p>
            <h2>商户中心</h2>
          </div>
        </div>

        <MerchantSidebarGroupNav
          title="Operations"
          tabs={MERCHANT_OPERATIONS_TABS}
          currentTab={currentTab}
          currentView={currentView}
          currentSections={currentSections}
        />

        <MerchantSidebarGroupNav
          title="Foundation"
          tabs={MERCHANT_CONFIGURATION_TABS}
          currentTab={currentTab}
          currentView={currentView}
          currentSections={currentSections}
        />

        <div className="admin-sidebar-group">
          <p className="admin-sidebar-title">Shortcuts</p>
          <nav className="admin-sidebar-nav">
            <Link href="/" className="admin-sidebar-link">
              <span className="admin-sidebar-icon">店</span>
              前台首页
            </Link>
            <Link href="/query" className="admin-sidebar-link">
              <span className="admin-sidebar-icon">查</span>
              全站查单
            </Link>
          </nav>
        </div>

        <article className="admin-sidebar-panel">
          <p className="admin-sidebar-title">Merchant</p>
          <h3>{merchant.name}</h3>
          <p className="muted-copy">当前商户后台已经拆成企业化模块，商品、订单、客户、财务和收款各自独立成路由。</p>

          <div className="admin-sidebar-meta">
            <div>
              <span>当前模块</span>
              <strong>{tabMeta.label}</strong>
            </div>
            <div>
              <span>当前子页</span>
              <strong>{currentView.label}</strong>
            </div>
            <div>
              <span>收款状态</span>
              <strong>{getPaymentProfileLabel(paymentProfile)}</strong>
            </div>
            <div>
              <span>绑定商品</span>
              <strong>{dashboard.stats.productCount}</strong>
            </div>
            <div>
              <span>订单总量</span>
              <strong>{dashboard.stats.totalOrders}</strong>
            </div>
            <div>
              <span>低库存 SKU</span>
              <strong>{insights.lowStockRows.length}</strong>
            </div>
          </div>
        </article>
      </aside>

      <div className="admin-console-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">{tabMeta.kicker}</p>
            <h1 className="admin-heading">{tabMeta.title}</h1>
            <p className="section-copy">{tabMeta.description}</p>
            <div className="admin-topbar-context">
              <span className="badge muted">Merchant</span>
              {currentTabViews.length > 1 ? <span className="badge success">{currentView.label}</span> : null}
              {currentSections.length > 0 ? (
                <span className="small-copy">本页共 {currentSections.length} 个工作区块</span>
              ) : null}
            </div>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-user-pill">
              <span className="admin-user-avatar">{merchant.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <strong>{merchant.name}</strong>
                <p className="small-copy">{merchant.email}</p>
              </div>
            </div>

            <Link href="/" className="button-secondary">
              返回前台
            </Link>

            <form action={logoutMerchantAction}>
              <button type="submit" className="button">
                退出登录
              </button>
            </form>
          </div>
        </header>

        <nav className="admin-module-nav">
          {MERCHANT_TABS.map((tab) => (
            <Link
              key={tab}
              href={buildMerchantHref(tab)}
              className={`admin-module-link${currentTab === tab ? " active" : ""}`}
            >
              {MERCHANT_TAB_META[tab].label}
            </Link>
          ))}
        </nav>

        {search.error ? <div className="notice-card error admin-console-notice">{search.error}</div> : null}
        {search.success ? <div className="notice-card success admin-console-notice">{search.success}</div> : null}

        {currentTab === "overview" ? (
          <OverviewSection
            dashboard={dashboard}
            paymentProfile={paymentProfile}
            overviewCards={overviewCards}
            moduleCards={moduleCards}
            insights={insights}
          />
        ) : null}

        {currentTab === "products" ? (
          <ProductsSection
            merchant={merchant}
            paymentProfile={paymentProfile}
            dashboard={dashboard}
            insights={insights}
            cards={productCards}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "inventory" ? (
          <InventorySection
            dashboard={dashboard}
            insights={insights}
            cards={inventoryCards}
            search={search}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "orders" ? (
          <OrdersSection
            dashboard={dashboard}
            insights={insights}
            cards={orderCards}
            visibleSectionIds={currentView.sectionIds}
          />
        ) : null}

        {currentTab === "customers" ? (
          <CustomersSection
            insights={insights}
            cards={customerCards}
            search={search}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "finance" ? (
          <FinanceSection
            dashboard={dashboard}
            cards={financeCards}
            search={search}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "payments" ? (
          <PaymentsSection
            merchant={merchant}
            env={env}
            paymentProfile={paymentProfile}
            paymentProfileRevisions={paymentProfileRevisions}
            dashboard={dashboard}
            cards={paymentsCards}
            paymentOperations={paymentOperations}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "settings" ? (
          <SettingsSection
            merchant={merchant}
            paymentProfile={paymentProfile}
            moduleCards={moduleCards}
            cards={settingsCards}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}
      </div>
    </div>
  );
}
