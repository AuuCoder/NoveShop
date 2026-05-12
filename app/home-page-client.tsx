"use client";

import Link from "next/link";
import { useSitePreferences, type SiteLanguage } from "@/app/ui-preferences";
import {
  buildMerchantStorefrontPath,
  buildMerchantStorefrontProductPath,
  buildPlatformStorefrontPath,
  buildStorefrontProductPath,
} from "@/lib/storefront";

type ProductSaleModeValue = "SINGLE" | "MULTI";

type HighlightedProduct = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
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
  if (language === "zh") {
    return (
      <>
        <span className="hero-title-line">把平台官方渠道与</span>
        <span className="hero-title-line">
          <span className="hero-title-accent">合作方协同运营</span>统一到
        </span>
        <span className="hero-title-line">一套数字商品业务底座</span>
      </>
    );
  }

  return (
    <>
      <span className="hero-title-line">Run official retail and</span>
      <span className="hero-title-line">merchant storefronts with</span>
      <span className="hero-title-line">
        <span className="hero-title-accent">multi-merchant payments</span>
      </span>
      <span className="hero-title-line">from one digital goods platform</span>
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
        lead: "NoveShop turns the homepage into a proper brand landing page. The platform store lives at `/store/platform`, while each merchant keeps an isolated `/store/[merchantId]` storefront with its own catalog, inventory, NovaPay profile, and order ownership.",
        signals: ["Official Retail", "Merchant Storefronts", "NovaPay Routing", "SKU Fulfillment"],
        title: "Run official retail, merchant storefronts, and multi-merchant payments from one digital goods platform",
      },
      merchant: {
        emptyChip: "Waiting for products",
        onboardingAction: "Start Now",
        onboardingEyebrow: "Merchant Onboarding",
        onboardingDetail:
          "Register merchants, configure their NovaPay profiles, and create merchant-owned products and SKUs. The homepage will automatically reflect the storefront network.",
        onboardingMetric: "Next step: enable merchant onboarding and payment setup",
        onboardingTitle: "No merchant showcase is available yet",
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
          title: "The operating loop from payment setup to automated card fulfillment",
        },
        capabilities: {
          copy: "The goal is not just to connect payments, but to keep catalog structure, payment ownership, stock, and delivery running as one system.",
          kicker: "Capabilities",
          title: "Core platform capabilities for multi-merchant digital distribution",
        },
        solutions: {
          copy: "The homepage no longer dumps product listings first. It explains platform roles, routing, and storefront boundaries before users convert.",
          kicker: "Solutions",
          title: "Built for platform retail and merchant-owned storefronts in the same system",
        },
        stores: {
          copy: "The homepage handles brand positioning while storefronts handle conversion. That keeps both the platform and merchants customer-facing in a clear way.",
          kicker: "Store Network",
          title: "One brand homepage, separate official and merchant storefronts",
        },
      },
      solutionCards: [
        {
          action: "View Official Store",
          description:
            "Platform-owned products now live in `/store/platform`, so the homepage can stay focused on the brand instead of mixing catalog and admin entry points.",
          eyebrow: "Platform Retail",
          href: buildPlatformStorefrontPath(),
          metric: `${platformProductCount} official products`,
          title: "Platform Official Store",
        },
        {
          action: "Register Merchant",
          description:
            "Every merchant receives an isolated `/store/[merchantId]` storefront where products, SKUs, stock, and order ownership all stay separated.",
          eyebrow: "Merchant Storefront",
          href: "/merchant/register",
          metric: `${merchantStoreCount} storefronts`,
          title: "Merchant-Owned Frontends",
        },
        {
          action: "Open Merchant Hub",
          description:
            "NovaPay is not hardcoded to the platform anymore. Orders route through the payment profile bound to each product owner.",
          eyebrow: "Payment Routing",
          href: "/merchant",
          metric: `${activeMerchantPaymentCount} active merchant profiles`,
          title: "NovaPay Multi-Merchant Routing",
        },
      ],
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
        title: "The platform store now lives at `/store/platform`",
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
          value: "支付确认 -> 自动交付",
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
      solutions: {
        copy: "围绕品牌官网、官方渠道、合作方站点与统一支付治理，建立清晰的对外服务入口与业务边界。",
        kicker: "解决方案",
        title: "适用于平台自营与合作方协同运营的数字商品模式",
      },
      stores: {
        copy: "首页负责品牌表达与方案说明，官方渠道和合作方站点分别承接成交与服务。",
        kicker: "站点网络",
        title: "统一品牌入口，分层承接平台官方渠道与合作方站点",
      },
    },
    solutionCards: [
      {
        action: "进入官方渠道",
        description:
          "面向平台自营商品、重点活动与品牌转化的统一成交入口，承接品牌流量并保持交易链路稳定。",
        eyebrow: "平台官方渠道",
        href: buildPlatformStorefrontPath(),
        metric: `${platformProductCount} 个在线商品`,
        title: "平台官方渠道",
      },
      {
        action: "申请接入",
        description:
          "为合作方提供独立的商品展示、库存履约与订单归属空间，确保业务边界清晰且便于后续扩展。",
        eyebrow: "合作方站点",
        href: "/merchant/register",
        metric: `${merchantStoreCount} 个合作方站点`,
        title: "合作方专属站点",
      },
      {
        action: "进入业务中心",
        description:
          "平台与合作方可分别维护支付参数与默认通道，订单按归属主体自动路由收款并统一追踪状态。",
        eyebrow: "统一支付治理",
        href: "/merchant",
        metric: `${activeMerchantPaymentCount} 个主体已启用`,
        title: "多主体支付治理",
      },
    ],
    storeBanner: {
      chip: "平台官方渠道",
      copy: "平台自营商品、SKU、库存与订单统一收敛到官方渠道。首页负责品牌表达，进入渠道后再完成商品浏览、下单与履约。",
      cta: "进入官方渠道",
      merchantCta: "申请接入",
      stats: [
        { label: "在线商品", value: platformProductCount },
        { label: "多规格商品", value: multiSkuProductCount },
        { label: "合作方站点", value: merchantStoreCount },
      ],
      title: "平台官方渠道作为统一成交入口独立承载自营业务",
    },
    trustCards: [
      {
        detail: "已具备独立站点与收款配置的合作方",
        label: "合作方站点",
        value: merchantStoreCount,
      },
      {
        detail: "官方渠道当前可售规格数量",
        label: "官方渠道规格",
        value: totalSkuCount,
      },
      {
        detail: "官方渠道可即时履约的库存规模",
        label: "官方渠道库存",
        value: totalStock,
      },
      {
        detail: "合作方侧已上线商品总量",
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

export default function HomePageClient(props: HomePageClientProps) {
  const { featuredMerchants, highlightedProducts, keyword } = props;
  const { language } = useSitePreferences();
  const copy = getHomeCopy(language, props);

  return (
    <div className="enterprise-home">
      <section className="hero enterprise-hero">
        <div className="enterprise-hero-grid">
          <div className="enterprise-hero-copy">
            <p className="hero-kicker">{copy.hero.kicker}</p>
            <span className="chip chip-primary">{copy.hero.chip}</span>
            <h1>{renderHeroTitle(language)}</h1>
            <p className="section-copy hero-lead">{copy.hero.lead}</p>

            <div className="hero-signal-list" aria-label="platform-signals">
              {copy.hero.signals.map((signal) => (
                <span key={signal} className="hero-signal-badge">
                  {signal}
                </span>
              ))}
            </div>

            <div className="button-row">
              <Link href={buildPlatformStorefrontPath()} className="button">
                {copy.ui.openStorefront}
              </Link>
              <Link href="/merchant" className="button-secondary">
                {copy.ui.openMerchantHub}
              </Link>
              <Link href="/merchant/register" className="button-secondary">
                {copy.ui.registerMerchant}
              </Link>
              <Link href="/#architecture" className="button-link">
                {copy.ui.browseFlow}
              </Link>
            </div>

            <div className="enterprise-trust-grid">
              {copy.trustCards.map((item) => (
                <article key={item.label} className="enterprise-trust-card">
                  <span className="enterprise-trust-label">{item.label}</span>
                  <strong className="enterprise-trust-value">{item.value}</strong>
                  <p className="small-copy">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="enterprise-hero-side">
            <article className="enterprise-hero-card enterprise-command-card">
              <div className="enterprise-card-top">
                <span className="enterprise-eyebrow">{copy.hero.commandEyebrow}</span>
                <strong>{copy.hero.commandTitle}</strong>
              </div>

              <div className="command-screen">
                {copy.hero.commandStages.map((stage, index) => (
                  <article key={stage.step} className="command-stage">
                    <span className="command-stage-index">{stage.step}</span>
                    <div className="command-stage-body">
                      <span className="command-stage-label">{stage.label}</span>
                      <strong>{stage.value}</strong>
                      <p>{stage.detail}</p>
                    </div>
                    {index < copy.hero.commandStages.length - 1 ? (
                      <span className="command-stage-link" />
                    ) : null}
                  </article>
                ))}
              </div>
            </article>

            <div className="enterprise-kpi-grid">
              {copy.kpiCards.map((item) => (
                <article key={item.label} className="enterprise-kpi-card">
                  <span className="enterprise-kpi-label">{item.label}</span>
                  <strong className="enterprise-kpi-value">{item.value}</strong>
                  <p className="enterprise-kpi-copy">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="section enterprise-section">
        <div className="enterprise-section-head">
          <div>
            <p className="enterprise-section-kicker">{copy.sections.solutions.kicker}</p>
            <h2 className="section-title">{copy.sections.solutions.title}</h2>
          </div>
          <p className="section-copy enterprise-section-copy">{copy.sections.solutions.copy}</p>
        </div>

        <div className="enterprise-grid enterprise-grid-3">
          {copy.solutionCards.map((item) => (
            <article key={item.title} className="enterprise-card">
              <span className="enterprise-eyebrow">{item.eyebrow}</span>
              <h3 className="enterprise-card-title">{item.title}</h3>
              <p className="section-copy">{item.description}</p>
              <div className="enterprise-card-foot">
                <span className="enterprise-metric">{item.metric}</span>
                <Link href={item.href} className="button-link">
                  {item.action}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="section enterprise-section">
        <div className="enterprise-section-head">
          <div>
            <p className="enterprise-section-kicker">{copy.sections.capabilities.kicker}</p>
            <h2 className="section-title">{copy.sections.capabilities.title}</h2>
          </div>
          <p className="section-copy enterprise-section-copy">{copy.sections.capabilities.copy}</p>
        </div>

        <div className="enterprise-grid enterprise-grid-2x2">
          {copy.capabilityCards.map((item) => (
            <article key={item.title} className="enterprise-card enterprise-card-soft">
              <span className="enterprise-eyebrow">{item.eyebrow}</span>
              <h3 className="enterprise-card-title">{item.title}</h3>
              <p className="section-copy">{item.description}</p>
              <p className="enterprise-detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="architecture" className="section enterprise-section">
        <div className="enterprise-section-head">
          <div>
            <p className="enterprise-section-kicker">{copy.sections.architecture.kicker}</p>
            <h2 className="section-title">{copy.sections.architecture.title}</h2>
          </div>
          <p className="section-copy enterprise-section-copy">{copy.sections.architecture.copy}</p>
        </div>

        <div className="enterprise-flow-grid">
          {copy.flowSteps.map((item) => (
            <article key={item.step} className="enterprise-flow-card">
              <span className="enterprise-flow-index">{item.step}</span>
              <h3 className="enterprise-card-title">{item.title}</h3>
              <p className="section-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="stores" className="section enterprise-section">
        <div className="enterprise-section-head">
          <div>
            <p className="enterprise-section-kicker">{copy.sections.stores.kicker}</p>
            <h2 className="section-title">{copy.sections.stores.title}</h2>
          </div>
          <p className="section-copy enterprise-section-copy">{copy.sections.stores.copy}</p>
        </div>

        <article className="enterprise-banner-card">
          <div>
            <span className="chip chip-primary">{copy.storeBanner.chip}</span>
            <h3 className="enterprise-banner-title">{copy.storeBanner.title}</h3>
            <p className="section-copy enterprise-banner-copy">{copy.storeBanner.copy}</p>
          </div>

          <div className="enterprise-banner-stats">
            {copy.storeBanner.stats.map((item) => (
              <div key={item.label} className="enterprise-banner-stat">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="button-row compact">
            <Link href={buildPlatformStorefrontPath()} className="button">
              {copy.storeBanner.cta}
            </Link>
            <Link href="/merchant/register" className="button-secondary">
              {copy.storeBanner.merchantCta}
            </Link>
          </div>
        </article>

        <div className="enterprise-grid enterprise-grid-3">
          {featuredMerchants.length === 0 ? (
            <article className="enterprise-card enterprise-card-soft enterprise-card-wide">
              <span className="enterprise-eyebrow">{copy.merchant.onboardingEyebrow}</span>
              <h3 className="enterprise-card-title">{copy.merchant.onboardingTitle}</h3>
              <p className="section-copy">{copy.merchant.onboardingDetail}</p>
              <div className="enterprise-card-foot">
                <span className="enterprise-metric">{copy.merchant.onboardingMetric}</span>
                <Link href="/merchant/register" className="button-link">
                  {copy.merchant.onboardingAction}
                </Link>
              </div>
            </article>
          ) : (
            featuredMerchants.map((merchant) => (
              <article key={merchant.id} className="enterprise-card merchant-sample-card">
                <span className="enterprise-eyebrow">{copy.merchant.sampleEyebrow}</span>
                <h3 className="enterprise-card-title">{merchant.name}</h3>
                <p className="section-copy">{copy.merchant.sampleDescription}</p>

                <div className="merchant-stat-row">
                  <span className="enterprise-metric">
                    {language === "zh"
                      ? `${merchant.paymentProfile.productCount} 个商品`
                      : `${merchant.paymentProfile.productCount} products`}
                  </span>
                  <span className="enterprise-metric merchant-muted-metric">
                    {language === "zh"
                      ? `${merchant.paymentProfile.skuCount} 个 SKU`
                      : `${merchant.paymentProfile.skuCount} SKUs`}
                  </span>
                </div>

                <div className="merchant-feature-list">
                  {merchant.paymentProfile.featuredProducts.length > 0 ? (
                    merchant.paymentProfile.featuredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={buildMerchantStorefrontProductPath(merchant.id, product.slug)}
                        className="merchant-mini-chip"
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <span className="merchant-mini-chip">{copy.merchant.emptyChip}</span>
                  )}
                </div>

                <div className="enterprise-card-foot">
                  <span className="small-copy">
                    {copy.merchant.shopEntryLabel}: {buildMerchantStorefrontPath(merchant.id)}
                  </span>
                  <Link href={buildMerchantStorefrontPath(merchant.id)} className="button-link">
                    {copy.merchant.visitStore}
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="section panel enterprise-preview-panel">
        <div className="panel-header">
          <span className="panel-icon">◎</span>
          <h2 className="panel-title">{copy.preview.heading}</h2>
        </div>

        <div className="panel-body">
          <div className="enterprise-section-head compact">
            <p className="section-copy enterprise-section-copy">{copy.preview.intro}</p>
            <div className="button-row compact">
              <Link href={buildPlatformStorefrontPath()} className="button-secondary">
                {copy.preview.viewFullStore}
              </Link>
              <Link href="/query" className="button-link">
                {copy.preview.orderQuery}
              </Link>
            </div>
          </div>

          {keyword && highlightedProducts.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">{copy.preview.emptySearch}</p>
            </div>
          ) : highlightedProducts.length === 0 ? (
            <div className="sub-panel">
              <p className="empty-note">{copy.preview.emptyProducts}</p>
            </div>
          ) : (
            <div className="goods-grid">
              {highlightedProducts.map((product) => {
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
                  <article key={product.id} id={`product-${product.id}`} className="goods-card">
                    <div>
                      <div className="goods-thumb">
                        <span className="goods-thumb-mark">{product.name.slice(0, 2)}</span>
                        <p>{product.summary || copy.ui.productSummaryFallback}</p>
                      </div>
                      <div className="goods-content">
                        <div className="goods-head">
                          <span className="price-chip">
                            {formatCurrency(product.startingPriceCents, language)}
                          </span>
                          <span className={`badge ${hasStock ? "success" : "muted"}`}>
                            {getProductModeBadgeText(language, product.saleMode, product.skus.length, hasStock)}
                          </span>
                        </div>
                        <h3>{product.name}</h3>
                        <p className="card-meta">{metaCopy}</p>
                      </div>
                    </div>

                    <div className="goods-foot">
                      <div className="data-row">
                        <span className="data-key">{copy.preview.stock}</span>
                        <strong>{product.stockAvailable}</strong>
                      </div>
                      <div className="data-row">
                        <span className="data-key">{copy.preview.productMode}</span>
                        <strong>{modeLabel}</strong>
                      </div>

                      <div className="button-row">
                        <Link
                          href={buildStorefrontProductPath(product.slug, product.ownerId)}
                          className="button"
                        >
                          {product.saleMode === "MULTI" ? copy.ui.viewProduct : copy.ui.buyNow}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
