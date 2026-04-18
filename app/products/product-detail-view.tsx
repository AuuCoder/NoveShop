"use client";

import Link from "next/link";
import { useMemo } from "react";
import { createShopOrderAction } from "@/app/actions";
import { type SiteLanguage, useSitePreferences } from "@/app/ui-preferences";
import { buildPaymentChannelOptions } from "@/lib/payment-channels";

type ProductDetailSkuSnapshot = {
  id: string;
  name: string;
  priceCents: number;
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

function getPaymentChannelDictionary(language: SiteLanguage) {
  if (language === "en") {
    return {
      "alipay.page": {
        description: "Best for launching the Alipay hosted checkout page from the web.",
        label: "Alipay Page",
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
        ? "管理员直营网"
        : storefrontName ?? (language === "zh" ? "当前店铺" : "Current Store");

  if (language === "en") {
    return {
      announcementFallback: "This storefront has announcement display enabled.",
      availableStock: "Available stock",
      backLabel: `Back to ${localizedStorefrontName}`,
      buyNow: "Buy now",
      choosePaymentMethod: "Payment method",
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
      quantity: "Quantity",
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
    chooseSku: "选择 SKU",
    createOrder: "创建订单并去支付",
    defaultBadge: "默认",
    defaultSku: "默认规格",
    email: "邮箱",
    emailPlaceholder: "用于查单和收货确认",
    fromSuffix: " 起",
    helperText: "下单后会跳转到 NovaPay，支付成功后自动展示对应 SKU 的卡密。",
    missingDescription: "当前商品尚未补充详细介绍。",
    noPaymentChannel: "当前商品暂未绑定可用支付方式，请先到后台启用收款通道。",
    noSku: "当前商品还没有可展示的规格，请先到后台补充默认规格并启用。",
    orderTitle: "立即购买",
    outOfStock: "库存不足",
    paymentMethodUnavailable: "支付方式未配置",
    productInfo: "商品信息",
    productMode: "商品模式",
    quantity: "数量",
    skuCount: "SKU 数量",
    skuList: "规格列表",
    skuModeDescription: "每个 SKU 独立定价、独立库存。",
    singleDirectPurchase: "单商品直购",
    singleMode: "单商品",
    singleModeDescription: "当前商品按单商品模式出售，直接购买默认规格即可。",
    singleSkuNote: "独立库存的可购买规格",
    storefrontLabel: "所属店铺",
    stockLabel: "库存",
    unavailableStock: "库存不足",
    announcementHeading: "店铺公告",
    channelCount: (count: number) => (count > 0 ? ` 当前支持 ${count} 种支付方式。` : " 当前暂未配置可用支付方式。"),
  };
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
  const paymentChannels = useMemo(() => {
    const dictionary = getPaymentChannelDictionary(language);

    return buildPaymentChannelOptions(checkoutChannelConfig?.enabledChannelCodes ?? []).map((channel) => ({
      ...channel,
      description: dictionary[channel.code as keyof typeof dictionary]?.description ?? channel.description,
      label: dictionary[channel.code as keyof typeof dictionary]?.label ?? channel.label,
    }));
  }, [checkoutChannelConfig?.enabledChannelCodes, language]);
  const defaultChannelCode =
    paymentChannels.find((channel) => channel.code === checkoutChannelConfig?.defaultChannelCode)?.code ??
    paymentChannels[0]?.code ??
    "";
  const maxQuantity = Math.min(
    Math.max(...product.skus.map((sku) => sku.stock.available), 1),
    10,
  );
  const canPurchase = availableSkus.length > 0 && Boolean(defaultSkuId) && paymentChannels.length > 0;

  return (
    <div className="storefront-shell">
      {error ? <div className="notice-card error">{error}</div> : null}
      {hasStorefrontAnnouncement(announcement) ? (
        <section className="panel notice-panel">
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
        <article className="panel detail-panel">
          <div className="panel-header">
            <span className="panel-icon">◆</span>
            <h1 className="panel-title">{product.name}</h1>
          </div>

          <div className="panel-body">
            <div className="product-hero-card">
              <div className="product-hero-mark">{product.name.slice(0, 2)}</div>
              <div>
                <div className="button-row compact">
                  <span className="price-chip">
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
                {(storefrontName || platformStore) ? (
                  <p className="small-copy">
                    {copy.storefrontLabel}: {platformStore ? (language === "zh" ? "管理员直营网" : "Platform Official Store") : storefrontName}
                  </p>
                ) : null}
                <p className="muted-copy">
                  {product.description || product.summary || copy.missingDescription}
                </p>
              </div>
            </div>

            <div className="summary-grid section">
              <div className="sub-panel">
                <p className="small-copy">{isMultiSku ? copy.skuCount : copy.productMode}</p>
                <strong>{isMultiSku ? product.skus.length : copy.singleMode}</strong>
              </div>
              <div className="sub-panel">
                <p className="small-copy">{copy.availableStock}</p>
                <strong>{product.stock.available}</strong>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <div>
                  <h2 className="order-title">{isMultiSku ? copy.skuList : copy.productInfo}</h2>
                  <p className="section-copy">
                    {isMultiSku
                      ? copy.skuModeDescription
                      : copy.singleModeDescription}
                  </p>
                </div>
              </div>

              {product.skus.length === 0 ? (
                <div className="sub-panel">
                  <p className="empty-note">{copy.noSku}</p>
                </div>
              ) : (
                <div className="sku-grid">
                  {product.skus.map((sku) => (
                    <article key={sku.id} className={`sku-card ${sku.stock.available > 0 ? "" : "is-disabled"}`}>
                      <div className="sku-card-head">
                        <div>
                          <h3>{sku.name}</h3>
                          <p className="small-copy">
                            {sku.summary || (language === "zh" ? "该规格未补充额外说明。" : "No extra note for this SKU yet.")}
                          </p>
                        </div>
                        <span className="price-chip">{formatCurrency(sku.priceCents, language)}</span>
                      </div>

                      <div className="data-row">
                        <span className="data-key">{copy.stockLabel}</span>
                        <strong>{sku.stock.available}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="button-row">
              <Link href={backHref} className="button-link">
                {copy.backLabel}
              </Link>
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="panel-header">
            <span className="panel-icon">◎</span>
            <h2 className="panel-title">{copy.buyNow}</h2>
          </div>

          <div className="panel-body">
            <p className="helper-text">
              {copy.helperText}
              {copy.channelCount(paymentChannels.length)}
            </p>

            <form action={createShopOrderAction} className="inline-form">
              <input type="hidden" name="slug" value={product.slug} />
              <input type="hidden" name="returnPath" value={returnPath} />
              {isMultiSku ? (
                <div className="field">
                  <label>{copy.chooseSku}</label>
                  <div className="sku-selector">
                    {product.skus.map((sku) => (
                      <label
                        key={sku.id}
                        className={`sku-option ${sku.stock.available > 0 ? "" : "is-disabled"}`}
                      >
                        <input
                          type="radio"
                          name="skuId"
                          value={sku.id}
                          defaultChecked={sku.id === defaultSkuId}
                          disabled={sku.stock.available === 0}
                          required
                        />
                        <div className="sku-option-body">
                          <div className="sku-option-head">
                            <strong>{sku.name}</strong>
                            <span>{formatCurrency(sku.priceCents, language)}</span>
                          </div>
                          <p>{sku.summary || copy.singleSkuNote}</p>
                          <small>
                            {copy.stockLabel} {sku.stock.available}
                          </small>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <input type="hidden" name="skuId" value={defaultSkuId} />
                  <div className="sub-panel">
                    <div className="data-row">
                      <span className="data-key">{copy.defaultSku}</span>
                      <strong>{primarySku?.name ?? (language === "zh" ? "未配置" : "Not configured")}</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-key">{language === "zh" ? "售价" : "Price"}</span>
                      <strong>{primarySku ? formatCurrency(primarySku.priceCents, language) : "--"}</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-key">{copy.stockLabel}</span>
                      <strong>{primarySku?.stock.available ?? 0}</strong>
                    </div>
                  </div>
                </>
              )}

              {paymentChannels.length > 0 ? (
                <div className="field">
                  <label>{copy.choosePaymentMethod}</label>
                  <div className="sku-selector">
                    {paymentChannels.map((channel) => (
                      <label key={channel.code} className="sku-option">
                        <input
                          type="radio"
                          name="channelCode"
                          value={channel.code}
                          defaultChecked={channel.code === defaultChannelCode}
                          required
                        />
                        <div className="sku-option-body">
                          <div className="sku-option-head">
                            <strong>{channel.label}</strong>
                            <span>{channel.code === defaultChannelCode ? copy.defaultBadge : channel.code}</span>
                          </div>
                          <p>{channel.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="notice-card error">{copy.noPaymentChannel}</div>
              )}

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
                <select id="quantity" name="quantity" defaultValue="1">
                  {Array.from({ length: maxQuantity || 1 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="button" disabled={!canPurchase}>
                {canPurchase ? copy.createOrder : paymentChannels.length > 0 ? copy.outOfStock : copy.paymentMethodUnavailable}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </div>
  );
}
