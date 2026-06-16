"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Layers,
  Megaphone,
  Minus,
  Package,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { createShopOrderAction } from "@/app/actions";
import { type SiteLanguage, useSitePreferences } from "@/app/ui-preferences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ContentBlock, CalloutVariant } from "@/lib/content-blocks";
import { RichText } from "@/app/components/rich-text";
import { buildPaymentChannelOptions, isUsdtPaymentChannelCode } from "@/lib/payment-channels";
import {
  MAX_PUBLIC_ORDER_QUANTITY,
  describeSkuPricingTier,
  getSkuLowestUnitPriceCents,
  getSkuUnitPriceCents,
  parseStoredSkuPricingTiers,
} from "@/lib/sku-pricing";

type ProductDetailSkuSnapshot = {
  id: string;
  name: string;
  priceCents: number;
  pricingTiers: string | null;
  stock: {
    available: number;
  };
  summary: string | null;
};

type ProductDetailProductSnapshot = {
  description: string | null;
  detailImages: string[];
  contentBlocks: ContentBlock[];
  name: string;
  saleMode: "MULTI" | "SINGLE";
  slug: string;
  startingPriceCents: number;
  stock: {
    available: number;
  };
  summary: string | null;
  skus: ProductDetailSkuSnapshot[];
};

type StorefrontAnnouncementSnapshot = {
  body: string | null;
  enabled: boolean;
  title: string | null;
  updatedAt: Date | string | null;
};

type StorefrontContactSnapshot = {
  coverImage: string | null;
  telegramSupportUrl: string | null;
  telegramGroupUrl: string | null;
};

type StorefrontPaymentChannelOption = {
  code: string;
  description: string;
  label: string;
};

type StorefrontPaymentChannelGroup = {
  code: string;
  description: string;
  label: string;
  channels: StorefrontPaymentChannelOption[];
};

function hasStorefrontAnnouncement(announcement: StorefrontAnnouncementSnapshot | null | undefined) {
  return Boolean(announcement?.enabled && (announcement.title || announcement.body));
}

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
};

function CalloutBlock({ variant, text }: { variant: CalloutVariant; text: string }) {
  return (
    <div
      className={cn(
        "rounded-md border px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
        CALLOUT_STYLES[variant],
      )}
    >
      <RichText text={text} />
    </div>
  );
}

function formatCurrency(cents: number, language: SiteLanguage) {
  return new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US", {
    currency: "CNY",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(cents / 100);
}

function clampQuantity(value: number, maxQuantity: number) {
  return Math.min(Math.max(1, Math.floor(value || 1)), Math.max(1, maxQuantity));
}

function getPaymentChannelDictionary(language: SiteLanguage) {
  if (language === "en") {
    return {
      "alipay.page": {
        description: "Best for launching the Alipay hosted checkout page from the web.",
        label: "Alipay Page",
      },
      "usdt.base": {
        description: "Pay with USDT on the Polygon network.",
        label: "USDT · Polygon",
      },
      "usdt.bsc": {
        description: "Pay with USDT on the BSC network.",
        label: "USDT · BSC",
      },
      "usdt.sol": {
        description: "Pay with USDT on the Solana network.",
        label: "USDT · Solana",
      },
      "wechat.h5": {
        description: "Best for mobile browser flows that continue into WeChat Pay.",
        label: "WeChat H5",
      },
      "wechat.jsapi": {
        description: "Best for official-account or embedded WeChat environments.",
        label: "WeChat JSAPI",
      },
      "wxpay.native": {
        description: "Best for QR-code checkout on desktop or external devices.",
        label: "WeChat QR",
      },
    } as const;
  }

  return {
    "alipay.page": {
      description: "适合网页内直接拉起支付宝收银台。",
      label: "支付宝",
    },
    "usdt.base": {
      description: "通过 Polygon 链完成 USDT 转账支付。",
      label: "USDT · Polygon",
    },
    "usdt.bsc": {
      description: "通过 BSC 链完成 USDT 转账支付。",
      label: "USDT · BSC",
    },
    "usdt.sol": {
      description: "通过 Solana 链完成 USDT 转账支付。",
      label: "USDT · Solana",
    },
    "wechat.h5": {
      description: "适合手机浏览器内拉起微信支付。",
      label: "微信 H5",
    },
    "wechat.jsapi": {
      description: "适合公众号或内嵌微信环境支付。",
      label: "微信 JSAPI",
    },
    "wxpay.native": {
      description: "适合 PC 或外部设备扫码支付。",
      label: "微信扫码",
    },
  } as const;
}

