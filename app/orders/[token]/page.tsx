import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  KeyRound,
  PackageSearch,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { refreshPublicOrderAction } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  describeOrderAmount,
  getOrderByPublicToken,
  getOrderStatusLabel,
  getOrderStatusTone,
  refreshOrderByPublicToken,
} from "@/lib/shop";
import { buildStorefrontPath } from "@/lib/storefront";
import { formatDateTime } from "@/lib/utils";

const toneToBadgeVariant: Record<
  ReturnType<typeof getOrderStatusTone>,
  "default" | "secondary" | "destructive" | "outline"
> = {
  success: "default",
  warning: "secondary",
  muted: "outline",
};

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
      syncError = error instanceof Error ? error.message : "状态刷新失败，请稍后手动重试。";
    }
  }

  const paymentUrl = order.hostedCheckoutUrl || order.checkoutUrl;
  const storefrontPath = buildStorefrontPath(order.paymentProfile?.ownerId);
  const queryHref = `/query?orderNo=${encodeURIComponent(order.orderNo)}&email=${encodeURIComponent(order.customerEmail)}`;

  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            订单详情
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {order.orderNo}
            </h1>
            <Badge variant={toneToBadgeVariant[getOrderStatusTone(order.status)]}>
              {getOrderStatusLabel(order.status)}
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            查看订单的支付状态、金额明细以及交付内容。如果支付完成后没有自动返回，可以在下方手动刷新最新进度。
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
              <PackageSearch className="h-4 w-4 text-muted-foreground" />
              订单信息
            </div>

            {syncError ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {syncError}
              </div>
            ) : null}

            <dl className="divide-y divide-border/60 rounded-md border border-border/60">
              <DataRow label="商品" value={order.product.name} />
              <DataRow label="规格" value={order.sku.name} />
              <DataRow label="邮箱" value={order.customerEmail} />
              <DataRow label="数量" value={String(order.quantity)} />
              <DataRow label="金额" value={describeOrderAmount(order.amountCents)} />
              <DataRow label="创建时间" value={formatDateTime(order.createdAt)} />
              <DataRow label="支付时间" value={formatDateTime(order.paidAt)} />
              <DataRow label="支付通道状态" value={order.novapayStatus ?? "未同步"} />
            </dl>

            {order.failureMessage ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {order.failureMessage}
              </div>
            ) : null}

            {order.status === "PENDING_PAYMENT" ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {paymentUrl ? (
                  <Button asChild>
                    <a href={paymentUrl} target="_blank" rel="noreferrer">
                      继续支付
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                ) : null}

                <form action={refreshPublicOrderAction}>
                  <input type="hidden" name="publicToken" value={order.publicToken} />
                  <Button type="submit" variant="outline">
                    <RefreshCcw className="mr-1 h-4 w-4" />
                    手动刷新进度
                  </Button>
                </form>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="ghost" size="sm">
                <Link href={storefrontPath}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  返回商品入口
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href={queryHref}>
                  返回订单查询
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col gap-5">
            <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              交付内容
            </div>

            {order.status === "FULFILLED" ? (
              <ul className="flex flex-col gap-3">
                {order.cards.map((card) => (
                  <li
                    key={card.id}
                    className="rounded-md border border-border/60 bg-muted/30 px-3 py-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <KeyRound className="h-3.5 w-3.5" />
                      卡密 {card.id.slice(-6)}
                    </div>
                    <code className="mt-2 block break-all rounded-sm bg-background px-2 py-1.5 font-mono text-sm">
                      {card.secret}
                    </code>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                当前订单尚未完成交付。支付确认后，这里会自动展示对应的交付内容。
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
