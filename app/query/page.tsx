import Link from "next/link";
import { ArrowRight, RefreshCcw, Search } from "lucide-react";
import { refreshLookupOrderAction } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { assertRateLimit } from "@/lib/rate-limit";
import {
  describeOrderAmount,
  getOrderStatusLabel,
  getOrderStatusTone,
  lookupOrder,
} from "@/lib/shop";
import { formatDateTime } from "@/lib/utils";

const toneToBadgeVariant: Record<
  ReturnType<typeof getOrderStatusTone>,
  "default" | "secondary" | "destructive" | "outline"
> = {
  success: "default",
  warning: "secondary",
  muted: "outline",
};

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

  const noMatch = Boolean(search.orderNo && search.email && !order && !errorMessage);

  return (
    <div className="bg-background">
      <section className="border-b border-border/60">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            订单服务
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            订单状态查询
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            通过订单号和邮箱查询订单状态与交付记录。如果支付完成后没有自动返回，也可以在这里主动刷新进度。
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
              <Search className="h-4 w-4 text-muted-foreground" />
              查询信息
            </div>

            <form action="/query" method="get" className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="orderNo">订单号</Label>
                <Input
                  id="orderNo"
                  name="orderNo"
                  defaultValue={search.orderNo ?? ""}
                  placeholder="例如 NS20260528..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={search.email ?? ""}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="mt-1">
                查询状态
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            {errorMessage ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </div>
            ) : null}
            {noMatch ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                没有找到匹配的订单，请确认订单号和邮箱。
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium tracking-tight">订单结果</span>
              {order ? (
                <Badge variant={toneToBadgeVariant[getOrderStatusTone(order.status)]}>
                  {getOrderStatusLabel(order.status)}
                </Badge>
              ) : null}
            </div>

            {order ? (
              <>
                <dl className="divide-y divide-border/60 rounded-md border border-border/60">
                  <DataRow label="商品" value={order.product.name} />
                  <DataRow label="规格" value={order.sku.name} />
                  <DataRow label="金额" value={describeOrderAmount(order.amountCents)} />
                  <DataRow label="创建时间" value={formatDateTime(order.createdAt)} />
                  <DataRow label="支付时间" value={formatDateTime(order.paidAt)} />
                </dl>

                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Button asChild variant="outline">
                    <Link href={`/orders/${order.publicToken}`}>
                      打开订单详情
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>

                  {order.status === "PENDING_PAYMENT" ? (
                    <form action={refreshLookupOrderAction}>
                      <input type="hidden" name="orderNo" value={order.orderNo} />
                      <input type="hidden" name="customerEmail" value={order.customerEmail} />
                      <Button type="submit">
                        <RefreshCcw className="mr-1 h-4 w-4" />
                        刷新支付状态
                      </Button>
                    </form>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                输入订单号和邮箱后，这里会展示订单状态、支付进度与交付结果。
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
