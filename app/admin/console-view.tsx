import Link from "next/link";
import { CardItemStatus, ProductSaleMode, ProductStatus, ShopOrderStatus } from "@prisma/client";
import { PaymentChannelConfigFields } from "@/app/payment-channel-config-fields";
import { PaymentOperationsView } from "@/app/payment-operations-view";
import { ImageUploadField } from "@/app/image-upload-field";
import { CoverImageField } from "@/app/cover-image-field";
import { ContentBlocksField } from "@/app/content-blocks-field";
import { ConfirmSubmitButton } from "@/app/components/confirm-submit-button";
import { FormDialog } from "@/app/components/form-dialog";
import { AutoSubmitSelect } from "@/app/components/auto-submit-select";
import { CardImportFields } from "@/app/components/card-import-fields";
import { InventorySkuPicker, type InventorySkuMerchantGroup } from "@/app/components/inventory-sku-picker";
import { buildEditorInitialValue, getContentBlocksPlainText } from "@/lib/content-blocks";
import { parseStoredImageList } from "@/lib/uploads";
import { SkuPricingTierEditor } from "@/app/sku-pricing-tier-editor";
import {
  clearSkuInventoryAction,
  createCategoryAction,
  createMerchantAccountAction,
  createProductAction,
  createSkuAction,
  deleteCardItemAction,
  deleteCategoryAction,
  deleteMerchantAccountAction,
  deletePaymentProfileAction,
  deleteProductAction,
  deleteSkuAction,
  importCardsAction,
  logoutAction,
  renameCategoryAction,
  resetMerchantAccountPasswordAction,
  rollbackPaymentProfileRevisionAction,
  toggleMerchantAccountEnabledAction,
  togglePaymentProfileEnabledAction,
  togglePlatformStorefrontAnnouncementEnabledAction,
  toggleProductStatusAction,
  archiveProductAction,
  toggleSkuEnabledAction,
  updateCardItemAction,
  updateMerchantAccountAction,
  updatePlatformStorefrontAnnouncementAction,
  updateProductAction,
  updatePaymentProfileAction,
  updateSkuAction,
} from "@/app/admin/actions";
import {
  ADMIN_NAV_GROUPS,
  ADMIN_TAB_META,
  buildAdminHref,
  getAdminNavGroup,
  getAdminPageSections,
  getAdminTabViews,
  type AdminTab,
  type AdminTabView,
} from "@/app/admin/modules";
import { getEnv } from "@/lib/env";
import { type MerchantAccountWithProfileSnapshot } from "@/lib/merchant-account";
import { formatPaymentChannelCodes } from "@/lib/payment-channels";
import { type PaymentProfileRevisionSummary, type PaymentProfileSnapshot } from "@/lib/payment-profile";
import { describeSkuPricingTier, parseStoredSkuPricingTiers } from "@/lib/sku-pricing";
import {
  hasStorefrontAnnouncement,
  type StorefrontAnnouncementSnapshot,
  type StorefrontContactSnapshot,
} from "@/lib/storefront-announcement";
import {
  describeOrderAmount,
  getAdminDashboardData,
  getOrderStatusLabel,
  getOrderStatusTone,
  type PaymentOperationsData,
} from "@/lib/shop";
import {
  buildPlatformStorefrontPath,
  buildStorefrontPath,
  buildStorefrontProductPath,
} from "@/lib/storefront";
import { formatDateTime, formatFileSize, maskCardSecret } from "@/lib/utils";

type AdminDashboardData = Awaited<ReturnType<typeof getAdminDashboardData>>;
type AdminProduct = AdminDashboardData["products"][number];
type AdminOrder = AdminDashboardData["orders"][number];
type AdminCategory = AdminDashboardData["categories"][number];

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

function getSingleModePrimarySku(product: AdminProduct) {
  return product.skus.find((sku) => sku.enabled) ?? product.skus[0] ?? null;
}

function getSelectedAdminSku(product: AdminProduct, selectedSkuId?: string | null) {
  if (selectedSkuId) {
    const matchedSku = product.skus.find((sku) => sku.id === selectedSkuId);

    if (matchedSku) {
      return matchedSku;
    }
  }

  return product.skus.find((sku) => sku.enabled) ?? product.skus[0] ?? null;
}

function getSkuPricingSummary(pricingTiers: string | null | undefined) {
  const tiers = parseStoredSkuPricingTiers(pricingTiers);

  return tiers.length > 0 ? tiers.map(describeSkuPricingTier).join(" / ") : "固定售价";
}

function getPaymentProfileLabel(profile: Pick<PaymentProfileSnapshot, "name" | "merchantCode">) {
  return `${profile.name} · ${profile.merchantCode}`;
}

function getPaymentChannelCopy(profile: Pick<PaymentProfileSnapshot, "enabledChannelCodes">) {
  return formatPaymentChannelCodes(profile.enabledChannelCodes);
}

function getPaymentProfileStatusTone(profile: { isActive: boolean }) {
  return profile.isActive ? "success" : "muted";
}

function getPaymentProfileStatusLabel(profile: { isActive: boolean }) {
  return profile.isActive ? "启用中" : "已停用";
}

function getAdminProductStorefrontPath(product: AdminProduct) {
  return buildStorefrontProductPath(product.slug, product.paymentProfile?.ownerId);
}

function buildAdminProductConfigPath(productId: string) {
  return `/admin/products/${encodeURIComponent(productId)}`;
}

function buildAdminProductSkuConfigPath(productId: string, skuId: string) {
  return `${buildAdminProductConfigPath(productId)}?skuId=${encodeURIComponent(skuId)}`;
}

function getMerchantAccountStatusTone(merchant: MerchantAccountWithProfileSnapshot) {
  return merchant.isActive ? "success" : "muted";
}

