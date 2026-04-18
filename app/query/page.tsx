import Link from "next/link";
import { refreshLookupOrderAction } from "@/app/actions";
import { assertRateLimit } from "@/lib/rate-limit";
import { describeOrderAmount, getOrderStatusLabel, getOrderStatusTone, lookupOrder } from "@/lib/shop";
import { formatDateTime } from "@/lib/utils";

export default async function QueryPage({
  searchParams,
}: {
  searchParams: Promise<{ orderNo?: string; email?: string; error?: string }>;
  }) {
  const search = await searchParams;
  let order = null;
  let errorMessage = search.error;

  if (search.orderNo && search.email) {
    try {
      await assertRateLimit({
        key: "public:query-page",
        limit: 15,
        windowMs: 60_000,
        message: "查单请求过于频繁，请稍后再试。",
      });
      order = await lookupOrder(search.orderNo, search.email);
    } catch (error) {
      order = null;
      errorMessage = error instanceof Error ? error.message : "查单失败，请稍后再试。";
    }
  }

  return (
    <>
      <section className="panel notice-panel">
        <div className="panel-header">
          <span className="panel-icon">◎</span>
          <h2 className="panel-title">订单查询</h2>
        </div>

        <div className="panel-body">
          <p className="section-copy">
            用订单号和邮箱取回发货记录；如果支付完成后没有自动回跳，也可以在这里主动刷新。
          </p>
        </div>
      </section>

      <section className="section detail-grid">
        <article className="panel">
          <div className="panel-header">
            <span className="panel-icon">◇</span>
            <h2 className="panel-title">查询条件</h2>
          </div>

          <div className="panel-body">
            <form action="/query" method="get" className="inline-form">
              <div className="field">
                <label htmlFor="orderNo">订单号</label>
                <input id="orderNo" name="orderNo" defaultValue={search.orderNo ?? ""} required />
              </div>

              <div className="field">
                <label htmlFor="email">邮箱</label>
                <input id="email" name="email" type="email" defaultValue={search.email ?? ""} required />
              </div>

              <button type="submit" className="button">
                查询订单
              </button>
            </form>

            {errorMessage ? <div className="notice-card error">{errorMessage}</div> : null}
            {search.orderNo && search.email && !order ? (
              <div className="notice-card error">没有找到匹配的订单，请确认订单号和邮箱。</div>
            ) : null}
          </div>
        </article>

        <aside className="panel">
          <div className="panel-header">
            <span className="panel-icon">◆</span>
            <h2 className="panel-title">查询结果</h2>
          </div>

          <div className="panel-body">
            {order ? (
              <>
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
                </dl>

                <div className="button-row">
                  <Link href={`/orders/${order.publicToken}`} className="button-secondary">
                    打开订单详情
                  </Link>

                  {order.status === "PENDING_PAYMENT" ? (
                    <form action={refreshLookupOrderAction}>
                      <input type="hidden" name="orderNo" value={order.orderNo} />
                      <input type="hidden" name="customerEmail" value={order.customerEmail} />
                      <button type="submit" className="button">
                        刷新支付状态
                      </button>
                    </form>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="sub-panel">
                <p className="empty-note">输入订单号和邮箱后，这里会展示订单状态与发货结果。</p>
              </div>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
