"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CreditCard,
  Layers,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSitePreferences, type SiteLanguage } from "@/app/ui-preferences";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
  buildPlatformStorefrontPath,
  buildStorefrontProductPath,
} from "@/lib/storefront";
import { cn } from "@/lib/utils";
import { CountUp, RevealOnScroll, SpotlightCard } from "@/app/home-effects";

type ProductSaleModeValue = "SINGLE" | "MULTI";

type HighlightedProduct = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  coverImage: string | null;
  saleMode: ProductSaleModeValue;
  skus: Array<{
    id: string;
    name: string;
    summary: string | null;
  }>;
  startingPriceCents: number;
  stockAvailable: number;
  ownerId: string | null;
};

type FeaturedMerchant = {
  id: string;
  name: string;
  paymentProfile: {
    productCount: number;
    skuCount: number;
    featuredProducts: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
};

export type HomePageClientProps = {
  activeMerchantPaymentCount: number;
  featuredMerchants: FeaturedMerchant[];
  highlightedProducts: HighlightedProduct[];
  keyword: string;
  merchantStoreCount: number;
  multiSkuProductCount: number;
  platformProductCount: number;
  totalMerchantProducts: number;
  totalMerchantSkuCount: number;
  totalSkuCount: number;
  totalStock: number;
};

function formatCurrency(cents: number, language: SiteLanguage) {
  return new Intl.NumberFormat(language === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function getProductModeBadgeText(
  language: SiteLanguage,
  mode: ProductSaleModeValue,
  skuCount: number,
  hasStock: boolean,
) {
  if (!hasStock) {
    return language === "zh" ? "缺货" : "Out of stock";
  }

  if (mode === "MULTI") {
    return language === "zh" ? `${skuCount} 个 SKU` : `${skuCount} SKUs`;
  }

  return language === "zh" ? "单商品" : "Single item";
}

function getProductModeLabel(language: SiteLanguage, mode: ProductSaleModeValue) {
  if (mode === "MULTI") {
    return language === "zh" ? "多 SKU" : "Multi SKU";
  }

  return language === "zh" ? "单商品" : "Single item";
}

function renderHeroTitle(language: SiteLanguage) {
  const accent =
    "bg-gradient-to-r from-primary via-primary/85 to-accent-foreground/70 bg-clip-text text-transparent";
  if (language === "zh") {
    return (
      <>
        把<span className={accent}> 平台官方渠道 </span>与
        <span className={accent}> 合作方协同 </span>
        统一到一套数字商品业务底座
      </>
    );
  }

  return (
    <>
      Run <span className={accent}>official retail</span> and
      <span className={accent}> merchant storefronts</span> with multi-merchant payments from one digital goods platform
    </>
  );
}

function getHomeCopy(language: SiteLanguage, props: HomePageClientProps) {
  const {
    activeMerchantPaymentCount,
    keyword,
    merchantStoreCount,
    multiSkuProductCount,
    platformProductCount,
    totalMerchantProducts,
    totalMerchantSkuCount,
    totalSkuCount,
    totalStock,
  } = props;

  if (language === "en") {
    return {
      capabilityCards: [
        {
          description:
            "Support both single-item checkout and multi-SKU product matrices in the same catalog model, so lightweight cards and bundled plans can live in one system.",
          detail: `${multiSkuProductCount} multi-SKU products are currently available in the official store.`,
          eyebrow: "Catalog",
          title: "Single-item and multi-SKU ready",
        },
        {
          description:
            "Track available, reserved, and sold stock at the SKU level, then fulfill automatically after payment is confirmed to avoid mismatched delivery.",
          detail: `${totalStock} units are currently ready for instant fulfillment in the official store.`,
          eyebrow: "Inventory",
          title: "SKU-level stock and fulfillment",
        },
        {
          description:
            "Each merchant manages its own products, payment profile, orders, and customers. The platform can operate centrally without mixing storefront ownership.",
          detail: `${totalMerchantProducts} merchant products and ${totalMerchantSkuCount} merchant SKUs are online right now.`,
          eyebrow: "Isolation",
          title: "Native multi-merchant isolation",
        },
        {
          description:
            "The homepage handles brand presentation, storefronts handle conversion, and the back office handles operations. Each layer stays focused and maintainable.",
          detail: "Brand site, official store, merchant stores, and admin routes are now clearly separated.",
          eyebrow: "Operations",
          title: "Clear front, store, and admin layers",
        },
      ],
      flowSteps: [
        {
          copy: "The platform and each merchant maintain their own NovaPay profile so every order knows which merchant should receive payment.",
          step: "01",
          title: "Configure payment ownership",
        },
        {
          copy: "Products can be sold as a single item or as multiple SKUs, with pricing, specs, and stock all managed at the SKU layer.",
          step: "02",
          title: "Manage products and SKUs",
        },
        {
          copy: "The platform store and merchant stores each sell their own goods, instead of mixing products from different business entities in one storefront.",
          step: "03",
          title: "Sell through isolated storefronts",
        },
        {
          copy: "Orders create a payment request, callbacks and manual sync keep status aligned, and successful payments trigger automatic card delivery.",
          step: "04",
          title: "Confirm payment and deliver",
        },
      ],
      hero: {
        chip: "Enterprise Multi-Merchant Card Platform",
        commandEyebrow: "Platform Command View",
        commandStages: [
          {
            detail: "The homepage introduces the product and routes visitors into the right conversion path.",
            label: "Entry",
            step: "01",
            value: "/",
          },
          {
            detail: "Platform-owned products convert in the official store instead of mixing with merchant inventory.",
            label: "Official Store",
            step: "02",
            value: "/store/platform",
          },
          {
            detail: "Each merchant gets an isolated storefront, catalog, SKUs, and stock model.",
            label: "Merchant Store",
            step: "03",
            value: "/store/[merchantId]",
          },
          {
            detail: "Orders route through the merchant bound to the product, then deliver cards automatically after confirmation.",
            label: "Payment Flow",
            step: "04",
            value: "NovaPay -> Auto Fulfillment",
          },
        ],
        commandTitle: "See the homepage, storefronts, payment routing, and fulfillment in one operating view",
        kicker: "Enterprise Digital Goods Platform",
        lead: "NoveShop turns the homepage into a proper brand landing page. The platform store lives at /store/platform, while each merchant keeps an isolated /store/[merchantId] storefront with its own catalog, inventory, NovaPay profile, and order ownership.",
        signals: ["Official Retail", "Merchant Storefronts", "NovaPay Routing", "SKU Fulfillment"],
        title: "Run official retail, merchant storefronts, and multi-merchant payments from one digital goods platform",
      },
      merchant: {
        emptyChip: "Waiting for products",
        onboardingAction: "Start Now",
        onboardingEyebrow: "Merchant Onboarding",
        onboardingDetail:
          "Register merchants, configure their NovaPay profiles, and create merchant-owned products and SKUs. The homepage will automatically reflect the storefront network.",
        onboardingMetric: "Next: enable merchant onboarding and payment setup",
        onboardingTitle: "No merchant showcase available yet",
        sampleDescription:
          "An isolated merchant storefront with its own product catalog, SKU matrix, stock, and NovaPay payment profile.",
        sampleEyebrow: "Merchant Sample",
        shopEntryLabel: "Storefront",
        visitStore: "Visit Store",
      },
      preview: {
        emptyProducts: "There are no official products to show yet. Create products and SKUs in the back office first.",
        emptySearch: "No official products matched this keyword. Try a different search.",
        heading: keyword ? `Official Store Results: ${keyword}` : "Official Store Preview",
        intro: keyword
          ? "The search box above filters official products and SKUs directly."
          : "Use the search box above to jump into the official catalog.",
        orderQuery: "Order Lookup",
        productMode: "Product Mode",
        stock: "Available Stock",
        viewFullStore: "View Official Store",
      },
      sections: {
        architecture: {
          copy: "The real value is not a single pay button. It is an end-to-end loop where ownership, payment state, sync, and fulfillment stay consistent for every merchant.",
          kicker: "Business Loop",
          title: "From payment setup to automated card fulfillment",
        },
        capabilities: {
          copy: "The goal is not just to connect payments, but to keep catalog structure, payment ownership, stock, and delivery running as one system.",
          kicker: "Capabilities",
          title: "Core platform capabilities for multi-merchant digital distribution",
        },
        stores: {
          copy: "The homepage handles brand positioning while storefronts handle conversion. That keeps both the platform and merchants customer-facing in a clear way.",
          kicker: "Store Network",
          title: "One brand homepage, separate official and merchant storefronts",
        },
      },
      storeBanner: {
        chip: "Official Store",
        copy: "Platform-owned products, SKUs, inventory, and orders are now contained in the official store. Visitors stay on the homepage for positioning, then jump into the right storefront to convert.",
        cta: "Open Platform Store",
        merchantCta: "Merchant Signup",
        stats: [
          { label: "Official Products", value: platformProductCount },
          { label: "Multi-SKU Products", value: multiSkuProductCount },
          { label: "Merchant Stores", value: merchantStoreCount },
        ],
        title: "The platform store now lives at /store/platform",
      },
      trustCards: [
        {
          detail: "Merchants with a dedicated public storefront and payment profile.",
          label: "Storefronts",
          value: merchantStoreCount,
        },
        {
          detail: "Sellable SKUs currently available in the official store.",
          label: "Official SKUs",
          value: totalSkuCount,
        },
        {
          detail: "Inventory ready for instant delivery in the platform store.",
          label: "Available Stock",
          value: totalStock,
        },
        {
          detail: "Merchant-owned products currently published across storefronts.",
          label: "Merchant Products",
          value: totalMerchantProducts,
        },
      ],
      kpiCards: [
        {
          detail: "Merchant NovaPay profiles currently enabled for payment routing.",
          label: "Merchant Profiles",
          value: activeMerchantPaymentCount,
        },
        {
          detail: "Merchant-owned SKUs currently online across storefronts.",
          label: "Merchant SKU Total",
          value: totalMerchantSkuCount,
        },
        {
          detail: "Ratio of multi-SKU products to total official products.",
          label: "Official SKU Ratio",
          value: `${multiSkuProductCount}/${platformProductCount}`,
        },
        {
          detail: "Orders sync payment status, then deliver card content automatically.",
          label: "Fulfillment Model",
          value: "Auto Delivery",
        },
      ],
      ui: {
        browseFlow: "View Operating Loop",
        buyNow: "Buy Now",
        multiSkuMetaFallback: "A product model built for multiple specs, prices, and stock pools.",
        openMerchantHub: "Open Merchant Hub",
        openStorefront: "Open Official Store",
        productSummaryFallback: "A sample product currently sold through the platform store.",
        registerMerchant: "Become a Merchant",
        singleMetaFallback: "Direct single-item checkout for lightweight digital fulfillment.",
        viewProduct: "View Product",
      },
    };
  }

  return {
    capabilityCards: [
      {
        description:
          "同一套商品模型可同时支持单规格直购与多 SKU 规格矩阵，适用于标准化商品与复杂组合方案并行运营。",
        detail: `当前官方渠道已开放 ${multiSkuProductCount} 个多规格商品。`,
        eyebrow: "商品模型",
        title: "单商品与多 SKU 共存",
      },
      {
        description:
          "库存、预占与已售状态统一在 SKU 维度追踪，支付确认后自动触发履约，降低人工处理与库存错配风险。",
        detail: `官方渠道当前可即时履约 ${totalStock} 份库存。`,
        eyebrow: "库存履约",
        title: "库存按 SKU 精细履约",
      },
      {
        description:
          "合作方仅维护自己归属的商品、订单与收款参数，平台可以统一治理，但不会打破各主体的数据与渠道边界。",
        detail: `当前合作方侧总计 ${totalMerchantProducts} 个商品、${totalMerchantSkuCount} 个 SKU。`,
        eyebrow: "数据隔离",
        title: "多商户数据天然隔离",
      },
      {
        description:
          "首页负责品牌表达，官方渠道与合作方站点负责成交，业务中心负责运营与配置，避免页面职责过载。",
        detail: "品牌官网、官方渠道、合作方站点与业务中心已经完成分层。",
        eyebrow: "运营结构",
        title: "前中后台职责分层",
      },
    ],
    flowSteps: [
      {
        copy: "平台与合作方分别维护各自的收款参数，确保每笔订单都能准确归属到对应的业务主体。",
        step: "01",
        title: "配置收款主体",
      },
      {
        copy: "商品可配置单规格直购或多规格矩阵，价格、规格与库存围绕具体商品方案统一管理。",
        step: "02",
        title: "管理商品与规格",
      },
      {
        copy: "平台官方渠道与合作方专属站点分别承接各自商品，避免不同主体混合展示与交叉成交。",
        step: "03",
        title: "店铺独立售卖",
      },
      {
        copy: "下单后统一创建支付单，回调与查单同步状态，支付确认后自动触发履约与交付。",
        step: "04",
        title: "确认支付并自动履约",
      },
    ],
    hero: {
      chip: "企业级数字商品平台",
      commandEyebrow: "平台运营视图",
      commandStages: [
        {
          detail: "首页负责品牌展示、解决方案介绍和入口分流。",
          label: "品牌入口",
          step: "01",
          value: "/",
        },
        {
          detail: "平台自营商品统一在官方渠道成交，不与合作方商品混合展示。",
          label: "官方渠道",
          step: "02",
          value: "/store/platform",
        },
        {
          detail: "每个合作方都拥有独立站点、商品目录与规格库存空间。",
          label: "合作方站点",
          step: "03",
          value: "/store/[merchantId]",
        },
        {
          detail: "订单按商品归属的业务主体收款，状态确认后自动触发交付。",
          label: "支付履约",
          step: "04",
          value: "支付确认 → 自动交付",
        },
      ],
      commandTitle: "把品牌入口、官方渠道、合作方站点与自动履约串成一套清晰的业务视图",
      kicker: "企业级数字商品平台",
      lead: "NoveShop 首页聚焦能力展示与业务架构表达。平台官方渠道与合作方专属站点彼此独立，商品、库存、订单归属与收款配置按主体隔离管理。",
      signals: ["平台官方渠道", "合作方站点", "统一支付治理", "自动交付"],
      title: "面向平台运营与合作方协同的数字商品业务底座",
    },
    merchant: {
      emptyChip: "等待商品上架",
      onboardingAction: "申请接入",
      onboardingEyebrow: "合作方接入",
      onboardingDetail:
        "完成合作方账号开通、收款配置与商品初始化后，平台站点网络会自动扩展，形成清晰的多主体运营结构。",
      onboardingMetric: "下一步：提交接入并完成收款配置",
      onboardingTitle: "当前还没有可展示的合作方案例",
      sampleDescription: "合作方独立站点，拥有专属商品目录、库存与收款配置。",
      sampleEyebrow: "合作方案例",
      shopEntryLabel: "站点入口",
      visitStore: "访问站点",
    },
    preview: {
      emptyProducts: "当前官方渠道还没有可展示的商品，完成商品与规格配置后即可在这里呈现。",
      emptySearch: "当前官方渠道没有命中这个关键词的商品，可以换个词再试试。",
      heading: keyword ? `官方渠道搜索结果：${keyword}` : "官方渠道商品预览",
      intro: keyword
        ? "顶部搜索框会直接筛选官方渠道中的商品与规格。"
        : "顶部搜索框可直接检索官方渠道中的商品与规格。",
      orderQuery: "订单查询",
      productMode: "商品模式",
      stock: "可售库存",
      viewFullStore: "查看官方渠道",
    },
    sections: {
      architecture: {
        copy: "这套系统的关键不只是一个支付入口，而是订单、回调、查询与履约能够按业务主体稳定闭环。",
        kicker: "业务闭环",
        title: "从收款配置到自动交付的业务闭环",
      },
      capabilities: {
        copy: "核心重点不只是接入支付，而是让商品模型、支付主体、库存与交付路径持续稳定运行。",
        kicker: "核心能力",
        title: "围绕多商户数字商品分发搭建的平台能力",
      },
      stores: {
        copy: "首页负责品牌表达与方案说明，官方渠道和合作方站点分别承接成交与服务。",
        kicker: "站点网络",
        title: "统一品牌入口，分层承接平台官方渠道与合作方站点",
      },
    },
    storeBanner: {
      chip: "官方渠道",
      copy: "平台自营商品、规格、库存与订单统一在官方渠道呈现。访客在首页了解定位，再跳转到合适的站点完成成交。",
      cta: "进入官方渠道",
      merchantCta: "申请接入合作方",
      stats: [
        { label: "官方商品", value: platformProductCount },
        { label: "多规格商品", value: multiSkuProductCount },
        { label: "合作方站点", value: merchantStoreCount },
      ],
      title: "官方渠道入口位于 /store/platform",
    },
    trustCards: [
      {
        detail: "拥有独立站点与收款配置的合作方数量。",
        label: "合作方站点",
        value: merchantStoreCount,
      },
      {
        detail: "官方渠道当前可售规格的总量。",
        label: "官方在售规格",
        value: totalSkuCount,
      },
      {
        detail: "官方渠道当前可即时交付的库存数量。",
        label: "可售库存",
        value: totalStock,
      },
      {
        detail: "合作方侧已上架的商品总量。",
        label: "合作方商品",
        value: totalMerchantProducts,
      },
    ],
    kpiCards: [
      {
        detail: "当前已启用 NovaPay 的业务主体数",
        label: "收款主体状态",
        value: activeMerchantPaymentCount,
      },
      {
        detail: "合作方侧全部在售规格",
        label: "合作方规格总量",
        value: totalMerchantSkuCount,
      },
      {
        detail: "多规格商品数量 / 官方渠道商品总量",
        label: "官方渠道商品模型",
        value: `${multiSkuProductCount}/${platformProductCount}`,
      },
      {
        detail: "支付结果同步后自动触发交付",
        label: "履约模式",
        value: "自动履约",
      },
    ],
    ui: {
      browseFlow: "查看业务闭环",
      buyNow: "立即购买",
      multiSkuMetaFallback: "支持多规格、多价格与多库存的商品模型。",
      openMerchantHub: "进入业务中心",
      openStorefront: "进入官方渠道",
      productSummaryFallback: "官方渠道当前在售的示例商品。",
      registerMerchant: "申请接入",
      singleMetaFallback: "默认规格直购，适合标准化数字商品交付。",
      viewProduct: "查看商品",
    },
  };
}

const capabilityIcons = [Layers, Boxes, ShieldCheck, Workflow];
const flowIcons = [CreditCard, Layers, Store, CheckCircle2];

export default function HomePageClient(props: HomePageClientProps) {
  const { featuredMerchants, highlightedProducts, keyword } = props;
  const { language } = useSitePreferences();
  const copy = getHomeCopy(language, props);

  return (
    <div className="bg-background text-foreground">
      <HeroSection copy={copy} language={language} />
      <CapabilitiesSection copy={copy} />
      <ArchitectureSection copy={copy} />
      <StoreNetworkSection
        copy={copy}
        featuredMerchants={featuredMerchants}
        language={language}
      />
      <PreviewSection
        copy={copy}
        highlightedProducts={highlightedProducts}
        keyword={keyword}
        language={language}
      />
    </div>
  );
}

type HomeCopy = ReturnType<typeof getHomeCopy>;

function SectionHeader({
  kicker,
  title,
  copy,
  align = "split",
}: {
  kicker: string;
  title: string;
  copy: string;
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {kicker}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{copy}</p>
    </div>
  );
}

function HeroSection({ copy, language }: { copy: HomeCopy; language: SiteLanguage }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-secondary/60 via-background to-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-[520px] w-[520px] animate-orb-a rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-[420px] w-[420px] animate-orb-b rounded-full bg-accent/40 blur-3xl"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-7">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {copy.hero.kicker}
          </p>

          <Badge
            variant="outline"
            className="w-fit gap-1.5 rounded-full border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3 w-3" />
            {copy.hero.chip}
          </Badge>

          <h1 className="text-pretty text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
            {renderHeroTitle(language)}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.hero.lead}
          </p>

          <div className="flex flex-wrap gap-2">
            {copy.hero.signals.map((signal) => (
              <span
                key={signal}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {signal}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link href={buildPlatformStorefrontPath()}>
                {copy.ui.openStorefront}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/merchant">{copy.ui.openMerchantHub}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/#architecture">{copy.ui.browseFlow}</Link>
            </Button>
          </div>

          <Separator className="my-3" />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {copy.trustCards.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-3xl font-semibold tracking-tight">
                  <CountUp value={item.value} />
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground/80">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Card className="bg-card">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {copy.hero.commandEyebrow}
                </p>
                <Badge
                  variant="secondary"
                  className="gap-1.5 border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-300"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </Badge>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {copy.hero.commandTitle}
              </p>

              <div className="flex flex-col gap-3">
                {copy.hero.commandStages.map((stage, index) => (
                  <div
                    key={stage.step}
                    className={cn(
                      "relative flex gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-primary/5",
                      index === 0 && "border-primary/40 bg-primary/10",
                    )}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/70 bg-background text-xs font-medium tabular-nums text-foreground">
                      {stage.step}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                          {stage.label}
                        </span>
                        <code className="truncate font-mono text-[11px] text-foreground/80">
                          {stage.value}
                        </code>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {stage.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {copy.kpiCards.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border/60 bg-card p-4"
              >
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{item.value}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground/90">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="capabilities" className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            kicker={copy.sections.capabilities.kicker}
            title={copy.sections.capabilities.title}
            copy={copy.sections.capabilities.copy}
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {copy.capabilityCards.map((item, index) => {
            const Icon = capabilityIcons[index] ?? Layers;
            return (
              <RevealOnScroll key={item.title} delay={index * 80}>
                <SpotlightCard
                  className="group flex h-full flex-col gap-3 rounded-xl border border-border/70 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
                  contentClassName="flex h-full flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {item.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-auto rounded-md border border-dashed border-border/70 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </SpotlightCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection({ copy }: { copy: HomeCopy }) {
  return (
    <section id="architecture" className="border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            kicker={copy.sections.architecture.kicker}
            title={copy.sections.architecture.title}
            copy={copy.sections.architecture.copy}
          />
        </RevealOnScroll>

        <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.flowSteps.map((item, index) => {
            const Icon = flowIcons[index] ?? Workflow;
            const isLast = index === copy.flowSteps.length - 1;
            return (
              <RevealOnScroll key={item.step} delay={index * 100}>
                <div className="relative flex h-full flex-col gap-3 rounded-xl border border-border/70 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                  {!isLast ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 40 8"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute right-[-22px] top-1/2 hidden h-2 w-10 -translate-y-1/2 lg:block"
                    >
                      <line
                        x1="0"
                        y1="4"
                        x2="40"
                        y2="4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                        className="animate-flow-dash stroke-primary/55"
                      />
                    </svg>
                  ) : null}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StoreNetworkSection({
  copy,
  featuredMerchants,
  language,
}: {
  copy: HomeCopy;
  featuredMerchants: FeaturedMerchant[];
  language: SiteLanguage;
}) {
  return (
    <section id="stores" className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            kicker={copy.sections.stores.kicker}
            title={copy.sections.stores.title}
            copy={copy.sections.stores.copy}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <Card className="mt-10 overflow-hidden border-primary/25 bg-card ring-0">
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:p-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="border-primary/25 bg-primary/10 text-primary hover:bg-primary/15"
                >
                  {copy.storeBanner.chip}
                </Badge>
                <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                  {copy.storeBanner.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {copy.storeBanner.copy}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg">
                    <Link href={buildPlatformStorefrontPath()}>
                      {copy.storeBanner.cta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/merchant/register">{copy.storeBanner.merchantCta}</Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg border border-border/70 bg-secondary/40 p-4">
                {copy.storeBanner.stats.map((item) => (
                  <div key={item.label} className="space-y-1 text-center">
                    <p className="text-3xl font-semibold tabular-nums tracking-tight">
                      <CountUp value={item.value} />
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RevealOnScroll>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredMerchants.length === 0 ? (
            <Card className="md:col-span-3 border-primary/20 bg-card">
              <CardContent className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {copy.merchant.onboardingEyebrow}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {copy.merchant.onboardingTitle}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {copy.merchant.onboardingDetail}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {copy.merchant.onboardingMetric}
                  </p>
                </div>
                <Button asChild>
                  <Link href="/merchant/register">
                    {copy.merchant.onboardingAction}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            featuredMerchants.map((merchant, index) => (
              <RevealOnScroll key={merchant.id} delay={index * 70}>
                <Card className="h-full bg-card transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/10">
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {copy.merchant.sampleEyebrow}
                    </span>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-semibold tracking-tight">
                      {merchant.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {copy.merchant.sampleDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md border border-border/70 bg-background px-2 py-1">
                      {language === "zh"
                        ? `${merchant.paymentProfile.productCount} 个商品`
                        : `${merchant.paymentProfile.productCount} products`}
                    </span>
                    <span className="rounded-md border border-border/70 bg-background px-2 py-1">
                      {language === "zh"
                        ? `${merchant.paymentProfile.skuCount} 个 SKU`
                        : `${merchant.paymentProfile.skuCount} SKUs`}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {merchant.paymentProfile.featuredProducts.length > 0 ? (
                      merchant.paymentProfile.featuredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={buildMerchantStorefrontProductPath(merchant.id, product.slug)}
                          className="inline-flex items-center rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          {product.name}
                        </Link>
                      ))
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-dashed border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
                        {copy.merchant.emptyChip}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                    <code className="truncate font-mono text-[11px] text-muted-foreground">
                      {buildMerchantStorefrontPath(merchant.id)}
                    </code>
                    <Link
                      href={buildMerchantStorefrontPath(merchant.id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {copy.merchant.visitStore}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
                </Card>
              </RevealOnScroll>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function PreviewSection({
  copy,
  highlightedProducts,
  keyword,
  language,
}: {
  copy: HomeCopy;
  highlightedProducts: HighlightedProduct[];
  keyword: string;
  language: SiteLanguage;
}) {
  const showEmptySearch = keyword && highlightedProducts.length === 0;
  const showEmptyProducts = !keyword && highlightedProducts.length === 0;

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <PackageSearch className="h-3.5 w-3.5" />
              Preview
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {copy.preview.heading}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {copy.preview.intro}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={buildPlatformStorefrontPath()}>{copy.preview.viewFullStore}</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/query">{copy.preview.orderQuery}</Link>
            </Button>
          </div>
        </div>
        </RevealOnScroll>

        {showEmptySearch || showEmptyProducts ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-muted/30 px-6 py-16 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background text-muted-foreground">
              <PackageSearch className="h-5 w-5" />
            </span>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {showEmptySearch ? copy.preview.emptySearch : copy.preview.emptyProducts}
            </p>
            <Button asChild size="sm" variant="outline">
              <Link href={buildPlatformStorefrontPath()}>
                {copy.preview.viewFullStore}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlightedProducts.map((product, index) => {
              const primarySku = product.skus[0] ?? null;
              const hasStock = product.stockAvailable > 0;
              const modeLabel = getProductModeLabel(language, product.saleMode);
              const metaCopy =
                product.saleMode === "MULTI"
                  ? product.skus
                      .slice(0, 3)
                      .map((sku) => sku.name)
                      .join(" / ") || copy.ui.multiSkuMetaFallback
                  : primarySku?.summary || product.summary || copy.ui.singleMetaFallback;

              return (
                <RevealOnScroll key={product.id} delay={index * 70}>
                  <Card
                    id={`product-${product.id}`}
                    className="h-full overflow-hidden bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  >
                  {product.coverImage ? (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.coverImage}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/9] flex-col justify-between gap-2 border-b border-border/60 bg-gradient-to-br from-muted/40 to-muted/10 p-4">
                      <span className="grid h-9 w-9 place-items-center rounded-md border border-border/70 bg-background text-sm font-semibold">
                        {product.name.slice(0, 2)}
                      </span>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {product.summary || copy.ui.productSummaryFallback}
                      </p>
                    </div>
                  )}

                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium tabular-nums text-primary-foreground">
                        {formatCurrency(product.startingPriceCents, language)}
                      </span>
                      <Badge
                        variant={hasStock ? "secondary" : "outline"}
                        className={cn(
                          "text-[10px] tracking-wide",
                          !hasStock && "text-muted-foreground",
                        )}
                      >
                        {getProductModeBadgeText(
                          language,
                          product.saleMode,
                          product.skus.length,
                          hasStock,
                        )}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-semibold tracking-tight">
                        {product.name}
                      </h3>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {metaCopy}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs">
                      <div className="space-y-0.5">
                        <p className="text-muted-foreground">{copy.preview.stock}</p>
                        <p className="text-sm font-semibold tabular-nums text-foreground">
                          {product.stockAvailable}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-muted-foreground">{copy.preview.productMode}</p>
                        <p className="text-sm font-semibold text-foreground">{modeLabel}</p>
                      </div>
                    </div>

                    <Button asChild className="w-full" disabled={!hasStock}>
                      <Link
                        href={buildStorefrontProductPath(product.slug, product.ownerId)}
                      >
                        {product.saleMode === "MULTI"
                          ? copy.ui.viewProduct
                          : copy.ui.buyNow}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                </RevealOnScroll>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
