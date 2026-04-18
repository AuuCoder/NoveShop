import Link from "next/link";
import { CardItemStatus, ProductSaleMode, ProductStatus, ShopOrderStatus } from "@prisma/client";
import { PaymentChannelConfigFields } from "@/app/payment-channel-config-fields";
import { PaymentOperationsView } from "@/app/payment-operations-view";
import {
  clearSkuInventoryAction,
  createMerchantAccountAction,
  createProductAction,
  createSkuAction,
  deleteCardItemAction,
  deleteMerchantAccountAction,
  deletePaymentProfileAction,
  deleteProductAction,
  deleteSkuAction,
  importCardsAction,
  logoutAction,
  resetMerchantAccountPasswordAction,
  rollbackPaymentProfileRevisionAction,
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
import {
  hasStorefrontAnnouncement,
  type StorefrontAnnouncementSnapshot,
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
import { formatDateTime, maskCardSecret } from "@/lib/utils";

type AdminDashboardData = Awaited<ReturnType<typeof getAdminDashboardData>>;
type AdminProduct = AdminDashboardData["products"][number];
type AdminOrder = AdminDashboardData["orders"][number];

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

function getMerchantAccountStatusTone(merchant: MerchantAccountWithProfileSnapshot) {
  return merchant.isActive ? "success" : "muted";
}

function getMerchantAccountStatusLabel(merchant: MerchantAccountWithProfileSnapshot) {
  return merchant.isActive ? "启用中" : "已停用";
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

function shouldShowSection(visibleSectionIds: readonly string[] | undefined, sectionId: string) {
  if (!visibleSectionIds || visibleSectionIds.length === 0) {
    return true;
  }

  return visibleSectionIds.includes(sectionId);
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
              <div className="admin-sku-stack">
                {paymentProfiles.map((profile) => (
                  <div key={profile.id} className="admin-sku-card">
                    <div className="admin-sku-head">
                      <div>
                        <strong>{profile.name}</strong>
                        <p className="small-copy">{profile.merchantCode}</p>
                      </div>
                      <div className="button-row compact">
                        {profile.isDefault ? <span className="badge warning">默认商户</span> : null}
                        <span className={`badge ${getPaymentProfileStatusTone(profile)}`}>
                          {getPaymentProfileStatusLabel(profile)}
                        </span>
                      </div>
                    </div>
                    <p className="small-copy">默认通道：{profile.defaultChannelCode}</p>
                    <p className="small-copy">启用方式：{getPaymentChannelCopy(profile)}</p>
                    <p className="small-copy">{profile.ownerId ? "来源：商户自助配置" : "来源：平台维护"}</p>
                  </div>
                ))}
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

function ProductsSection({
  dashboard,
  paymentProfiles,
  defaultPaymentProfile,
  visibleSectionIds,
  returnTo,
}: {
  dashboard: AdminDashboardData;
  paymentProfiles: PaymentProfileSnapshot[];
  defaultPaymentProfile: PaymentProfileSnapshot | null;
  visibleSectionIds?: readonly string[];
  returnTo?: string;
}) {
  const showCreate = shouldShowSection(visibleSectionIds, "products-create");
  const showCatalog = shouldShowSection(visibleSectionIds, "products-catalog");

  return (
    <section className="admin-content-grid">
      {showCreate ? (
        <div className="admin-column-stack">
          <article id="products-create" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Create</p>
              <h2 className="order-title">创建商品</h2>
            </div>
            <span className="badge muted">首个 SKU 一起创建</span>
          </div>

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
          </article>
        </div>
      ) : null}

      {showCatalog ? (
        <div className="admin-column-stack">
          <article id="products-catalog" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Products</p>
              <h2 className="order-title">商品与 SKU</h2>
            </div>
            <span className="small-copy">商品负责展示，SKU 负责价格和库存</span>
          </div>

          {dashboard.products.length === 0 ? (
            <div className="admin-empty-state">
              <strong>还没有商品</strong>
              <p>先创建一个商品和默认规格，再导入卡密，就能在前台看到单商品或多 SKU 的效果。</p>
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
                          {getAdminProductStorefrontPath(product)} · 最近更新{" "}
                          {formatDateTime(product.updatedAt)}
                        </p>
                        <p className="small-copy">{getProductSaleModeCopy(product.saleMode)}</p>
                        <p className="small-copy">
                          收款商户：
                          {product.paymentProfile
                            ? ` ${getPaymentProfileLabel(product.paymentProfile)}`
                            : " 未绑定，将走默认商户"}
                        </p>
                      </div>

                        <div className="admin-product-actions">
                          <span className="badge muted">{getProductSaleModeLabel(product.saleMode)}</span>
                          <span className={`badge ${getProductStatusTone(product.status)}`}>
                            {getProductStatusLabel(product.status)}
                          </span>
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
                              <form key={sku.id} action={updateSkuAction} className="admin-sku-card">
                                <AdminTabInput tab="products" returnTo={returnTo} />
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
                                    formAction={deleteSkuAction}
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

                          <form action={createSkuAction} className="admin-sku-create">
                            <AdminTabInput tab="products" returnTo={returnTo} />
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
                          <form action={updateSkuAction} className="admin-sku-card">
                            <AdminTabInput tab="products" returnTo={returnTo} />
                            <input type="hidden" name="skuId" value={singleModeSku.id} />
                            <input type="hidden" name="productSlug" value={product.slug} />

                            <div className="admin-sku-head">
                              <div>
                                <strong>{singleModeSku.name}</strong>
                                <p className="small-copy">
                                  可售 {singleModeSku.stock.available} / 占用 {singleModeSku.stock.reserved} / 已售{" "}
                                  {singleModeSku.stock.sold}
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
                                  formAction={deleteSkuAction}
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
        </div>
      ) : null}
    </section>
  );
}

function InventorySection({ dashboard }: { dashboard: AdminDashboardData }) {
  return (
    <section className="admin-content-grid">
      <div className="admin-column-stack">
        <article id="inventory-import" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Import</p>
              <h2 className="order-title">导入卡密</h2>
            </div>
            <span className="badge success">按 SKU 入库</span>
          </div>

          <form action={importCardsAction} className="inline-form">
            <AdminTabInput tab="inventory" />

            <div className="field">
              <label htmlFor="skuId">选择 SKU</label>
              <select id="skuId" name="skuId" required defaultValue="">
                <option value="" disabled>
                  先选择一个 SKU
                </option>
                {dashboard.products.map((product) => (
                  <optgroup key={product.id} label={product.name}>
                    {product.skus.map((sku) => (
                      <option key={sku.id} value={sku.id}>
                        {sku.name} · {sku.stock.available} 库存
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="batchName">批次名</label>
              <input id="batchName" name="batchName" placeholder="例如 2026-04 首批" />
            </div>

            <div className="field">
              <label htmlFor="rawCards">卡密内容</label>
              <textarea
                id="rawCards"
                name="rawCards"
                placeholder={"一行一条卡密\nCARD-001\nCARD-002"}
                required
              />
            </div>

            <p className="small-copy">库存是按 SKU 维度管理的，多 SKU 商品一定要导入到具体规格，发货才会准确。</p>

            <button type="submit" className="button-secondary">
              批量导入
            </button>
          </form>
        </article>
      </div>

      <div className="admin-column-stack">
        <article id="inventory-stock" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Stock</p>
              <h2 className="order-title">库存视图</h2>
            </div>
            <Link href={buildAdminHref("products")} className="button-link">
              去商品模块
            </Link>
          </div>

          {dashboard.products.length === 0 ? (
            <div className="admin-empty-state">
              <strong>还没有商品</strong>
              <p>先去商品模块创建商品和 SKU，再回来导入库存。</p>
            </div>
          ) : (
            <div className="admin-product-list">
              {dashboard.products.map((product) => (
                <article key={product.id} className="admin-product-item">
                  <div className="admin-product-head">
                    <div>
                      <h3>{product.name}</h3>
                      <p className="small-copy">{getAdminProductStorefrontPath(product)}</p>
                      <p className="small-copy">{getProductSaleModeCopy(product.saleMode)}</p>
                      <p className="small-copy">
                        收款商户：
                        {product.paymentProfile
                          ? ` ${getPaymentProfileLabel(product.paymentProfile)}`
                          : " 未绑定，将走默认商户"}
                      </p>
                    </div>
                    <div className="admin-product-actions">
                      <span className="badge muted">{getProductSaleModeLabel(product.saleMode)}</span>
                      <Link href={getAdminProductStorefrontPath(product)} className="button-link">
                        查看前台
                      </Link>
                    </div>
                  </div>

                  <div className="admin-stock-strip">
                    <div>
                      <span>可售</span>
                      <strong>{product.stock.available}</strong>
                    </div>
                    <div>
                      <span>占用</span>
                      <strong>{product.stock.reserved}</strong>
                    </div>
                    <div>
                      <span>已售</span>
                      <strong>{product.stock.sold}</strong>
                    </div>
                  </div>

                  <div className="admin-sku-stack">
                    {product.skus.map((sku) => (
                      <div key={sku.id} className="admin-sku-card">
                        <div className="admin-sku-head">
                          <div>
                            <strong>{sku.name}</strong>
                            <p className="small-copy">{describeOrderAmount(sku.priceCents)}</p>
                          </div>
                          <span className={`badge ${sku.enabled ? "success" : "muted"}`}>
                            {sku.enabled ? "启用中" : "已停用"}
                          </span>
                        </div>
                        <p className="small-copy">
                          可售 {sku.stock.available} / 占用 {sku.stock.reserved} / 已售 {sku.stock.sold}
                        </p>
                        <p className="small-copy">{sku.summary || "暂无 SKU 说明"}</p>
                        <form action={clearSkuInventoryAction} className="admin-compact-actions">
                          <AdminTabInput tab="inventory" />
                          <input type="hidden" name="skuId" value={sku.id} />
                          <input type="hidden" name="productSlug" value={product.slug} />
                          <button type="submit" className="button-link">
                            清空可售库存
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>

        <article id="inventory-ledger" className="admin-anchor-target admin-surface">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Ledger</p>
              <h2 className="order-title">库存明细台账</h2>
            </div>
            <span className="small-copy">最近 80 条库存记录，可直接维护可售卡密</span>
          </div>

          {dashboard.inventoryItems.length === 0 ? (
            <div className="admin-empty-state">
              <strong>还没有库存记录</strong>
              <p>导入卡密后，这里会出现每一条库存的批次、状态和操作入口。</p>
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
                  {dashboard.inventoryItems.map((item) => (
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
                          <form action={updateCardItemAction} className="admin-compact-form">
                            <AdminTabInput tab="inventory" />
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
      </div>
    </section>
  );
}

function MerchantsSection({
  env,
  merchantAccounts,
  paymentProfiles,
  paymentProfileRevisions,
  defaultPaymentProfile,
  platformAnnouncement,
  returnTo,
  visibleSectionIds,
}: {
  env: ReturnType<typeof getEnv>;
  merchantAccounts: MerchantAccountWithProfileSnapshot[];
  paymentProfiles: PaymentProfileSnapshot[];
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  defaultPaymentProfile: PaymentProfileSnapshot | null;
  platformAnnouncement: StorefrontAnnouncementSnapshot;
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

            <label className="admin-check-row">
              <input type="checkbox" name="enabled" defaultChecked={platformAnnouncement.enabled} />
              <span>在 `/store/platform` 和对应商品详情页展示公告</span>
            </label>

            <div className="button-row">
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
            </div>
            <span className="badge muted">Account</span>
          </div>

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

            <p className="small-copy">
              适合平台先代创建商户账号，再交由商户自行登录并补齐 NovaPay 参数、商品和库存。
              密码只会加密存储，创建后后台不能查看原文，如需变更请使用下方重置密码。
            </p>

            <button type="submit" className="button">
              新增商户账号
            </button>
          </form>
            </article>
          ) : null}

          {showCreateProfile ? (
            <article id="merchants-create-profile" className="admin-anchor-target admin-surface admin-merchant-create-panel">
          <div className="admin-section-head">
            <div>
              <p className="admin-section-kicker">Create</p>
              <h2 className="order-title">新增平台收款配置</h2>
            </div>
            <span className="badge warning">NovaPay</span>
          </div>

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

            <div className="button-row">
              <label className="admin-check-row">
                <input type="checkbox" name="isActive" defaultChecked />
                <span>立即启用该商户</span>
              </label>

              <label className="admin-check-row">
                <input type="checkbox" name="isDefault" defaultChecked={!defaultPaymentProfile} />
                <span>设为默认商户</span>
              </label>
            </div>

            <p className="small-copy">
              这里主要维护平台直营、公共路由和兜底路由。商户自营的 NovaPay 参数由商户中心自行配置，这里统一查看与治理。
            </p>

            <button type="submit" className="button">
              新增平台配置
            </button>
          </form>
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
                  <article key={merchant.id} className="admin-merchant-account-card">
                    <div className="admin-merchant-account-head">
                      <div className="admin-merchant-primary-cell">
                        <strong>{merchant.name}</strong>
                        <span>{merchant.email}</span>
                      </div>

                      <div className="admin-inline-tags">
                        <span className={`badge ${getMerchantAccountStatusTone(merchant)}`}>
                          {getMerchantAccountStatusLabel(merchant)}
                        </span>
                        {profile ? (
                          <>
                            <span className="badge warning">商户自助</span>
                            <span className={`badge ${getPaymentProfileStatusTone(profile)}`}>
                              {getPaymentProfileStatusLabel(profile)}
                            </span>
                          </>
                        ) : (
                          <span className="badge muted">待配置</span>
                        )}
                        <span className={`badge ${merchant.storeAnnouncementEnabled ? "success" : "muted"}`}>
                          {merchant.storeAnnouncementEnabled ? "公告展示中" : "公告未启用"}
                        </span>
                      </div>
                    </div>

                    <div className="admin-merchant-account-meta-grid">
                      <div className="admin-merchant-meta-chip">
                        <span>收款配置</span>
                        <strong>{profile ? profile.name : "未提交收款参数"}</strong>
                        <p className="small-copy">
                          {profile
                            ? `${profile.merchantCode} · ${profile.defaultChannelCode}`
                            : "等待商户在商户中心配置 NovaPay 参数"}
                        </p>
                      </div>

                      <div className="admin-merchant-meta-chip">
                        <span>配置进度</span>
                        <strong>{profile ? "已完成基础接入" : "等待商户补齐参数"}</strong>
                        <p className="small-copy">
                          {profile
                            ? profile.isActive
                              ? "该商户商品可直接使用这套配置收款。"
                              : "参数已保存，但目前不会参与下单收款。"
                            : "商品绑定前，建议先完成收款配置。"}
                        </p>
                      </div>

                      <div className="admin-merchant-meta-chip">
                        <span>最近变更</span>
                        <strong>{formatDateTime(profile?.updatedAt ?? merchant.updatedAt)}</strong>
                        <p className="small-copy">
                          {profile ? "最近更新收款参数" : `入驻时间 ${formatDateTime(merchant.createdAt)}`}
                        </p>
                      </div>

                      <div className="admin-merchant-meta-chip">
                        <span>店铺入口</span>
                        <strong>
                          <Link href={buildStorefrontPath(merchant.id)} className="button-link">
                            查看店铺
                          </Link>
                        </strong>
                        <p className="small-copy">专属 `/store/{merchant.id}` 前台链接</p>
                      </div>
                    </div>

                    <div className="admin-merchant-account-actions">
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
                  </article>
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
                        <p className="small-copy">
                          商品在创建或编辑时会绑定这里的某一套支付商户，订单创建后会固化到该配置对应的 NovaPay 商户。
                        </p>
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
  paymentOperations,
}: {
  currentTab: AdminTab;
  currentView: AdminTabView;
  search: {
    error?: string;
    success?: string;
  };
  env: ReturnType<typeof getEnv>;
  dashboard: AdminDashboardData;
  merchantAccounts: MerchantAccountWithProfileSnapshot[];
  paymentProfiles: PaymentProfileSnapshot[];
  paymentProfileRevisions: PaymentProfileRevisionSummary[];
  platformAnnouncement: StorefrontAnnouncementSnapshot;
  paymentOperations: PaymentOperationsData | null;
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
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">N</div>
          <div>
            <p className="admin-sidebar-kicker">NoveShop</p>
            <h2>HANOCUN</h2>
          </div>
        </div>

        <div className="admin-sidebar-group">
          <p className="admin-sidebar-title">Navigation</p>
          <div className="admin-sidebar-cluster-list">
            {ADMIN_NAV_GROUPS.map((group) => (
              <section
                key={group.key}
                className={`admin-sidebar-cluster${currentGroup.key === group.key ? " active" : ""}`}
              >
                <div className="admin-sidebar-cluster-head">
                  <span>{group.kicker}</span>
                  <strong>{group.label}</strong>
                  <p>{group.description}</p>
                </div>

                <div className="admin-sidebar-branch-list">
                  {group.tabs.map((tab) => (
                    <div key={tab} className={`admin-sidebar-branch${currentTab === tab ? " active" : ""}`}>
                      <Link
                        href={buildAdminHref(tab)}
                        className={`admin-sidebar-link${currentTab === tab ? " active" : ""}`}
                      >
                        <span className="admin-sidebar-icon">{ADMIN_TAB_META[tab].icon}</span>
                        <span className="admin-sidebar-link-copy">
                          <strong>{ADMIN_TAB_META[tab].label}</strong>
                          <small>{ADMIN_TAB_META[tab].title}</small>
                        </span>
                        {currentTab === tab ? (
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
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="admin-sidebar-group">
          <p className="admin-sidebar-title">Shortcuts</p>
          <nav className="admin-sidebar-nav">
            <Link href="/" className="admin-sidebar-link">
              <span className="admin-sidebar-icon">店</span>
              <span className="admin-sidebar-link-copy">
                <strong>前台首页</strong>
                <small>查看平台店铺当前展示效果</small>
              </span>
            </Link>
            <Link href="/query" className="admin-sidebar-link">
              <span className="admin-sidebar-icon">查</span>
              <span className="admin-sidebar-link-copy">
                <strong>订单查询</strong>
                <small>按订单号或邮箱快速查单</small>
              </span>
            </Link>
          </nav>
        </div>

        <article className="admin-sidebar-panel">
          <p className="admin-sidebar-title">Bridge</p>
          <h3>NovaPay 已接入</h3>
          <p className="muted-copy">当前后台使用同目录 NovaPay 商户接口创建支付单，并通过业务回调自动发货。</p>

          <div className="admin-sidebar-meta">
            <div>
              <span>当前分组</span>
              <strong>{currentGroup.label}</strong>
            </div>
            <div>
              <span>当前模块</span>
              <strong>{tabMeta.label}</strong>
            </div>
            <div>
              <span>默认商户</span>
              <strong>{defaultPaymentProfile?.name || "未配置"}</strong>
            </div>
            <div>
              <span>NovaPay 地址</span>
              <strong>{env.novaPayBaseUrl}</strong>
            </div>
            <div>
              <span>启用商户</span>
              <strong>{activePaymentProfiles.length}</strong>
            </div>
            <div>
              <span>注册商户</span>
              <strong>{merchantAccounts.length}</strong>
            </div>
          </div>
        </article>
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
            returnTo={currentView.href}
          />
        ) : null}

        {currentTab === "inventory" ? <InventorySection dashboard={dashboard} /> : null}

        {currentTab === "merchants" ? (
          <MerchantsSection
            env={env}
            merchantAccounts={merchantAccounts}
            paymentProfiles={paymentProfiles}
            paymentProfileRevisions={paymentProfileRevisions}
            defaultPaymentProfile={defaultPaymentProfile}
            platformAnnouncement={platformAnnouncement}
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
