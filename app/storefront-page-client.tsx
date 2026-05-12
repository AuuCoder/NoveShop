"use client";

import Link from "next/link";
import { useMemo } from "react";
import { type SiteLanguage, useSitePreferences } from "@/app/ui-preferences";
import {
  buildMerchantStorefrontProductPath,
  buildPlatformProductPath,
} from "@/lib/storefront";

type StorefrontProductSnapshot = {
  description: string | null;
  id: string;
  name: string;
  saleMode: "MULTI" | "SINGLE";
  slug: string;
  startingPriceCents: number;
  stock: {
    available: number;
  };
  summary: string | null;
  skus: Array<{
    id: string;
    name: string;
    priceCents: number;
    stock: {
      available: number;
    };
    summary: string | null;
  }>;
};

type StorefrontAnnouncementSnapshot = {
  body: string | null;
  enabled: boolean;
  title: string | null;
  updatedAt: string | null;
};

type StorefrontPageClientProps = {
  announcement: StorefrontAnnouncementSnapshot | null;
  merchantId: string;
  merchantName: string | null;
  paymentProfileActive: boolean;
  paymentProfileConfigured: boolean;
  peerStoreCount: number;
  platformStore: boolean;
  products: StorefrontProductSnapshot[];
  searchKeyword: string;
  storefrontPath: string;
};

function formatCurrency(cents: number, language: SiteLanguage) {
  return new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US", {
    currency: "CNY",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(cents / 100);
}

function formatDateTime(value: string | null, language: SiteLanguage) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function hasStorefrontAnnouncement(announcement: StorefrontAnnouncementSnapshot | null | undefined) {
  return Boolean(announcement?.enabled && (announcement.title || announcement.body));
}

function matchesKeyword(values: Array<string | null | undefined>, keyword: string) {
  if (!keyword) {
    return true;
  }

  return values
    .join(" ")
    .toLowerCase()
    .includes(keyword);
}

function getProductModeBadgeText(
  language: SiteLanguage,
  mode: StorefrontProductSnapshot["saleMode"],
  skuCount: number,
  hasStock: boolean,
) {
  if (!hasStock) {
    return language === "zh" ? "缺货" : "Out of stock";
  }

  if (mode === "MULTI") {
    return language === "zh" ? `${skuCount} 个 SKU` : `${skuCount} SKUs`;
  }

  return language === "zh" ? "单商品" : "Single item";
}

function getProductModeLabel(language: SiteLanguage, mode: StorefrontProductSnapshot["saleMode"]) {
  if (mode === "MULTI") {
    return language === "zh" ? "多 SKU" : "Multi SKU";
  }

  return language === "zh" ? "单商品" : "Single item";
}

