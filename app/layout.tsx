import type { Metadata } from "next";
import "@/app/tailwind.css";
import "@/app/globals.css";
import { SiteFooter } from "@/app/site-footer";
import { SiteHeader } from "@/app/site-header";
import { SitePreferencesProvider } from "@/app/ui-preferences";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      data-shell="modern"
      suppressHydrationWarning className={cn("font-sans", geist.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <SitePreferencesProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