function getDetailCopy(language: SiteLanguage, platformStore: boolean, storefrontName?: string) {
  const localizedStorefrontName =
    platformStore && language === "en"
      ? "Platform Official Store"
      : platformStore
        ? "平台官方渠道"
        : storefrontName ?? (language === "zh" ? "当前站点" : "Current Store");

  if (language === "en") {
    return {
      announcementFallback: "This storefront has announcement display enabled.",
      announcementHeading: "Store announcement",
      availableStock: "Available stock",
      backLabel: `Back to ${localizedStorefrontName}`,
      contactHeading: "Need help?",
      detailSectionHeading: "Product details",
      telegramSupport: "Telegram support",
      telegramGroup: "After-sales group",
      buyNow: "Buy now",
      channelCount: (count: number) =>
        count > 0
          ? ` ${count} payment method${count > 1 ? "s" : ""} are currently available.`
          : " No payment method is currently configured.",
      choosePaymentMethod: "Payment method",
      chooseSku: "Choose SKU",
      chooseUsdtNetwork: "USDT network",
      createOrder: "Create order and continue to payment",
      currentUnitPrice: "Unit price",
      defaultBadge: "Default",
      defaultSku: "Default SKU",
      email: "Email",
      emailPlaceholder: "Used for order lookup and delivery confirmation",
      estimatedTotal: "Estimated total",
      fromSuffix: " from",
      helperText:
        "You will be redirected to NovaPay after placing the order, and the delivered secret for the selected SKU will be shown automatically after payment.",
      missingDescription: "This product does not have a detailed description yet.",
      noPaymentChannel:
        "No payment method is available for this product yet. Please enable a payment channel in the console first.",
      noSku:
        "This product has no visible SKU yet. Please add and enable a default SKU in the back office first.",
      orderSummary: "Order Summary",
      orderConfirm: "Confirm your order",
      orderTitle: "Buy now",
      outOfStock: "Out of stock",
      paymentMethodUnavailable: "Payment methods unavailable",
      paymentNote: "Payment note",
      pricingRules: "Volume pricing",
      productInfo: "Product info",
      productMode: "Product mode",
      productSelected: "Selected",
      productSkuNote: "No extra note for this option yet.",
      productPrice: "Price",
      productSkuLabel: "SKU note",
      quantity: "Quantity",
      quantityHint: (maxQuantity: number) => `Up to ${maxQuantity} items per order for this SKU.`,
      selectedPaymentDetail: "Selected route",
      skuCount: "SKU count",
      skuList: "SKU list",
      skuModeDescription: "Each SKU has its own price and inventory.",
      singleDirectPurchase: "Single-item direct purchase",
      singleMode: "Single item",
      singleModeDescription: "This product is sold as a single item. You can buy the default SKU directly.",
      singleSkuNote: "Purchasable SKU with its own inventory.",
      stockLabel: "Stock",
      storefrontLabel: "Storefront",
      unavailableStock: "Out of stock",
      usdtGroupDescription: "Choose USDT first, then pick the chain you want to pay on.",
    };
  }

  return {
    announcementFallback: "当前店铺已启用公告展示。",
    announcementHeading: "店铺公告",
    availableStock: "可售库存",
    backLabel: `返回 ${localizedStorefrontName}`,
    contactHeading: "需要帮助？",
    detailSectionHeading: "商品详情",
    telegramSupport: "Telegram 客服",
    telegramGroup: "售后交流群",
    buyNow: "立即购买",
    channelCount: (count: number) =>
      count > 0 ? ` 当前支持 ${count} 种支付方式。` : " 当前暂未配置可用支付方式。",
    choosePaymentMethod: "支付方式",
    chooseSku: "选择规格",
    chooseUsdtNetwork: "USDT 链路",
    createOrder: "创建订单并去支付",
    currentUnitPrice: "当前单价",
    defaultBadge: "默认",
    defaultSku: "默认规格",
    email: "邮箱",
    emailPlaceholder: "用于订单查询与交付确认",
    estimatedTotal: "预估合计",
    fromSuffix: " 起",
    helperText: "下单后会跳转到支付页面完成付款，支付确认后会自动展示对应规格的交付内容。",
    missingDescription: "当前商品尚未补充详细介绍。",
    noPaymentChannel: "当前商品暂未绑定可用支付方式，请先启用对应收款通道。",
    noSku: "当前商品还没有可展示的规格，请先到后台补充默认规格并启用。",
    orderSummary: "下单摘要",
    orderConfirm: "确认订单信息",
    orderTitle: "立即购买",
    outOfStock: "库存不足",
    paymentMethodUnavailable: "支付方式未配置",
    paymentNote: "支付说明",
    pricingRules: "阶梯价格",
    productInfo: "商品信息",
    productMode: "商品模式",
    productSelected: "当前选择",
    productSkuNote: "该规格未补充额外说明。",
    productPrice: "售价",
    productSkuLabel: "规格说明",
    quantity: "数量",
    quantityHint: (maxQuantity: number) => `当前规格单笔最多可购买 ${maxQuantity} 件。`,
    selectedPaymentDetail: "当前选择",
    skuCount: "规格数量",
    skuList: "规格列表",
    skuModeDescription: "每个规格独立定价、独立库存。",
    singleDirectPurchase: "单商品直购",
    singleMode: "单商品",
    singleModeDescription: "当前商品按单商品模式出售，直接购买默认规格即可。",
    singleSkuNote: "独立库存的可购买规格",
    stockLabel: "库存",
    storefrontLabel: "所属站点",
    unavailableStock: "库存不足",
    usdtGroupDescription: "先选择 USDT，再挑选具体链路完成支付。",
  };
}

