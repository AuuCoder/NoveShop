"use client";

import Link from "next/link";
import { FloatingPreferences } from "@/app/floating-preferences";
import { buildPlatformStorefrontPath } from "@/lib/storefront";
import { useSitePreferences } from "@/app/ui-preferences";

const chromeCopy = {
  zh: {
    brandTitle: "数字商品分发平台",
    dark: "夜间",
    home: "首页",
    language: "语言",
    light: "白天",
    merchantCenter: "商户中心",
    merchantRegister: "商户入驻",
    officialStore: "官方店",
    orderQuery: "订单查询",
    searchAria: "搜索商品",
    searchPlaceholder: "搜索官方店商品 / SKU",
    solutions: "解决方案",
    theme: "主题",
  },
  en: {
    brandTitle: "Digital Goods Platform",
    dark: "Dark",
    home: "Home",
    language: "Language",
    light: "Light",
    merchantCenter: "Merchant Hub",
    merchantRegister: "Become a Merchant",
    officialStore: "Official Store",
    orderQuery: "Order Lookup",
    searchAria: "Search products",
    searchPlaceholder: "Search official products / SKUs",
    solutions: "Solutions",
    theme: "Theme",
  },
} as const;

export function PublicHeader() {
  const { language } = useSitePreferences();
  const copy = chromeCopy[language];

  return (
    <header className="site-header navbar-acg">
      <div className="header-inner nav-shell">
        <Link href="/" className="navbar-brand brand-mark">
          <span className="brand-logo">N</span>
          <span className="brand-text">
            <span className="brand-kicker">NoveShop</span>
            <span className="brand-title">{copy.brandTitle}</span>
          </span>
        </Link>

        <nav className="top-nav">
          <Link href="/">{copy.home}</Link>
          <Link href="/#solutions">{copy.solutions}</Link>
          <Link href={buildPlatformStorefrontPath()}>{copy.officialStore}</Link>
          <Link href="/merchant">{copy.merchantCenter}</Link>
        </nav>

        <form action="/" method="get" className="search-input" role="search">
          <input
            name="q"
            type="search"
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchAria}
          />
        </form>

        <div className="nav-actions">
          <Link href="/query" className="button-secondary nav-button">
            {copy.orderQuery}
          </Link>
          <Link href="/merchant/register" className="button-secondary nav-button">
            {copy.merchantRegister}
          </Link>
        </div>

        <div className="header-preferences" aria-label="site-preferences">
          <FloatingPreferences />
        </div>
      </div>
    </header>
  );
}