function getMerchantAccountStatusLabel(merchant: MerchantAccountWithProfileSnapshot) {
  return merchant.isActive ? "启用中" : "已停用";
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

function AdminTabInput({ tab, returnTo }: { tab: AdminTab; returnTo?: string }) {
  return (
    <>
      <input type="hidden" name="tab" value={tab} />
      {returnTo ? <input type="hidden" name="returnTo" value={returnTo} /> : null}
    </>
  );
}

type AdminQuickAction = (formData: FormData) => void | Promise<void>;

function AdminQuickToggleForm({
  action,
  tab,
  returnTo,
  fields,
  active,
  activeLabel,
  inactiveLabel,
}: {
  action: AdminQuickAction;
  tab: AdminTab;
  returnTo?: string;
  fields: Record<string, string>;
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return (
    <form action={action} className="admin-quick-toggle-form">
      <AdminTabInput tab={tab} returnTo={returnTo} />
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button
        type="submit"
        className={`button-secondary admin-status-toggle-button ${active ? "is-active" : "is-inactive"}`}
      >
        {active ? activeLabel : inactiveLabel}
      </button>
    </form>
  );
}

// 用于已经位于某个 <form> 内部的场景：HTML 不允许 <form> 嵌套，所以这里只渲染一个
// 通过 formAction 指向独立 action 的提交按钮，复用外层表单已有的隐藏字段（tab/returnTo/实体 id）。
function AdminQuickToggleButton({
  action,
  active,
  activeLabel,
  inactiveLabel,
}: {
  action: AdminQuickAction;
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
}) {
  return (
    <button
      type="submit"
      formAction={action}
      formNoValidate
      className={`button-secondary admin-status-toggle-button ${active ? "is-active" : "is-inactive"}`}
    >
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}

function shouldShowSection(visibleSectionIds: readonly string[] | undefined, sectionId: string) {
  if (!visibleSectionIds || visibleSectionIds.length === 0) {
    return true;
  }

  return visibleSectionIds.includes(sectionId);
}

function normalizeSearchValue(value?: string) {
  return String(value ?? "").trim();
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

function buildFilterReturnToPath(
  basePath: string,
  search: Record<string, string | undefined>,
  keys: readonly string[],
) {
  const params = new URLSearchParams();

  for (const key of keys) {
    const value = normalizeSearchValue(search[key]);

    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function OverviewSection({
  dashboard,
  statCards,
  lowStockProducts,
  moduleCards,
  paymentProfiles,
}: {
  dashboard: AdminDashboardData;
  statCards: ReadonlyArray<{
    label: string;
    value: number | string;
    detail: string;
    tone: string;
  }>;
  lowStockProducts: number;
  moduleCards: ReadonlyArray<{
    tab: AdminTab;
    title: string;
    detail: string;
    helper: string;
  }>;
  paymentProfiles: PaymentProfileSnapshot[];
}) {
  return (
    <>
      <section id="overview-summary" className="admin-anchor-target admin-overview-grid">
        <article className="admin-surface admin-hero-panel">
          <div>
            <span className="admin-soft-tag">发卡工作台</span>
            <h2>商品、库存、商户、订单已经拆成独立模块，后台导航现在更适合日常运营。</h2>
            <p className="muted-copy">
              你可以先在商品里配置销售模式和商户绑定，再去库存模块导卡，最后到订单模块盯支付和发货状态。
            </p>
          </div>

          <div className="admin-hero-highlight">
            <div className="admin-highlight-card">
              <span>缺货商品</span>
              <strong>{lowStockProducts}</strong>
              <p>已上架但当前所有可售 SKU 都没库存的商品数量</p>
            </div>

            <div className="admin-highlight-card">
              <span>最近同步</span>
              <strong>{dashboard.orders[0] ? formatDateTime(dashboard.orders[0].updatedAt) : "暂无"}</strong>
              <p>订单状态会在回调和手动刷新时自动同步</p>
            </div>
          </div>
        </article>

        <div className="admin-stat-grid">
          {statCards.map((card) => (
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
          <article id="overview-modules" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Modules</p>
                <h2 className="order-title">按模块操作</h2>
              </div>
              <span className="badge muted">减少来回滚动</span>
            </div>

            <div className="admin-module-grid">
              {moduleCards.map((card) => (
                <Link key={card.tab} href={buildAdminHref(card.tab)} className="admin-module-card">
                  <div className="admin-module-card-head">
                    <strong>{card.title}</strong>
                    <span>{ADMIN_TAB_META[card.tab].icon}</span>
                  </div>
                  <p>{card.detail}</p>
                  <small>{card.helper}</small>
                </Link>
              ))}
            </div>
          </article>

          <article id="overview-workflow" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Flow</p>
                <h2 className="order-title">推荐操作顺序</h2>
              </div>
            </div>

            <div className="admin-step-list">
              <div className="admin-step-item">
                <span>1</span>
                <p>先到“商品”模块创建商品，决定它是单商品还是多 SKU，并绑定收款商户。</p>
              </div>
              <div className="admin-step-item">
                <span>2</span>
                <p>再到“库存”模块按 SKU 导入卡密，确保每个可售规格都有库存可发。</p>
              </div>
              <div className="admin-step-item">
                <span>3</span>
                <p>如果有多个 NovaPay 商户，就在“商户”模块分别维护，商品下单时会自动分流。</p>
              </div>
              <div className="admin-step-item">
                <span>4</span>
                <p>如果支付链路需要排障，就到“支付”模块看支付尝试、回调日志和补偿任务，不用再混在订单页里翻找。</p>
              </div>
              <div className="admin-step-item">
                <span>5</span>
                <p>最后用“订单”模块盯支付状态和发货状态，检查每笔订单是不是走对了商户。</p>
              </div>
            </div>
          </article>
        </div>

        <div className="admin-column-stack">
          <article id="overview-merchants" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Merchants</p>
                <h2 className="order-title">商户快照</h2>
              </div>
              <Link href={buildAdminHref("merchants")} className="button-link">
                去管理商户
              </Link>
            </div>

            {paymentProfiles.length === 0 ? (
              <div className="admin-empty-state">
                <strong>还没有配置商户</strong>
                <p>先在商户模块新增至少一个 NovaPay 商户，商品下单才有可用的收款账号。</p>
              </div>
            ) : (
              <div className="table-wrap admin-table-wrap">
                <table className="admin-ops-table">
                  <thead>
                    <tr>
                      <th>商户</th>
                      <th>状态</th>
                      <th>默认通道</th>
                      <th>来源</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentProfiles.map((profile) => (
                      <tr key={profile.id}>
                        <td className="admin-ops-table-cell">
                          <strong>{profile.name}</strong>
                          <p className="small-copy">{profile.merchantCode}</p>
                        </td>
                        <td>
                          <div className="admin-inline-tags">
                            {profile.isDefault ? <span className="badge warning">默认</span> : null}
                            <span className={`badge ${getPaymentProfileStatusTone(profile)}`}>
                              {getPaymentProfileStatusLabel(profile)}
                            </span>
                          </div>
                        </td>
                        <td>{profile.defaultChannelCode}</td>
                        <td>{profile.ownerId ? "商户自助" : "平台维护"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>

          <article id="overview-orders" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Orders</p>
                <h2 className="order-title">最近订单</h2>
              </div>
              <Link href={buildAdminHref("orders")} className="button-link">
                去订单中心
              </Link>
            </div>

            {dashboard.orders.length === 0 ? (
              <div className="admin-empty-state">
                <strong>还没有订单记录</strong>
                <p>先创建商品并导入卡密，就可以从前台测试下单和商户分流支付。</p>
              </div>
            ) : (
              <div className="table-wrap admin-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>订单</th>
                      <th>商品 / SKU</th>
                      <th>状态</th>
                      <th>金额</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.orders.slice(0, 6).map((order) => (
                      <tr key={order.id}>
                        <td>
                          <strong>{order.orderNo}</strong>
                          <p className="small-copy">{order.customerEmail}</p>
                        </td>
                        <td>
                          <strong>{order.product.name}</strong>
                          <p className="small-copy">{order.sku.name}</p>
                          <p className="small-copy">
                            {order.paymentProfile ? getPaymentProfileLabel(order.paymentProfile) : "未绑定商户"}
                          </p>
                        </td>
                        <td>
                          <span className={`badge ${getOrderStatusTone(order.status)}`}>
                            {getOrderStatusLabel(order.status)}
                          </span>
                          <p className="small-copy">{order.novapayStatus ?? "未同步"}</p>
                        </td>
                        <td>{describeOrderAmount(order.amountCents)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

function AdminProductSummaryCard({
  product,
  returnTo,
}: {
  product: AdminProduct;
  returnTo?: string;
}) {
  return (
    <article className="admin-product-item">
      <div className="admin-product-head">
        <div>
          <h3>{product.name}</h3>
          <p className="small-copy">
            {getAdminProductStorefrontPath(product)} · 最近更新 {formatDateTime(product.updatedAt)}
          </p>
          <p className="small-copy">{getProductSaleModeCopy(product.saleMode)}</p>
          <p className="small-copy">
            收款商户：
            {product.paymentProfile ? ` ${getPaymentProfileLabel(product.paymentProfile)}` : " 未绑定，将走默认商户"}
          </p>
          {product.summary ? <p className="small-copy">简介：{product.summary}</p> : null}
        </div>

        <div className="admin-product-actions">
          <span className="badge muted">{getProductSaleModeLabel(product.saleMode)}</span>
          <span className={`badge ${getProductStatusTone(product.status)}`}>{getProductStatusLabel(product.status)}</span>
          <Link href={getAdminProductStorefrontPath(product)} className="button-link">
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

      <div className="button-row compact">
        <AdminQuickToggleForm
          action={toggleProductStatusAction}
          tab="products"
          returnTo={returnTo}
          fields={{ productId: product.id }}
          active={product.status === ProductStatus.ACTIVE}
          activeLabel="下架商品"
          inactiveLabel="上架商品"
        />
      </div>

      <div className="button-row">
        <Link href={buildAdminProductConfigPath(product.id)} className="button-secondary">
          配置商品
        </Link>
        <Link href={getAdminProductStorefrontPath(product)} className="button-link">
          打开前台页
        </Link>
      </div>
    </article>
  );
}

function AdminProductConfigurationArticle({
  product,
  paymentProfiles,
  defaultPaymentProfile,
  categories,
  returnTo,
  selectedSkuId,
}: {
  product: AdminProduct;
  paymentProfiles: PaymentProfileSnapshot[];
  defaultPaymentProfile: PaymentProfileSnapshot | null;
  categories: AdminCategory[];
  returnTo?: string;
  selectedSkuId?: string;
}) {
  const singleModeSku = getSingleModePrimarySku(product);
  const selectedSku = getSelectedAdminSku(product, selectedSkuId);
  const storefrontPath = getAdminProductStorefrontPath(product);
  const paymentProfileLabel = product.paymentProfile
    ? getPaymentProfileLabel(product.paymentProfile)
    : defaultPaymentProfile
      ? `${getPaymentProfileLabel(defaultPaymentProfile)}（默认）`
      : "未绑定，将走默认商户";

  return (
    <article className="admin-product-item">
      <div className="admin-product-head">
        <div>
          <h3>{product.name}</h3>
          <p className="small-copy">
            {storefrontPath} · 最近更新 {formatDateTime(product.updatedAt)}
          </p>
          <p className="small-copy">{getProductSaleModeCopy(product.saleMode)}</p>
          <p className="small-copy">收款商户：{paymentProfileLabel}</p>
        </div>

        <div className="admin-product-actions">
          <span className="badge muted">{getProductSaleModeLabel(product.saleMode)}</span>
          <span className={`badge ${getProductStatusTone(product.status)}`}>{getProductStatusLabel(product.status)}</span>
          <Link href={storefrontPath} className="button-link">
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

      <div className="button-row compact">
        <AdminQuickToggleForm
          action={toggleProductStatusAction}
          tab="products"
          returnTo={returnTo}
          fields={{ productId: product.id }}
          active={product.status === ProductStatus.ACTIVE}
          activeLabel="下架商品"
          inactiveLabel="上架商品"
        />
        <Link href={storefrontPath} className="button-link">
          打开前台页
        </Link>
      </div>

      <div className="admin-subsection">
        <div className="admin-subsection-head">
          <h3>商品总览</h3>
          <p className="small-copy">先看结构化信息，再处理下面的编辑表单，定位会更快。</p>
        </div>

        <div className="table-wrap admin-table-wrap">
          <table className="admin-detail-table">
            <tbody>
              <tr>
                <th>商品名称</th>
                <td>{product.name}</td>
              </tr>
              <tr>
                <th>商品别名</th>
                <td>{product.slug}</td>
              </tr>
              <tr>
                <th>前台地址</th>
                <td>
                  <Link href={storefrontPath} className="admin-summary-link">
                    {storefrontPath}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>商品状态</th>
                <td>
                  <span className={`badge ${getProductStatusTone(product.status)}`}>{getProductStatusLabel(product.status)}</span>
                </td>
              </tr>
              <tr>
                <th>商品模式</th>
                <td>{getProductSaleModeLabel(product.saleMode)}</td>
              </tr>
              <tr>
                <th>收款商户</th>
                <td>{paymentProfileLabel}</td>
              </tr>
              <tr>
                <th>SKU 数量</th>
                <td>{product.skus.length}</td>
              </tr>
              <tr>
                <th>最低售价</th>
                <td>{describeOrderAmount(product.startingPriceCents)}</td>
              </tr>
              <tr>
                <th>库存汇总</th>
                <td>
                  可售 {product.stock.available} / 占用 {product.stock.reserved} / 已售 {product.stock.sold}
                </td>
              </tr>
              <tr>
                <th>最近更新</th>
                <td>{formatDateTime(product.updatedAt)}</td>
              </tr>
              <tr>
                <th>一句话说明</th>
                <td>{product.summary?.trim() ? product.summary : "未填写"}</td>
              </tr>
              <tr>
                <th>详情说明</th>
                <td>{getContentBlocksPlainText(product) || "未填写"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-subsection">
        <div className="admin-subsection-head">
          <h3>SKU 列表</h3>
          <p className="small-copy">能先用表格看清所有规格，再从下方下拉切换具体编辑项。</p>
        </div>

        {product.skus.length === 0 ? (
          <div className="admin-empty-state">
            <strong>当前没有 SKU</strong>
            <p>这个商品还没有规格，请先在下方添加一个 SKU。</p>
          </div>
        ) : (
          <div className="table-wrap admin-table-wrap">
            <table className="admin-sku-summary-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>状态</th>
                  <th>售价</th>
                  <th>阶梯价</th>
                  <th>库存</th>
                  <th>说明</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {product.skus.map((sku) => (
                  <tr key={sku.id} className={selectedSku?.id === sku.id ? "is-current" : undefined}>
                    <td className="admin-sku-summary-cell">
                      <strong>{sku.name}</strong>
                      <p className="small-copy">{sku.id}</p>
                    </td>
                    <td>
                      <span className={`badge ${sku.enabled ? "success" : "muted"}`}>
                        {sku.enabled ? "启用中" : "已停用"}
                      </span>
                    </td>
                    <td>{describeOrderAmount(sku.priceCents)}</td>
                    <td>{getSkuPricingSummary(sku.pricingTiers)}</td>
                    <td>
                      可售 {sku.stock.available}
                      <br />
                      占用 {sku.stock.reserved} / 已售 {sku.stock.sold}
                    </td>
                    <td>{sku.summary?.trim() ? sku.summary : "暂无说明"}</td>
                    <td className="admin-sku-summary-action">
                      {selectedSku?.id === sku.id ? <span className="badge warning">当前编辑</span> : null}
                      <AdminQuickToggleForm
                        action={toggleSkuEnabledAction}
                        tab="products"
                        returnTo={returnTo}
                        fields={{ skuId: sku.id }}
                        active={sku.enabled}
                        activeLabel="停用 SKU"
                        inactiveLabel="启用 SKU"
                      />
                      <Link href={buildAdminProductSkuConfigPath(product.id, sku.id)} className="button-link">
                        编辑 SKU
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormDialog
        triggerLabel="编辑商品基础信息"
        triggerClassName="button-secondary"
        title="编辑商品基础信息"
        description="名称、详情、封面、分类、状态与收款商户。"
      >
        <form action={updateProductAction} className="inline-form">
          <AdminTabInput tab="products" returnTo={returnTo} />
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
            <ContentBlocksField
              name="contentBlocks"
              label="商品详情(图文混排)"
              hint="按顺序添加文字段落和图片,可上下调整顺序。展示在商品详情页。"
              initialValue={buildEditorInitialValue({
                contentBlocks: product.contentBlocks,
                description: product.description,
                detailImages: parseStoredImageList(product.detailImages),
              })}
            />
          </div>

          <div className="field">
            <CoverImageField
              name="coverImage"
              label="商品封面图"
              hint="展示在店铺列表卡片上,建议正方形。留空则用首字母占位。"
              initialValue={product.coverImage}
            />
          </div>

          <div className="field">
            <label>商品分类</label>
            <select name="categoryId" defaultValue={product.category?.id ?? ""}>
              <option value="">未分类</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>商品模式</label>
            <select name="saleMode" defaultValue={product.saleMode}>
              <option value={ProductSaleMode.SINGLE}>单商品</option>
              <option value={ProductSaleMode.MULTI}>多 SKU</option>
            </select>
          </div>

          <div className="field">
            <label>商品状态</label>
            <select name="status" defaultValue={product.status}>
              <option value={ProductStatus.DRAFT}>草稿</option>
              <option value={ProductStatus.ACTIVE}>上架</option>
              <option value={ProductStatus.ARCHIVED}>归档</option>
            </select>
          </div>

          <div className="field">
            <label>收款商户</label>
            <select name="paymentProfileId" defaultValue={product.paymentProfileId ?? defaultPaymentProfile?.id ?? ""}>
              {paymentProfiles.length === 0 ? (
                <option value="">请先到商户模块新增商户</option>
              ) : (
                paymentProfiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {getPaymentProfileLabel(profile)}
                    {profile.isDefault ? " · 默认" : ""}
                    {!profile.isActive ? " · 已停用" : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="button-row">
            <button type="submit" className="button-secondary">
              更新商品
            </button>

            <button formAction={deleteProductAction} formNoValidate type="submit" className="button-link">
              删除商品
            </button>
          </div>
        </form>
      </FormDialog>

      <div className="admin-subsection">
        <div className="admin-subsection-head">
          <h3>{product.saleMode === ProductSaleMode.MULTI ? "SKU 编辑" : "单商品配置"}</h3>
          <p className="small-copy">
            {product.saleMode === ProductSaleMode.MULTI
              ? `商品最低价：${describeOrderAmount(product.startingPriceCents)}`
              : "单商品模式下，前台只展示当前启用的默认规格。"}
          </p>
        </div>

        {product.saleMode === ProductSaleMode.MULTI ? (
          <>
            <form action={buildAdminProductConfigPath(product.id)} className="admin-sku-selector-form">
              <div className="field">
                <label htmlFor={`admin-sku-select-${product.id}`}>选择要配置的 SKU</label>
                <select
                  id={`admin-sku-select-${product.id}`}
                  name="skuId"
                  defaultValue={selectedSku?.id ?? product.skus[0]?.id ?? ""}
                >
                  {product.skus.map((sku) => (
                    <option key={sku.id} value={sku.id}>
                      {sku.name} · 可售 {sku.stock.available} · {sku.enabled ? "启用中" : "已停用"}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="button-secondary">
                切换 SKU
              </button>
            </form>

            {selectedSku ? (
              <FormDialog
                triggerLabel={`编辑选中 SKU：${selectedSku.name}`}
                triggerClassName="button-secondary"
                title={`编辑 SKU · ${selectedSku.name}`}
                description="修改名称、售价、阶梯价与启用状态。"
              >
              <form action={updateSkuAction} className="admin-sku-card">
                <AdminTabInput tab="products" returnTo={returnTo} />
                <input type="hidden" name="skuId" value={selectedSku.id} />
                <input type="hidden" name="productSlug" value={product.slug} />

                <div className="admin-sku-head">
                  <div>
                    <strong>{selectedSku.name}</strong>
                    <p className="small-copy">
                      可售 {selectedSku.stock.available} / 占用 {selectedSku.stock.reserved} / 已售 {selectedSku.stock.sold}
                    </p>
                  </div>
                  <span className={`badge ${selectedSku.enabled ? "success" : "muted"}`}>
                    {selectedSku.enabled ? "启用中" : "已停用"}
                  </span>
                </div>

                <div className="inline-grid">
                  <div className="field">
                    <label>SKU 名称</label>
                    <input name="name" defaultValue={selectedSku.name} required />
                  </div>
                  <div className="field">
                    <label>SKU 售价</label>
                    <input name="price" defaultValue={(selectedSku.priceCents / 100).toFixed(2)} required />
                  </div>
                </div>

                <div className="field">
                  <label>SKU 说明</label>
                  <input name="summary" defaultValue={selectedSku.summary ?? ""} />
                </div>

                <div className="field">
                  <label>阶梯价规则</label>
                  <SkuPricingTierEditor name="pricingTiers" initialValue={selectedSku.pricingTiers} />
                </div>

                <label className="admin-check-row">
                  <input type="checkbox" name="enabled" defaultChecked={selectedSku.enabled} />
                  <span>启用该 SKU</span>
                </label>

                <div className="button-row">
                  <AdminQuickToggleButton
                    action={toggleSkuEnabledAction}
                    active={selectedSku.enabled}
                    activeLabel="停用 SKU"
                    inactiveLabel="启用 SKU"
                  />
                  <button type="submit" className="button-secondary">
                    更新 SKU
                  </button>

                  <button formAction={deleteSkuAction} formNoValidate type="submit" className="button-link">
                    删除 SKU
                  </button>
                </div>
              </form>
              </FormDialog>
            ) : null}

            <FormDialog
              triggerLabel="新增 SKU"
              triggerClassName="button"
              title="新增 SKU"
              description="继续往这个商品下挂更多规格"
            >
              <form action={createSkuAction} className="admin-sku-create">
                <AdminTabInput tab="products" returnTo={returnTo} />
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="productSlug" value={product.slug} />

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

                <div className="field">
                  <label>阶梯价规则</label>
                  <SkuPricingTierEditor name="pricingTiers" />
                </div>

                <label className="admin-check-row">
                  <input type="checkbox" name="enabled" defaultChecked />
                  <span>创建后立即启用</span>
                </label>

                <button type="submit" className="button">
                  添加 SKU
                </button>
              </form>
            </FormDialog>
          </>
        ) : singleModeSku ? (
          <>
            <form action={updateSkuAction} className="admin-sku-card">
              <AdminTabInput tab="products" returnTo={returnTo} />
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
                  <input name="price" defaultValue={(singleModeSku.priceCents / 100).toFixed(2)} required />
                </div>
              </div>

              <div className="field">
                <label>商品说明</label>
                <input name="summary" defaultValue={singleModeSku.summary ?? ""} />
              </div>

              <div className="field">
                <label>阶梯价规则</label>
                <SkuPricingTierEditor name="pricingTiers" initialValue={singleModeSku.pricingTiers} />
              </div>

              <label className="admin-check-row">
                <input type="checkbox" name="enabled" defaultChecked={singleModeSku.enabled} />
                <span>启用默认规格</span>
              </label>

              <div className="button-row">
                <AdminQuickToggleButton
                  action={toggleSkuEnabledAction}
                  active={singleModeSku.enabled}
                  activeLabel="停用默认规格"
                  inactiveLabel="启用默认规格"
                />
                <button type="submit" className="button-secondary">
                  更新单商品配置
                </button>

                {product.skus.length > 1 ? (
                  <button formAction={deleteSkuAction} formNoValidate type="submit" className="button-link">
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
}

function AdminCategoryManagerArticle({
  categories,
  returnTo,
}: {
  categories: AdminCategory[];
  returnTo?: string;
}) {
  return (
    <article id="products-categories" className="admin-anchor-target admin-surface">
      <div className="admin-section-head">
        <div>
          <p className="admin-section-kicker">Categories</p>
          <h2 className="order-title">商品分类管理</h2>
        </div>
        <FormDialog
          triggerLabel="新增分类"
          triggerClassName="button-secondary"
          title="新增分类"
          description="添加后，创建或编辑商品时即可归类。"
        >
          <form action={createCategoryAction} className="inline-form">
            <AdminTabInput tab="products" returnTo={returnTo} />
            <div className="field">
              <label htmlFor="new-category-name">分类名称</label>
              <input id="new-category-name" name="name" placeholder="例如 ChatGPT" required />
            </div>
            <div className="button-row">
              <button type="submit" className="button">
                添加分类
              </button>
            </div>
          </form>
        </FormDialog>
      </div>

      {categories.length === 0 ? (
        <div className="admin-empty-state">
          <strong>还没有分类</strong>
          <p>添加分类后,创建或编辑商品时即可归类,前台店铺页会出现分类筛选条。</p>
        </div>
      ) : (
        <div className="table-wrap admin-table-wrap">
          <table className="admin-detail-table">
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <form action={renameCategoryAction} className="inline-form-row">
                      <AdminTabInput tab="products" returnTo={returnTo} />
                      <input type="hidden" name="categoryId" value={category.id} />
                      <input name="name" defaultValue={category.name} required />
                      <button type="submit" className="button-link">
                        重命名
                      </button>
                    </form>
                  </td>
                  <td className="admin-sku-summary-action">
                    <form action={deleteCategoryAction} className="inline-form-row">
                      <AdminTabInput tab="products" returnTo={returnTo} />
                      <input type="hidden" name="categoryId" value={category.id} />
                      <button type="submit" formNoValidate className="button-link">
                        删除
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
  );
}

function ProductsSection({
  dashboard,
  paymentProfiles,
  defaultPaymentProfile,
  visibleSectionIds,
  returnTo,
  selectedProductId,
  selectedSkuId,
}: {
  dashboard: AdminDashboardData;
  paymentProfiles: PaymentProfileSnapshot[];
  defaultPaymentProfile: PaymentProfileSnapshot | null;
  visibleSectionIds?: readonly string[];
  returnTo?: string;
  selectedProductId?: string;
  selectedSkuId?: string;
}) {
  const isDedicatedPage = Boolean(selectedProductId);
  const selectedProduct = selectedProductId
    ? dashboard.products.find((product) => product.id === selectedProductId) ?? null
    : null;
  const showCreate = !isDedicatedPage && shouldShowSection(visibleSectionIds, "products-create");
  const showCatalog = isDedicatedPage || shouldShowSection(visibleSectionIds, "products-catalog");

  return (
    <section className={isDedicatedPage ? "admin-content-grid admin-content-grid-single" : "admin-content-grid"}>
      {showCreate ? (
        <div className="admin-column-stack">
          <article id="products-create" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Create</p>
                <h2 className="order-title">创建商品</h2>
                <p className="small-copy">新建商品并初始化首个默认规格。</p>
              </div>
              <FormDialog
                triggerLabel="创建商品"
                triggerClassName="button"
                title="创建商品"
                description="商品负责展示，首个 SKU 决定价格与库存。"
              >
            <form action={createProductAction} className="inline-form">
              <AdminTabInput tab="products" returnTo={returnTo} />

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
                <label htmlFor="paymentProfileId">收款商户</label>
                <select id="paymentProfileId" name="paymentProfileId" defaultValue={defaultPaymentProfile?.id ?? ""}>
                  {paymentProfiles.length === 0 ? (
                    <option value="">请先到商户模块新增商户</option>
                  ) : (
                    paymentProfiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {getPaymentProfileLabel(profile)}
                        {profile.isDefault ? " · 默认" : ""}
                        {!profile.isActive ? " · 已停用" : ""}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="field">
                <label htmlFor="summary">一句话说明</label>
                <input id="summary" name="summary" placeholder="例如 秒发 / 自动售后 / 多面值" />
              </div>

              <div className="field">
                <ContentBlocksField
                  name="contentBlocks"
                  label="商品详情(图文混排)"
                  hint="按顺序添加文字段落和图片,可上下调整顺序。展示在商品详情页。"
                />
              </div>

              <div className="field">
                <CoverImageField
                  name="coverImage"
                  label="商品封面图"
                  hint="展示在店铺列表卡片上,建议正方形。留空则用首字母占位。"
                />
              </div>

              <div className="field">
                <label htmlFor="categoryId">商品分类</label>
                <select id="categoryId" name="categoryId" defaultValue="">
                  <option value="">未分类</option>
                  {dashboard.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="small-copy">前台店铺页顶部按分类筛选。可在下方「商品分类管理」里新增分类。</p>
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

                <div className="field">
                  <label>阶梯价规则</label>
                  <SkuPricingTierEditor name="initialSkuPricingTiers" />
                </div>
              </div>

              <div className="button-row">
                <button type="submit" className="button">
                  保存商品
                </button>
              </div>
            </form>
              </FormDialog>
            </div>
          </article>

          <AdminCategoryManagerArticle categories={dashboard.categories} returnTo={returnTo} />
        </div>
      ) : null}

      {showCatalog ? (
        <div className="admin-column-stack">
          <article id="products-catalog" className="admin-anchor-target admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">{isDedicatedPage ? "Product Config" : "Products"}</p>
                <h2 className="order-title">{isDedicatedPage ? "商品配置详情" : "商品与 SKU"}</h2>
              </div>
              {isDedicatedPage ? (
                <Link href={buildAdminHref("products")} className="button-link">
                  返回商品列表
                </Link>
              ) : (
                <span className="small-copy">商品负责展示，SKU 负责价格和库存</span>
              )}
            </div>

            {dashboard.products.length === 0 ? (
              <div className="admin-empty-state">
                <strong>还没有商品</strong>
                <p>先创建一个商品和默认规格，再导入卡密，就能在前台看到单商品或多 SKU 的效果。</p>
              </div>
            ) : isDedicatedPage ? (
              selectedProduct ? (
                <div className="admin-product-list">
                  <div className="admin-product-detail-note">
                    <strong>当前正在配置 {selectedProduct.name}</strong>
                    <p>商品基础信息、SKU、阶梯价和启用状态都集中在这一页，目录页只保留摘要和入口。</p>
                  </div>
                  <AdminProductConfigurationArticle
                    product={selectedProduct}
                    paymentProfiles={paymentProfiles}
                    defaultPaymentProfile={defaultPaymentProfile}
                    categories={dashboard.categories}
                    returnTo={returnTo}
                    selectedSkuId={selectedSkuId}
                  />
                </div>
              ) : (
                <div className="admin-empty-state">
                  <strong>商品不存在</strong>
                  <p>这个商品可能已经被删除，或者当前地址已经失效。</p>
                </div>
              )
            ) : (
              <div className="table-wrap admin-table-wrap">
                <table className="admin-product-catalog-table">
                  <thead>
                    <tr>
                      <th>商品</th>
                      <th>模式</th>
                      <th>状态</th>
                      <th>收款商户</th>
                      <th>SKU / 库存</th>
                      <th>最低售价</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.products.map((product) => (
                      <tr key={product.id}>
                        <td className="admin-product-table-cell">
                          <strong>{product.name}</strong>
                          <p className="small-copy">{product.slug}</p>
                          <p className="small-copy">{product.summary?.trim() ? product.summary : "暂无简介"}</p>
                        </td>
                        <td>{getProductSaleModeLabel(product.saleMode)}</td>
                        <td>
                          <span className={`badge ${getProductStatusTone(product.status)}`}>
                            {getProductStatusLabel(product.status)}
                          </span>
                        </td>
                        <td>
                          {product.paymentProfile
                            ? getPaymentProfileLabel(product.paymentProfile)
                            : defaultPaymentProfile
                              ? `${getPaymentProfileLabel(defaultPaymentProfile)}（默认）`
                              : "未绑定，将走默认商户"}
                        </td>
                        <td>
                          SKU {product.skus.length}
                          <br />
                          可售 {product.stock.available} / 已售 {product.stock.sold}
                        </td>
                        <td>{describeOrderAmount(product.startingPriceCents)}</td>
                        <td className="admin-table-action-stack">
                          <AdminQuickToggleForm
                            action={toggleProductStatusAction}
                            tab="products"
                            returnTo={returnTo}
                            fields={{ productId: product.id }}
                            active={product.status === ProductStatus.ACTIVE}
                            activeLabel="下架商品"
                            inactiveLabel="上架商品"
                          />
                          <Link href={buildAdminProductConfigPath(product.id)} className="button-secondary">
                            配置商品
                          </Link>
                          <Link href={getAdminProductStorefrontPath(product)} className="button-link">
                            打开前台页
                          </Link>
                          {product.status !== ProductStatus.ARCHIVED ? (
                            <form action={archiveProductAction} className="admin-quick-toggle-form">
                              <AdminTabInput tab="products" returnTo={returnTo} />
                              <input type="hidden" name="productId" value={product.id} />
                              <ConfirmSubmitButton
                                confirmMessage={`确定归档商品「${product.name}」吗？归档后前台不再展示，但历史订单和数据都会保留，之后仍可恢复上架。`}
                                formNoValidate
                                className="button-link"
                              >
                                归档商品
                              </ConfirmSubmitButton>
                            </form>
                          ) : null}
                          <form action={deleteProductAction} className="admin-quick-toggle-form">
                            <AdminTabInput tab="products" returnTo={returnTo} />
                            <input type="hidden" name="productId" value={product.id} />
                            <input type="hidden" name="productSlug" value={product.slug} />
                            <ConfirmSubmitButton
                              confirmMessage={`确定删除商品「${product.name}」吗？该操作会一并删除它的 SKU 和卡密，且不可恢复。`}
                              formNoValidate
                              className="button-link admin-table-danger-action"
                            >
                              删除商品
                            </ConfirmSubmitButton>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        </div>
      ) : null}
    </section>
  );
}

function InventorySection({
  dashboard,
  merchantAccounts,
  search,
  visibleSectionIds,
  returnTo,
}: {
  dashboard: AdminDashboardData;
  merchantAccounts: MerchantAccountWithProfileSnapshot[];
  search: Record<string, string | undefined>;
  visibleSectionIds?: readonly string[];
  returnTo: string;
}) {
  const inventoryStates = ["all", "low", "out", "healthy", "disabled"] as const;
  const inventoryState = parseSelectFilter(search.inventoryState, inventoryStates, "all");
  const inventoryProduct = normalizeSearchValue(search.inventoryProduct) || "all";
  const inventoryMerchant = normalizeSearchValue(search.inventoryMerchant) || "all";
  const inventoryKeyword = normalizeSearchValue(search.inventoryKeyword);
  const showImport = shouldShowSection(visibleSectionIds, "inventory-import");
  const showFilters = shouldShowSection(visibleSectionIds, "inventory-filters");
  const showStock = shouldShowSection(visibleSectionIds, "inventory-stock");
  const showLedger = shouldShowSection(visibleSectionIds, "inventory-ledger");
  const merchantLookup = new Map(merchantAccounts.map((merchant) => [merchant.id, merchant]));
  const inventoryReturnTo = buildFilterReturnToPath(returnTo, search, [
    "inventoryKeyword",
    "inventoryProduct",
    "inventoryMerchant",
    "inventoryState",
  ]);
  const availableProducts = dashboard.products.filter((product) => product.skus.length > 0);
  const inventoryRows = dashboard.products.flatMap((product) => {
    const ownerMerchant = product.paymentProfile?.ownerId
      ? merchantLookup.get(product.paymentProfile.ownerId) ?? null
      : null;
    const merchantId = product.paymentProfile?.ownerId ?? "platform";
    const merchantName = ownerMerchant?.name ?? "平台直营";
    const merchantEmail = ownerMerchant?.email ?? "";
    const paymentProfileLabel = product.paymentProfile
      ? getPaymentProfileLabel(product.paymentProfile)
      : "未绑定，走默认收款路由";

    return product.skus.map((sku) => ({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productStatus: product.status,
      saleMode: product.saleMode,
      skuId: sku.id,
      skuName: sku.name,
      skuSummary: sku.summary,
      priceCents: sku.priceCents,
      enabled: sku.enabled,
      available: sku.stock.available,
      reserved: sku.stock.reserved,
      sold: sku.stock.sold,
      merchantId,
      merchantName,
      merchantEmail,
      paymentProfileLabel,
      storefrontPath: getAdminProductStorefrontPath(product),
    }));
  });
  const inventoryMerchantOptions = Array.from(
    new Map(
      inventoryRows.map((row) => [
        row.merchantId,
        {
          merchantId: row.merchantId,
          merchantName: row.merchantName,
          merchantEmail: row.merchantEmail,
        },
      ]),
    ).values(),
  );
  const inventorySkuGroups = inventoryRows.reduce<InventorySkuMerchantGroup[]>((groups, row) => {
    let group = groups.find((item) => item.merchantId === row.merchantId);

    if (!group) {
      group = {
        merchantId: row.merchantId,
        merchantName: row.merchantName,
        merchantEmail: row.merchantEmail,
        skus: [],
      };
      groups.push(group);
    }

    group.skus.push({
      id: row.skuId,
      productName: row.productName,
      skuName: row.skuName,
      available: row.available,
      enabled: row.enabled,
    });

    return groups;
  }, []);
  const filteredInventoryRows = inventoryRows.filter((row) => {
    if (inventoryProduct !== "all" && row.productId !== inventoryProduct) {
      return false;
    }

    if (inventoryMerchant !== "all" && row.merchantId !== inventoryMerchant) {
      return false;
    }

    if (
      !matchesSearchKeyword(
        [
          row.productName,
          row.productSlug,
          row.skuName,
          row.skuSummary,
          row.merchantName,
          row.merchantEmail,
          row.paymentProfileLabel,
        ],
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
  const filteredLowStockCount = filteredInventoryRows.filter(
    (row) => row.enabled && row.available > 0 && row.available <= 5,
  ).length;
  const filteredOutOfStockCount = filteredInventoryRows.filter((row) => row.enabled && row.available === 0).length;
  const filteredDisabledCount = filteredInventoryRows.filter((row) => !row.enabled).length;
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
      {showImport || showFilters ? (
        <section className="admin-column-stack admin-inventory-toolbar">
          <div className="admin-column-stack">
            {showImport ? (
              <article id="inventory-import" className="admin-anchor-target admin-surface">
                <div className="admin-section-head">
                  <div>
                    <p className="admin-section-kicker">Import</p>
                    <h2 className="order-title">批量导入卡密</h2>
                    <p className="small-copy">按 SKU 维度入库，避免多规格商品发错货。</p>
                  </div>
                  {availableProducts.length > 0 ? (
                    <FormDialog
                      triggerLabel="批量导入"
                      triggerClassName="button"
                      title="批量导入卡密"
                      description="支持一行一条卡密、整段长文本，或上传发货文件。"
                    >
                  <form action={importCardsAction} className="inline-form">
                    <AdminTabInput tab="inventory" returnTo={inventoryReturnTo} />

                    <InventorySkuPicker groups={inventorySkuGroups} />

                    <div className="field">
                      <label htmlFor="batchName">批次名</label>
                      <input id="batchName" name="batchName" placeholder="例如 2026-04 首批" />
                    </div>

                    <CardImportFields idPrefix="admin-import" />

                    <div className="button-row">
                      <button type="submit" className="button">
                        批量导入
                      </button>
                    </div>
                  </form>
                    </FormDialog>
                  ) : null}
                </div>

                {availableProducts.length === 0 ? (
                  <div className="admin-empty-state">
                    <strong>还没有可入库的 SKU</strong>
                    <p>先去商品模块创建商品和 SKU，再回来按规格导入卡密库存。</p>
                  </div>
                ) : null}
              </article>
            ) : null}
          </div>

          <div className="admin-column-stack">
            {showFilters ? (
              <article id="inventory-filters" className="admin-anchor-target admin-surface">
                <div className="admin-section-head">
                  <div>
                    <p className="admin-section-kicker">Filter</p>
                    <h2 className="order-title">库存筛选器</h2>
                  </div>
                  <Link href={returnTo} className="button-link">
                    重置
                  </Link>
                </div>

                <form action={returnTo} method="get" className="inline-form admin-inventory-filter-form">
                  <div className="field">
                    <label htmlFor="inventoryKeyword">关键字</label>
                    <input
                      id="inventoryKeyword"
                      name="inventoryKeyword"
                      defaultValue={inventoryKeyword}
                      placeholder="搜商品名、别名、SKU 或商户"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="inventoryMerchant">归属商户</label>
                    <AutoSubmitSelect id="inventoryMerchant" name="inventoryMerchant" defaultValue={inventoryMerchant}>
                      <option value="all">全部商户</option>
                      <option value="platform">平台直营</option>
                      {inventoryMerchantOptions
                        .filter((option) => option.merchantId !== "platform")
                        .map((option) => (
                          <option key={option.merchantId} value={option.merchantId}>
                            {option.merchantName}
                            {option.merchantEmail ? ` · ${option.merchantEmail}` : ""}
                          </option>
                        ))}
                    </AutoSubmitSelect>
                  </div>

                  <div className="field">
                    <label htmlFor="inventoryProduct">商品</label>
                    <AutoSubmitSelect id="inventoryProduct" name="inventoryProduct" defaultValue={inventoryProduct}>
                      <option value="all">全部商品</option>
                      {dashboard.products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </AutoSubmitSelect>
                  </div>

                  <div className="field">
                    <label htmlFor="inventoryState">库存状态</label>
                    <AutoSubmitSelect id="inventoryState" name="inventoryState" defaultValue={inventoryState}>
                      <option value="all">全部状态</option>
                      <option value="low">低库存</option>
                      <option value="out">已售罄</option>
                      <option value="healthy">库存正常</option>
                      <option value="disabled">已停用 SKU</option>
                    </AutoSubmitSelect>
                  </div>

                  <button type="submit" className="button-secondary">
                    应用筛选
                  </button>
                </form>

                <div className="admin-stock-strip">
                  <div>
                    <span>筛选后 SKU</span>
                    <strong>{filteredInventoryRows.length}</strong>
                  </div>
                  <div>
                    <span>可售</span>
                    <strong>{filteredAvailable}</strong>
                  </div>
                  <div>
                    <span>占用</span>
                    <strong>{filteredReserved}</strong>
                  </div>
                  <div>
                    <span>已售</span>
                    <strong>{filteredSold}</strong>
                  </div>
                  <div>
                    <span>低库存 / 售罄 / 停用</span>
                    <strong>
                      {filteredLowStockCount} / {filteredOutOfStockCount} / {filteredDisabledCount}
                    </strong>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {showStock || showLedger ? (
        <section className="admin-column-stack">
          {showStock ? (
            <article id="inventory-stock" className="admin-anchor-target admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">SKU Matrix</p>
                  <h2 className="order-title">SKU 库存台账</h2>
                </div>
                <span className="small-copy">选定具体商户后，展示该商户的商品、规格和实时库存</span>
              </div>

              {inventoryMerchant === "all" ? (
                <div className="admin-empty-state">
                  <strong>请先选择一个商户</strong>
                  <p>SKU 库存台账只在选定具体商户后展示。请在上方“归属商户”里选择一个商户（或平台直营）。</p>
                </div>
              ) : filteredInventoryRows.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的 SKU 库存记录</strong>
                  <p>可以换一个商户、商品或库存状态再试，或者先去商品模块补充更多 SKU。</p>
                </div>
              ) : (
                <div className="table-wrap admin-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>商品 / SKU</th>
                        <th>归属商户</th>
                        <th>商品状态</th>
                        <th>库存状态</th>
                        <th>售价</th>
                        <th>可售</th>
                        <th>占用</th>
                        <th>已售</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryRows.map((row) => (
                        <tr key={row.skuId}>
                          <td className="admin-product-table-cell">
                            <strong>{row.productName}</strong>
                            <p className="small-copy">{row.productSlug}</p>
                            <p className="small-copy">{row.skuName}</p>
                          </td>
                          <td>
                            <strong>{row.merchantName}</strong>
                            <p className="small-copy">{row.paymentProfileLabel}</p>
                          </td>
                          <td>
                            <div className="admin-inline-tags">
                              <span className="badge muted">{getProductSaleModeLabel(row.saleMode)}</span>
                              <span className={`badge ${getProductStatusTone(row.productStatus)}`}>
                                {getProductStatusLabel(row.productStatus)}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${getInventoryTone(row.available, row.enabled)}`}>
                              {getInventoryLabel(row.available, row.enabled)}
                            </span>
                            <p className="small-copy">{row.enabled ? "SKU 已启用" : "SKU 已停用"}</p>
                          </td>
                          <td>{describeOrderAmount(row.priceCents)}</td>
                          <td>{row.available}</td>
                          <td>{row.reserved}</td>
                          <td>{row.sold}</td>
                          <td className="admin-table-action-stack">
                            <AdminQuickToggleForm
                              action={toggleSkuEnabledAction}
                              tab="inventory"
                              returnTo={inventoryReturnTo}
                              fields={{ skuId: row.skuId }}
                              active={row.enabled}
                              activeLabel="停用 SKU"
                              inactiveLabel="启用 SKU"
                            />
                            <Link href={buildAdminProductSkuConfigPath(row.productId, row.skuId)} className="button-secondary">
                              配置 SKU
                            </Link>
                            <form action={clearSkuInventoryAction} className="admin-quick-toggle-form">
                              <AdminTabInput tab="inventory" returnTo={inventoryReturnTo} />
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
                <span className="small-copy">选定具体商户后，展示该商户的逐条卡密明细</span>
              </div>

              {inventoryMerchant === "all" ? (
                <div className="admin-empty-state">
                  <strong>请先选择一个商户</strong>
                  <p>逐条卡密明细只在选定具体商户后展示。请在上方“归属商户”里选择一个商户（或平台直营），再查看其库存明细。</p>
                </div>
              ) : filteredInventoryItems.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>没有符合条件的库存明细</strong>
                  <p>换一个筛选条件，或者先给对应 SKU 导入更多卡密。</p>
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
                              item.deliveryFileKey ? (
                                <div className="admin-compact-stack">
                                  <strong>{item.deliveryFileName || "发货文件"}</strong>
                                  {formatFileSize(item.deliveryFileSize) ? (
                                    <p className="small-copy">{formatFileSize(item.deliveryFileSize)}</p>
                                  ) : null}
                                  <form action={deleteCardItemAction} className="admin-compact-form">
                                    <AdminTabInput tab="inventory" returnTo={inventoryReturnTo} />
                                    <input type="hidden" name="cardItemId" value={item.id} />
                                    <input type="hidden" name="productSlug" value={item.product.slug} />
                                    <div className="admin-compact-actions">
                                      <button type="submit" className="button-link">
                                        删除
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              ) : (
                                <form action={updateCardItemAction} className="admin-compact-form">
                                  <AdminTabInput tab="inventory" returnTo={inventoryReturnTo} />
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
                                    <button formAction={deleteCardItemAction} type="submit" className="button-link">
                                      删除
                                    </button>
                                  </div>
                                </form>
                              )
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
        </section>
      ) : null}
    </>
  );
}

function MerchantsSection({
  env,
  merchantAccounts,
  paymentProfiles,
  paymentProfileRevisions,
  defaultPaymentProfile,
  platformAnnouncement,
  platformContact,
  returnTo,
  visibleSectionIds,
}: {
  env: ReturnType<typeof getEnv>;
  merchantAccounts: MerchantAccountWithProfileSnapshot[];
  paymentProfiles: PaymentProfileSnapshot[];
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  defaultPaymentProfile: PaymentProfileSnapshot | null;
  platformAnnouncement: StorefrontAnnouncementSnapshot;
  platformContact: StorefrontContactSnapshot;
  returnTo: string;
  visibleSectionIds?: readonly string[];
}) {
  const merchantLookup = new Map(merchantAccounts.map((merchant) => [merchant.id, merchant]));
  const revisionLookup = new Map<string, PaymentProfileRevisionSummary[]>();
  const activeMerchantAccounts = merchantAccounts.filter((merchant) => merchant.isActive).length;
  const configuredMerchantAccounts = merchantAccounts.filter((merchant) => merchant.paymentProfile).length;
  const pendingMerchantAccounts = merchantAccounts.length - configuredMerchantAccounts;
  const activePaymentProfiles = paymentProfiles.filter((profile) => profile.isActive);
  const platformManagedProfiles = paymentProfiles.filter((profile) => !profile.ownerId).length;
  const merchantManagedProfiles = paymentProfiles.length - platformManagedProfiles;
  const defaultRouteCopy = defaultPaymentProfile
    ? `${defaultPaymentProfile.name} / ${defaultPaymentProfile.merchantCode} · ${getPaymentChannelCopy(defaultPaymentProfile)}`
    : "还没有默认支付路由，建议至少保留一个平台直营商户作为兜底收款。";
  const followUpCopy =
    pendingMerchantAccounts > 0
      ? `还有 ${pendingMerchantAccounts} 个注册商户未提交 NovaPay 参数，商品不要提前绑定到这些商户。`
      : "当前已注册商户都完成了 NovaPay 接入，可以继续做商品、SKU 与店铺分配。";

  for (const revision of paymentProfileRevisions) {
    const existing = revisionLookup.get(revision.paymentProfileId) ?? [];
    existing.push(revision);
    revisionLookup.set(revision.paymentProfileId, existing);
  }

  const showSummary = shouldShowSection(visibleSectionIds, "merchants-summary");
  const showAnnouncement = shouldShowSection(visibleSectionIds, "merchants-announcement");
  const showCreateAccount = shouldShowSection(visibleSectionIds, "merchants-create-account");
  const showCreateProfile = shouldShowSection(visibleSectionIds, "merchants-create-profile");
  const showAccounts = shouldShowSection(visibleSectionIds, "merchants-accounts");
  const showProfiles = shouldShowSection(visibleSectionIds, "merchants-profiles");
  const showTools = showAnnouncement || showCreateAccount || showCreateProfile;

  return (
    <>
      {showSummary ? (
        <section
          id="merchants-summary"
          className="admin-anchor-target admin-overview-grid admin-merchant-overview"
        >
          <article className="admin-surface admin-merchant-summary-panel">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Merchants</p>
                <h2 className="order-title">多商户治理台账</h2>
              </div>
              <span className="badge warning">企业模式</span>
            </div>

            <div className="admin-merchant-lead">
              <span className="admin-soft-tag">Merchant Ops</span>
              <h3>把商户账号、专属店铺和 NovaPay 收款参数统一放进一套可扩展的后台结构里。</h3>
              <p className="muted-copy">
                这个页面现在按企业后台思路拆成了总览、商户台账、支付配置资产三层。商户数量继续增长时，运营也能先看状态，再做具体编辑。
              </p>
            </div>

            <div className="admin-merchant-summary-grid">
              <article className="admin-merchant-summary-card tone-blue">
                <span>注册商户</span>
                <strong>{merchantAccounts.length}</strong>
                <p>{activeMerchantAccounts} 个账号当前启用</p>
              </article>

              <article className="admin-merchant-summary-card tone-violet">
                <span>自助配置完成</span>
                <strong>{configuredMerchantAccounts}</strong>
                <p>待补 NovaPay 参数 {pendingMerchantAccounts} 个</p>
              </article>

              <article className="admin-merchant-summary-card tone-rose">
                <span>启用收款路由</span>
                <strong>{activePaymentProfiles.length}</strong>
                <p>共维护 {paymentProfiles.length} 套商户参数</p>
              </article>

              <article className="admin-merchant-summary-card tone-gold">
                <span>平台直营配置</span>
                <strong>{platformManagedProfiles}</strong>
                <p>商户自营 {merchantManagedProfiles} 套</p>
              </article>
            </div>

            <div className="admin-merchant-note-grid">
              <article className="admin-merchant-note-card">
                <span>默认支付路由</span>
                <strong>{defaultPaymentProfile ? defaultPaymentProfile.name : "未配置"}</strong>
                <p>{defaultRouteCopy}</p>
              </article>

              <article className="admin-merchant-note-card">
                <span>当前待处理事项</span>
                <strong>{pendingMerchantAccounts > 0 ? "补齐商户收款参数" : "商户接入已完成"}</strong>
                <p>{followUpCopy}</p>
              </article>
            </div>
          </article>
        </section>
      ) : null}

      {showTools ? (
        <section className="admin-merchant-tools-grid">
          {showAnnouncement ? (
            <article id="merchants-announcement" className="admin-anchor-target admin-surface admin-merchant-create-panel">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Storefront</p>
              <h2 className="order-title">平台店铺公告</h2>
            </div>
            <span className={`badge ${hasStorefrontAnnouncement(platformAnnouncement) ? "success" : "muted"}`}>
              {hasStorefrontAnnouncement(platformAnnouncement) ? "展示中" : "未启用"}
            </span>
          </div>

          <form action={updatePlatformStorefrontAnnouncementAction} className="inline-form">
            <AdminTabInput tab="merchants" returnTo={returnTo} />

            <div className="field">
              <label htmlFor="platformAnnouncementTitle">公告标题</label>
              <input
                id="platformAnnouncementTitle"
                name="title"
                defaultValue={platformAnnouncement.title ?? ""}
                placeholder="例如 发货时段、活动说明、售后提醒"
              />
            </div>

            <div className="field">
              <label htmlFor="platformAnnouncementBody">公告正文</label>
              <textarea
                id="platformAnnouncementBody"
                name="body"
                defaultValue={platformAnnouncement.body ?? ""}
                placeholder={"支持多行输入，例如：\n1. 官方直营商品 24 小时自动发货\n2. 如遇补货请以页面公告为准"}
                rows={5}
              />
            </div>

            <div className="field">
              <ImageUploadField
                name="coverImage"
                label="店铺封面图"
                hint="展示在店铺首页顶部，建议使用横版图片。"
                initialValue={platformContact.coverImage}
              />
            </div>

            <div className="field">
              <label htmlFor="platformTelegramSupportUrl">Telegram 客服链接</label>
              <input
                id="platformTelegramSupportUrl"
                name="telegramSupportUrl"
                defaultValue={platformContact.telegramSupportUrl ?? ""}
                placeholder="例如 https://t.me/your_support"
              />
            </div>

            <div className="field">
              <label htmlFor="platformTelegramGroupUrl">Telegram 售后群链接</label>
              <input
                id="platformTelegramGroupUrl"
                name="telegramGroupUrl"
                defaultValue={platformContact.telegramGroupUrl ?? ""}
                placeholder="例如 https://t.me/your_group"
              />
            </div>

            <label className="admin-check-row">
              <input type="checkbox" name="enabled" defaultChecked={platformAnnouncement.enabled} />
              <span>在 `/s/platform` 和对应商品详情页展示公告</span>
            </label>

            <div className="button-row">
              <AdminQuickToggleButton
                action={togglePlatformStorefrontAnnouncementEnabledAction}
                active={platformAnnouncement.enabled}
                activeLabel="隐藏公告"
                inactiveLabel="展示公告"
              />
              <button type="submit" className="button-secondary">
                保存平台公告
              </button>
              <Link href={buildPlatformStorefrontPath()} className="button-link">
                查看平台店铺
              </Link>
            </div>

            <p className="small-copy">
              平台公告适合放发货说明、活动通知、售后规则或渠道维护提醒。关闭展示时会保留草稿内容，方便下次再启用。
            </p>
          </form>
            </article>
          ) : null}

          {showCreateAccount ? (
            <article id="merchants-create-account" className="admin-anchor-target admin-surface admin-merchant-create-panel">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Create</p>
              <h2 className="order-title">新增商户账号</h2>
              <p className="small-copy">平台代创建商户登录账号，商户随后自行补齐参数。</p>
            </div>
            <FormDialog
              triggerLabel="新增商户账号"
              triggerClassName="button"
              title="新增商户账号"
              description="创建后密码加密存储，无法查看原文；如需变更用重置密码。"
            >
          <form action={createMerchantAccountAction} className="inline-form">
            <AdminTabInput tab="merchants" returnTo={returnTo} />

            <div className="inline-grid">
              <div className="field">
                <label htmlFor="merchantAccountName">商户名称</label>
                <input id="merchantAccountName" name="name" placeholder="例如 A 站商户" required />
              </div>
              <div className="field">
                <label htmlFor="merchantAccountEmail">登录邮箱</label>
                <input
                  id="merchantAccountEmail"
                  name="email"
                  type="email"
                  placeholder="merchant@example.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="merchantAccountPassword">初始密码</label>
              <input
                id="merchantAccountPassword"
                name="password"
                type="password"
                placeholder="至少 6 位"
                required
              />
            </div>

            <label className="admin-check-row">
              <input type="checkbox" name="isActive" defaultChecked />
              <span>创建后立即启用账号</span>
            </label>

            <div className="button-row">
              <button type="submit" className="button">
                新增商户账号
              </button>
            </div>
          </form>
            </FormDialog>
          </div>
            </article>
          ) : null}

          {showCreateProfile ? (
            <article id="merchants-create-profile" className="admin-anchor-target admin-surface admin-merchant-create-panel">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Create</p>
              <h2 className="order-title">新增平台收款配置</h2>
              <p className="small-copy">维护平台直营、公共路由与兜底路由（NovaPay）。</p>
            </div>
            <FormDialog
              triggerLabel="新增平台配置"
              triggerClassName="button"
              title="新增平台收款配置"
              description="商户自营参数由商户中心配置，这里统一查看与治理。"
            >
          <form action={updatePaymentProfileAction} className="inline-form">
            <AdminTabInput tab="merchants" returnTo={returnTo} />

            <div className="field">
              <label htmlFor="novapayBaseUrl">NovaPay 服务地址</label>
              <input id="novapayBaseUrl" value={env.novaPayBaseUrl} disabled readOnly />
            </div>

            <div className="inline-grid">
              <div className="field">
                <label htmlFor="paymentProfileName">商户名称</label>
                <input id="paymentProfileName" name="name" placeholder="例如 官方直营收款商户" required />
              </div>
              <div className="field">
                <label htmlFor="merchantCode">商户号</label>
                <input id="merchantCode" name="merchantCode" placeholder="mch_xxx" required />
              </div>
            </div>

            <PaymentChannelConfigFields
              fieldPrefix="adminCreatePaymentProfile"
              defaultChannelCode={defaultPaymentProfile?.defaultChannelCode ?? env.defaultChannelCode}
              enabledChannelCodes={defaultPaymentProfile?.enabledChannelCodes ?? [env.defaultChannelCode]}
            />

            <div className="field">
              <label htmlFor="apiKey">API Key</label>
              <input id="apiKey" name="apiKey" placeholder="npk_xxx" required />
            </div>

            <div className="field">
              <label htmlFor="apiSecret">API Secret</label>
              <input id="apiSecret" name="apiSecret" placeholder="nps_xxx" required />
            </div>

            <div className="field">
              <label htmlFor="notifySecret">回调验签密钥</label>
              <input
                id="notifySecret"
                name="notifySecret"
                placeholder="可留空；留空时将不校验回调签名"
              />
            </div>

            <div className="admin-check-row-group">
              <label className="admin-check-row">
                <input type="checkbox" name="isActive" defaultChecked />
                <span>立即启用该商户</span>
              </label>

              <label className="admin-check-row">
                <input type="checkbox" name="isDefault" defaultChecked={!defaultPaymentProfile} />
                <span>设为默认商户</span>
              </label>
            </div>

            <div className="button-row">
              <button type="submit" className="button">
                新增平台配置
              </button>
            </div>
          </form>
            </FormDialog>
          </div>
            </article>
          ) : null}
        </section>
      ) : null}

      {showAccounts || showProfiles ? (
        <section className="admin-column-stack admin-merchant-stack">
          {showAccounts ? (
            <article id="merchants-accounts" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Accounts</p>
              <h2 className="order-title">商户账户台账</h2>
            </div>
            <div className="button-row compact">
              <span className="badge muted">注册 {merchantAccounts.length}</span>
              <span className="badge success">已接入 {configuredMerchantAccounts}</span>
              {pendingMerchantAccounts > 0 ? <span className="badge warning">待补配置 {pendingMerchantAccounts}</span> : null}
            </div>
          </div>

          {merchantAccounts.length === 0 ? (
            <div className="admin-empty-state">
              <strong>还没有商户入驻</strong>
              <p>商户可以从前台“商户入驻”入口注册账号，注册后会出现在这里。</p>
            </div>
          ) : (
            <div className="admin-merchant-account-list">
              {merchantAccounts.map((merchant) => {
                const profile = merchant.paymentProfile;

                return (
                  <details key={merchant.id} className="admin-merchant-account-row">
                    <summary className="admin-merchant-account-summary">
                      <div className="admin-merchant-primary-cell">
                        <strong>{merchant.name}</strong>
                        <span>{merchant.email}</span>
                      </div>

                      <div className="admin-inline-tags">
                        <span className={`badge ${getMerchantAccountStatusTone(merchant)}`}>
                          {getMerchantAccountStatusLabel(merchant)}
                        </span>
                        {profile ? (
                          <span className={`badge ${getPaymentProfileStatusTone(profile)}`}>
                            {getPaymentProfileStatusLabel(profile)}
                          </span>
                        ) : (
                          <span className="badge muted">待配置</span>
                        )}
                      </div>

                      <span className="admin-merchant-summary-profile small-copy">
                        {profile ? `${profile.name} · ${profile.merchantCode}` : "未提交收款参数"}
                      </span>

                      <span className="admin-merchant-summary-time small-copy">
                        {formatDateTime(profile?.updatedAt ?? merchant.updatedAt)}
                      </span>

                      <Link
                        href={buildStorefrontPath(merchant.slug ?? merchant.id)}
                        className="button-link admin-merchant-summary-store"
                      >
                        查看店铺
                      </Link>

                      <span className="admin-merchant-summary-caret" aria-hidden="true">⌄</span>
                    </summary>

                    <div className="admin-merchant-account-actions">
                      <div className="admin-compact-actions">
                        <AdminQuickToggleForm
                          action={toggleMerchantAccountEnabledAction}
                          tab="merchants"
                          returnTo={returnTo}
                          fields={{ merchantAccountId: merchant.id }}
                          active={merchant.isActive}
                          activeLabel="停用账号"
                          inactiveLabel="启用账号"
                        />
                        <span className="small-copy">
                          {merchant.storeAnnouncementEnabled ? "公告展示中" : "公告未启用"} · 专属
                          {" "}/s/{merchant.slug ?? merchant.id}
                        </span>
                      </div>

                      <form action={updateMerchantAccountAction} className="admin-compact-form admin-merchant-account-form">
                        <AdminTabInput tab="merchants" returnTo={returnTo} />
                        <input type="hidden" name="merchantAccountId" value={merchant.id} />
                        <div className="admin-subsection-head">
                          <div>
                            <h3>账号资料</h3>
                            <p className="small-copy">调整商户名称、邮箱和启用状态。</p>
                          </div>
                        </div>
                        <input
                          name="name"
                          defaultValue={merchant.name}
                          placeholder="商户名称"
                          className="admin-compact-input"
                          required
                        />
                        <input
                          name="email"
                          defaultValue={merchant.email}
                          placeholder="商户邮箱"
                          className="admin-compact-input"
                          required
                        />
                        <label className="admin-check-row">
                          <input type="checkbox" name="isActive" defaultChecked={merchant.isActive} />
                          <span>启用账号</span>
                        </label>
                        <div className="admin-compact-actions">
                          <button type="submit" className="button-secondary">
                            更新账号
                          </button>
                          {!profile ? (
                            <button
                              formAction={deleteMerchantAccountAction}
                              formNoValidate
                              type="submit"
                              className="button-link"
                            >
                              删除账号
                            </button>
                          ) : (
                            <span className="small-copy">已绑定收款配置时不可删除</span>
                          )}
                        </div>
                      </form>

                      <form
                        action={resetMerchantAccountPasswordAction}
                        className="admin-compact-form admin-merchant-account-form"
                      >
                        <AdminTabInput tab="merchants" returnTo={returnTo} />
                        <input type="hidden" name="merchantAccountId" value={merchant.id} />
                        <div className="admin-subsection-head">
                          <div>
                            <h3>登录密码</h3>
                            <p className="small-copy">这里只能重置，不能查看原密码。</p>
                          </div>
                        </div>
                        <input
                          name="newPassword"
                          type="password"
                          placeholder="重置新密码（至少 6 位）"
                          className="admin-compact-input"
                          aria-label={`重置 ${merchant.name} 的登录密码`}
                          required
                        />
                        <div className="admin-compact-actions">
                          <button type="submit" className="button-secondary">
                            重置密码
                          </button>
                          <span className="small-copy">原密码为加密存储，无法查看。</span>
                        </div>
                      </form>
                    </div>
                  </details>
                );
              })}
            </div>
          )}
            </article>
          ) : null}

          {showProfiles ? (
            <article id="merchants-profiles" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Profiles</p>
              <h2 className="order-title">支付配置资产</h2>
            </div>
            <div className="button-row compact">
              <span className="badge muted">平台直营 {platformManagedProfiles}</span>
              <span className="badge warning">商户自营 {merchantManagedProfiles}</span>
              <span className="badge success">启用中 {activePaymentProfiles.length}</span>
            </div>
          </div>

          {paymentProfiles.length === 0 ? (
            <div className="admin-empty-state">
              <strong>还没有配置商户</strong>
              <p>先新增至少一个商户，再把商品绑定到对应商户上，前台订单才会按商户分流支付。</p>
            </div>
          ) : (
            <div className="admin-merchant-profile-stack">
              {paymentProfiles.map((profile) => {
                const ownerMerchant = profile.ownerId ? merchantLookup.get(profile.ownerId) : null;
                const profileRevisions = revisionLookup.get(profile.id) ?? [];
                const ownershipLabel = profile.ownerId ? "商户自营" : "平台直营";
                const ownershipCopy = ownerMerchant
                  ? `${ownerMerchant.name} · ${ownerMerchant.email}`
                  : "平台后台维护的公共或兜底收款商户";

                return (
                  <details key={profile.id} className="admin-merchant-profile-item" open={profile.isDefault}>
                    <summary className="admin-merchant-profile-summary">
                      <div className="admin-merchant-profile-main">
                        <div className="admin-merchant-profile-head">
                          <div>
                            <strong>{profile.name}</strong>
                            <p className="small-copy">{profile.merchantCode}</p>
                          </div>
                          <div className="button-row compact">
                            {profile.isDefault ? <span className="badge warning">默认路由</span> : null}
                            <span className="badge muted">{ownershipLabel}</span>
                            <span className={`badge ${getPaymentProfileStatusTone(profile)}`}>
                              {getPaymentProfileStatusLabel(profile)}
                            </span>
                          </div>
                        </div>

                        <p className="admin-merchant-profile-copy">
                          {profile.ownerId
                            ? "该配置来自商户中心自助维护，平台后台保留统一查看和必要修正能力。"
                            : "该配置属于平台直营或公共收款路由，适合官方商品、统一结算和默认兜底场景。"}
                        </p>
                      </div>

                      <div className="admin-merchant-profile-meta-grid">
                        <div className="admin-merchant-meta-chip">
                          <span>归属对象</span>
                          <strong>{ownerMerchant?.name ?? "平台直营"}</strong>
                        </div>
                        <div className="admin-merchant-meta-chip">
                          <span>默认通道</span>
                          <strong>{profile.defaultChannelCode}</strong>
                        </div>
                        <div className="admin-merchant-meta-chip">
                          <span>启用方式</span>
                          <strong>{getPaymentChannelCopy(profile)}</strong>
                        </div>
                        <div className="admin-merchant-meta-chip">
                          <span>维护方式</span>
                          <strong>{ownershipCopy}</strong>
                        </div>
                        <div className="admin-merchant-meta-chip">
                          <span>最近更新</span>
                          <strong>{formatDateTime(profile.updatedAt)}</strong>
                        </div>
                      </div>
                    </summary>

                    <div className="admin-merchant-profile-body">
                      <div className="admin-merchant-profile-toolbar">
                        <div className="admin-merchant-link-cell">
                          <Link href={buildStorefrontPath(profile.ownerId)} className="button-link">
                            {profile.ownerId ? "查看商户店铺" : "查看平台店铺"}
                          </Link>
                          <span>{profile.ownerId ? "当前配置只服务对应商户专属前台" : "当前配置服务平台直营店铺或默认收款路由"}</span>
                        </div>
                        <div className="admin-compact-actions">
                          <p className="small-copy">
                            商品在创建或编辑时会绑定这里的某一套支付商户，订单创建后会固化到该配置对应的 NovaPay 商户。
                          </p>
                          <AdminQuickToggleForm
                            action={togglePaymentProfileEnabledAction}
                            tab="merchants"
                            returnTo={returnTo}
                            fields={{ paymentProfileId: profile.id }}
                            active={profile.isActive}
                            activeLabel="停用商户"
                            inactiveLabel="启用商户"
                          />
                        </div>
                      </div>

                      <form action={updatePaymentProfileAction} className="admin-merchant-profile-form">
                        <AdminTabInput tab="merchants" returnTo={returnTo} />
                        <input type="hidden" name="paymentProfileId" value={profile.id} />

                        <div className="inline-grid">
                          <div className="field">
                            <label>商户名称</label>
                            <input name="name" defaultValue={profile.name} required />
                          </div>
                          <div className="field">
                            <label>商户号</label>
                            <input name="merchantCode" defaultValue={profile.merchantCode} required />
                          </div>
                        </div>

                        <PaymentChannelConfigFields
                          fieldPrefix={`adminEditPaymentProfile-${profile.id}`}
                          defaultChannelCode={profile.defaultChannelCode}
                          enabledChannelCodes={profile.enabledChannelCodes}
                        />

                        <div className="field">
                          <label>API Key</label>
                          <input name="apiKey" defaultValue={profile.apiKey} required />
                        </div>

                        <div className="field">
                          <label>API Secret</label>
                          <input name="apiSecret" defaultValue={profile.apiSecret} required />
                        </div>

                        <div className="field">
                          <label>回调验签密钥</label>
                          <input
                            name="notifySecret"
                            defaultValue={profile.notifySecret ?? ""}
                            placeholder="可留空；留空时将不校验回调签名"
                          />
                        </div>

                        <div className="button-row">
                          <label className="admin-check-row">
                            <input type="checkbox" name="isActive" defaultChecked={profile.isActive} />
                            <span>启用该商户</span>
                          </label>

                          <label className="admin-check-row">
                            <input type="checkbox" name="isDefault" defaultChecked={profile.isDefault} />
                            <span>设为默认商户</span>
                          </label>
                        </div>

                        <div className="button-row">
                          <button type="submit" className="button-secondary">
                            更新商户
                          </button>

                          <button
                            formAction={deletePaymentProfileAction}
                            formNoValidate
                            type="submit"
                            className="button-link"
                          >
                            删除支付商户
                          </button>
                        </div>
                      </form>

                      <div className="admin-merchant-profile-version-panel">
                        <div className="admin-subsection-head">
                          <div>
                            <h3>版本历史</h3>
                            <p className="small-copy">每次保存或回滚都会生成一个可追溯快照，支持按版本恢复。</p>
                          </div>
                          <span className="badge muted">{profileRevisions.length} 条记录</span>
                        </div>

                        {profileRevisions.length === 0 ? (
                          <div className="admin-empty-state">
                            <strong>还没有版本快照</strong>
                            <p>下一次保存这套支付配置后，这里会自动出现可回滚的历史版本。</p>
                          </div>
                        ) : (
                          <div className="admin-merchant-profile-version-list">
                            {profileRevisions.slice(0, 4).map((revision) => (
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
                                    action={rollbackPaymentProfileRevisionAction}
                                    className="admin-merchant-profile-version-action-form"
                                  >
                                    <AdminTabInput tab="merchants" returnTo={returnTo} />
                                    <input type="hidden" name="revisionId" value={revision.id} />
                                    <div className="field admin-merchant-profile-version-field">
                                      <label htmlFor={`admin-rollback-confirm-${revision.id}`}>确认词</label>
                                      <input
                                        id={`admin-rollback-confirm-${revision.id}`}
                                        name="rollbackConfirmation"
                                        placeholder={`输入 v${revision.version}`}
                                        required
                                      />
                                    </div>
                                    <div className="field admin-merchant-profile-version-field">
                                      <label htmlFor={`admin-rollback-reason-${revision.id}`}>回滚原因</label>
                                      <input
                                        id={`admin-rollback-reason-${revision.id}`}
                                        name="rollbackReason"
                                        placeholder="例如：新配置联调失败，先恢复稳定版本"
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
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          )}
            </article>
          ) : null}
        </section>
      ) : null}
    </>
  );
}

function OrdersTableSection({
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
  orders: AdminOrder[];
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
                <th>商品 / SKU</th>
                <th>状态</th>
                <th>金额</th>
                <th>发货</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderNo}</strong>
                    <p className="small-copy">{order.customerEmail}</p>
                  </td>
                  <td>
                    <strong>{order.product.name}</strong>
                    <p className="small-copy">{order.sku.name}</p>
                    <p className="small-copy">
                      {order.paymentProfile ? getPaymentProfileLabel(order.paymentProfile) : "未绑定商户"}
                    </p>
                  </td>
                  <td>
                    <span className={`badge ${getOrderStatusTone(order.status)}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                    <p className="small-copy">{order.novapayStatus ?? "未同步"}</p>
                  </td>
                  <td>{describeOrderAmount(order.amountCents)}</td>
                  <td>
                    {order.status === ShopOrderStatus.FULFILLED && order.cards.length > 0 ? (
                      <p className="small-copy">{maskCardSecret(order.cards[0].secret)}</p>
                    ) : (
                      <span className="small-copy">待发货</span>
                    )}
                  </td>
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
  visibleSectionIds,
}: {
  dashboard: AdminDashboardData;
  visibleSectionIds?: readonly string[];
}) {
  const pendingOrderList = dashboard.orders.filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT);
  const fulfilledOrderList = dashboard.orders.filter((order) => order.status === ShopOrderStatus.FULFILLED);
  const exceptionOrderList = dashboard.orders.filter(
    (order) => order.status === ShopOrderStatus.FAILED || order.status === ShopOrderStatus.EXPIRED,
  );
  const pendingOrders = pendingOrderList.length;
  const fulfilledOrders = fulfilledOrderList.length;
  const failedOrders = exceptionOrderList.length;
  const showSummary = shouldShowSection(visibleSectionIds, "orders-summary");
  const showPending = shouldShowSection(visibleSectionIds, "orders-pending");
  const showFulfilled = shouldShowSection(visibleSectionIds, "orders-fulfilled");
  const showExceptions = shouldShowSection(visibleSectionIds, "orders-exceptions");
  const showRecent = shouldShowSection(visibleSectionIds, "orders-recent");

  const orderStatCards = [
    {
      label: "最近订单",
      value: dashboard.orders.length,
      detail: "后台展示最近 24 笔订单",
      tone: "rose",
    },
    {
      label: "待支付",
      value: pendingOrders,
      detail: "这些订单还在等待 NovaPay 返回支付成功",
      tone: "violet",
    },
    {
      label: "已发货",
      value: fulfilledOrders,
      detail: "支付成功后系统已经自动发卡的订单",
      tone: "blue",
    },
    {
      label: "失败 / 过期",
      value: failedOrders,
      detail: "支付未完成，库存已释放或订单已关闭",
      tone: "gold",
    },
  ] as const;

  return (
    <>
      {showSummary ? (
        <section id="orders-summary" className="admin-anchor-target admin-overview-grid">
          <article className="admin-surface admin-hero-panel">
            <div>
              <span className="admin-soft-tag">订单链路</span>
              <h2>订单在创建时就会固化绑定商户，后续查单、回调、发货都跟着这笔订单自己的商户走。</h2>
              <p className="muted-copy">
                这里可以直接核对商品、SKU、商户和支付状态是否一致，尤其适合做多商户联调排查。
              </p>
            </div>

            <div className="admin-hero-highlight">
              <div className="admin-highlight-card">
                <span>已发货订单</span>
                <strong>{fulfilledOrders}</strong>
                <p>这些订单已经完成支付并发出卡密</p>
              </div>

              <div className="admin-highlight-card">
                <span>待支付订单</span>
                <strong>{pendingOrders}</strong>
                <p>如果长时间未完成支付，系统会自动释放占用库存</p>
              </div>
            </div>
          </article>

          <div className="admin-stat-grid">
            {orderStatCards.map((card) => (
              <article key={card.label} className={`admin-surface admin-stat-card tone-${card.tone}`}>
                <p>{card.label}</p>
                <strong>{card.value}</strong>
                <span>{card.detail}</span>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {showPending || showFulfilled || showExceptions || showRecent ? (
        <section className="admin-column-stack">
          {showPending ? (
            <OrdersTableSection
              id="orders-pending"
              kicker="Pending"
              title="待支付订单"
              helper="重点关注长时间未支付、需要催单或回查的订单"
              emptyTitle="没有待支付订单"
              emptyDescription="当前最近订单里没有等待支付完成的记录。"
              orders={pendingOrderList}
            />
          ) : null}

          {showFulfilled ? (
            <OrdersTableSection
              id="orders-fulfilled"
              kicker="Fulfilled"
              title="已发货订单"
              helper="重点核对已成交订单、发卡结果和商户归属"
              emptyTitle="还没有已发货订单"
              emptyDescription="支付成功并自动发货后，订单会出现在这里。"
              orders={fulfilledOrderList}
            />
          ) : null}

          {showExceptions ? (
            <OrdersTableSection
              id="orders-exceptions"
              kicker="Exceptions"
              title="异常订单"
              helper="查看支付失败、过期和需要人工关注的订单"
              emptyTitle="没有异常订单"
              emptyDescription="最近订单里没有失败或过期的记录。"
              orders={exceptionOrderList}
            />
          ) : null}

          {showRecent ? (
            <OrdersTableSection
              id="orders-recent"
              kicker="Orders"
              title="最近订单"
              helper="支付状态和发货状态会自动同步"
              emptyTitle="还没有订单记录"
              emptyDescription="创建商品并补一批卡密后，就可以从前台直接测试下单、支付和自动发货。"
              orders={dashboard.orders}
            />
          ) : null}
        </section>
      ) : null}
    </>
  );
}

export function AdminConsoleView({
  currentTab,
  currentView,
  search,
  env,
  dashboard,
  merchantAccounts,
  paymentProfiles,
  paymentProfileRevisions,
  platformAnnouncement,
  platformContact,
  paymentOperations,
  selectedProductId,
  selectedSkuId,
  productsReturnTo,
}: {
  currentTab: AdminTab;
  currentView: AdminTabView;
  search: Record<string, string | undefined>;
  env: ReturnType<typeof getEnv>;
  dashboard: AdminDashboardData;
  merchantAccounts: MerchantAccountWithProfileSnapshot[];
  paymentProfiles: PaymentProfileSnapshot[];
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  platformAnnouncement: StorefrontAnnouncementSnapshot;
  platformContact: StorefrontContactSnapshot;
  paymentOperations: PaymentOperationsData | null;
  selectedProductId?: string;
  selectedSkuId?: string;
  productsReturnTo?: string;
}) {
  const tabMeta = ADMIN_TAB_META[currentTab];
  const currentGroup = getAdminNavGroup(currentTab);
  const currentSections = getAdminPageSections(currentTab).filter((section) =>
    currentView.sectionIds.includes(section.id),
  );
  const currentTabViews = getAdminTabViews(currentTab);
  const defaultPaymentProfile =
    paymentProfiles.find((profile) => profile.isActive && profile.isDefault) ??
    paymentProfiles.find((profile) => profile.isActive) ??
    null;
  const activePaymentProfiles = paymentProfiles.filter((profile) => profile.isActive);
  const reservedCards = dashboard.products.reduce((sum, product) => sum + product.stock.reserved, 0);
  const soldCards = dashboard.products.reduce((sum, product) => sum + product.stock.sold, 0);
  const pendingOrders = dashboard.orders.filter(
    (order) => order.status === ShopOrderStatus.PENDING_PAYMENT,
  ).length;
  const lowStockProducts = dashboard.products.filter(
    (product) => product.status === ProductStatus.ACTIVE && product.stock.available === 0,
  ).length;

  const statCards = [
    {
      label: "商品总数",
      value: dashboard.stats.productCount,
      detail: `${dashboard.stats.activeCount} 个商品正在上架`,
      tone: "rose",
    },
    {
      label: "SKU 数量",
      value: dashboard.stats.skuCount,
      detail: "每个 SKU 独立定价、独立库存",
      tone: "violet",
    },
    {
      label: "可售卡密",
      value: dashboard.stats.availableCards,
      detail: `占用 ${reservedCards} / 已售 ${soldCards}`,
      tone: "blue",
    },
    {
      label: "成交流水",
      value: describeOrderAmount(dashboard.stats.paidVolume),
      detail: `待支付 ${pendingOrders} 笔 / 缺货商品 ${lowStockProducts} 个`,
      tone: "gold",
    },
  ] as const;

  const moduleCards = [
    {
      tab: "products" as const,
      title: "商品模块",
      detail: `${dashboard.stats.productCount} 个商品 / ${dashboard.stats.skuCount} 个 SKU`,
      helper: "改商品模式、改价格、切换商品商户都在这里。",
    },
    {
      tab: "inventory" as const,
      title: "库存模块",
      detail: `${dashboard.stats.availableCards} 条可售卡密`,
      helper: "按 SKU 导入卡密，避免发错规格。",
    },
    {
      tab: "merchants" as const,
      title: "商户模块",
      detail: `${merchantAccounts.length} 个注册商户 / ${activePaymentProfiles.length} 个启用收款商户`,
      helper: "查看入驻商户，并维护 NovaPay 多商户配置。",
    },
    {
      tab: "payments" as const,
      title: "支付模块",
      detail: `${dashboard.stats.pendingOrders} 笔待支付 / ${dashboard.stats.fulfilledOrders} 笔已成交`,
      helper: "统一查看支付尝试、回调日志和补偿任务。",
    },
    {
      tab: "orders" as const,
      title: "订单模块",
      detail: `${dashboard.orders.length} 笔最近订单`,
      helper: "核对支付状态、发货状态和订单归属商户。",
    },
  ] as const;

  return (
    <div className="admin-route admin-console-shell">
      <aside className="admin-sidebar admin-sidebar-classic">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">N</div>
          <div>
            <p className="admin-sidebar-kicker">NoveShop</p>
            <h2>管理控制台</h2>
          </div>
        </div>

        <nav className="admin-menu">
          {ADMIN_NAV_GROUPS.map((group) => (
            <div key={group.key} className="admin-menu-group">
              <p className="admin-menu-group-label">{group.label}</p>
              {group.tabs.map((tab) => {
                const active = currentTab === tab;
                return (
                  <div key={tab} className="admin-menu-item-wrap">
                    <Link
                      href={buildAdminHref(tab)}
                      className={`admin-menu-item${active ? " active" : ""}`}
                    >
                      <span className="admin-menu-icon">{ADMIN_TAB_META[tab].icon}</span>
                      <span className="admin-menu-label">{ADMIN_TAB_META[tab].label}</span>
                    </Link>

                    {active && currentTabViews.length > 1 ? (
                      <div className="admin-menu-subnav">
                        {currentTabViews.map((view) => (
                          <Link
                            key={view.key}
                            href={view.href}
                            className={`admin-menu-subitem${currentView.key === view.key ? " active" : ""}`}
                          >
                            {view.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="admin-menu-group">
            <p className="admin-menu-group-label">快捷入口</p>
            <Link href="/" className="admin-menu-item">
              <span className="admin-menu-icon">店</span>
              <span className="admin-menu-label">前台首页</span>
            </Link>
            <Link href="/query" className="admin-menu-item">
              <span className="admin-menu-icon">查</span>
              <span className="admin-menu-label">订单查询</span>
            </Link>
          </div>
        </nav>

        <div className="admin-sidebar-foot">
          <span className="admin-sidebar-foot-dot" aria-hidden="true" />
          <div>
            <strong>NovaPay 已接入</strong>
            <small>默认商户：{defaultPaymentProfile?.name || "未配置"}</small>
          </div>
        </div>
      </aside>

      <div className="admin-console-main">
        <header className="admin-topbar">
          <div className="admin-topbar-copy">
            <p className="admin-topbar-kicker">{tabMeta.kicker}</p>
            <h1 className="admin-heading">{tabMeta.title}</h1>
            <p className="section-copy">{tabMeta.description}</p>
            <div className="admin-topbar-context">
              <span className="badge muted">{currentGroup.label}</span>
              {currentTabViews.length > 1 ? <span className="badge success">{currentView.label}</span> : null}
              <span className="small-copy">本页共 {currentSections.length} 个工作区块</span>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <div className="admin-user-pill">
              <span className="admin-user-avatar">D</span>
              <div>
                <strong>{env.adminUsername}</strong>
                <p className="small-copy">单管理员模式</p>
              </div>
            </div>

            <Link href={buildPlatformStorefrontPath()} className="button-secondary">
              预览前台
            </Link>

            <form action={logoutAction}>
              <button type="submit" className="button">
                退出登录
              </button>
            </form>
          </div>
        </header>

        {search.error ? <div className="notice-card error admin-console-notice">{search.error}</div> : null}
        {search.success ? <div className="notice-card success admin-console-notice">{search.success}</div> : null}

        {currentTab === "overview" ? (
          <OverviewSection
            dashboard={dashboard}
            statCards={statCards}
            lowStockProducts={lowStockProducts}
            moduleCards={moduleCards}
            paymentProfiles={paymentProfiles}
          />
        ) : null}

        {currentTab === "products" ? (
          <ProductsSection
            dashboard={dashboard}
            paymentProfiles={paymentProfiles}
            defaultPaymentProfile={defaultPaymentProfile}
            visibleSectionIds={currentView.sectionIds}
            returnTo={productsReturnTo ?? currentView.href}
            selectedProductId={selectedProductId}
            selectedSkuId={selectedSkuId}
          />
        ) : null}

        {currentTab === "inventory" ? (
          <InventorySection
            dashboard={dashboard}
            merchantAccounts={merchantAccounts}
            search={search}
            visibleSectionIds={currentView.sectionIds}
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "merchants" ? (
          <MerchantsSection
            env={env}
            merchantAccounts={merchantAccounts}
            paymentProfiles={paymentProfiles}
            paymentProfileRevisions={paymentProfileRevisions}
            defaultPaymentProfile={defaultPaymentProfile}
            platformAnnouncement={platformAnnouncement}
            platformContact={platformContact}
            returnTo={currentView.href}
            visibleSectionIds={currentView.sectionIds}
          />
        ) : null}

        {currentTab === "payments" && paymentOperations ? (
          <PaymentOperationsView
            scope="admin"
            data={paymentOperations}
            paymentProfiles={paymentProfiles}
            basePath={currentView.href}
            visibleSectionIds={currentView.sectionIds}
          />
        ) : null}

        {currentTab === "orders" ? <OrdersSection dashboard={dashboard} visibleSectionIds={currentView.sectionIds} /> : null}
      </div>
    </div>
  );
}
