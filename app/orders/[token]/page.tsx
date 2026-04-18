import Link from "next/link";
import { notFound } from "next/navigation";
import { refreshPublicOrderAction } from "@/app/actions";
import { describeOrderAmount, getOrderByPublicToken, getOrderStatusLabel, getOrderStatusTone, refreshOrderByPublicToken } from "@/lib/shop";
import { buildStorefrontPath } from "@/lib/storefront";
import { formatDateTime } from "@/lib/utils";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ sync?: string; error?: string }>;
}) {
  const { token } = await params;
  const search = await searchParams;
  let syncError = search.error;
  let order = await getOrderByPublicToken(token);

  if (!order) {
    notFound();
  }

  if (order.status === "PENDING_PAYMENT" && search.sync === "1") {
    try {
      const refreshed = await refreshOrderByPublicToken(token);

      if (refreshed) {
        order = refreshed;
      }
    } catch (error) {
      syncError = error instanceof Error ? error.message : "查单失败，请稍后手动刷新。";
    }
  }

  const paymentUrl = order.hostedCheckoutUrl || order.checkoutUrl;
  const storefrontPath = buildStorefrontPath(order.paymentProfile?.ownerId);

  return (
    <>
      {syncError ? <div className="notice-card error">{syncError}</div> : null}

      <section className="order-grid">
        <article className="panel">
          <div className="panel-header">
            <span className="panel-icon">◇</span>
            <h1 className="panel-title">订单 {order.orderNo}</h1>
          </div>

          <div className="panel-body">
            <div className="button-row">
              <span className={`badge ${getOrderStatusTone(order.status)}`}>
                {getOrderStatusLabel(order.status)}
              </span>
            </div>

            <dl className="data-list">
              <div className="data-row">
                <dt className="data-key">商品</dt>
                <dd>{order.product.name}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">SKU</dt>
                <dd>{order.sku.name}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">邮箱</dt>
                <dd>{order.customerEmail}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">数量</dt>
                <dd>{order.quantity}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">金额</dt>
                <dd>{describeOrderAmount(order.amountCents)}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">创建时间</dt>
                <dd>{formatDateTime(order.createdAt)}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">支付时间</dt>
                <dd>{formatDateTime(order.paidAt)}</dd>
              </div>
              <div className="data-row">
                <dt className="data-key">NovaPay 状态</dt>
                <dd>{order.novapayStatus ?? "未同步"}</dd>
              </div>
            </dl>

            {order.status === "PENDING_PAYMENT" ? (
              <div className="button-row">
                {paymentUrl ? (
                  <a href={paymentUrl} className="button" target="_blank" rel="noreferrer">
                    前往支付
                  </a>
                ) : null}

                <form action={refreshPublicOrderAction}>
                  <input type="hidden" name="publicToken" value={order.publicToken} />
                  <button type="submit" className="button-secondary">
                    手动刷新状态
                  </button>
                </form>
              </div>
            ) : null}

            {order.failureMessage ? <p className="helper-text">{order.failureMessage}</p> : null}

            <div className="button-row">
              <Link href={storefrontPath} className="button-link">
                返回购物首页
              </Link>
            </div>
          </div>
        </article>

        <aside className="panel">
          <div className="panel-header">
            <span className="panel-icon">◆</span>
            <h2 className="panel-title">发货内容</h2>
          </div>

          <div className="panel-body">
            {order.status === "FULFILLED" ? (
              <ul className="cards-list">
                {order.cards.map((card) => (
                  <li key={card.id}>
                    <p className="small-copy">卡密 {card.id.slice(-6)}</p>
                    <code>{card.secret}</code>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="sub-panel">
                <p className="empty-note">
                  当前订单还未发货。支付成功后，这里会自动显示卡密内容。
                </p>
              </div>
            )}

            <div className="button-row">
              <Link href={`/query?orderNo=${encodeURIComponent(order.orderNo)}&email=${encodeURIComponent(order.customerEmail)}`} className="button-link">
                用邮箱继续查单
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