function getStorefrontCopy(
  language: SiteLanguage,
  platformStore: boolean,
  merchantName: string | null,
) {
  if (language === "en") {
    return {
      allProducts: "All products",
      announcementBadgeMerchant: "Merchant announcement",
      announcementBadgePlatform: "Platform announcement",
      announcementFallback: "This storefront has announcement display enabled.",
      availableSkus: "Available SKUs",
      availableStock: "Available stock",
      backHome: "Back to homepage",
      clearFilter: "Clear filter",
      ctaMulti: "Choose SKU",
      ctaSingle: "Buy now",
      disabledPaymentProfile:
        "This merchant's NovaPay payment profile is disabled. Products can still be browsed, but checkout will be blocked.",
      introCopy: platformStore
        ? "This is the platform-operated official store for platform-owned products, checkout, and payment. Merchant products remain in their own isolated storefronts."
        : `This is ${merchantName ?? "this merchant"}'s dedicated storefront. It only shows products, SKUs, and stock owned by this merchant and bound to its NovaPay merchant account.`,
      merchantPaymentDisabled: "Merchant payment disabled",
      merchantPaymentEnabled: "Merchant payment enabled",
      merchantStoresOnline: `${merchantName ? "" : ""}${merchantName}`,
      missingPaymentProfile:
        "This merchant has not configured payment settings yet. Visitors can browse, but checkout is not available for now.",
      noProducts:
        "This storefront does not have any published products yet. You can add products and SKUs later from the merchant console.",
      noResults:
        "No matching products or SKUs were found in this storefront. Try a different keyword.",
      peerStoreCount: `${platformStore ? "" : ""}${""}`,
      platformStoreBadge: "Platform official store",
      platformStoreTitle: "Platform Official Store",
      productCount: "Listed products",
      productFallback: platformStore
        ? "This product belongs to the platform-operated official storefront."
        : "This product is published from the merchant's isolated storefront.",
      productSectionTitle: "Storefront products",
      productSummaryMulti: "A good fit for showcasing a multi-SKU digital fulfillment flow.",
      productSummarySingle: "A default direct-purchase item that works well for a lightweight digital storefront.",
      productTagUpdatedAt: "Updated",
      searchKeyword: "Current keyword",
      title: platformStore ? "Platform Official Store" : merchantName ?? "Merchant Store",
    };
  }

  return {
    allProducts: "全部商品",
    announcementBadgeMerchant: "合作方公告",
    announcementBadgePlatform: "平台公告",
    announcementFallback: "当前店铺已启用公告展示。",
    availableSkus: "可购规格",
    availableStock: "可售库存",
    backHome: "返回首页",
    clearFilter: "清除筛选",
    ctaMulti: "选择规格",
    ctaSingle: "立即购买",
    disabledPaymentProfile: "当前合作方的收款配置已停用，商品仍可展示，但暂时无法继续下单。",
    introCopy: platformStore
      ? "这里是平台官方渠道，承接平台自营商品展示、下单与支付。合作方商品依然保留各自独立站点，不会混合展示。"
      : `这里是 ${merchantName ?? "当前合作方"} 的专属站点，只展示该主体自己管理的商品、规格与库存。`,
    merchantPaymentDisabled: "收款未启用",
    merchantPaymentEnabled: "收款已启用",
    merchantStoresOnline: "",
    missingPaymentProfile: "当前合作方还没有完成收款配置，站点暂时只能浏览，无法继续下单。",
    noProducts: "当前站点还没有上架商品，完成商品与规格配置后即可在这里展示。",
    noResults: "当前站点没有匹配这个关键词的商品或规格，可以换个词再试试。",
    peerStoreCount: "",
    platformStoreBadge: "平台官方渠道",
    platformStoreTitle: "平台官方渠道",
    productCount: "上架商品",
    productFallback: platformStore ? "当前商品来自平台官方渠道。" : "当前商品来自该合作方的专属站点。",
    productSectionTitle: "站点商品",
    productSummaryMulti: "适合展示多规格、多价格与多库存的数字商品方案。",
    productSummarySingle: "默认规格直购，适合标准化数字商品交付。",
    productTagUpdatedAt: "更新于",
    searchKeyword: "当前关键词",
    title: platformStore ? "平台官方渠道" : merchantName ?? "合作方站点",
  };
}

