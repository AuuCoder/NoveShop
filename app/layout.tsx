import type { Metadata } from "next";
import "@/app/globals.css";
import { PublicFooter } from "@/app/public-footer";
import { PublicHeader } from "@/app/public-header";
import { SitePreferencesProvider } from "@/app/ui-preferences";

export const metadata: Metadata = {
  title: "NoveShop | 企业级数字商品平台",
  description: "面向平台自营与合作方协同运营，支持多主体支付治理、库存管理与自动履约的数字商品平台。",
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
