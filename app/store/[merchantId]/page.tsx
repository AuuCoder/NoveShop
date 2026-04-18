import Link from "next/link";
import { ProductSaleMode } from "@prisma/client";
import { notFound } from "next/navigation";
import {
  getMerchantAccountWithProfileById,
  listMerchantStorefronts,
} from "@/lib/merchant-account";
import {
  getMerchantStorefrontAnnouncement,
  getPlatformStorefrontAnnouncement,
  getStorefrontAnnouncementHeading,
  hasStorefrontAnnouncement,
} from "@/lib/storefront-announcement";
import { listActiveProductsByMerchant, listPlatformActiveProducts } from "@/lib/shop";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
  buildPlatformProductPath,
  buildPlatformStorefrontPath,
  isPlatformStorefrontId,
} from "@/lib/storefront";
import { formatCny, formatDateTime } from "@/lib/utils";

function getProductModeBadgeText(mode: ProductSaleMode, skuCount: number, hasStock: boolean) {
  if (!hasStock) {
    return "缺货";
  }

  return mode === ProductSaleMode.MULTI ? `${skuCount} 个 SKU` : "单商品";
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

export default async function MerchantStorefrontPage({
  params,
  searchParams,
}: {
  params: Promise<{ merchantId: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { merchantId } = await params;
  const search = await searchParams;
  const platformStore = isPlatformStorefrontId(merchantId);
  const [merchant, products, merchantStores, platformAnnouncement] = await Promise.all([
    platformStore ? Promise.resolve(null) : getMerchantAccountWithProfileById(merchantId),
    platformStore ? listPlatformActiveProducts() : listActiveProductsByMerchant(merchantId),
    listMerchantStorefronts(),
    platformStore ? getPlatformStorefrontAnnouncement() : Promise.resolve(null),
  ]);

  if (!platformStore && (!merchant || !merchant.isActive)) {
    notFound();
  }

  const storefrontPath = platformStore
    ? buildPlatformStorefrontPath()
    : buildMerchantStorefrontPath(merchant!.id);
  const keyword = search.q?.trim().toLowerCase() ?? "";
  const filteredProducts = keyword
    ? products.filter((product) =>
        matchesKeyword(
          [
            product.name,
            product.summary ?? "",
            product.description ?? "",
            ...product.skus.map((sku) => `${sku.name} ${sku.summary ?? ""}`),
          ],
          keyword,
        ),
      )
    : products;
  const totalStock = products.reduce((sum, product) => sum + product.stock.available, 0);
  const totalSkuCount = products.reduce((sum, product) => sum + product.skus.length, 0);
  const peerStoreCount = merchantStores.length;
  const title = platformStore ? "管理员直营网" : merchant!.name;
  const introCopy = platformStore
    ? "这里是管理员自己的官方店铺，承接平台直营商品展示、下单和支付。商户商品依然保留各自独立店铺，不会混卖。"
    : `这里是 ${merchant!.name} 的专属前台，只展示这个商户自己绑定到 NovaPay 商户名下的商品、SKU 和库存。`;
  const announcement = platformStore
    ? platformAnnouncement
    : getMerchantStorefrontAnnouncement(merchant);

  return (
    <>
      {!platformStore && !merchant!.paymentProfile ? (
        <div className="notice-card error">当前商户还没有配置收款参数，前台暂时只能浏览，无法正常下单。</div>
      ) : null}

      {!platformStore && merchant!.paymentProfile && !merchant!.paymentProfile.isActive ? (
        <div className="notice-card error">
          当前商户的 NovaPay 收款配置已停用，商品仍可展示，但下单会被拦截。
        </div>
      ) : null}

      {hasStorefrontAnnouncement(announcement) ? (
        <section className="panel notice-panel">
          <div className="panel-header">
            <span className="panel-icon">※</span>
            <h2 className="panel-title">{getStorefrontAnnouncementHeading(announcement!)}</h2>
          </div>

          <div className="panel-body">
            <div className="button-row compact">
              <span className={`badge ${platformStore ? "warning" : "success"}`}>
                {platformStore ? "平台公告" : "商户公告"}
              </span>
              {announcement?.updatedAt ? (
                <span className="badge muted">更新于 {formatDateTime(announcement.updatedAt)}</span>
              ) : null}
            </div>
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

      <section className="panel notice-panel">
        <div className="panel-header">
          <span className="panel-icon">◎</span>
          <h1 className="panel-title">{title}</h1>
        </div>

        <div className="panel-body">
          <p className="section-copy">{introCopy}</p>
          <div className="button-row compact">
            <span
              className={`badge ${
                platformStore ? "success" : merchant!.paymentProfile?.isActive ? "success" : "warning"
              }`}
            >
              {platformStore
                ? "平台官方店"
                : merchant!.paymentProfile?.isActive
                  ? "商户收款已启用"
                  : "商户收款未启用"}
            </span>
            <span className="badge muted">{peerStoreCount} 个商户店铺已上线</span>
          </div>
          <div className="button-row">
            <Link href="/" className="button-link">
              返回首页
            </Link>
          </div>
        </div>
      </section>

      <section className="section panel purchase-panel">
        <div className="panel-header">
          <span className="panel-icon">◇</span>
          <h2 className="panel-title">店铺商品</h2>
        </div>

        <div className="panel-body">
          <div className="stats-strip">
            <article className="stat-chip">
              <span className="stat-label">上架商品</span>
              <strong>{products.length}</strong>
            </article>
            <article className="stat-chip">
              <span className="stat-label">可购规格</span>
              <strong>{totalSkuCount}</strong>
            </article>
            <article className="stat-chip">
              <span className="stat-label">可售库存</span>
              <strong>{totalStock}</strong>
            </article>
          </div>

          <div className="chip-list">
            <Link href={storefrontPath} className="chip chip-primary">
              全部商品
            </Link>
            {products.map((product) => (
              <a key={product.id} href={`#product-${product.id}`} className="chip">
                <span className="chip-dot">{product.name.slice(0, 1)}</span>
                {product.name}
              </a>
            ))}
          </div>

          {keyword ? (
            <div className="search-result-bar">
              <span>当前关键词：{search.q}</span>
              <Link href={storefrontPath} className="button-link">
                清除筛选
              </Link>
            </div>
          ) : null}

          {products.length > 0 && filteredProducts.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">这个商户店铺里没有找到匹配的商品或 SKU，可以换个关键词再试试。</p>
            </div>
          ) : null}

          {products.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">当前商户还没有上架商品，后续可在商户中心继续补充商品和 SKU。</p>
            </div>
          ) : (
            <div className="goods-grid">
              {filteredProducts.map((product) => {
                const primarySku = product.skus[0] ?? null;
                const hasStock = product.stock.available > 0;
                const modeLabel = product.saleMode === ProductSaleMode.MULTI ? "多 SKU" : "单商品";
                const metaCopy =
                  product.saleMode === ProductSaleMode.MULTI
                    ? product.skus
                        .slice(0, 3)
                        .map((sku) => sku.name)
                        .join(" / ") || "适合用来展示多规格发卡能力。"
                    : primarySku?.summary || product.summary || "默认规格直购，适合做轻量发卡店铺。";

                return (
                  <article key={product.id} id={`product-${product.id}`} className="goods-card">
                    <div>
                      <div className="goods-thumb">
                        <span className="goods-thumb-mark">{product.name.slice(0, 2)}</span>
                        <p>{product.summary || "当前商品来自这个商户自己的专属前台。"}</p>
                      </div>
                      <div className="goods-content">
                        <div className="goods-head">
                          <span className="price-chip">{formatCny(product.startingPriceCents)}</span>
                          <span className={`badge ${hasStock ? "success" : "muted"}`}>
                            {getProductModeBadgeText(product.saleMode, product.skus.length, hasStock)}
                          </span>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="card-meta">{metaCopy}</p>
                      </div>
                    </div>

                    <div className="goods-foot">
                      <div className="data-row">
                        <span className="data-key">可售库存</span>
                        <strong>{product.stock.available}</strong>
                      </div>
                      <div className="data-row">
                        <span className="data-key">商品模式</span>
                        <strong>{modeLabel}</strong>
                      </div>

                      <div className="button-row">
                        <Link
                          href={
                            platformStore
                              ? buildPlatformProductPath(product.slug)
                              : buildMerchantStorefrontProductPath(merchant!.id, product.slug)
                          }
                          className="button"
                        >
                          {product.saleMode === ProductSaleMode.MULTI ? "选择 SKU" : "立即购买"}
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
    </>
  );
}
