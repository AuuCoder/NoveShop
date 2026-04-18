export const MERCHANT_TAB_META = {
  overview: {
    icon: "概",
    href: "/merchant",
    label: "概览",
    kicker: "Overview",
    title: "商户经营总览",
    description: "查看商户经营概况、风险提醒、模块入口和收款准备状态。",
  },
  products: {
    icon: "品",
    href: "/merchant/products",
    label: "商品",
    kicker: "Products",
    title: "商品与 SKU 中心",
    description: "创建商品、维护单商品或多 SKU，并管理你名下商品的售卖结构。",
  },
  inventory: {
    icon: "库",
    href: "/merchant/inventory",
    label: "库存",
    kicker: "Inventory",
    title: "库存监控中心",
    description: "按商品和 SKU 查看可售、占用、已售库存，并快速发现低库存风险。",
  },
  orders: {
    icon: "单",
    href: "/merchant/orders",
    label: "订单",
    kicker: "Orders",
    title: "订单中心",
    description: "查看绑定到你商户名下的订单、支付状态、成交结果和最近流水。",
  },
  customers: {
    icon: "客",
    href: "/merchant/customers",
    label: "客户",
    kicker: "Customers",
    title: "客户洞察中心",
    description: "从订单记录分析客户复购、最近成交客户和待转化客户。",
  },
  finance: {
    icon: "财",
    href: "/merchant/finance",
    label: "财务",
    kicker: "Finance",
    title: "收款与经营分析",
    description: "从订单维度查看成交金额、待支付金额、商品收入和通道表现。",
  },
  payments: {
    icon: "付",
    href: "/merchant/payments",
    label: "收款",
    kicker: "Payments",
    title: "收款与支付链路",
    description: "维护你自己的 NovaPay 商户号、密钥、默认通道，并查看支付尝试、回调和补偿任务。",
  },
  settings: {
    icon: "账",
    href: "/merchant/settings",
    label: "账号",
    kicker: "Settings",
    title: "账号与治理",
    description: "查看商户账号信息、权限边界、模块治理和当前控制台运行状态。",
  },
} as const;

export type MerchantTab = keyof typeof MERCHANT_TAB_META;

export const MERCHANT_TABS = Object.keys(MERCHANT_TAB_META) as MerchantTab[];

export type MerchantPageSection = {
  id: string;
  label: string;
  description: string;
};

export type MerchantTabView = {
  key: string;
  label: string;
  description: string;
  href: string;
  sectionIds: readonly string[];
};

export const MERCHANT_OPERATIONS_TABS = [
  "overview",
  "products",
  "inventory",
  "orders",
  "customers",
  "finance",
] as const satisfies readonly MerchantTab[];

export const MERCHANT_CONFIGURATION_TABS = [
  "payments",
  "settings",
] as const satisfies readonly MerchantTab[];

