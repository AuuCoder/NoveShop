"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createShopOrderAction } from "@/app/actions";
import { type SiteLanguage, useSitePreferences } from "@/app/ui-preferences";
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
        description: "Pay with USDT on the Base network.",
        label: "USDT · Base",
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
      description: "通过 Base 链完成 USDT 转账支付。",
      label: "USDT · Base",
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
      availableStock: "Available stock",
      backLabel: `Back to ${localizedStorefrontName}`,
      buyNow: "Buy now",
      choosePaymentMethod: "Payment method",
      chooseUsdtNetwork: "USDT network",
      chooseSku: "Choose SKU",
      createOrder: "Create order and continue to payment",
      defaultBadge: "Default",
      defaultSku: "Default SKU",
      email: "Email",
      emailPlaceholder: "Used for order lookup and delivery confirmation",
      fromSuffix: " from",
      helperText: `You will be redirected to NovaPay after placing the order, and the delivered secret for the selected SKU will be shown automatically after payment.${"\u00A0"}`,
      missingDescription: "This product does not have a detailed description yet.",
      noPaymentChannel: "No payment method is available for this product yet. Please enable a payment channel in the console first.",
      noSku: "This product has no visible SKU yet. Please add and enable a default SKU in the back office first.",
      orderTitle: "Buy now",
      outOfStock: "Out of stock",
      paymentMethodUnavailable: "Payment methods unavailable",
      productInfo: "Product info",
      productMode: "Product mode",
      pricingRules: "Volume pricing",
      currentUnitPrice: "Unit price",
      estimatedTotal: "Estimated total",
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
      storefrontLabel: "Storefront",
      stockLabel: "Stock",
      unavailableStock: "Out of stock",
      usdtGroupDescription: "Choose USDT first, then pick the chain you want to pay on.",
      announcementHeading: "Store announcement",
      channelCount: (count: number) =>
        count > 0
          ? ` ${count} payment method${count > 1 ? "s" : ""} are currently available.`
          : " No payment method is currently configured.",
    };
  }

  return {
    announcementFallback: "当前店铺已启用公告展示。",
    availableStock: "可售库存",
    backLabel: `返回 ${localizedStorefrontName}`,
    buyNow: "立即购买",
    choosePaymentMethod: "支付方式",
    chooseUsdtNetwork: "USDT 链路",
    chooseSku: "选择规格",
    createOrder: "创建订单并去支付",
    defaultBadge: "默认",
    defaultSku: "默认规格",
    email: "邮箱",
    emailPlaceholder: "用于订单查询与交付确认",
    fromSuffix: " 起",
    helperText: "下单后会跳转到支付页面完成付款，支付确认后会自动展示对应规格的交付内容。",
    missingDescription: "当前商品尚未补充详细介绍。",
    noPaymentChannel: "当前商品暂未绑定可用支付方式，请先启用对应收款通道。",
    noSku: "当前商品还没有可展示的规格，请先到后台补充默认规格并启用。",
    orderTitle: "立即购买",
    outOfStock: "库存不足",
    paymentMethodUnavailable: "支付方式未配置",
    productInfo: "商品信息",
    productMode: "商品模式",
    pricingRules: "阶梯价格",
    currentUnitPrice: "当前单价",
    estimatedTotal: "预估合计",
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
    storefrontLabel: "所属站点",
    stockLabel: "库存",
    unavailableStock: "库存不足",
    usdtGroupDescription: "先选择 USDT，再挑选具体链路完成支付。",
    announcementHeading: "店铺公告",
    channelCount: (count: number) => (count > 0 ? ` 当前支持 ${count} 种支付方式。` : " 当前暂未配置可用支付方式。"),
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
  const purchaseSummaryTitle = language === "zh" ? "下单摘要" : "Order Summary";

  return (
    <div className="storefront-shell product-detail-page">
      {error ? <div className="notice-card error">{error}</div> : null}
      {hasStorefrontAnnouncement(announcement) ? (
        <section className="panel notice-panel product-announcement-panel">
          <div className="panel-header">
            <span className="panel-icon">※</span>
            <h2 className="panel-title">{announcement?.title || copy.announcementHeading}</h2>
          </div>

          <div className="panel-body">
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

      <section className="detail-grid">
        <article className="panel detail-panel product-detail-main">
          <div className="panel-body product-detail-main-body">
            <section className="product-spotlight">
              <div className="product-spotlight-media">
                <div className="product-spotlight-mark">{product.name.slice(0, 2)}</div>
              </div>

              <div className="product-spotlight-copy">
                <div className="product-spotlight-badges">
                  <span className="price-chip product-price-chip">
                    {formatCurrency(product.startingPriceCents, language)}
                    {isMultiSku ? copy.fromSuffix : ""}
                  </span>
                  <span className={`badge ${product.stock.available > 0 ? "success" : "muted"}`}>
                    {product.stock.available > 0
                      ? isMultiSku
                        ? copy.chooseSku
                        : copy.singleDirectPurchase
                      : copy.unavailableStock}
                  </span>
                </div>

                <div className="product-spotlight-head">
                  <p className="product-section-kicker">{copy.storefrontLabel}</p>
                  <h1 className="product-spotlight-title">{product.name}</h1>
                  <p className="product-storefront-line">{storefrontLabelValue}</p>
                </div>

                <p className="product-spotlight-copytext">
                  {product.description || product.summary || copy.missingDescription}
                </p>

                <div className="product-spotlight-stats">
                  <article className="product-stat-card">
                    <span>{isMultiSku ? copy.skuCount : copy.productMode}</span>
                    <strong>{isMultiSku ? product.skus.length : copy.singleMode}</strong>
                  </article>
                  <article className="product-stat-card">
                    <span>{copy.availableStock}</span>
                    <strong>{product.stock.available}</strong>
                  </article>
                  <article className="product-stat-card">
                    <span>{copy.choosePaymentMethod}</span>
                    <strong>{paymentGroups.length}</strong>
                  </article>
                </div>

                {selectedSkuPricingSummary ? (
                  <p className="product-tier-note">
                    {copy.pricingRules}: {selectedSkuPricingSummary}
                  </p>
                ) : null}
              </div>
            </section>

            <section className="section">
              <div className="section-header product-catalog-header">
                <div>
                  <h2 className="order-title">{isMultiSku ? copy.chooseSku : copy.productInfo}</h2>
                  <p className="section-copy">
                    {isMultiSku ? copy.skuModeDescription : copy.singleModeDescription}
                  </p>
                </div>
              </div>

              {product.skus.length === 0 ? (
                <div className="sub-panel">
                  <p className="empty-note">{copy.noSku}</p>
                </div>
              ) : (
                <div className="sku-grid product-sku-grid">
                  {product.skus.map((sku) => {
                    const skuPricingTiers = parseStoredSkuPricingTiers(sku.pricingTiers);
                    const disabled = sku.stock.available === 0;
                    const active = sku.id === selectedSku?.id;

                    return (
                      <button
                        key={sku.id}
                        type="button"
                        className={`sku-card product-sku-card product-sku-selector ${disabled ? "is-disabled" : ""} ${
                          active ? "is-selected" : ""
                        }`}
                        onClick={() => {
                          if (!isMultiSku || disabled) {
                            return;
                          }

                          setSelectedSkuId(sku.id);
                          setQuantity((currentQuantity) =>
                            clampQuantity(currentQuantity, Math.min(sku.stock.available, MAX_PUBLIC_ORDER_QUANTITY)),
                          );
                        }}
                        aria-pressed={active}
                        disabled={!isMultiSku || disabled}
                      >
                        <div className="sku-card-head">
                          <div>
                            <div className="product-sku-headline">
                              <h3>{sku.name}</h3>
                              {active ? (
                                <span className="product-inline-tag">{language === "zh" ? "当前选择" : "Selected"}</span>
                              ) : null}
                            </div>
                            <p className="small-copy">
                              {sku.summary ||
                                (language === "zh" ? "该规格未补充额外说明。" : "No extra note for this option yet.")}
                            </p>
                          </div>
                          <span className="price-chip">
                            {formatCurrency(getSkuLowestUnitPriceCents(sku.priceCents, sku.pricingTiers), language)}
                            {skuPricingTiers.length > 0 ? copy.fromSuffix : ""}
                          </span>
                        </div>

                        {skuPricingTiers.length > 0 ? (
                          <p className="small-copy">{skuPricingTiers.map(describeSkuPricingTier).join(" / ")}</p>
                        ) : null}

                        <div className="data-row">
                          <span className="data-key">{copy.stockLabel}</span>
                          <strong>{sku.stock.available}</strong>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <div className="button-row product-detail-actions">
              <Link href={backHref} className="button-link">
                {copy.backLabel}
              </Link>
            </div>
          </div>
        </article>

        <aside className="panel product-checkout-panel">
          <div className="panel-header product-checkout-header">
            <span className="panel-icon">◎</span>
            <h2 className="panel-title">{copy.buyNow}</h2>
          </div>

          <div className="panel-body product-checkout-body">
            <p className="helper-text product-checkout-lead">
              {copy.helperText}
              {copy.channelCount(paymentGroups.length)}
            </p>

            {selectedSku && selectedUnitPriceCents !== null && selectedTotalPriceCents !== null ? (
              <section className="product-order-summary-card">
                <div className="product-order-summary-top">
                  <div>
                    <p className="product-section-kicker">{purchaseSummaryTitle}</p>
                    <h3>{language === "zh" ? "确认订单信息" : "Confirm your order"}</h3>
                  </div>
                  <strong>{formatCurrency(selectedTotalPriceCents, language)}</strong>
                </div>
                <div className="product-order-summary-grid">
                  <div>
                    <span>{copy.currentUnitPrice}</span>
                    <strong>{formatCurrency(selectedUnitPriceCents, language)}</strong>
                  </div>
                  <div>
                    <span>{copy.quantity}</span>
                    <strong>{quantity}</strong>
                  </div>
                  <div>
                    <span>{copy.stockLabel}</span>
                    <strong>{selectedSku.stock.available}</strong>
                  </div>
                  <div>
                    <span>{copy.choosePaymentMethod}</span>
                    <strong>
                      {selectedGroup?.channels.find((channel) => channel.code === selectedChannelCode)?.label ??
                        (language === "zh" ? "待选择" : "Choose")}
                    </strong>
                  </div>
                </div>
              </section>
            ) : null}

            <form action={createShopOrderAction} className="inline-form product-checkout-form">
              <input type="hidden" name="slug" value={product.slug} />
              <input type="hidden" name="returnPath" value={returnPath} />
              <input type="hidden" name="channelCode" value={selectedChannelCode} />
              <input type="hidden" name="skuId" value={isMultiSku ? selectedSkuId : defaultSkuId} />

              {selectedSku ? (
                <div className="sub-panel product-fixed-sku-card">
                  <div className="data-row">
                    <span className="data-key">{isMultiSku ? copy.chooseSku : copy.defaultSku}</span>
                    <strong>{selectedSku.name}</strong>
                  </div>
                  <div className="data-row">
                    <span className="data-key">{language === "zh" ? "规格说明" : "SKU note"}</span>
                    <strong>{selectedSku.summary || copy.singleSkuNote}</strong>
                  </div>
                  <div className="data-row">
                    <span className="data-key">{language === "zh" ? "售价" : "Price"}</span>
                    <strong>
                      {`${formatCurrency(
                        getSkuLowestUnitPriceCents(selectedSku.priceCents, selectedSku.pricingTiers),
                        language,
                      )}${selectedSkuPricingTiers.length > 0 ? copy.fromSuffix : ""}`}
                    </strong>
                  </div>
                  <div className="data-row">
                    <span className="data-key">{copy.stockLabel}</span>
                    <strong>{selectedSku.stock.available}</strong>
                  </div>
                  {selectedSkuPricingSummary ? (
                    <div className="data-row">
                      <span className="data-key">{copy.pricingRules}</span>
                      <strong>{selectedSkuPricingSummary}</strong>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {paymentGroups.length > 0 ? (
                <div className="field">
                  <label>{copy.choosePaymentMethod}</label>
                  <div className="payment-method-row" role="radiogroup" aria-label={copy.choosePaymentMethod}>
                    {paymentGroups.map((group) => {
                      const groupSelected = group.code === (selectedGroup?.code ?? "");
                      const isDefaultGroup = group.channels.some((channel) => channel.code === defaultChannelCode);

                      return (
                        <button
                          key={group.code}
                          type="button"
                          className={`payment-method-pill ${groupSelected ? "is-active" : ""}`}
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
                          <span className="payment-method-pill-label">{group.label}</span>
                          <span className="payment-method-pill-meta">
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
                    <p className="small-copy payment-method-helper">
                  {selectedGroup.code === "usdt" ? copy.usdtGroupDescription : selectedGroup.description}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="notice-card error">{copy.noPaymentChannel}</div>
              )}

              {selectedGroup && selectedGroup.channels.length > 1 ? (
                <div className="field">
                  <label>{copy.chooseUsdtNetwork}</label>
                  <div className="payment-network-row" role="radiogroup" aria-label={copy.chooseUsdtNetwork}>
                    {selectedGroup.channels.map((channel) => (
                      <button
                        key={channel.code}
                        type="button"
                        className={`payment-network-pill ${channel.code === selectedChannelCode ? "is-active" : ""}`}
                        onClick={() => setSelectedChannelCode(channel.code)}
                        aria-pressed={channel.code === selectedChannelCode}
                      >
                        <span>{channel.label}</span>
                        <small>{channel.code === defaultChannelCode ? copy.defaultBadge : channel.code}</small>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {selectedGroup && selectedChannelCode ? (
                <div className="sub-panel product-selection-card">
                  <div className="data-row">
                    <span className="data-key">{copy.selectedPaymentDetail}</span>
                    <strong>
                      {selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.label ?? selectedChannelCode}
                    </strong>
                  </div>
                  {selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.description ? (
                    <div className="data-row">
                      <span className="data-key">{language === "zh" ? "支付说明" : "Payment note"}</span>
                      <strong>
                        {selectedGroup.channels.find((channel) => channel.code === selectedChannelCode)?.description}
                      </strong>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="field">
                <label htmlFor="customerEmail">{copy.email}</label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  placeholder={copy.emailPlaceholder}
                />
              </div>

              <div className="field">
                <label htmlFor="quantity">{copy.quantity}</label>
                <div className="quantity-stepper">
                  <button
                    type="button"
                    className="quantity-stepper-button"
                    onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity - 1, maxQuantity))}
                    disabled={quantity <= 1}
                    aria-label={language === "zh" ? "减少数量" : "Decrease quantity"}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    max={maxQuantity}
                    step={1}
                    value={quantity}
                    onChange={(event) => setQuantity(clampQuantity(Number(event.target.value), maxQuantity))}
                  />
                  <button
                    type="button"
                    className="quantity-stepper-button"
                    onClick={() => setQuantity((currentQuantity) => clampQuantity(currentQuantity + 1, maxQuantity))}
                    disabled={quantity >= maxQuantity}
                    aria-label={language === "zh" ? "增加数量" : "Increase quantity"}
                  >
                    +
                  </button>
                </div>
                <p className="small-copy">{copy.quantityHint(maxQuantity)}</p>
              </div>

              <button type="submit" className="button product-submit-button" disabled={!canPurchase}>
                {canPurchase ? copy.createOrder : paymentChannels.length > 0 ? copy.outOfStock : copy.paymentMethodUnavailable}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </div>
  );
}
