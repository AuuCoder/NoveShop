import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
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
  listOrdersByEmail,
} from "@/lib/shop";
import { formatDateTime } from "@/lib/utils";
import { getAuthorizedOrderPublicTokens } from "@/lib/order-query-session";

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
  searchParams: Promise<{ email?: string; error?: string }>;
}) {
  const search = await searchParams;
  const email = search.email?.trim() ?? "";
  let orders: Awaited<ReturnType<typeof listOrdersByEmail>> = [];
  let errorMessage = search.error;

  if (email) {
    try {
      await assertRateLimit({
        key: `public:query-page:${email.toLowerCase()}`,
        limit: 15,
        windowMs: 60_000,
        message: "查单请求过于频繁，请稍后再试。",
      });
      orders = await listOrdersByEmail(email, await getAuthorizedOrderPublicTokens());
    } catch (error) {
      orders = [];
      errorMessage = error instanceof Error ? error.message : "查单失败，请稍后再试。";
    }
  }

  const searched = Boolean(email);
  const noMatch = searched && orders.length === 0 && !errorMessage;

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
            输入下单邮箱，查看当前浏览器已获授权的订单状态与交付记录。
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
              <Search className="h-4 w-4 text-muted-foreground" />
              按邮箱查询
            </div>

            <form action="/query" method="get" className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={email}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Button type="submit" size="lg">
                查询订单
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
                当前浏览器没有这个邮箱名下的已授权订单。
              </div>
            ) : null}
          </CardContent>
        </Card>

        {orders.length > 0 ? (
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-tight">订单结果</span>
                <span className="text-xs text-muted-foreground">共 {orders.length} 笔订单</span>
              </div>

              <div className="flex flex-col divide-y divide-border/60 rounded-md border border-border/60">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="truncate text-sm font-semibold">{order.product.name}</strong>
                        <Badge variant={toneToBadgeVariant[getOrderStatusTone(order.status)]}>
                          {getOrderStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {order.sku.name} · {describeOrderAmount(order.amountCents)} · 下单 {formatDateTime(order.createdAt)}
                      </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="shrink-0">
                      <Link href={`/orders/${order.publicToken}`}>
                        查看详情
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <div className="flex items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                订单仅会出现在创建该订单的浏览器中；也可以使用下单完成时获得的订单链接查看详情。
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
