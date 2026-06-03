"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SiteLanguage } from "@/app/ui-preferences";

export type ProductCardData = {
  id: string;
  name: string;
  href: string;
  coverImage: string | null;
  summary: string | null;
  startingPriceCents: number;
  stockAvailable: number;
  sold: number;
  saleMode: "MULTI" | "SINGLE";
};

function formatCurrency(cents: number, language: SiteLanguage) {
  return new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US", {
    currency: "CNY",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(cents / 100);
}

export type ProductCardCopy = {
  autoDelivery: string;
  stock: string;
  sold: string;
  outOfStock: string;
  price: string;
  view: string;
};

export function getProductCardCopy(language: SiteLanguage): ProductCardCopy {
  if (language === "en") {
    return {
      autoDelivery: "Auto delivery",
      stock: "Stock",
      sold: "Sold",
      outOfStock: "Out of stock",
      price: "From",
      view: "View",
    };
  }

  return {
    autoDelivery: "自动发货",
    stock: "库存",
    sold: "已售",
    outOfStock: "缺货",
    price: "起售",
    view: "查看",
  };
}

// 无封面时的占位:渐变底 + 商品名首字,避免空洞(对齐参考站)。
function CoverPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/60 to-muted/20">
      <span className="text-2xl font-semibold tracking-tight text-muted-foreground/70">
        {name.slice(0, 2)}
      </span>
    </div>
  );
}

export function ProductCard({
  product,
  language,
  copy,
}: {
  product: ProductCardData;
  language: SiteLanguage;
  copy: ProductCardCopy;
}) {
  const hasStock = product.stockAvailable > 0;

  return (
    <Link
      href={product.href}
      id={`product-${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-border/50">
        {product.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.coverImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CoverPlaceholder name={product.name} />
        )}
        <Badge
          variant="secondary"
          className="absolute left-2 top-2 gap-1 px-1.5 py-0.5 text-[10px] tracking-wide"
        >
          <Zap className="h-3 w-3" />
          {copy.autoDelivery}
        </Badge>
        {!hasStock ? (
          <span className="absolute inset-0 grid place-items-center bg-background/60 text-sm font-medium text-muted-foreground">
            {copy.outOfStock}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug tracking-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>
            {copy.stock}{" "}
            <span className="font-medium text-foreground tabular-nums">
              {product.stockAvailable}
            </span>
          </span>
          <span className="text-border">·</span>
          <span>
            {copy.sold}{" "}
            <span className="font-medium text-foreground tabular-nums">
              {product.sold}
            </span>
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {copy.price}
            </span>
            <span className="text-base font-semibold tracking-tight tabular-nums text-primary">
              {formatCurrency(product.startingPriceCents, language)}
            </span>
          </div>
          <span
            className={cn(
              "grid h-8 w-8 place-items-center rounded-md border border-border/60 text-muted-foreground transition-colors",
              "group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground",
            )}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
