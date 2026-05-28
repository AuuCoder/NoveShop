"use client";

import { useSitePreferences } from "@/app/ui-preferences";

const copy = {
  zh: {
    line: "NoveShop 提供商品、库存与自动履约能力,NovaPay 负责多主体支付治理与状态同步。",
    rights: "© NoveShop. 保留所有权利。",
  },
  en: {
    line: "NoveShop powers catalog, inventory, and automated fulfillment, while NovaPay handles multi-entity payment governance and status synchronization.",
    rights: "© NoveShop. All rights reserved.",
  },
} as const;

export function SiteFooter() {
  const { language } = useSitePreferences();
  const t = copy[language];

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:px-6 sm:py-10 lg:px-8">
        <p className="leading-relaxed">{t.line}</p>
        <p className="text-xs">{t.rights}</p>
      </div>
    </footer>
  );
}
