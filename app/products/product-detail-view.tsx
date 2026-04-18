import Link from "next/link";
import { ProductSaleMode } from "@prisma/client";
import { createShopOrderAction } from "@/app/actions";
import { buildPaymentChannelOptions } from "@/lib/payment-channels";
import {
  getStorefrontAnnouncementHeading,
  hasStorefrontAnnouncement,
  type StorefrontAnnouncementSnapshot,
} from "@/lib/storefront-announcement";
import { type PublicStorefrontProduct } from "@/lib/shop";
import { formatCny } from "@/lib/utils";

export function ProductDetailView({
  product,
  checkoutChannelConfig,
  announcement,
  error,
  backHref,
  backLabel,
  returnPath,
  storefrontName,
}: {
  product: PublicStorefrontProduct;
  checkoutChannelConfig: {
    defaultChannelCode: string;
    enabledChannelCodes: string[];
  } | null;
  announcement?: StorefrontAnnouncementSnapshot | null;
  error?: string;
  backHref: string;
  backLabel: string;
  returnPath: string;
  storefrontName?: string;
}) {
  const isMultiSku = product.saleMode === ProductSaleMode.MULTI;
  const primarySku = product.skus[0] ?? null;
  const availableSkus = product.skus.filter((sku) => sku.stock.available > 0);
  const defaultSkuId = availableSkus[0]?.id ?? primarySku?.id ?? "";
  const paymentChannels = buildPaymentChannelOptions(checkoutChannelConfig?.enabledChannelCodes ?? []);
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
    <>
      {error ? <div className="notice-card error">{error}</div> : null}
      {hasStorefrontAnnouncement(announcement) ? (
        <section className="panel notice-panel">
          <div className="panel-header">
            <span className="panel-icon">※</span>
            <h2 className="panel-title">{getStorefrontAnnouncementHeading(announcement!)}</h2>
          </div>

          <div className="panel-body">
            {announcement?.body ? (
              <p className="section-copy" style={{ whiteSpace: "pre-line" }}>
                {announcement.body}
              </p>
            ) : (
              <p className="section-copy">当前店铺已启用公告展示。</p>
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
                    {formatCny(product.startingPriceCents)}
                    {isMultiSku ? " 起" : ""}
                  </span>
                  <span className={`badge ${product.stock.available > 0 ? "success" : "muted"}`}>
                    {product.stock.available > 0
                      ? isMultiSku
                        ? "可选 SKU"
                        : "单商品直购"
                      : "库存不足"}
                  </span>
                </div>
                {storefrontName ? <p className="small-copy">所属店铺：{storefrontName}</p> : null}
                <p className="muted-copy">
                  {product.description || product.summary || "当前商品尚未补充详细介绍。"}
                </p>
              </div>
            </div>

            <div className="summary-grid section">
              <div className="sub-panel">
                <p className="small-copy">{isMultiSku ? "SKU 数量" : "商品模式"}</p>
                <strong>{isMultiSku ? product.skus.length : "单商品"}</strong>
              </div>
              <div className="sub-panel">
                <p className="small-copy">可售库存</p>
                <strong>{product.stock.available}</strong>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <div>
                  <h2 className="order-title">{isMultiSku ? "规格列表" : "商品信息"}</h2>
                  <p className="section-copy">
                    {isMultiSku
                      ? "每个 SKU 独立定价、独立库存。"
                      : "当前商品按单商品模式出售，直接购买默认规格即可。"}
                  </p>
                </div>
              </div>

              {product.skus.length === 0 ? (
                <div className="sub-panel">
                  <p className="empty-note">当前商品还没有可展示的规格，请先到后台补充默认规格并启用。</p>
                </div>
              ) : (
                <div className="sku-grid">
                  {product.skus.map((sku) => (
                    <article key={sku.id} className={`sku-card ${sku.stock.available > 0 ? "" : "is-disabled"}`}>
                      <div className="sku-card-head">
                        <div>
                          <h3>{sku.name}</h3>
                          <p className="small-copy">{sku.summary || "该规格未补充额外说明。"}</p>
                        </div>
                        <span className="price-chip">{formatCny(sku.priceCents)}</span>
                      </div>

                      <div className="data-row">
                        <span className="data-key">库存</span>
                        <strong>{sku.stock.available}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="button-row">
              <Link href={backHref} className="button-link">
                {backLabel}
              </Link>
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="panel-header">
            <span className="panel-icon">◎</span>
            <h2 className="panel-title">立即购买</h2>
          </div>

          <div className="panel-body">
            <p className="helper-text">
              下单后会跳转到 NovaPay，支付成功后自动展示对应 SKU 的卡密。
              {paymentChannels.length > 0 ? ` 当前支持 ${paymentChannels.length} 种支付方式。` : " 当前暂未配置可用支付方式。"}
            </p>

            <form action={createShopOrderAction} className="inline-form">
              <input type="hidden" name="slug" value={product.slug} />
              <input type="hidden" name="returnPath" value={returnPath} />
              {isMultiSku ? (
                <div className="field">
                  <label>选择 SKU</label>
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
                            <span>{formatCny(sku.priceCents)}</span>
                          </div>
                          <p>{sku.summary || "独立库存的可购买规格"}</p>
                          <small>库存 {sku.stock.available}</small>
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
                      <span className="data-key">默认规格</span>
                      <strong>{primarySku?.name ?? "未配置"}</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-key">售价</span>
                      <strong>{primarySku ? formatCny(primarySku.priceCents) : "--"}</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-key">库存</span>
                      <strong>{primarySku?.stock.available ?? 0}</strong>
                    </div>
                  </div>
                </>
              )}

              {paymentChannels.length > 0 ? (
                <div className="field">
                  <label>支付方式</label>
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
                            <span>{channel.code === defaultChannelCode ? "默认" : channel.code}</span>
                          </div>
                          <p>{channel.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="notice-card error">当前商品暂未绑定可用支付方式，请先到后台启用收款通道。</div>
              )}

              <div className="field">
                <label htmlFor="customerEmail">邮箱</label>
                <input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  required
                  placeholder="用于查单和收货确认"
                />
              </div>

              <div className="field">
                <label htmlFor="quantity">数量</label>
                <select id="quantity" name="quantity" defaultValue="1">
                  {Array.from({ length: maxQuantity || 1 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="button" disabled={!canPurchase}>
                {canPurchase ? "创建订单并去支付" : paymentChannels.length > 0 ? "库存不足" : "支付方式未配置"}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </>
  );
}
