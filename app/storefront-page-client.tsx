"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Megaphone,
  PackageSearch,
  Sparkles,
  Store,
} from "lucide-react";
import { type SiteLanguage, useSitePreferences } from "@/app/ui-preferences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      announcementBadgeMerchant: "Merchant announcement",
      announcementBadgePlatform: "Platform announcement",
      announcementFallback: "This storefront has announcement display enabled.",
      announcementTitleFallback: "Store announcement",
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
      kicker: platformStore ? "Platform official store" : "Merchant storefront",
      merchantPaymentDisabled: "Merchant payment disabled",
      merchantPaymentEnabled: "Merchant payment enabled",
      missingPaymentProfile:
        "This merchant has not configured payment settings yet. Visitors can browse, but checkout is not available for now.",
      noProducts:
        "This storefront does not have any published products yet. You can add products and SKUs later from the merchant console.",
      noResults:
        "No matching products or SKUs were found in this storefront. Try a different keyword.",
      peerStoreCount: (count: number) => `${count} merchant storefronts live`,
      platformStoreBadge: "Platform official store",
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
    announcementBadgeMerchant: "合作方公告",
    announcementBadgePlatform: "平台公告",
    announcementFallback: "当前店铺已启用公告展示。",
    announcementTitleFallback: "店铺公告",
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
    kicker: platformStore ? "平台官方渠道" : "合作方专属站点",
    merchantPaymentDisabled: "收款未启用",
    merchantPaymentEnabled: "收款已启用",
    missingPaymentProfile: "当前合作方还没有完成收款配置，站点暂时只能浏览，无法继续下单。",
    noProducts: "当前站点还没有上架商品，完成商品与规格配置后即可在这里展示。",
    noResults: "当前站点没有匹配这个关键词的商品或规格，可以换个词再试试。",
    platformStoreBadge: "平台官方渠道",
    peerStoreCount: (count: number) => `${count} 个合作方站点已上线`,
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
  const showAnnouncement = hasStorefrontAnnouncement(announcement);
  const showMissingPayment = !platformStore && !paymentProfileConfigured;
  const showDisabledPayment =
    !platformStore && paymentProfileConfigured && !paymentProfileActive;
  const showEmptyResults = products.length > 0 && filteredProducts.length === 0;
  const showEmptyCatalog = products.length === 0;

  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Store className="h-3.5 w-3.5" />
            {copy.kicker}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {copy.introCopy}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge
              variant={platformStore || paymentProfileActive ? "default" : "secondary"}
            >
              {platformStore
                ? copy.platformStoreBadge
                : paymentProfileActive
                  ? copy.merchantPaymentEnabled
                  : copy.merchantPaymentDisabled}
            </Badge>
            <Badge variant="outline">{copy.peerStoreCount(peerStoreCount)}</Badge>
          </div>

          <div className="mt-5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {copy.backHome}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        {showMissingPayment ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {copy.missingPaymentProfile}
          </div>
        ) : null}

        {showDisabledPayment ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {copy.disabledPaymentProfile}
          </div>
        ) : null}

        {showAnnouncement ? (
          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                  {announcement?.title || copy.announcementTitleFallback}
                </div>
                <Badge variant={platformStore ? "secondary" : "default"}>
                  {platformStore
                    ? copy.announcementBadgePlatform
                    : copy.announcementBadgeMerchant}
                </Badge>
                {updatedAtLabel ? (
                  <Badge variant="outline">
                    {copy.productTagUpdatedAt} {updatedAtLabel}
                  </Badge>
                ) : null}
              </div>
              {announcement?.body ? (
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {announcement.body}
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {copy.announcementFallback}
                </p>
              )}
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label={copy.productCount} value={products.length} />
          <StatCard label={copy.availableSkus} value={totalSkuCount} />
          <StatCard label={copy.availableStock} value={totalStock} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
            <PackageSearch className="h-4 w-4 text-muted-foreground" />
            {copy.productSectionTitle}
          </div>
          {keyword ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {copy.searchKeyword}:{" "}
                <span className="font-medium text-foreground">{searchKeyword}</span>
              </span>
              <Button asChild variant="ghost" size="sm">
                <Link href={storefrontPath}>{copy.clearFilter}</Link>
              </Button>
            </div>
          ) : null}
        </div>

        {showEmptyCatalog ? (
          <div className="flex items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            {copy.noProducts}
          </div>
        ) : showEmptyResults ? (
          <div className="flex items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-10 text-center text-sm text-muted-foreground">
            {copy.noResults}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              const productHref = platformStore
                ? buildPlatformProductPath(product.slug)
                : buildMerchantStorefrontProductPath(merchantId, product.slug);

              return (
                <Card key={product.id} id={`product-${product.id}`} className="h-full">
                  <CardContent className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {metaCopy}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          {language === "zh" ? "起售" : "From"}
                        </p>
                        <p className="text-base font-semibold tracking-tight">
                          {formatCurrency(product.startingPriceCents, language)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={hasStock ? "default" : "outline"}>
                        {modeBadgeText}
                      </Badge>
                      <Badge variant="secondary">{modeLabel}</Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {product.summary || copy.productFallback}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>
                          {copy.availableStock}{" "}
                          <span className="font-medium text-foreground">
                            {product.stock.available}
                          </span>
                        </span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={productHref}>
                          {product.saleMode === "MULTI" ? copy.ctaMulti : copy.ctaSingle}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <strong className="text-2xl font-semibold tracking-tight">{value}</strong>
      </CardContent>
    </Card>
  );
}
