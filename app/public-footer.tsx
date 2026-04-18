"use client";

import { useSitePreferences } from "@/app/ui-preferences";

const footerCopy = {
  zh: "NoveShop 负责商品、SKU、库存与履约中台，NovaPay 负责多商户支付链路与状态同步。",
  en: "NoveShop powers the catalog, SKU, inventory, and fulfillment layer, while NovaPay handles multi-merchant payment routing and status sync.",
} as const;

export function PublicFooter() {
  const { language } = useSitePreferences();

  return (
    <footer className="site-footer">
      <p>{footerCopy[language]}</p>
    </footer>
  );
}
