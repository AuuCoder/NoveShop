import type { Metadata } from "next";
import "@/app/globals.css";
import { PublicFooter } from "@/app/public-footer";
import { PublicHeader } from "@/app/public-header";
import { SitePreferencesProvider } from "@/app/ui-preferences";

export const metadata: Metadata = {
  title: "NoveShop | 多商户数字商品平台",
  description: "支持官方店、商户独立店、多 SKU、NovaPay 多商户支付与自动发卡的数字商品平台。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-language="zh"
      data-theme="light"
      suppressHydrationWarning
    >
      <body>
        <SitePreferencesProvider>
          <div className="site-shell">
            <PublicHeader />
            <main className="page-shell">{children}</main>
            <PublicFooter />
          </div>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