function buildPaymentChannelGroups(
  channels: StorefrontPaymentChannelOption[],
  language: SiteLanguage,
): StorefrontPaymentChannelGroup[] {
  const groups: StorefrontPaymentChannelGroup[] = [];
  let usdtGroup: StorefrontPaymentChannelGroup | null = null;

  for (const channel of channels) {
    if (isUsdtPaymentChannelCode(channel.code)) {
      if (!usdtGroup) {
        usdtGroup = {
          code: "usdt",
          description:
            language === "en"
              ? "Pay with USDT and choose your preferred network in the next step."
              : "使用 USDT 支付，并在下一步选择具体链路。",
          label: "USDT",
          channels: [],
        };
        groups.push(usdtGroup);
      }

      usdtGroup.channels.push(channel);
      continue;
    }

    groups.push({
      code: channel.code,
      description: channel.description,
      label: channel.label,
      channels: [channel],
    });
  }

  return groups;
}

export function ProductDetailView({
  product,
  checkoutChannelConfig,
  announcement,
  contact,
  error,
  backHref,
  platformStore,
  returnPath,
  storefrontName,
}: {
  product: ProductDetailProductSnapshot;
  checkoutChannelConfig: {
    defaultChannelCode: string;
    enabledChannelCodes: string[];
  } | null;
  announcement?: StorefrontAnnouncementSnapshot | null;
  contact?: StorefrontContactSnapshot | null;
  error?: string;
  backHref: string;
  platformStore: boolean;
  returnPath: string;
  storefrontName?: string;
}) {
  const { language } = useSitePreferences();
  const copy = getDetailCopy(language, platformStore, storefrontName);
  const isMultiSku = product.saleMode === "MULTI";
  const primarySku = product.skus[0] ?? null;
  const availableSkus = product.skus.filter((sku) => sku.stock.available > 0);
  const defaultSkuId = availableSkus[0]?.id ?? primarySku?.id ?? "";
  const [selectedSkuIdState, setSelectedSkuId] = useState(defaultSkuId);
  const paymentChannels = useMemo(() => {
    const dictionary = getPaymentChannelDictionary(language);

    return buildPaymentChannelOptions(checkoutChannelConfig?.enabledChannelCodes ?? []).map((channel) => ({
      ...channel,
      description: dictionary[channel.code as keyof typeof dictionary]?.description ?? channel.description,
      label: dictionary[channel.code as keyof typeof dictionary]?.label ?? channel.label,
    }));
  }, [checkoutChannelConfig?.enabledChannelCodes, language]);
  const paymentGroups = useMemo(
    () => buildPaymentChannelGroups(paymentChannels, language),
    [language, paymentChannels],
  );
  const defaultChannelCode =
    paymentChannels.find((channel) => channel.code === checkoutChannelConfig?.defaultChannelCode)?.code ??
    paymentChannels[0]?.code ??
    "";
  const defaultGroupCode =
    paymentGroups.find((group) => group.channels.some((channel) => channel.code === defaultChannelCode))?.code ??
    paymentGroups[0]?.code ??
    "";
  const [selectedGroupCodeState, setSelectedGroupCode] = useState(defaultGroupCode);
  const [selectedChannelCodeState, setSelectedChannelCode] = useState(defaultChannelCode);
  const selectedGroupCode = paymentGroups.some((group) => group.code === selectedGroupCodeState)
    ? selectedGroupCodeState
    : defaultGroupCode;
  const selectedGroup =
    paymentGroups.find((group) => group.code === selectedGroupCode) ??
    paymentGroups.find((group) => group.channels.some((channel) => channel.code === selectedChannelCodeState)) ??
    paymentGroups[0] ??
    null;
  const selectedChannelCode = selectedGroup?.channels.some((channel) => channel.code === selectedChannelCodeState)
    ? selectedChannelCodeState
    : selectedGroup?.channels.find((channel) => channel.code === defaultChannelCode)?.code ??
      selectedGroup?.channels[0]?.code ??
      "";
  const selectedSkuId =
    isMultiSku && product.skus.some((sku) => sku.id === selectedSkuIdState && sku.stock.available > 0)
      ? selectedSkuIdState
      : defaultSkuId;
  const selectedSku =
    product.skus.find((sku) => sku.id === (isMultiSku ? selectedSkuId : defaultSkuId)) ?? primarySku;
  const maxQuantity = Math.max(
    1,
    Math.min(selectedSku?.stock.available ?? 1, MAX_PUBLIC_ORDER_QUANTITY),
  );
  const [quantityState, setQuantity] = useState(1);
  const quantity = clampQuantity(quantityState, maxQuantity);
  const selectedSkuPricingTiers = selectedSku ? parseStoredSkuPricingTiers(selectedSku.pricingTiers) : [];
  const selectedSkuPricingSummary = selectedSkuPricingTiers.map(describeSkuPricingTier).join(" / ");
  const selectedUnitPriceCents = selectedSku
    ? getSkuUnitPriceCents(selectedSku.priceCents, selectedSku.pricingTiers, quantity)
    : null;
  const selectedTotalPriceCents = selectedUnitPriceCents === null ? null : selectedUnitPriceCents * quantity;
  const canPurchase =
    availableSkus.length > 0 &&
    Boolean(defaultSkuId) &&
    Boolean(selectedChannelCode) &&
    Boolean(selectedSku && selectedSku.stock.available > 0);
  const storefrontLabelValue =
    platformStore
      ? language === "zh"
        ? "管理员直营网"
        : "Platform Official Store"
      : storefrontName ?? (language === "zh" ? "当前店铺" : "Current Store");
  const showAnnouncement = hasStorefrontAnnouncement(announcement);
  const detailImages = product.detailImages ?? [];
  const contentBlocks = product.contentBlocks ?? [];
  const hasContentBlocks = contentBlocks.length > 0;
  const telegramSupportUrl = contact?.telegramSupportUrl ?? null;
  const telegramGroupUrl = contact?.telegramGroupUrl ?? null;
  const showContactLinks = Boolean(telegramSupportUrl || telegramGroupUrl);
  const productMark = product.name.slice(0, 2);

  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            {copy.storefrontLabel}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{storefrontLabelValue}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {hasContentBlocks
              ? product.summary || copy.missingDescription
              : product.description || product.summary || copy.missingDescription}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant="default">
              {formatCurrency(product.startingPriceCents, language)}
              {isMultiSku ? copy.fromSuffix : ""}
            </Badge>
            <Badge variant={product.stock.available > 0 ? "secondary" : "outline"}>
              {product.stock.available > 0
                ? isMultiSku
                  ? copy.chooseSku
                  : copy.singleDirectPurchase
                : copy.unavailableStock}
            </Badge>
            <Badge variant="outline">
              {isMultiSku ? `${product.skus.length} ${copy.skuCount}` : copy.singleMode}
            </Badge>
          </div>

          <div className="mt-5">
            <Button asChild variant="ghost" size="sm">
              <Link href={backHref}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                {copy.backLabel}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_0.9fr] lg:px-8">
        <div className="flex flex-col gap-6">
          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {showAnnouncement ? (
            <Card>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                  {announcement?.title || copy.announcementHeading}
                </div>
                {announcement?.body ? (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
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

          {showContactLinks ? (
            <Card>
              <CardContent className="flex flex-col gap-3">
                <span className="text-sm font-medium tracking-tight">{copy.contactHeading}</span>
                <div className="flex flex-wrap gap-2">
                  {telegramSupportUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={telegramSupportUrl} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-1 h-4 w-4" />
                        {copy.telegramSupport}
                      </a>
                    </Button>
                  ) : null}
                  {telegramGroupUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={telegramGroupUrl} target="_blank" rel="noopener noreferrer">
                        <Send className="mr-1 h-4 w-4" />
                        {copy.telegramGroup}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-foreground text-lg font-semibold tracking-tight text-background">
                  {productMark}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {copy.productInfo}
                  </p>
                  <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {isMultiSku ? copy.skuModeDescription : copy.singleModeDescription}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard
                  label={isMultiSku ? copy.skuCount : copy.productMode}
                  value={isMultiSku ? String(product.skus.length) : copy.singleMode}
                />
                <StatCard label={copy.availableStock} value={String(product.stock.available)} />
                <StatCard label={copy.choosePaymentMethod} value={String(paymentGroups.length)} />
              </div>

              {selectedSkuPricingSummary ? (
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{copy.pricingRules}</span>:{" "}
                  {selectedSkuPricingSummary}
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                <Layers className="h-4 w-4 text-muted-foreground" />
                {isMultiSku ? copy.chooseSku : copy.productInfo}
              </div>

              {product.skus.length === 0 ? (
                <div className="flex items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  {copy.noSku}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.skus.map((sku) => {
                    const skuPricingTiers = parseStoredSkuPricingTiers(sku.pricingTiers);
                    const disabled = sku.stock.available === 0;
                    const active = sku.id === selectedSku?.id;

                    return (
                      <button
                        key={sku.id}
                        type="button"
                        onClick={() => {
                          if (!isMultiSku || disabled) {
                            return;
                          }

                          setSelectedSkuId(sku.id);
                          setQuantity((currentQuantity) =>
                            clampQuantity(
                              currentQuantity,
                              Math.min(sku.stock.available, MAX_PUBLIC_ORDER_QUANTITY),
                            ),
                          );
                        }}
                        aria-pressed={active}
                        disabled={!isMultiSku || disabled}
                        className={cn(
                          "group flex w-full flex-col gap-3 rounded-lg border bg-background p-4 text-left transition-colors",
                          active
                            ? "border-foreground ring-1 ring-foreground"
                            : "border-border/60 hover:border-foreground/40",
                          (!isMultiSku || disabled) && "cursor-not-allowed opacity-60",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold tracking-tight">{sku.name}</h3>
                              {active ? (
                                <Badge variant="default">{copy.productSelected}</Badge>
                              ) : null}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {sku.summary || copy.productSkuNote}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-semibold tracking-tight">
                              {formatCurrency(
                                getSkuLowestUnitPriceCents(sku.priceCents, sku.pricingTiers),
                                language,
                              )}
                              {skuPricingTiers.length > 0 ? copy.fromSuffix : ""}
                            </p>
                          </div>
                        </div>

                        {skuPricingTiers.length > 0 ? (
                          <p className="text-xs text-muted-foreground">
                            {skuPricingTiers.map(describeSkuPricingTier).join(" / ")}
                          </p>
                        ) : null}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{copy.stockLabel}</span>
                          <span className="font-medium text-foreground">{sku.stock.available}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {hasContentBlocks ? (
            <Card>
              <CardContent className="flex flex-col gap-3">
                <span className="text-sm font-medium tracking-tight">{copy.detailSectionHeading}</span>
                <div className="flex flex-col gap-4">
                  {contentBlocks.map((block, index) =>
                    block.type === "text" ? (
                      <p
                        key={`text-${index}`}
                        className="text-sm leading-relaxed whitespace-pre-line text-foreground/90"
                      >
                        <RichText text={block.text} />
                      </p>
                    ) : block.type === "callout" ? (
                      <CalloutBlock key={`callout-${index}`} variant={block.variant} text={block.text} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`image-${index}`}
                        src={block.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full rounded-md border border-border/60"
                        loading="lazy"
                      />
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          ) : detailImages.length > 0 ? (
            <Card>
              <CardContent className="flex flex-col gap-3">
                <span className="text-sm font-medium tracking-tight">{copy.detailSectionHeading}</span>
                <div className="flex flex-col gap-3">
                  {detailImages.map((image, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full rounded-md border border-border/60"
                      loading="lazy"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <aside className="flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                {copy.buyNow}
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                {copy.helperText}
                {copy.channelCount(paymentGroups.length)}
              </p>

              {selectedSku && selectedUnitPriceCents !== null && selectedTotalPriceCents !== null ? (
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {copy.orderSummary}
                      </p>
                      <p className="mt-1 text-sm font-medium tracking-tight">{copy.orderConfirm}</p>
                    </div>
                    <strong className="text-lg font-semibold tracking-tight">
                      {formatCurrency(selectedTotalPriceCents, language)}
                    </strong>
                  </div>
                  <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                    <SummaryItem label={copy.currentUnitPrice} value={formatCurrency(selectedUnitPriceCents, language)} />
                    <SummaryItem label={copy.quantity} value={String(quantity)} />
                    <SummaryItem label={copy.stockLabel} value={String(selectedSku.stock.available)} />
                    <SummaryItem
                      label={copy.choosePaymentMethod}
                      value={
                        selectedGroup?.channels.find((channel) => channel.code === selectedChannelCode)?.label ??
                        (language === "zh" ? "待选择" : "Choose")
                      }
                    />
                  </dl>
                </div>
              ) : null}

              <form action={createShopOrderAction} className="flex flex-col gap-4">
                <input type="hidden" name="slug" value={product.slug} />
                <input type="hidden" name="returnPath" value={returnPath} />
                <input type="hidden" name="channelCode" value={selectedChannelCode} />
                <input type="hidden" name="skuId" value={isMultiSku ? selectedSkuId : defaultSkuId} />

                {selectedSku ? (
                  <div className="rounded-lg border border-border/60 bg-background p-3">
                    <dl className="flex flex-col gap-2 text-xs">
                      <SummaryItem
                        label={isMultiSku ? copy.chooseSku : copy.defaultSku}
                        value={selectedSku.name}
                      />
                      <SummaryItem
                        label={copy.productSkuLabel}
                        value={selectedSku.summary || copy.singleSkuNote}
                      />
                      <SummaryItem
                        label={copy.productPrice}
                        value={`${formatCurrency(
                          getSkuLowestUnitPriceCents(selectedSku.priceCents, selectedSku.pricingTiers),
                          language,
                        )}${selectedSkuPricingTiers.length > 0 ? copy.fromSuffix : ""}`}
                      />
                      <SummaryItem label={copy.stockLabel} value={String(selectedSku.stock.available)} />
                      {selectedSkuPricingSummary ? (
                        <SummaryItem label={copy.pricingRules} value={selectedSkuPricingSummary} />
                      ) : null}
                    </dl>
                  </div>
                ) : null}

                {paymentGroups.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <Label>{copy.choosePaymentMethod}</Label>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={copy.choosePaymentMethod}>
                      {paymentGroups.map((group) => {
                        const groupSelected = group.code === (selectedGroup?.code ?? "");
                        const isDefaultGroup = group.channels.some(
                          (channel) => channel.code === defaultChannelCode,
                        );

                        return (
                          <button
                            key={group.code}
                            type="button"
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                              groupSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border/60 bg-background text-foreground hover:border-foreground/40",
                            )}
                            onClick={() => {
                              setSelectedGroupCode(group.code);
                              setSelectedChannelCode(
                                group.channels.find((channel) => channel.code === defaultChannelCode)?.code ??
                                  group.channels[0]?.code ??
                                  "",
                              );
                            }}
                            aria-pressed={groupSelected}
                          >
                            <span>{group.label}</span>
                            <span className={cn(
                              "text-[10px] uppercase tracking-[0.12em]",
                              groupSelected ? "text-background/80" : "text-muted-foreground",
                            )}>
                              {isDefaultGroup
                                ? copy.defaultBadge
                                : group.channels.length > 1
                                  ? language === "en"
                                    ? `${group.channels.length} networks`
                                    : `${group.channels.length} 条链`
                                  : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedGroup ? (
                      <p className="text-xs text-muted-foreground">
                        {selectedGroup.code === "usdt"
                          ? copy.usdtGroupDescription
                          : selectedGroup.description}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {copy.noPaymentChannel}
                  </div>
                )}

                {selectedGroup && selectedGroup.channels.length > 1 ? (
                  <div className="flex flex-col gap-2">
                    <Label>{copy.chooseUsdtNetwork}</Label>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={copy.chooseUsdtNetwork}>
                      {selectedGroup.channels.map((channel) => {
                        const channelSelected = channel.code === selectedChannelCode;
                        return (
                          <button
                            key={channel.code}
                            type="button"
                            className={cn(
                              "inline-flex flex-col items-start gap-0.5 rounded-md border px-3 py-2 text-xs transition-colors",
                              channelSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border/60 bg-background text-foreground hover:border-foreground/40",
                            )}
                            onClick={() => setSelectedChannelCode(channel.code)}
                            aria-pressed={channelSelected}
                          >
                            <span className="font-medium">{channel.label}</span>
                            <span className={cn(
                              "text-[10px] uppercase tracking-[0.12em]",
                              channelSelected ? "text-background/80" : "text-muted-foreground",
                            )}>
                              {channel.code === defaultChannelCode ? copy.defaultBadge : channel.code}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {selectedGroup && selectedChannelCode ? (
                  <div className="rounded-md border border-border/60 bg-muted/30 p-3 text-xs">
                    <dl className="flex flex-col gap-1.5">
                      <SummaryItem
                        label={copy.selectedPaymentDetail}
                        value={
                          selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.label ??
                          selectedChannelCode
                        }
                      />
                      {selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.description ? (
                        <SummaryItem
                          label={copy.paymentNote}
                          value={
                            selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.description ?? ""
                          }
                        />
                      ) : null}
                    </dl>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="customerEmail">{copy.email}</Label>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    type="email"
                    required
                    placeholder={copy.emailPlaceholder}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quantity">{copy.quantity}</Label>
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity - 1, maxQuantity))}
                      disabled={quantity <= 1}
                      aria-label={language === "zh" ? "减少数量" : "Decrease quantity"}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min={1}
                      max={maxQuantity}
                      step={1}
                      value={quantity}
                      onChange={(event) => setQuantity(clampQuantity(Number(event.target.value), maxQuantity))}
                      className="w-20 text-center"
                    />
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-background text-foreground transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity + 1, maxQuantity))}
                      disabled={quantity >= maxQuantity}
                      aria-label={language === "zh" ? "增加数量" : "Increase quantity"}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{copy.quantityHint(maxQuantity)}</p>
                </div>

                <Button type="submit" size="lg" disabled={!canPurchase}>
                  {canPurchase ? copy.createOrder : paymentChannels.length > 0 ? copy.outOfStock : copy.paymentMethodUnavailable}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                {language === "zh" ? "下单流程" : "Checkout flow"}
              </div>
              <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                  {language === "zh"
                    ? "下单后跳转到 NovaPay 完成付款。"
                    : "Place the order and continue to NovaPay for payment."}
                </li>
                <li className="flex items-start gap-2">
                  <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                  {language === "zh"
                    ? "支付确认后会展示对应规格的卡密。"
                    : "After payment confirmation the secret for the chosen SKU will be revealed."}
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" />
                  {language === "zh"
                    ? "邮箱将用于订单查询与回访。"
                    : "Your email is used for order lookup and follow-up."}
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border/60 bg-muted/30 px-3 py-2.5">
      <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <strong className="text-base font-semibold tracking-tight">{value}</strong>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
