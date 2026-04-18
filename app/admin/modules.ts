export const ADMIN_TAB_META = {
  overview: {
    icon: "概",
    href: "/admin",
    label: "概览",
    kicker: "Overview",
    title: "控制台概览",
    description: "先看整体数据、关键提醒和常用入口。",
  },
  products: {
    icon: "品",
    href: "/admin/products",
    label: "商品",
    kicker: "Products",
    title: "商品与 SKU",
    description: "管理单商品、多 SKU、商品状态和绑定收款商户。",
  },
  inventory: {
    icon: "库",
    href: "/admin/inventory",
    label: "库存",
    kicker: "Inventory",
    title: "库存与入库",
    description: "按 SKU 导入卡密，查看每个商品和规格的库存情况。",
  },
  merchants: {
    icon: "商",
    href: "/admin/merchants",
    label: "商户",
    kicker: "Merchants",
    title: "商户中心",
    description: "查看入驻商户、自助配置状态，并维护多个 NovaPay 商户参数。",
  },
  payments: {
    icon: "付",
    href: "/admin/payments",
    label: "支付",
    kicker: "Payments",
    title: "支付观测中台",
    description: "统一查看支付尝试、回调日志和补偿任务，把多商户支付链路收口到一个企业工作台。",
  },
  orders: {
    icon: "单",
    href: "/admin/orders",
    label: "订单",
    kicker: "Orders",
    title: "订单中心",
    description: "查看支付状态、发货状态，以及每笔订单归属的收款商户。",
  },
} as const;

export type AdminTab = keyof typeof ADMIN_TAB_META;

export const ADMIN_TABS = Object.keys(ADMIN_TAB_META) as AdminTab[];

export type AdminNavGroup = {
  key: "overview" | "catalog" | "merchant_ops" | "orders";
  label: string;
  kicker: string;
  description: string;
  tabs: readonly AdminTab[];
};

export type AdminPageSection = {
  id: string;
  label: string;
  description: string;
};

export type AdminTabView = {
  key: string;
  label: string;
  description: string;
  href: string;
  sectionIds: readonly string[];
};

export const ADMIN_NAV_GROUPS: readonly AdminNavGroup[] = [
  {
    key: "overview",
    label: "总览启动",
    kicker: "Overview",
    description: "先看整体健康、关键提醒和日常操作入口。",
    tabs: ["overview"],
  },
  {
    key: "catalog",
    label: "商品经营",
    kicker: "Catalog",
    description: "围绕商品、SKU、库存和卡密做日常运营。",
    tabs: ["products", "inventory"],
  },
  {
    key: "merchant_ops",
    label: "商户与支付",
    kicker: "Merchant Ops",
    description: "管理商户接入、支付路由和链路排障。",
    tabs: ["merchants", "payments"],
  },
  {
    key: "orders",
    label: "订单履约",
    kicker: "Orders",
    description: "核对支付、发货和订单归属商户。",
    tabs: ["orders"],
  },
];

