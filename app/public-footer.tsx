"use client";

import { useSitePreferences } from "@/app/ui-preferences";

const footerCopy = {
  zh: "NoveShop 提供商品、库存与自动履约能力，NovaPay 负责多主体支付治理与状态同步。",
  en: "NoveShop powers catalog, inventory, and automated fulfillment, while NovaPay handles multi-entity payment governance and status synchronization.",
} as const;

export function PublicFooter() {
  const { language } = useSitePreferences();

  return (
    <footer className="site-footer">
      <p>{footerCopy[language]}</p>
    </footer>
  );
}
