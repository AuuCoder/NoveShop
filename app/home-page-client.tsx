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
        <span className="hero-title-line">把官方直营、商户自营</span>
        <span className="hero-title-line">
          与 <span className="hero-title-accent">多商户支付</span> 统一到
        </span>
        <span className="hero-title-line">一套数字商品中台</span>
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
          "同一套商品模型里支持单规格直购与多 SKU 规格矩阵，适合从简单发卡到复杂套餐销售的不同场景。",
        detail: `当前官方店已开放 ${multiSkuProductCount} 个多 SKU 商品。`,
        eyebrow: "商品模型",
        title: "单商品与多 SKU 共存",
      },
      {
        description:
          "库存、预占、已售都在 SKU 维度跟踪，支付成功后自动履约，避免多规格混发和库存对不上。",
        detail: `官方店当前可即时履约 ${totalStock} 份库存。`,
        eyebrow: "库存履约",
        title: "库存按 SKU 精细履约",
      },
      {
        description:
          "商户只能维护自己的商品、收款参数、订单和客户数据，平台可以统一运营，但不会把商品混卖到同一个前台。",
        detail: `当前商户侧总计 ${totalMerchantProducts} 个商品、${totalMerchantSkuCount} 个 SKU。`,
        eyebrow: "数据隔离",
        title: "多商户数据天然隔离",
      },
      {
        description:
          "首页负责品牌介绍，官方店与商户店负责售卖，后台与商户中心负责运营和配置，避免页面职责过载。",
        detail: "品牌官网、官方店、商户店和后台导航已经按模块拆开。",
        eyebrow: "运营结构",
        title: "前中后台职责分层",
      },
    ],
    flowSteps: [
      {
        copy: "管理员和商户分别维护自己的 NovaPay 商户参数，确定订单到底该由谁收款。",
        step: "01",
        title: "配置收款主体",
      },
      {
        copy: "商品可配置单商品或多 SKU，价格、规格和库存都围绕具体 SKU 进行管理。",
        step: "02",
        title: "管理商品与 SKU",
      },
      {
        copy: "官方店和商户店各自展示自己的商品，不再把不同主体的商品混合展示在一个前台。",
        step: "03",
        title: "店铺独立售卖",
      },
      {
        copy: "下单后创建支付单，回调与查单同步状态，成功后自动履约并交付卡密内容。",
        step: "04",
        title: "回调确认并发卡",
      },
    ],
    hero: {
      chip: "企业级多商户发卡平台",
      commandEyebrow: "平台运营视图",
      commandStages: [
        {
          detail: "首页负责品牌展示、解决方案介绍和入口分流。",
          label: "品牌入口",
          step: "01",
          value: "/",
        },
        {
          detail: "平台直营网商品统一在官方店成交，不与商户商品混卖。",
          label: "官方店",
          step: "02",
          value: "/store/platform",
        },
        {
          detail: "每个商户都有自己的专属前台、商品目录和 SKU 库存。",
          label: "商户店",
          step: "03",
          value: "/store/[merchantId]",
        },
        {
          detail: "订单按商品绑定的商户主体收款，回调成功后自动交付。",
          label: "支付履约",
          step: "04",
          value: "NovaPay -> 自动发卡",
        },
      ],
      commandTitle: "把首页、店铺、支付路由和发卡履约收在一张运营视图里",
      kicker: "企业级数字商品平台",
      lead: "NoveShop 的首页现在回归成企业官网形态，重点展示平台能力与入口分层。管理员官方店固定走 `/store/platform`，商户则各自拥有 `/store/[merchantId]` 的独立前台，商品、SKU、库存、NovaPay 参数和订单归属全部隔离。",
      signals: ["官方直营", "商户自营", "NovaPay 多商户", "SKU 库存履约"],
      title: "把官方直营、商户自营和多商户支付统一到一套数字商品中台",
    },
    merchant: {
      emptyChip: "等待商品上架",
      onboardingAction: "立即开始",
      onboardingEyebrow: "商户入驻",
      onboardingDetail:
        "可以先注册商户、配置各自的 NovaPay 参数，再在商户中心创建商品与 SKU，首页就会自动反映店铺网络规模。",
      onboardingMetric: "下一步：注册商户并配置收款",
      onboardingTitle: "当前还没有可展示的商户样例",
      sampleDescription: "独立商户店，拥有自己的商品目录、SKU、库存与 NovaPay 收款参数。",
      sampleEyebrow: "商户样例",
      shopEntryLabel: "店铺入口",
      visitStore: "进入商户店",
    },
    preview: {
      emptyProducts: "当前管理员官方店还没有可展示的商品，先去后台创建商品和 SKU 即可。",
      emptySearch: "管理员官方店里没有命中这个关键词的商品，可以换个词再试试。",
      heading: keyword ? `管理员官方店搜索结果：${keyword}` : "管理员官方店商品预览",
      intro: keyword
        ? "顶部搜索框会直接筛选官方店商品和 SKU。"
        : "首页顶部搜索框会直达官方店的商品与 SKU 检索。",
      orderQuery: "订单查询",
      productMode: "商品模式",
      stock: "可售库存",
      viewFullStore: "查看完整官方店",
    },
    sections: {
      architecture: {
        copy: "这套系统的关键不是一个支付按钮，而是订单、回调、查单与履约能按商户主体稳定串起来。",
        kicker: "业务闭环",
        title: "从收款配置到自动发卡的业务闭环",
      },
      capabilities: {
        copy: "核心重点不只是能支付，而是商品模型、支付主体、库存和交付路径能持续跑起来。",
        kicker: "核心能力",
        title: "围绕多商户数字商品分发搭建的平台能力",
      },
      solutions: {
        copy: "首页不再直接堆商品，而是把平台角色、支付路由和店铺分层一次讲清楚。",
        kicker: "解决方案",
        title: "适合管理员直营与商户自营并存的业务模式",
      },
      stores: {
        copy: "首页负责企业介绍，店铺负责成交。这样管理员与商户都能拥有清晰的对外入口。",
        kicker: "店铺网络",
        title: "统一品牌首页，分层承接官方店与商户店",
      },
    },
    solutionCards: [
      {
        action: "查看官方店",
        description:
          "平台直营商品统一沉淀到 `/store/platform`，首页只负责品牌展示，不再把商品列表和管理入口混在一起。",
        eyebrow: "平台直营",
        href: buildPlatformStorefrontPath(),
        metric: `${platformProductCount} 个直营商品`,
        title: "管理员官方店",
      },
      {
        action: "发起入驻",
        description:
          "每个商户都有自己的 `/store/[merchantId]` 专属前台，商品、SKU、库存与订单都只归属自己的店铺。",
        eyebrow: "商户前台",
        href: "/merchant/register",
        metric: `${merchantStoreCount} 个独立店`,
        title: "商户独立店铺",
      },
      {
        action: "进入商户中心",
        description:
          "支付不再写死到平台，而是由后台和商户中心各自维护自己的 NovaPay 参数，订单根据商品绑定的商户路由收款。",
        eyebrow: "支付路由",
        href: "/merchant",
        metric: `${activeMerchantPaymentCount} 个商户已启用`,
        title: "NovaPay 多商户路由",
      },
    ],
    storeBanner: {
      chip: "管理员官方店",
      copy: "平台直营商品、SKU、库存与订单都收敛到管理员官方店。需要企业展示时留在首页，需要成交时再跳到官方店或对应商户店。",
      cta: "打开管理员官方店",
      merchantCta: "商户入驻",
      stats: [
        { label: "直营商品", value: platformProductCount },
        { label: "多 SKU 商品", value: multiSkuProductCount },
        { label: "已上线商户店", value: merchantStoreCount },
      ],
      title: "管理员官方店已经独立为 `/store/platform`",
    },
    trustCards: [
      {
        detail: "已具备独立前台与收款配置的商户店铺",
        label: "独立店铺",
        value: merchantStoreCount,
      },
      {
        detail: "管理员官方店当前可售规格数量",
        label: "官方 SKU",
        value: totalSkuCount,
      },
      {
        detail: "官方店可即时履约的卡密库存",
        label: "平台库存",
        value: totalStock,
      },
      {
        detail: "商户侧已上架商品总量",
        label: "商户商品",
        value: totalMerchantProducts,
      },
    ],
    kpiCards: [
      {
        detail: "当前已启用 NovaPay 的商户数",
        label: "商户收款状态",
        value: activeMerchantPaymentCount,
      },
      {
        detail: "商户侧全部在售规格",
        label: "商户 SKU 总量",
        value: totalMerchantSkuCount,
      },
      {
        detail: "多 SKU 商品占比 / 官方商品总量",
        label: "官方商品模型",
        value: `${multiSkuProductCount}/${platformProductCount}`,
      },
      {
        detail: "支付结果同步后自动交付卡密",
        label: "履约模式",
        value: "自动发卡",
      },
    ],
    ui: {
      browseFlow: "查看业务闭环",
      buyNow: "立即购买",
      multiSkuMetaFallback: "支持多规格、多价格和多库存的商品模型。",
      openMerchantHub: "进入商户中心",
      openStorefront: "进入官方店",
      productSummaryFallback: "管理员官方店正在销售的示例商品。",
      registerMerchant: "商户入驻",
      singleMetaFallback: "默认规格直购，适合轻量直营发卡。",
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