export const ADMIN_PAGE_SECTIONS: Record<AdminTab, readonly AdminPageSection[]> = {
  overview: [
    {
      id: "overview-summary",
      label: "经营总览",
      description: "核心数字、模块概览和全局提醒。",
    },
    {
      id: "overview-modules",
      label: "模块入口",
      description: "按商品、库存、商户、支付、订单跳转。",
    },
    {
      id: "overview-workflow",
      label: "推荐顺序",
      description: "按运营流程安排后台日常操作。",
    },
    {
      id: "overview-merchants",
      label: "商户快照",
      description: "快速查看当前可用收款商户与默认路由。",
    },
    {
      id: "overview-orders",
      label: "最近订单",
      description: "快速核对最近下单、支付和商户绑定。",
    },
  ],
  products: [
    {
      id: "products-create",
      label: "创建商品",
      description: "新建商品、默认规格与收款商户。",
    },
    {
      id: "products-catalog",
      label: "商品目录",
      description: "编辑商品、SKU、价格与上下架状态。",
    },
  ],
  inventory: [
    {
      id: "inventory-import",
      label: "批量入库",
      description: "按 SKU 导入卡密，避免发错规格。",
    },
    {
      id: "inventory-stock",
      label: "库存视图",
      description: "按商品和 SKU 查看实时余量。",
    },
    {
      id: "inventory-ledger",
      label: "库存台账",
      description: "维护每一条库存记录和卡密状态。",
    },
  ],
  merchants: [
    {
      id: "merchants-summary",
      label: "商户总览",
      description: "接入进度、默认路由和公告状态。",
    },
    {
      id: "merchants-announcement",
      label: "平台公告",
      description: "配置平台店铺公告和展示状态。",
    },
    {
      id: "merchants-create-account",
      label: "新增账号",
      description: "创建商户登录账号与初始密码。",
    },
    {
      id: "merchants-create-profile",
      label: "新增收款配置",
      description: "创建平台直营或兜底 NovaPay 配置。",
    },
    {
      id: "merchants-accounts",
      label: "账户台账",
      description: "查看资料、启用状态和密码重置。",
    },
    {
      id: "merchants-profiles",
      label: "支付资产",
      description: "维护多商户配置、路由与历史版本。",
    },
  ],
  payments: [
    {
      id: "payment-filters",
      label: "筛选总览",
      description: "按商户、通道和状态快速收口。",
    },
    {
      id: "payment-priority",
      label: "异常优先级",
      description: "先处理高风险订单和商户链路。",
    },
    {
      id: "payment-command",
      label: "订单指挥",
      description: "逐单查看支付、回调与补偿。",
    },
    {
      id: "payment-control",
      label: "控制面",
      description: "配置变更、风险操作和复核摘要。",
    },
    {
      id: "payment-sla",
      label: "SLA 趋势",
      description: "稳定性、近端趋势和巡检建议。",
    },
    {
      id: "payment-latency",
      label: "耗时分层",
      description: "查看订单耗时和商户排名。",
    },
    {
      id: "payment-reconcile",
      label: "通道与对账",
      description: "分析支付通道表现和商户闭环缺口。",
    },
    {
      id: "payment-audit",
      label: "审计流水",
      description: "追踪事件留痕和审计摘要。",
    },
    {
      id: "payment-pipeline",
      label: "链路分层",
      description: "回调、诊断和链路说明。",
    },
    {
      id: "payment-attempts",
      label: "支付尝试",
      description: "查看尝试记录和补偿任务。",
    },
  ],
  orders: [
    {
      id: "orders-summary",
      label: "订单总览",
      description: "支付与发货关键指标。",
    },
    {
      id: "orders-pending",
      label: "待支付订单",
      description: "聚焦等待支付完成的订单。",
    },
    {
      id: "orders-fulfilled",
      label: "已发货订单",
      description: "核对已自动发货的成交订单。",
    },
    {
      id: "orders-exceptions",
      label: "异常订单",
      description: "查看失败、过期和需要关注的订单。",
    },
    {
      id: "orders-recent",
      label: "最近订单",
      description: "逐单核对商品、商户和状态。",
    },
  ],
};