export const MERCHANT_PAGE_SECTIONS: Record<MerchantTab, readonly MerchantPageSection[]> = {
  overview: [],
  products: [
    {
      id: "products-create",
      label: "创建商品",
      description: "新建商品并初始化默认规格。",
    },
    {
      id: "products-signals",
      label: "经营提醒",
      description: "查看低库存与结构告警。",
    },
    {
      id: "products-catalog",
      label: "商品矩阵",
      description: "维护商品、SKU、价格与上下架状态。",
    },
  ],
  inventory: [
    {
      id: "inventory-import",
      label: "商户入库",
      description: "给自己名下的 SKU 导入卡密库存。",
    },
    {
      id: "inventory-filters",
      label: "库存筛选",
      description: "按商品、关键字和库存状态收口。",
    },
    {
      id: "inventory-stock",
      label: "SKU 库存矩阵",
      description: "从商品和规格两个维度查看库存健康度。",
    },
    {
      id: "inventory-ledger",
      label: "库存明细台账",
      description: "维护每一条库存记录和卡密内容。",
    },
    {
      id: "inventory-alerts",
      label: "库存告警",
      description: "优先发现低库存和售罄风险。",
    },
  ],
  orders: [
    {
      id: "orders-recent",
      label: "订单流水",
      description: "查看最近订单和客户下单轨迹。",
    },
    {
      id: "orders-pending",
      label: "待支付订单",
      description: "聚焦等待支付完成的订单。",
    },
    {
      id: "orders-fulfilled",
      label: "已完成订单",
      description: "核对已支付成功的订单。",
    },
    {
      id: "orders-exceptions",
      label: "异常订单",
      description: "查看失败和过期订单。",
    },
    {
      id: "orders-status",
      label: "状态结构",
      description: "按待支付、成功、失败做结构化观察。",
    },
    {
      id: "orders-channels",
      label: "通道表现",
      description: "按支付通道对比订单量和成交额。",
    },
  ],
  customers: [
    {
      id: "customers-filters",
      label: "客户筛选",
      description: "按邮箱关键词和客户分层收口。",
    },
    {
      id: "customers-snapshot",
      label: "筛选结果",
      description: "快速查看筛选后的客户数、订单数和成交额。",
    },
    {
      id: "customers-list",
      label: "客户画像",
      description: "查看客户邮箱、订单规模和最近下单时间。",
    },
    {
      id: "customers-repeat",
      label: "复购客户",
      description: "聚焦已经发生二次购买的高价值客户。",
    },
    {
      id: "customers-conversion",
      label: "待转化客户",
      description: "优先关注仍有待支付订单的客户。",
    },
  ],
  finance: [
    {
      id: "finance-filters",
      label: "财务筛选",
      description: "按通道、商品和订单状态筛选财务视图。",
    },
    {
      id: "finance-summary",
      label: "筛选结果",
      description: "查看成交、待收和支付成功率。",
    },
    {
      id: "finance-channels",
      label: "通道收入",
      description: "按支付通道观察订单与收入结构。",
    },
    {
      id: "finance-products",
      label: "商品收入排行",
      description: "按商品维度查看贡献度和成交结果。",
    },
  ],
  payments: [
    {
      id: "payments-profile",
      label: "商户配置",
      description: "维护 NovaPay 商户号、密钥和启用方式。",
    },
    {
      id: "payments-routing",
      label: "收款路由",
      description: "查看默认通道、启用方式和商品绑定关系。",
    },
    {
      id: "payments-versions",
      label: "版本历史",
      description: "查看配置快照并按版本回滚。",
    },
    {
      id: "payments-rules",
      label: "隔离规则",
      description: "确认多商户模式下的收款边界。",
    },
    {
      id: "payment-filters",
      label: "支付筛选",
      description: "按通道、状态和关键字收口链路。",
    },
    {
      id: "payment-priority",
      label: "异常优先级",
      description: "优先处理补偿失败和高风险订单。",
    },
    {
      id: "payment-command",
      label: "订单指挥",
      description: "逐单查看支付、回调和补偿动作。",
    },
    {
      id: "payment-control",
      label: "控制面",
      description: "查看控制留痕、风险和复核状态。",
    },
    {
      id: "payment-sla",
      label: "SLA 趋势",
      description: "观察支付成功率和链路稳定性。",
    },
    {
      id: "payment-latency",
      label: "耗时分层",
      description: "查看通道与订单的耗时结构。",
    },
    {
      id: "payment-reconcile",
      label: "对账视图",
      description: "观察支付、回调和履约闭环缺口。",
    },
    {
      id: "payment-audit",
      label: "审计流水",
      description: "追踪最近支付链路审计事件。",
    },
    {
      id: "payment-pipeline",
      label: "链路分层",
      description: "理解尝试、回调和补偿的分层结构。",
    },
    {
      id: "payment-attempts",
      label: "支付尝试",
      description: "查看最近支付尝试的原始记录。",
    },
  ],
  settings: [
    {
      id: "settings-profile",
      label: "账号资料",
      description: "维护商户名称、登录邮箱和基础信息。",
    },
    {
      id: "settings-security",
      label: "登录安全",
      description: "修改商户后台登录密码。",
    },
    {
      id: "settings-storefront",
      label: "店铺公告",
      description: "维护店铺首页和商品页公告内容。",
    },
    {
      id: "settings-governance",
      label: "权限边界",
      description: "查看多商户模式下的数据边界。",
    },
    {
      id: "settings-shortcuts",
      label: "常用模块",
      description: "快速跳转到最常访问的工作区。",
    },
    {
      id: "settings-danger",
      label: "注销账号",
      description: "谨慎处理当前商户账号注销。",
    },
  ],
};

