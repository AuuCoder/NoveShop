"use client";

import Link from "next/link";
import { Globe2, Languages, MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSitePreferences } from "@/app/ui-preferences";
import { buildPlatformStorefrontPath } from "@/lib/storefront";
import { cn } from "@/lib/utils";

const copyMap = {
  zh: {
    brand: "NoveShop",
    home: "首页",
    officialStore: "官方渠道",
    merchant: "业务中心",
    orderQuery: "订单查询",
    apply: "申请接入",
    light: "白天",
    dark: "夜间",
    chinese: "中文",
    english: "English",
  },
  en: {
    brand: "NoveShop",
    home: "Home",
    officialStore: "Official Channel",
    merchant: "Business Hub",
    orderQuery: "Order Lookup",
    apply: "Apply for Access",
    light: "Light",
    dark: "Dark",
    chinese: "中文",
    english: "English",
  },
} as const;

export function SiteHeader() {
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const t = copyMap[language];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            N
          </span>
          {t.brand}
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <NavLink href="/">{t.home}</NavLink>
          <NavLink href={buildPlatformStorefrontPath()}>{t.officialStore}</NavLink>
          <NavLink href="/merchant">{t.merchant}</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/query">{t.orderQuery}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/merchant/register">{t.apply}</Link>
          </Button>

          <Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />

          <div className="hidden items-center rounded-md border border-border bg-background sm:flex">
            <IconToggle
              active={theme === "light"}
              onClick={() => setTheme("light")}
              label={t.light}
            >
              <SunMedium className="h-4 w-4" />
            </IconToggle>
            <IconToggle
              active={theme === "dark"}
              onClick={() => setTheme("dark")}
              label={t.dark}
            >
              <MoonStar className="h-4 w-4" />
            </IconToggle>
          </div>

          <div className="hidden items-center rounded-md border border-border bg-background sm:flex">
            <IconToggle
              active={language === "zh"}
              onClick={() => setLanguage("zh")}
              label={t.chinese}
            >
              <Globe2 className="h-4 w-4" />
            </IconToggle>
            <IconToggle
              active={language === "en"}
              onClick={() => setLanguage("en")}
              label={t.english}
            >
              <Languages className="h-4 w-4" />
            </IconToggle>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 transition-colors hover:bg-primary/10 hover:text-primary"
    >
      {children}
    </Link>
  );
}

function IconToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center text-muted-foreground transition-colors first:rounded-l-md last:rounded-r-md hover:text-primary",
        active && "bg-primary text-primary-foreground hover:text-primary-foreground",
      )}
    >
      {children}
    </button>
  );
}