export const ADMIN_TAB_VIEWS: Record<AdminTab, readonly AdminTabView[]> = {
  overview: [
    {
      key: "overview",
      label: "控制台总览",
      description: "查看核心指标、模块入口和最近订单。",
      href: "/admin",
      sectionIds: ["overview-summary", "overview-modules", "overview-workflow", "overview-merchants", "overview-orders"],
    },
  ],
  products: [
    {
      key: "overview",
      label: "商品总览",
      description: "查看创建入口与全量商品目录。",
      href: "/admin/products",
      sectionIds: ["products-create", "products-catalog"],
    },
    {
      key: "create",
      label: "新建商品",
      description: "专注商品创建与默认规格初始化。",
      href: "/admin/products/create",
      sectionIds: ["products-create"],
    },
    {
      key: "catalog",
      label: "商品目录",
      description: "集中维护商品、SKU、价格与商户绑定。",
      href: "/admin/products/catalog",
      sectionIds: ["products-catalog"],
    },
  ],
  inventory: [
    {
      key: "inventory",
      label: "库存工作台",
      description: "导入卡密、查看库存并维护库存台账。",
      href: "/admin/inventory",
      sectionIds: ["inventory-import", "inventory-stock", "inventory-ledger"],
    },
  ],
  merchants: [
    {
      key: "overview",
      label: "商户总览",
      description: "总览商户接入、公告、账号与支付配置。",
      href: "/admin/merchants",
      sectionIds: [
        "merchants-summary",
        "merchants-announcement",
        "merchants-create-account",
        "merchants-create-profile",
        "merchants-accounts",
        "merchants-profiles",
      ],
    },
    {
      key: "announcements",
      label: "公告配置",
      description: "维护平台店铺公告与展示状态。",
      href: "/admin/merchants/announcements",
      sectionIds: ["merchants-summary", "merchants-announcement"],
    },
    {
      key: "accounts",
      label: "账号管理",
      description: "创建商户账号并维护资料与密码。",
      href: "/admin/merchants/accounts",
      sectionIds: ["merchants-summary", "merchants-create-account", "merchants-accounts"],
    },
    {
      key: "profiles",
      label: "支付配置",
      description: "管理 NovaPay 收款配置、默认路由与版本。",
      href: "/admin/merchants/profiles",
      sectionIds: ["merchants-summary", "merchants-create-profile", "merchants-profiles"],
    },
  ],
  payments: [
    {
      key: "overview",
      label: "支付总览",
      description: "完整查看多商户支付链路全景。",
      href: "/admin/payments",
      sectionIds: [
        "payment-filters",
        "payment-priority",
        "payment-command",
        "payment-control",
        "payment-sla",
        "payment-latency",
        "payment-reconcile",
        "payment-audit",
        "payment-pipeline",
        "payment-attempts",
      ],
    },
    {
      key: "exceptions",
      label: "异常处置",
      description: "聚焦异常优先级、订单指挥和支付尝试。",
      href: "/admin/payments/exceptions",
      sectionIds: ["payment-filters", "payment-priority", "payment-command", "payment-attempts"],
    },
    {
      key: "control",
      label: "控制面",
      description: "复核配置变更、高风险动作和控制留痕。",
      href: "/admin/payments/control",
      sectionIds: ["payment-filters", "payment-control"],
    },
    {
      key: "analysis",
      label: "分析看板",
      description: "查看稳定性、耗时分层和对账表现。",
      href: "/admin/payments/analysis",
      sectionIds: ["payment-filters", "payment-sla", "payment-latency", "payment-reconcile"],
    },
    {
      key: "audit",
      label: "审计回放",
      description: "追踪审计流水、链路分层和最近尝试。",
      href: "/admin/payments/audit",
      sectionIds: ["payment-filters", "payment-audit", "payment-pipeline", "payment-attempts"],
    },
  ],
  orders: [
    {
      key: "overview",
      label: "订单总览",
      description: "查看指标和最近交易列表。",
      href: "/admin/orders",
      sectionIds: ["orders-summary", "orders-recent"],
    },
    {
      key: "pending",
      label: "待支付",
      description: "聚焦等待支付完成的订单。",
      href: "/admin/orders/pending",
      sectionIds: ["orders-summary", "orders-pending"],
    },
    {
      key: "fulfilled",
      label: "已发货",
      description: "核对支付成功并已自动发货的订单。",
      href: "/admin/orders/fulfilled",
      sectionIds: ["orders-summary", "orders-fulfilled"],
    },
    {
      key: "exceptions",
      label: "异常订单",
      description: "查看失败、过期与需要人工关注的订单。",
      href: "/admin/orders/exceptions",
      sectionIds: ["orders-summary", "orders-exceptions"],
    },
  ],
};

export function normalizeAdminTab(input?: string | null): AdminTab {
  if (!input) {
    return "overview";
  }

  if (input === "gateway" || input === "callbacks" || input === "reconcile") {
    return "payments";
  }

  return input in ADMIN_TAB_META ? (input as AdminTab) : "overview";
}

export function getAdminNavGroup(tab: AdminTab) {
  return ADMIN_NAV_GROUPS.find((group) => group.tabs.includes(tab)) ?? ADMIN_NAV_GROUPS[0];
}

export function getAdminPageSections(tab: AdminTab) {
  return ADMIN_PAGE_SECTIONS[tab];
}

export function getAdminTabViews(tab: AdminTab) {
  return ADMIN_TAB_VIEWS[tab];
}

export function getAdminTabView(tab: AdminTab, viewKey?: string | null) {
  const views = ADMIN_TAB_VIEWS[tab];

  if (!viewKey) {
    return views[0];
  }

  return views.find((view) => view.key === viewKey) ?? views[0];
}

export function buildAdminHref(
  tab: AdminTab,
  options?: {
    success?: string;
    error?: string;
  },
) {
  const searchParams = new URLSearchParams();

  if (options?.success) {
    searchParams.set("success", options.success);
  }

  if (options?.error) {
    searchParams.set("error", options.error);
  }

  const query = searchParams.toString();
  return query ? `${ADMIN_TAB_META[tab].href}?${query}` : ADMIN_TAB_META[tab].href;
}