export const MERCHANT_TAB_VIEWS: Record<MerchantTab, readonly MerchantTabView[]> = {
  overview: [
    {
      key: "overview",
      label: "经营总览",
      description: "查看整体经营指标、模块地图和风险提醒。",
      href: "/merchant",
      sectionIds: [],
    },
  ],
  products: [
    {
      key: "overview",
      label: "商品总览",
      description: "同时查看创建入口、经营提醒和商品矩阵。",
      href: "/merchant/products",
      sectionIds: ["products-create", "products-signals", "products-catalog"],
    },
    {
      key: "create",
      label: "新建商品",
      description: "专注商品创建与默认规格初始化。",
      href: "/merchant/products/create",
      sectionIds: ["products-create", "products-signals"],
    },
    {
      key: "catalog",
      label: "商品矩阵",
      description: "集中维护商品、SKU、价格和状态。",
      href: "/merchant/products/catalog",
      sectionIds: ["products-catalog"],
    },
  ],
  inventory: [
    {
      key: "overview",
      label: "库存中心",
      description: "查看库存、筛选矩阵和台账。",
      href: "/merchant/inventory",
      sectionIds: [
        "inventory-import",
        "inventory-filters",
        "inventory-stock",
        "inventory-ledger",
        "inventory-alerts",
      ],
    },
    {
      key: "import",
      label: "商户入库",
      description: "专注给自己名下 SKU 导入卡密库存。",
      href: "/merchant/inventory/import",
      sectionIds: ["inventory-import", "inventory-filters"],
    },
    {
      key: "stock",
      label: "库存矩阵",
      description: "查看 SKU 库存结构和告警情况。",
      href: "/merchant/inventory/stock",
      sectionIds: ["inventory-filters", "inventory-stock", "inventory-alerts"],
    },
    {
      key: "ledger",
      label: "库存台账",
      description: "维护库存明细、批次和卡密内容。",
      href: "/merchant/inventory/ledger",
      sectionIds: ["inventory-filters", "inventory-ledger"],
    },
  ],
  orders: [
    {
      key: "overview",
      label: "订单总览",
      description: "查看订单流水、状态结构和通道表现。",
      href: "/merchant/orders",
      sectionIds: ["orders-recent", "orders-status", "orders-channels"],
    },
    {
      key: "pending",
      label: "待支付",
      description: "聚焦尚未完成支付的订单。",
      href: "/merchant/orders/pending",
      sectionIds: ["orders-pending"],
    },
    {
      key: "fulfilled",
      label: "已完成",
      description: "查看支付完成并进入成交统计的订单。",
      href: "/merchant/orders/fulfilled",
      sectionIds: ["orders-fulfilled"],
    },
    {
      key: "exceptions",
      label: "异常订单",
      description: "查看失败、过期与需要关注的订单。",
      href: "/merchant/orders/exceptions",
      sectionIds: ["orders-exceptions", "orders-status"],
    },
  ],
  customers: [
    {
      key: "overview",
      label: "客户洞察",
      description: "查看客户分层、复购和转化线索。",
      href: "/merchant/customers",
      sectionIds: [
        "customers-filters",
        "customers-snapshot",
        "customers-list",
        "customers-repeat",
        "customers-conversion",
      ],
    },
    {
      key: "list",
      label: "客户列表",
      description: "集中查看客户画像和订单规模。",
      href: "/merchant/customers/list",
      sectionIds: ["customers-filters", "customers-snapshot", "customers-list"],
    },
    {
      key: "repeat",
      label: "复购客户",
      description: "聚焦已经发生二次购买的客户。",
      href: "/merchant/customers/repeat",
      sectionIds: ["customers-filters", "customers-snapshot", "customers-repeat"],
    },
    {
      key: "conversion",
      label: "待转化客户",
      description: "优先跟进待支付订单对应的客户。",
      href: "/merchant/customers/conversion",
      sectionIds: ["customers-filters", "customers-snapshot", "customers-conversion"],
    },
  ],
  finance: [
    {
      key: "overview",
      label: "财务分析",
      description: "查看成交、待收和商品收入结构。",
      href: "/merchant/finance",
      sectionIds: ["finance-filters", "finance-summary", "finance-channels", "finance-products"],
    },
    {
      key: "summary",
      label: "财务总览",
      description: "先看筛选结果、成交和待收结构。",
      href: "/merchant/finance/summary",
      sectionIds: ["finance-filters", "finance-summary"],
    },
    {
      key: "channels",
      label: "通道收入",
      description: "查看不同支付通道的收入表现。",
      href: "/merchant/finance/channels",
      sectionIds: ["finance-filters", "finance-summary", "finance-channels"],
    },
    {
      key: "products",
      label: "商品收入",
      description: "按商品查看收入贡献和成交情况。",
      href: "/merchant/finance/products",
      sectionIds: ["finance-filters", "finance-summary", "finance-products"],
    },
  ],
  payments: [
    {
      key: "overview",
      label: "收款总览",
      description: "同时查看配置、版本和支付链路。",
      href: "/merchant/payments",
      sectionIds: [
        "payments-profile",
        "payments-routing",
        "payments-versions",
        "payments-rules",
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
      key: "profile",
      label: "商户配置",
      description: "专注维护 NovaPay 商户参数和当前收款路由。",
      href: "/merchant/payments/profile",
      sectionIds: ["payments-profile", "payments-routing"],
    },
    {
      key: "versions",
      label: "版本与规则",
      description: "查看版本快照、回滚入口和隔离规则。",
      href: "/merchant/payments/versions",
      sectionIds: ["payments-versions", "payments-rules"],
    },
    {
      key: "monitoring",
      label: "链路监控",
      description: "聚焦异常订单、控制面和最近审计。",
      href: "/merchant/payments/monitoring",
      sectionIds: [
        "payment-filters",
        "payment-priority",
        "payment-command",
        "payment-control",
        "payment-audit",
        "payment-attempts",
      ],
    },
    {
      key: "analysis",
      label: "经营分析",
      description: "查看 SLA、耗时、对账和链路分层。",
      href: "/merchant/payments/analysis",
      sectionIds: [
        "payment-filters",
        "payment-sla",
        "payment-latency",
        "payment-reconcile",
        "payment-pipeline",
      ],
    },
  ],
  settings: [
    {
      key: "overview",
      label: "账号总览",
      description: "同时查看资料、安全、公告和治理边界。",
      href: "/merchant/settings",
      sectionIds: [
        "settings-profile",
        "settings-security",
        "settings-storefront",
        "settings-governance",
        "settings-shortcuts",
        "settings-danger",
      ],
    },
    {
      key: "profile",
      label: "账号资料",
      description: "维护商户名称、登录邮箱和账号基础信息。",
      href: "/merchant/settings/profile",
      sectionIds: ["settings-profile"],
    },
    {
      key: "security",
      label: "登录安全",
      description: "专注修改后台登录密码。",
      href: "/merchant/settings/security",
      sectionIds: ["settings-security"],
    },
    {
      key: "storefront",
      label: "店铺公告",
      description: "维护店铺首页和商品页公告。",
      href: "/merchant/settings/storefront",
      sectionIds: ["settings-storefront"],
    },
    {
      key: "governance",
      label: "权限治理",
      description: "查看权限边界和常用模块入口。",
      href: "/merchant/settings/governance",
      sectionIds: ["settings-governance", "settings-shortcuts"],
    },
    {
      key: "danger",
      label: "危险操作",
      description: "谨慎处理当前账号注销。",
      href: "/merchant/settings/danger",
      sectionIds: ["settings-danger"],
    },
  ],
};

export function getMerchantPageSections(tab: MerchantTab) {
  return MERCHANT_PAGE_SECTIONS[tab];
}

export function getMerchantTabViews(tab: MerchantTab) {
  return MERCHANT_TAB_VIEWS[tab];
}

export function getMerchantTabView(tab: MerchantTab, viewKey?: string | null) {
  const views = MERCHANT_TAB_VIEWS[tab];

  if (!viewKey) {
    return views[0];
  }

  return views.find((view) => view.key === viewKey) ?? views[0];
}

export function normalizeMerchantTab(input?: string | null): MerchantTab {
  if (!input) {
    return "overview";
  }

  if (
    input === "payment" ||
    input === "channel" ||
    input === "channels" ||
    input === "profile" ||
    input === "gateway"
  ) {
    return "payments";
  }

  if (input === "account") {
    return "settings";
  }

  return input in MERCHANT_TAB_META ? (input as MerchantTab) : "overview";
}

export function buildMerchantHref(
  tab: MerchantTab,
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
  return query ? `${MERCHANT_TAB_META[tab].href}?${query}` : MERCHANT_TAB_META[tab].href;
}