export function StorefrontPageClient({
  announcement,
  merchantId,
  merchantName,
  paymentProfileActive,
  paymentProfileConfigured,
  peerStoreCount,
  platformStore,
  products,
  searchKeyword,
  storefrontPath,
}: StorefrontPageClientProps) {
  const { language } = useSitePreferences();
  const copy = getStorefrontCopy(language, platformStore, merchantName);
  const keyword = searchKeyword.trim();
  const normalizedKeyword = keyword.toLowerCase();
  const filteredProducts = useMemo(
    () =>
      normalizedKeyword
        ? products.filter((product) =>
            matchesKeyword(
              [
                product.name,
                product.summary ?? "",
                product.description ?? "",
                ...product.skus.map((sku) => `${sku.name} ${sku.summary ?? ""}`),
              ],
              normalizedKeyword,
            ),
          )
        : products,
    [normalizedKeyword, products],
  );
  const totalStock = products.reduce((sum, product) => sum + product.stock.available, 0);
  const totalSkuCount = products.reduce((sum, product) => sum + product.skus.length, 0);
  const updatedAtLabel = formatDateTime(announcement?.updatedAt ?? null, language);

  return (
    <div className="storefront-shell">
      {!platformStore && !paymentProfileConfigured ? (
        <div className="notice-card error">{copy.missingPaymentProfile}</div>
      ) : null}

      {!platformStore && paymentProfileConfigured && !paymentProfileActive ? (
        <div className="notice-card error">{copy.disabledPaymentProfile}</div>
      ) : null}

      {hasStorefrontAnnouncement(announcement) ? (
        <section className="panel notice-panel">
          <div className="panel-header">
            <span className="panel-icon">※</span>
            <h2 className="panel-title">{announcement?.title || (language === "zh" ? "店铺公告" : "Store announcement")}</h2>
          </div>

          <div className="panel-body">
            <div className="button-row compact">
              <span className={`badge ${platformStore ? "warning" : "success"}`}>
                {platformStore ? copy.announcementBadgePlatform : copy.announcementBadgeMerchant}
              </span>
              {updatedAtLabel ? (
                <span className="badge muted">
                  {copy.productTagUpdatedAt} {updatedAtLabel}
                </span>
              ) : null}
            </div>
            {announcement?.body ? (
              <p className="section-copy" style={{ whiteSpace: "pre-line" }}>
                {announcement.body}
              </p>
            ) : (
              <p className="section-copy">{copy.announcementFallback}</p>
            )}
          </div>
        </section>
      ) : null}

      <section className="panel notice-panel">
        <div className="panel-header">
          <span className="panel-icon">◎</span>
          <h1 className="panel-title">{copy.title}</h1>
        </div>

        <div className="panel-body storefront-overview-body">
          <p className="section-copy">{copy.introCopy}</p>
          <div className="button-row compact storefront-overview-badges">
            <span className={`badge ${platformStore || paymentProfileActive ? "success" : "warning"}`}>
              {platformStore ? copy.platformStoreBadge : paymentProfileActive ? copy.merchantPaymentEnabled : copy.merchantPaymentDisabled}
            </span>
              <span className="badge muted">
                {language === "zh"
                ? `${peerStoreCount} 个合作方站点已上线`
                : `${peerStoreCount} merchant storefronts live`}
              </span>
          </div>
          <div className="button-row">
            <Link href="/" className="button-link">
              {copy.backHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="section panel purchase-panel">
        <div className="panel-header">
          <span className="panel-icon">◇</span>
          <h2 className="panel-title">{copy.productSectionTitle}</h2>
        </div>

        <div className="panel-body storefront-catalog-body">
          <div className="stats-strip storefront-stats-strip">
            <article className="stat-chip">
              <span className="stat-label">{copy.productCount}</span>
              <strong>{products.length}</strong>
            </article>
            <article className="stat-chip">
              <span className="stat-label">{copy.availableSkus}</span>
              <strong>{totalSkuCount}</strong>
            </article>
            <article className="stat-chip">
              <span className="stat-label">{copy.availableStock}</span>
              <strong>{totalStock}</strong>
            </article>
          </div>

          {keyword ? (
            <div className="search-result-bar">
              <span>
                {copy.searchKeyword}: {searchKeyword}
              </span>
              <Link href={storefrontPath} className="button-link">
                {copy.clearFilter}
              </Link>
            </div>
          ) : null}

          {products.length > 0 && filteredProducts.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">{copy.noResults}</p>
            </div>
          ) : null}

          {products.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">{copy.noProducts}</p>
            </div>
          ) : (
            <div className="goods-grid storefront-product-grid">
              {filteredProducts.map((product) => {
                const primarySku = product.skus[0] ?? null;
                const hasStock = product.stock.available > 0;
                const modeLabel = getProductModeLabel(language, product.saleMode);
                const modeBadgeText = getProductModeBadgeText(
                  language,
                  product.saleMode,
                  product.skus.length,
                  hasStock,
                );
                const metaCopy =
                  product.saleMode === "MULTI"
                    ? product.skus
                        .slice(0, 3)
                        .map((sku) => sku.name)
                        .join(" / ") || copy.productSummaryMulti
                    : primarySku?.summary || product.summary || copy.productSummarySingle;

                return (
                  <article key={product.id} id={`product-${product.id}`} className="goods-card storefront-product-card">
                    <div className="goods-content storefront-product-content">
                      <div className="goods-head storefront-product-head">
                        <div className="storefront-product-title-group">
                          <h3>{product.name}</h3>
                          <p className="card-meta storefront-product-summary">{metaCopy}</p>
                        </div>
                        <span className="price-chip storefront-product-price">
                          {formatCurrency(product.startingPriceCents, language)}
                        </span>
                      </div>

                      <div className="storefront-product-meta-row">
                        <span className={`badge ${hasStock ? "success" : "muted"}`}>{modeBadgeText}</span>
                        <span className="product-inline-tag">{modeLabel}</span>
                      </div>

                      <p className="small-copy storefront-product-note">
                        {product.summary || copy.productFallback}
                      </p>
                    </div>

                    <div className="goods-foot storefront-product-foot">
                      <div className="data-row">
                        <span className="data-key">{copy.availableStock}</span>
                        <strong>{product.stock.available}</strong>
                      </div>
                      <div className="data-row">
                        <span className="data-key">{copy.availableSkus}</span>
                        <strong>{product.skus.length}</strong>
                      </div>

                      <div className="button-row storefront-product-actions">
                        <Link
                          href={
                            platformStore
                              ? buildPlatformProductPath(product.slug)
                              : buildMerchantStorefrontProductPath(merchantId, product.slug)
                          }
                          className="button storefront-product-button"
                        >
                          {product.saleMode === "MULTI" ? copy.ctaMulti : copy.ctaSingle}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
