import type { Prisma } from "@prisma/client";
import {
  CardItemStatus,
  PaymentAttemptStatus,
  ProductSaleMode,
  ProductStatus,
  ShopOrderStatus,
  SyncTaskStatus,
} from "@prisma/client";
import {
  closeNovaPayOrder,
  createNovaPayOrder,
  isNovaPayFailedStatus,
  isNovaPaySuccessStatus,
  queryNovaPayOrder,
} from "@/lib/novapay";
import { controlAuditLogSelect, type ControlAuditLogSnapshot } from "@/lib/control-audit";
import {
  getPaymentProfileForOrderNo,
  getMerchantOwnedPaymentProfile,
  requireDefaultPaymentProfile,
  requirePaymentProfileById,
  resolvePaymentProfileId,
} from "@/lib/payment-profile";
import { decryptText, encryptText } from "@/lib/encryption";
import { prisma } from "@/lib/prisma";
import {
  formatCny,
  generateOrderNo,
  generateToken,
  normalizeEmail,
  parsePriceToCents,
  slugify,
} from "@/lib/utils";
import { getEnv } from "@/lib/env";

const ORDER_RESERVE_MINUTES = 30;
const DEFAULT_SKU_NAME = "默认规格";

type StockSummary = {
  available: number;
  reserved: number;
  sold: number;
};

type RemoteOrderContext = {
  source: string;
  callbackEventId?: string | null;
  traceId?: string | null;
};

type ProductWithSkuShape = {
  priceCents: number;
  skus: Array<{
    id: string;
    priceCents: number;
    enabled: boolean;
  }>;
};

type HydratedProductWithSkuStock<TProduct extends ProductWithSkuShape> = Omit<TProduct, "skus"> & {
  skus: Array<TProduct["skus"][number] & { stock: StockSummary }>;
  stock: StockSummary;
  startingPriceCents: number;
};

const dashboardPaymentProfileSelect = {
  id: true,
  ownerId: true,
  name: true,
  merchantCode: true,
  defaultChannelCode: true,
  isActive: true,
  isDefault: true,
  updatedAt: true,
} satisfies Prisma.PaymentProfileSelect;

type AdminDashboardRawProduct = Prisma.ProductGetPayload<{
  include: {
    paymentProfile: {
      select: typeof dashboardPaymentProfileSelect;
    };
    skus: true;
  };
}>;

type AdminDashboardOrder = Prisma.ShopOrderGetPayload<{
  include: typeof orderInclude;
}>;

type OrderWithCardsShape = {
  cards: Array<{
    secret: string;
  }>;
};

export type AdminDashboardProduct = HydratedProductWithSkuStock<AdminDashboardRawProduct>;

const inventoryCardItemSelect = {
  id: true,
  batchName: true,
  secret: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: {
      id: true,
      name: true,
      slug: true,
      saleMode: true,
    },
  },
  sku: {
    select: {
      id: true,
      name: true,
      enabled: true,
      priceCents: true,
    },
  },
  order: {
    select: {
      id: true,
      orderNo: true,
      customerEmail: true,
    },
  },
} satisfies Prisma.CardItemSelect;

export type InventoryCardItemSnapshot = Prisma.CardItemGetPayload<{
  select: typeof inventoryCardItemSelect;
}>;

const publicProductInclude = {
  paymentProfile: {
    select: {
      ownerId: true,
      name: true,
      isActive: true,
    },
  },
  skus: {
    where: {
      enabled: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  },
} satisfies Prisma.ProductInclude;

type PublicStorefrontProductRaw = Prisma.ProductGetPayload<{
  include: typeof publicProductInclude;
}>;

export type PublicStorefrontProduct = HydratedProductWithSkuStock<PublicStorefrontProductRaw>;

const orderInclude = {
  product: true,
  paymentProfile: {
    select: dashboardPaymentProfileSelect,
  },
  sku: true,
  cards: {
    orderBy: [{ createdAt: "asc" }],
  },
} satisfies Prisma.ShopOrderInclude;

function hydrateCardSecret<TCard extends { secret: string }>(card: TCard): TCard {
  try {
    return {
      ...card,
      secret: decryptText(card.secret, "卡密库存"),
    };
  } catch (error) {
    console.error("Failed to decrypt card secret", error);

    return {
      ...card,
      secret: "[解密失败：请检查 DATA_ENCRYPTION_KEY 或历史密文]",
    };
  }
}

function hydrateInventoryCardItems(items: InventoryCardItemSnapshot[]) {
  return items.map((item) => hydrateCardSecret(item));
}

function hydrateOrderWithCardSecrets<TOrder extends OrderWithCardsShape>(order: TOrder): TOrder {
  return {
    ...order,
    cards: order.cards.map((card) => hydrateCardSecret(card)),
  };
}

function hydrateOrdersWithCardSecrets<TOrder extends OrderWithCardsShape>(orders: TOrder[]) {
  return orders.map((order) => hydrateOrderWithCardSecrets(order));
}

const paymentOperationOrderSelect = {
  id: true,
  orderNo: true,
  publicToken: true,
  customerEmail: true,
  amountCents: true,
  channelCode: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: {
      name: true,
      slug: true,
    },
  },
  sku: {
    select: {
      name: true,
    },
  },
  paymentProfile: {
    select: {
      ownerId: true,
      name: true,
      merchantCode: true,
    },
  },
} satisfies Prisma.ShopOrderSelect;

const paymentAttemptConsoleSelect = {
  id: true,
  externalOrderId: true,
  novapayOrderId: true,
  merchantChannelAccountId: true,
  channelCode: true,
  amountCents: true,
  status: true,
  checkoutUrl: true,
  hostedCheckoutUrl: true,
  expiresAt: true,
  callbackEventId: true,
  traceId: true,
  createRequestPayload: true,
  createResponsePayload: true,
  lastRemotePayload: true,
  lastSyncedAt: true,
  createdAt: true,
  updatedAt: true,
  shopOrder: {
    select: paymentOperationOrderSelect,
  },
  syncTasks: {
    select: {
      id: true,
      taskType: true,
      status: true,
      scheduledAt: true,
      retryCount: true,
    },
    orderBy: [{ createdAt: "desc" }],
    take: 2,
  },
} satisfies Prisma.ShopPaymentAttemptSelect;

const webhookEventLogConsoleSelect = {
  id: true,
  provider: true,
  externalEventId: true,
  externalOrderId: true,
  eventType: true,
  traceId: true,
  signatureValid: true,
  requestHeaders: true,
  requestBody: true,
  processingStatus: true,
  processingError: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.WebhookEventLogSelect;

const orderSyncTaskConsoleSelect = {
  id: true,
  taskType: true,
  status: true,
  scheduledAt: true,
  startedAt: true,
  finishedAt: true,
  retryCount: true,
  lastError: true,
  payload: true,
  createdAt: true,
  shopOrder: {
    select: paymentOperationOrderSelect,
  },
  paymentAttempt: {
    select: {
      id: true,
      externalOrderId: true,
      status: true,
      traceId: true,
      callbackEventId: true,
      channelCode: true,
      amountCents: true,
      createdAt: true,
    },
  },
} satisfies Prisma.OrderSyncTaskSelect;

const controlAuditDigestSelect = {
  createdAt: true,
  actionType: true,
  riskLevel: true,
  outcome: true,
  reviewStatus: true,
} satisfies Prisma.ControlAuditLogSelect;

const orderSyncTaskExecutionSelect = {
  id: true,
  taskType: true,
  status: true,
  retryCount: true,
  payload: true,
  shopOrder: {
    select: {
      orderNo: true,
      publicToken: true,
      product: {
        select: {
          slug: true,
        },
      },
      paymentProfile: {
        select: {
          ownerId: true,
        },
      },
    },
  },
  paymentAttempt: {
    select: {
      externalOrderId: true,
      traceId: true,
      shopOrder: {
        select: {
          orderNo: true,
          publicToken: true,
          product: {
            select: {
              slug: true,
            },
          },
          paymentProfile: {
            select: {
              ownerId: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.OrderSyncTaskSelect;

export type PaymentAttemptConsoleItem = Prisma.ShopPaymentAttemptGetPayload<{
  select: typeof paymentAttemptConsoleSelect;
}>;

export type WebhookEventLogConsoleItem = Prisma.WebhookEventLogGetPayload<{
  select: typeof webhookEventLogConsoleSelect;
}>;

export type OrderSyncTaskConsoleItem = Prisma.OrderSyncTaskGetPayload<{
  select: typeof orderSyncTaskConsoleSelect;
}>;

export const PAYMENT_OPERATION_ATTEMPT_FILTERS = [
  "all",
  "in_flight",
  "succeeded",
  "failed",
  "cancelled",
  "expired",
] as const;

export const PAYMENT_OPERATION_CALLBACK_FILTERS = [
  "all",
  "processing",
  "succeeded",
  "failed",
  "rejected",
  "invalid_signature",
] as const;

export const PAYMENT_OPERATION_SYNC_FILTERS = [
  "all",
  "queued",
  "running",
  "failed",
  "completed",
] as const;

export const PAYMENT_OPERATION_CONTROL_REVIEW_FILTERS = [
  "all",
  "pending",
  "reviewed",
] as const;

export const PAYMENT_OPERATION_CONTROL_RISK_FILTERS = [
  "all",
  "high",
  "medium",
  "low",
] as const;

export const PAYMENT_OPERATION_CONTROL_OUTCOME_FILTERS = [
  "all",
  "failed",
  "succeeded",
] as const;

export type PaymentOperationAttemptFilter = (typeof PAYMENT_OPERATION_ATTEMPT_FILTERS)[number];
export type PaymentOperationCallbackFilter = (typeof PAYMENT_OPERATION_CALLBACK_FILTERS)[number];
export type PaymentOperationSyncFilter = (typeof PAYMENT_OPERATION_SYNC_FILTERS)[number];
export type PaymentOperationControlReviewFilter =
  (typeof PAYMENT_OPERATION_CONTROL_REVIEW_FILTERS)[number];
export type PaymentOperationControlRiskFilter =
  (typeof PAYMENT_OPERATION_CONTROL_RISK_FILTERS)[number];
export type PaymentOperationControlOutcomeFilter =
  (typeof PAYMENT_OPERATION_CONTROL_OUTCOME_FILTERS)[number];

export type PaymentOperationsFilters = {
  keyword: string;
  paymentProfileId: string;
  channelCode: string;
  attemptStatus: PaymentOperationAttemptFilter;
  callbackStatus: PaymentOperationCallbackFilter;
  syncStatus: PaymentOperationSyncFilter;
  controlReviewStatus: PaymentOperationControlReviewFilter;
  controlRiskLevel: PaymentOperationControlRiskFilter;
  controlOutcome: PaymentOperationControlOutcomeFilter;
};

export type PaymentOperationsData = {
  summary: {
    totalAttempts: number;
    inFlightAttempts: number;
    succeededAttempts: number;
    failedAttempts: number;
    totalCallbacks: number;
    succeededCallbacks: number;
    failedCallbacks: number;
    pendingCallbacks: number;
    queuedSyncTasks: number;
    failedSyncTasks: number;
  };
  attempts: PaymentAttemptConsoleItem[];
  callbackLogs: WebhookEventLogConsoleItem[];
  syncTasks: OrderSyncTaskConsoleItem[];
  controlAuditLogs: ControlAuditLogSnapshot[];
  controlAuditDigest: {
    daily: Array<{
      dateKey: string;
      label: string;
      totalCount: number;
      failedCount: number;
      pendingCount: number;
      highRiskCount: number;
    }>;
    topActions: Array<{
      actionType: string;
      count: number;
      failedCount: number;
      pendingCount: number;
      highRiskCount: number;
    }>;
  };
  filters: PaymentOperationsFilters;
  filterOptions: {
    channelCodes: string[];
  };
};

export type ControlAuditDigestSnapshot = PaymentOperationsData["controlAuditDigest"];

type ControlAuditDigestItem = Prisma.ControlAuditLogGetPayload<{
  select: typeof controlAuditDigestSelect;
}>;

const IN_FLIGHT_ATTEMPT_STATUSES = [
  PaymentAttemptStatus.CREATED,
  PaymentAttemptStatus.PENDING,
  PaymentAttemptStatus.PROCESSING,
] as const;

const FAILED_ATTEMPT_STATUSES = [
  PaymentAttemptStatus.FAILED,
  PaymentAttemptStatus.CANCELLED,
  PaymentAttemptStatus.EXPIRED,
] as const;

const QUEUED_SYNC_TASK_STATUSES = [SyncTaskStatus.PENDING, SyncTaskStatus.RUNNING] as const;

function normalizeTextFilter(value?: string | null) {
  return value?.trim() ?? "";
}

function getShanghaiDateParts(value: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  return Object.fromEntries(parts.map((part) => [part.type, part.value])) as Record<string, string>;
}

function buildShanghaiDateKey(value: Date) {
  const parts = getShanghaiDateParts(value);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function buildShanghaiDateLabel(value: Date) {
  const parts = getShanghaiDateParts(value);
  return `${parts.month}/${parts.day}`;
}

function buildControlAuditDigest(logs: ControlAuditDigestItem[]) {
  const daily = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000);

    return {
      dateKey: buildShanghaiDateKey(date),
      label: buildShanghaiDateLabel(date),
      totalCount: 0,
      failedCount: 0,
      pendingCount: 0,
      highRiskCount: 0,
    };
  });
  const dailyMap = new Map(daily.map((item) => [item.dateKey, item]));
  const actionMap = new Map<
    string,
    {
      actionType: string;
      count: number;
      failedCount: number;
      pendingCount: number;
      highRiskCount: number;
    }
  >();

  for (const log of logs) {
    const dateKey = buildShanghaiDateKey(log.createdAt);
    const dailyItem = dailyMap.get(dateKey);

    if (dailyItem) {
      dailyItem.totalCount += 1;

      if (log.outcome === "FAILED") {
        dailyItem.failedCount += 1;
      }

      if (log.reviewStatus === "PENDING") {
        dailyItem.pendingCount += 1;
      }

      if (log.riskLevel === "HIGH" || log.riskLevel === "CRITICAL") {
        dailyItem.highRiskCount += 1;
      }
    }

    const actionItem =
      actionMap.get(log.actionType) ??
      {
        actionType: log.actionType,
        count: 0,
        failedCount: 0,
        pendingCount: 0,
        highRiskCount: 0,
      };

    actionItem.count += 1;

    if (log.outcome === "FAILED") {
      actionItem.failedCount += 1;
    }

    if (log.reviewStatus === "PENDING") {
      actionItem.pendingCount += 1;
    }

    if (log.riskLevel === "HIGH" || log.riskLevel === "CRITICAL") {
      actionItem.highRiskCount += 1;
    }

    actionMap.set(log.actionType, actionItem);
  }

  const topActions = Array.from(actionMap.values())
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      if (right.highRiskCount !== left.highRiskCount) {
        return right.highRiskCount - left.highRiskCount;
      }

      return right.failedCount - left.failedCount;
    })
    .slice(0, 5);

  return {
    daily,
    topActions,
  };
}

async function getPaymentOperationsControlAuditDigest(input: {
  scopeControlAuditWhere?: Prisma.ControlAuditLogWhereInput;
  filters: PaymentOperationsFilters;
}) {
  const controlAuditWhere = buildControlAuditWhere({
    scopeWhere: input.scopeControlAuditWhere,
    filters: input.filters,
  });
  const controlAuditDigestWhere = {
    AND: [
      controlAuditWhere ?? {},
      {
        createdAt: {
          gte: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        },
      },
    ],
  } satisfies Prisma.ControlAuditLogWhereInput;
  const rows = await prisma.controlAuditLog.findMany({
    where: controlAuditDigestWhere,
    select: controlAuditDigestSelect,
    orderBy: [{ createdAt: "desc" }],
    take: 320,
  });

  return buildControlAuditDigest(rows);
}

function parsePaymentOperationsSelectFilter<TValue extends string>(
  value: string | undefined,
  allowed: readonly TValue[],
  fallback: TValue,
) {
  const normalized = normalizeTextFilter(value) as TValue;
  return allowed.includes(normalized) ? normalized : fallback;
}

export function normalizePaymentOperationsFilters(
  input: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
): PaymentOperationsFilters {
  return {
    keyword: normalizeTextFilter(input.keyword),
    paymentProfileId: normalizeTextFilter(input.paymentProfileId) || "all",
    channelCode: normalizeTextFilter(input.channelCode) || "all",
    attemptStatus: parsePaymentOperationsSelectFilter(
      input.attemptStatus,
      PAYMENT_OPERATION_ATTEMPT_FILTERS,
      "all",
    ),
    callbackStatus: parsePaymentOperationsSelectFilter(
      input.callbackStatus,
      PAYMENT_OPERATION_CALLBACK_FILTERS,
      "all",
    ),
    syncStatus: parsePaymentOperationsSelectFilter(input.syncStatus, PAYMENT_OPERATION_SYNC_FILTERS, "all"),
    controlReviewStatus: parsePaymentOperationsSelectFilter(
      input.controlReviewStatus,
      PAYMENT_OPERATION_CONTROL_REVIEW_FILTERS,
      "all",
    ),
    controlRiskLevel: parsePaymentOperationsSelectFilter(
      input.controlRiskLevel,
      PAYMENT_OPERATION_CONTROL_RISK_FILTERS,
      "all",
    ),
    controlOutcome: parsePaymentOperationsSelectFilter(
      input.controlOutcome,
      PAYMENT_OPERATION_CONTROL_OUTCOME_FILTERS,
      "all",
    ),
  };
}

function buildPaymentAttemptKeywordWhere(keyword: string): Prisma.ShopPaymentAttemptWhereInput {
  return {
    OR: [
      {
        externalOrderId: {
          contains: keyword,
        },
      },
      {
        novapayOrderId: {
          contains: keyword,
        },
      },
      {
        merchantChannelAccountId: {
          contains: keyword,
        },
      },
      {
        callbackEventId: {
          contains: keyword,
        },
      },
      {
        traceId: {
          contains: keyword,
        },
      },
      {
        channelCode: {
          contains: keyword,
        },
      },
      {
        shopOrder: {
          OR: [
            {
              orderNo: {
                contains: keyword,
              },
            },
            {
              customerEmail: {
                contains: keyword,
              },
            },
            {
              product: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              product: {
                slug: {
                  contains: keyword,
                },
              },
            },
            {
              sku: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              paymentProfile: {
                is: {
                  name: {
                    contains: keyword,
                  },
                },
              },
            },
            {
              paymentProfile: {
                is: {
                  merchantCode: {
                    contains: keyword,
                  },
                },
              },
            },
          ],
        },
      },
    ],
  };
}

function buildPaymentAttemptStatusWhere(
  status: PaymentOperationAttemptFilter,
): Prisma.ShopPaymentAttemptWhereInput | undefined {
  switch (status) {
    case "in_flight":
      return {
        status: {
          in: [...IN_FLIGHT_ATTEMPT_STATUSES],
        },
      };
    case "succeeded":
      return {
        status: PaymentAttemptStatus.SUCCEEDED,
      };
    case "failed":
      return {
        status: PaymentAttemptStatus.FAILED,
      };
    case "cancelled":
      return {
        status: PaymentAttemptStatus.CANCELLED,
      };
    case "expired":
      return {
        status: PaymentAttemptStatus.EXPIRED,
      };
    case "all":
    default:
      return undefined;
  }
}

function buildPaymentAttemptConsoleWhere(input: {
  scopeWhere?: Prisma.ShopPaymentAttemptWhereInput;
  filters: PaymentOperationsFilters;
  includeKeyword?: boolean;
  includeStatus?: boolean;
  includeChannel?: boolean;
  includePaymentProfile?: boolean;
}): Prisma.ShopPaymentAttemptWhereInput | undefined {
  const conditions: Prisma.ShopPaymentAttemptWhereInput[] = [];

  if (input.scopeWhere) {
    conditions.push(input.scopeWhere);
  }

  if (input.includePaymentProfile !== false && input.filters.paymentProfileId !== "all") {
    conditions.push({
      shopOrder: {
        paymentProfileId: input.filters.paymentProfileId,
      },
    });
  }

  if (input.includeChannel !== false && input.filters.channelCode !== "all") {
    conditions.push({
      channelCode: input.filters.channelCode,
    });
  }

  if (input.includeStatus !== false) {
    const statusWhere = buildPaymentAttemptStatusWhere(input.filters.attemptStatus);

    if (statusWhere) {
      conditions.push(statusWhere);
    }
  }

  if (input.includeKeyword !== false && input.filters.keyword) {
    conditions.push(buildPaymentAttemptKeywordWhere(input.filters.keyword));
  }

  if (conditions.length === 0) {
    return undefined;
  }

  return {
    AND: conditions,
  };
}

function buildSyncTaskKeywordWhere(keyword: string): Prisma.OrderSyncTaskWhereInput {
  return {
    OR: [
      {
        taskType: {
          contains: keyword,
        },
      },
      {
        lastError: {
          contains: keyword,
        },
      },
      {
        payload: {
          contains: keyword,
        },
      },
      {
        paymentAttempt: {
          OR: [
            {
              externalOrderId: {
                contains: keyword,
              },
            },
            {
              traceId: {
                contains: keyword,
              },
            },
            {
              callbackEventId: {
                contains: keyword,
              },
            },
            {
              channelCode: {
                contains: keyword,
              },
            },
          ],
        },
      },
      {
        shopOrder: {
          OR: [
            {
              orderNo: {
                contains: keyword,
              },
            },
            {
              customerEmail: {
                contains: keyword,
              },
            },
            {
              product: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              product: {
                slug: {
                  contains: keyword,
                },
              },
            },
            {
              sku: {
                name: {
                  contains: keyword,
                },
              },
            },
            {
              paymentProfile: {
                is: {
                  name: {
                    contains: keyword,
                  },
                },
              },
            },
            {
              paymentProfile: {
                is: {
                  merchantCode: {
                    contains: keyword,
                  },
                },
              },
            },
          ],
        },
      },
    ],
  };
}

function buildSyncTaskStatusWhere(
  status: PaymentOperationSyncFilter,
): Prisma.OrderSyncTaskWhereInput | undefined {
  switch (status) {
    case "queued":
      return {
        status: SyncTaskStatus.PENDING,
      };
    case "running":
      return {
        status: SyncTaskStatus.RUNNING,
      };
    case "failed":
      return {
        status: SyncTaskStatus.FAILED,
      };
    case "completed":
      return {
        status: SyncTaskStatus.SUCCEEDED,
      };
    case "all":
    default:
      return undefined;
  }
}

function buildOrderSyncTaskConsoleWhere(input: {
  scopeWhere?: Prisma.OrderSyncTaskWhereInput;
  filters: PaymentOperationsFilters;
}): Prisma.OrderSyncTaskWhereInput | undefined {
  const conditions: Prisma.OrderSyncTaskWhereInput[] = [];

  if (input.scopeWhere) {
    conditions.push(input.scopeWhere);
  }

  if (input.filters.paymentProfileId !== "all") {
    conditions.push({
      OR: [
        {
          shopOrder: {
            paymentProfileId: input.filters.paymentProfileId,
          },
        },
        {
          paymentAttempt: {
            shopOrder: {
              paymentProfileId: input.filters.paymentProfileId,
            },
          },
        },
      ],
    });
  }

  if (input.filters.channelCode !== "all") {
    conditions.push({
      OR: [
        {
          shopOrder: {
            channelCode: input.filters.channelCode,
          },
        },
        {
          paymentAttempt: {
            channelCode: input.filters.channelCode,
          },
        },
      ],
    });
  }

  const syncStatusWhere = buildSyncTaskStatusWhere(input.filters.syncStatus);

  if (syncStatusWhere) {
    conditions.push(syncStatusWhere);
  }

  if (input.filters.keyword) {
    conditions.push(buildSyncTaskKeywordWhere(input.filters.keyword));
  }

  if (conditions.length === 0) {
    return undefined;
  }

  return {
    AND: conditions,
  };
}

function buildWebhookDirectKeywordWhere(keyword: string): Prisma.WebhookEventLogWhereInput {
  return {
    OR: [
      {
        externalEventId: {
          contains: keyword,
        },
      },
      {
        externalOrderId: {
          contains: keyword,
        },
      },
      {
        traceId: {
          contains: keyword,
        },
      },
      {
        eventType: {
          contains: keyword,
        },
      },
      {
        processingError: {
          contains: keyword,
        },
      },
    ],
  };
}

function buildWebhookStatusWhere(
  status: PaymentOperationCallbackFilter,
): Prisma.WebhookEventLogWhereInput | undefined {
  switch (status) {
    case "processing":
      return {
        processingStatus: "PROCESSING",
      };
    case "succeeded":
      return {
        processingStatus: "SUCCEEDED",
      };
    case "failed":
      return {
        processingStatus: "FAILED",
      };
    case "rejected":
      return {
        processingStatus: "REJECTED",
      };
    case "invalid_signature":
      return {
        signatureValid: false,
      };
    case "all":
    default:
      return undefined;
  }
}

function mergeWebhookWhereWithAnd(
  ...conditions: Array<Prisma.WebhookEventLogWhereInput | null | undefined>
): Prisma.WebhookEventLogWhereInput | null | undefined {
  if (conditions.some((condition) => condition === null)) {
    return null;
  }

  const filtered = conditions.filter(
    (condition): condition is Prisma.WebhookEventLogWhereInput => Boolean(condition),
  );

  if (filtered.length === 0) {
    return undefined;
  }

  return {
    AND: filtered,
  };
}

function mergeWebhookWhereWithOr(
  ...conditions: Array<Prisma.WebhookEventLogWhereInput | null | undefined>
): Prisma.WebhookEventLogWhereInput | undefined {
  const filtered = conditions.filter(
    (condition): condition is Prisma.WebhookEventLogWhereInput => Boolean(condition),
  );

  if (filtered.length === 0) {
    return undefined;
  }

  return {
    OR: filtered,
  };
}

function buildControlAuditKeywordWhere(keyword: string): Prisma.ControlAuditLogWhereInput {
  return {
    OR: [
      {
        actorLabel: {
          contains: keyword,
        },
      },
      {
        targetLabel: {
          contains: keyword,
        },
      },
      {
        summary: {
          contains: keyword,
        },
      },
      {
        detail: {
          contains: keyword,
        },
      },
      {
        actionType: {
          contains: keyword,
        },
      },
      {
        payload: {
          contains: keyword,
        },
      },
    ],
  };
}

function buildControlAuditWhere(input: {
  scopeWhere?: Prisma.ControlAuditLogWhereInput;
  filters: PaymentOperationsFilters;
}): Prisma.ControlAuditLogWhereInput | undefined {
  const conditions: Prisma.ControlAuditLogWhereInput[] = [];

  if (input.scopeWhere) {
    conditions.push(input.scopeWhere);
  }

  if (input.filters.paymentProfileId !== "all") {
    conditions.push({
      paymentProfileId: input.filters.paymentProfileId,
    });
  }

  if (input.filters.keyword) {
    conditions.push(buildControlAuditKeywordWhere(input.filters.keyword));
  }

  if (input.filters.controlReviewStatus === "pending") {
    conditions.push({
      reviewStatus: "PENDING",
    });
  }

  if (input.filters.controlReviewStatus === "reviewed") {
    conditions.push({
      reviewStatus: "REVIEWED",
    });
  }

  if (input.filters.controlRiskLevel === "high") {
    conditions.push({
      riskLevel: {
        in: ["HIGH", "CRITICAL"],
      },
    });
  }

  if (input.filters.controlRiskLevel === "medium") {
    conditions.push({
      riskLevel: "MEDIUM",
    });
  }

  if (input.filters.controlRiskLevel === "low") {
    conditions.push({
      riskLevel: "LOW",
    });
  }

  if (input.filters.controlOutcome === "failed") {
    conditions.push({
      outcome: "FAILED",
    });
  }

  if (input.filters.controlOutcome === "succeeded") {
    conditions.push({
      outcome: "SUCCEEDED",
    });
  }

  if (conditions.length === 0) {
    return undefined;
  }

  return {
    AND: conditions,
  };
}

async function buildWebhookWhereFromAttempts(
  attemptWhere?: Prisma.ShopPaymentAttemptWhereInput,
): Promise<Prisma.WebhookEventLogWhereInput | null | undefined> {
  if (!attemptWhere) {
    return undefined;
  }

  const identifiers = await prisma.shopPaymentAttempt.findMany({
    where: attemptWhere,
    select: {
      externalOrderId: true,
      traceId: true,
    },
  });

  return buildWebhookLogWhere({
    externalOrderIds: dedupeStrings(identifiers.map((item) => item.externalOrderId)),
    traceIds: dedupeStrings(identifiers.map((item) => item.traceId)),
  });
}

function emptyStock(): StockSummary {
  return { available: 0, reserved: 0, sold: 0 };
}

function toJsonString(value: unknown) {
  return JSON.stringify(value);
}

function normalizeOptionalString(value: unknown) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || null;
}

function parseOptionalDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function resolvePaymentAttemptStatus(input: {
  remoteStatus?: string | null;
  fallbackOrderStatus?: ShopOrderStatus | null;
}) {
  const normalized = input.remoteStatus?.trim().toUpperCase() ?? "";

  if (input.fallbackOrderStatus === ShopOrderStatus.FULFILLED) {
    return PaymentAttemptStatus.SUCCEEDED;
  }

  if (input.fallbackOrderStatus === ShopOrderStatus.EXPIRED) {
    return PaymentAttemptStatus.EXPIRED;
  }

  if (input.fallbackOrderStatus === ShopOrderStatus.FAILED && !normalized) {
    return PaymentAttemptStatus.FAILED;
  }

  switch (normalized) {
    case "SUCCEEDED":
      return PaymentAttemptStatus.SUCCEEDED;
    case "FAILED":
      return PaymentAttemptStatus.FAILED;
    case "CANCELLED":
      return PaymentAttemptStatus.CANCELLED;
    case "EXPIRED":
      return PaymentAttemptStatus.EXPIRED;
    case "PROCESSING":
    case "PAYING":
      return PaymentAttemptStatus.PROCESSING;
    case "PENDING":
    case "CREATED":
    case "WAITING":
    case "REQUIRES_ACTION":
      return PaymentAttemptStatus.PENDING;
    default:
      return normalized ? PaymentAttemptStatus.PROCESSING : PaymentAttemptStatus.CREATED;
  }
}

function buildAttemptRemotePayload(
  context: RemoteOrderContext,
  remoteOrder?: Record<string, unknown>,
  extra?: Record<string, unknown>,
) {
  return {
    source: context.source,
    callbackEventId: context.callbackEventId ?? null,
    traceId: context.traceId ?? null,
    remoteOrder: remoteOrder ?? null,
    ...extra,
  };
}

function buildPaymentAttemptRemoteUpdate(input: {
  remoteOrder: Record<string, unknown>;
  context: RemoteOrderContext;
  remoteStatus?: string | null;
  gatewayOrderId?: string | null;
  checkoutUrl?: string | null;
  hostedCheckoutUrl?: string | null;
  fallbackOrderStatus?: ShopOrderStatus | null;
}): Prisma.ShopPaymentAttemptUpdateManyMutationInput {
  const now = new Date();

  return {
    novapayOrderId: input.gatewayOrderId ?? undefined,
    checkoutUrl: input.checkoutUrl ?? undefined,
    hostedCheckoutUrl: input.hostedCheckoutUrl ?? undefined,
    callbackEventId: input.context.callbackEventId ?? undefined,
    traceId: input.context.traceId ?? undefined,
    status: resolvePaymentAttemptStatus({
      remoteStatus: input.remoteStatus,
      fallbackOrderStatus: input.fallbackOrderStatus,
    }),
    lastRemotePayload: toJsonString(buildAttemptRemotePayload(input.context, input.remoteOrder)),
    lastSyncedAt: now,
    updatedAt: now,
  };
}

function buildPaymentAttemptFailureUpdate(input: {
  context: RemoteOrderContext;
  status: PaymentAttemptStatus;
  errorMessage?: string | null;
  payload?: unknown;
}): Prisma.ShopPaymentAttemptUpdateManyMutationInput {
  const now = new Date();

  return {
    callbackEventId: input.context.callbackEventId ?? undefined,
    traceId: input.context.traceId ?? undefined,
    status: input.status,
    lastRemotePayload: toJsonString(
      buildAttemptRemotePayload(input.context, undefined, {
        errorMessage: input.errorMessage ?? null,
        payload: input.payload ?? null,
      }),
    ),
    lastSyncedAt: now,
    updatedAt: now,
  };
}

function mergeStocks(stocks: StockSummary[]) {
  return stocks.reduce(
    (sum, stock) => ({
      available: sum.available + stock.available,
      reserved: sum.reserved + stock.reserved,
      sold: sum.sold + stock.sold,
    }),
    emptyStock(),
  );
}

async function getSkuStockSummary(skuIds: string[]) {
  if (skuIds.length === 0) {
    return new Map<string, StockSummary>();
  }

  const rows = await prisma.cardItem.groupBy({
    by: ["skuId", "status"],
    where: {
      skuId: {
        in: skuIds,
      },
    },
    _count: {
      _all: true,
    },
  });

  const summary = new Map<string, StockSummary>();

  for (const skuId of skuIds) {
    summary.set(skuId, emptyStock());
  }

  for (const row of rows) {
    const current = summary.get(row.skuId) ?? emptyStock();

    if (row.status === CardItemStatus.AVAILABLE) {
      current.available = row._count._all;
    }

    if (row.status === CardItemStatus.RESERVED) {
      current.reserved = row._count._all;
    }

    if (row.status === CardItemStatus.SOLD) {
      current.sold = row._count._all;
    }

    summary.set(row.skuId, current);
  }

  return summary;
}

async function listInventoryCardItems(input?: {
  where?: Prisma.CardItemWhereInput;
  take?: number;
}) {
  const items = await prisma.cardItem.findMany({
    where: input?.where,
    select: inventoryCardItemSelect,
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    take: input?.take ?? 80,
  });

  return hydrateInventoryCardItems(items);
}

async function compactProductSkuSortOrders(
  tx: Prisma.TransactionClient,
  productId: string,
) {
  const skus = await tx.productSku.findMany({
    where: {
      productId,
    },
    select: {
      id: true,
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  await Promise.all(
    skus.map((sku, index) =>
      tx.productSku.update({
        where: {
          id: sku.id,
        },
        data: {
          sortOrder: index,
        },
      }),
    ),
  );
}

function getStartingPriceCents(
  fallbackPriceCents: number,
  skus: Array<{ priceCents: number; enabled: boolean }>,
) {
  const candidates = skus.filter((sku) => sku.enabled);
  const source = candidates.length > 0 ? candidates : skus;

  if (source.length === 0) {
    return fallbackPriceCents;
  }

  return Math.min(...source.map((sku) => sku.priceCents));
}

async function hydrateProductsWithSkuStock<TProduct extends ProductWithSkuShape>(
  products: TProduct[],
): Promise<Array<HydratedProductWithSkuStock<TProduct>>> {
  const skuStockSummary = await getSkuStockSummary(products.flatMap((product) => product.skus.map((sku) => sku.id)));

  return products.map((product) => {
    const skus = product.skus.map((sku) => ({
      ...sku,
      stock: skuStockSummary.get(sku.id) ?? emptyStock(),
    }));
    const visibleSkus = skus.filter((sku) => sku.enabled);

    const hydratedProduct: HydratedProductWithSkuStock<TProduct> = {
      ...product,
      skus,
      stock: mergeStocks((visibleSkus.length > 0 ? visibleSkus : skus).map((sku) => sku.stock)),
      startingPriceCents: getStartingPriceCents(product.priceCents, skus),
    };

    return hydratedProduct;
  });
}

function centsToAmount(cents: number) {
  return (cents / 100).toFixed(2);
}

function getOrderUrls(publicToken: string) {
  const baseUrl = getEnv().shopPublicBaseUrl;

  return {
    returnUrl: `${baseUrl}/orders/${publicToken}?sync=1`,
    callbackUrl: `${baseUrl}/api/novapay/callback`,
  };
}

async function syncPaymentAttemptsForOrder(
  tx: Prisma.TransactionClient,
  orderId: string,
  data: Prisma.ShopPaymentAttemptUpdateManyMutationInput,
  input?: {
    includeTerminal?: boolean;
  },
) {
  await tx.shopPaymentAttempt.updateMany({
    where: {
      shopOrderId: orderId,
      ...(input?.includeTerminal
        ? {}
        : {
            status: {
              notIn: [
                PaymentAttemptStatus.SUCCEEDED,
                PaymentAttemptStatus.FAILED,
                PaymentAttemptStatus.CANCELLED,
                PaymentAttemptStatus.EXPIRED,
              ],
            },
          }),
    },
    data,
  });
}

export async function enqueueOrderSyncTask(input: {
  taskType: string;
  scheduledAt?: Date;
  shopOrderId?: string | null;
  paymentAttemptId?: string | null;
  lastError?: string | null;
  payload?: unknown;
}) {
  return prisma.orderSyncTask.create({
    data: {
      taskType: input.taskType,
      shopOrderId: input.shopOrderId ?? null,
      paymentAttemptId: input.paymentAttemptId ?? null,
      scheduledAt: input.scheduledAt ?? new Date(),
      lastError: input.lastError ?? null,
      payload: input.payload === undefined ? null : toJsonString(input.payload),
    },
  });
}

function buildMerchantPaymentAttemptWhere(
  merchantAccountId: string,
): Prisma.ShopPaymentAttemptWhereInput {
  return {
    shopOrder: {
      paymentProfile: {
        is: {
          ownerId: merchantAccountId,
        },
      },
    },
  };
}

function buildMerchantSyncTaskWhere(merchantAccountId: string): Prisma.OrderSyncTaskWhereInput {
  return {
    OR: [
      {
        shopOrder: {
          paymentProfile: {
            is: {
              ownerId: merchantAccountId,
            },
          },
        },
      },
      {
        paymentAttempt: {
          shopOrder: {
            paymentProfile: {
              is: {
                ownerId: merchantAccountId,
              },
            },
          },
        },
      },
    ],
  };
}

function buildWebhookLogWhere(input: {
  externalOrderIds: string[];
  traceIds: string[];
}): Prisma.WebhookEventLogWhereInput | null {
  const conditions: Prisma.WebhookEventLogWhereInput[] = [];

  if (input.externalOrderIds.length > 0) {
    conditions.push({
      externalOrderId: {
        in: input.externalOrderIds,
      },
    });
  }

  if (input.traceIds.length > 0) {
    conditions.push({
      traceId: {
        in: input.traceIds,
      },
    });
  }

  if (conditions.length === 0) {
    return null;
  }

  return {
    OR: conditions,
  };
}

function dedupeStrings(values: Array<string | null | undefined>) {
  return [...new Set(values.map((value) => value?.trim() ?? "").filter(Boolean))];
}

function parseSyncTaskPayload(payload: string | null) {
  if (!payload) {
    return {};
  }

  try {
    const parsed = JSON.parse(payload);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function getPayloadString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function parseWebhookRequestBody(body: string) {
  try {
    const parsed = JSON.parse(body);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

async function resolveWebhookLogOwnerId(log: {
  externalOrderId?: string | null;
  traceId?: string | null;
}) {
  const externalOrderId = log.externalOrderId?.trim() ?? "";
  const traceId = log.traceId?.trim() ?? "";

  if (externalOrderId) {
    const attempt = await prisma.shopPaymentAttempt.findUnique({
      where: {
        externalOrderId,
      },
      select: {
        shopOrder: {
          select: {
            paymentProfile: {
              select: {
                ownerId: true,
              },
            },
          },
        },
      },
    });

    if (attempt?.shopOrder.paymentProfile?.ownerId) {
      return attempt.shopOrder.paymentProfile.ownerId;
    }

    const order = await prisma.shopOrder.findUnique({
      where: {
        orderNo: externalOrderId,
      },
      select: {
        paymentProfile: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (order?.paymentProfile?.ownerId) {
      return order.paymentProfile.ownerId;
    }
  }

  if (!traceId) {
    return null;
  }

  const attempt = await prisma.shopPaymentAttempt.findFirst({
    where: {
      traceId,
    },
    select: {
      shopOrder: {
        select: {
          paymentProfile: {
            select: {
              ownerId: true,
            },
          },
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return attempt?.shopOrder.paymentProfile?.ownerId ?? null;
}

async function loadPaymentOperationsData(input: {
  scopeAttemptWhere?: Prisma.ShopPaymentAttemptWhereInput;
  scopeSyncTaskWhere?: Prisma.OrderSyncTaskWhereInput;
  scopeWebhookLogWhere?: Prisma.WebhookEventLogWhereInput | null;
  scopeControlAuditWhere?: Prisma.ControlAuditLogWhereInput;
  filters: PaymentOperationsFilters;
}): Promise<PaymentOperationsData> {
  const attemptWhere = buildPaymentAttemptConsoleWhere({
    scopeWhere: input.scopeAttemptWhere,
    filters: input.filters,
  });
  const syncTaskWhere = buildOrderSyncTaskConsoleWhere({
    scopeWhere: input.scopeSyncTaskWhere,
    filters: input.filters,
  });
  const attemptScopeWhereForWebhook = buildPaymentAttemptConsoleWhere({
    scopeWhere: input.scopeAttemptWhere,
    filters: input.filters,
    includeKeyword: false,
  });
  const attemptWhereForKeywordWebhook = input.filters.keyword
    ? buildPaymentAttemptConsoleWhere({
        scopeWhere: input.scopeAttemptWhere,
        filters: input.filters,
      })
    : undefined;
  const channelOptionWhere = buildPaymentAttemptConsoleWhere({
    scopeWhere: input.scopeAttemptWhere,
    filters: input.filters,
    includeKeyword: false,
    includeStatus: false,
    includeChannel: false,
  });
  const [webhookScopeFromAttempts, webhookKeywordScopeFromAttempts] = await Promise.all([
    buildWebhookWhereFromAttempts(attemptScopeWhereForWebhook),
    buildWebhookWhereFromAttempts(attemptWhereForKeywordWebhook),
  ]);
  const webhookLogWhere = mergeWebhookWhereWithAnd(
    mergeWebhookWhereWithAnd(input.scopeWebhookLogWhere, webhookScopeFromAttempts),
    buildWebhookStatusWhere(input.filters.callbackStatus),
    input.filters.keyword
      ? mergeWebhookWhereWithOr(
          buildWebhookDirectKeywordWhere(input.filters.keyword),
          webhookKeywordScopeFromAttempts,
        )
      : undefined,
  );
  const callbackWhere = webhookLogWhere ?? undefined;
  const controlAuditWhere = buildControlAuditWhere({
    scopeWhere: input.scopeControlAuditWhere,
    filters: input.filters,
  });

  const [
    channelRows,
    attempts,
    syncTasks,
    callbackLogs,
    controlAuditLogs,
    controlAuditDigest,
    totalAttempts,
    inFlightAttempts,
    succeededAttempts,
    failedAttempts,
    totalCallbacks,
    succeededCallbacks,
    failedCallbacks,
    pendingCallbacks,
    queuedSyncTasks,
    failedSyncTasks,
  ] = await Promise.all([
    prisma.shopPaymentAttempt.groupBy({
      by: ["channelCode"],
      where: channelOptionWhere,
      orderBy: {
        channelCode: "asc",
      },
    }),
    prisma.shopPaymentAttempt.findMany({
      where: attemptWhere,
      select: paymentAttemptConsoleSelect,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      take: 16,
    }),
    prisma.orderSyncTask.findMany({
      where: syncTaskWhere,
      select: orderSyncTaskConsoleSelect,
      orderBy: [{ scheduledAt: "desc" }, { createdAt: "desc" }],
      take: 16,
    }),
    webhookLogWhere === null
      ? Promise.resolve([])
      : prisma.webhookEventLog.findMany({
          where: callbackWhere,
          select: webhookEventLogConsoleSelect,
          orderBy: [{ createdAt: "desc" }],
          take: 12,
        }),
    prisma.controlAuditLog.findMany({
      where: controlAuditWhere,
      select: controlAuditLogSelect,
      orderBy: [{ createdAt: "desc" }],
      take: 12,
    }),
    getPaymentOperationsControlAuditDigest({
      scopeControlAuditWhere: input.scopeControlAuditWhere,
      filters: input.filters,
    }),
    prisma.shopPaymentAttempt.count({
      where: attemptWhere,
    }),
    prisma.shopPaymentAttempt.count({
      where: {
        AND: [
          attemptWhere ?? {},
          {
            status: {
              in: [...IN_FLIGHT_ATTEMPT_STATUSES],
            },
          },
        ],
      },
    }),
    prisma.shopPaymentAttempt.count({
      where: {
        AND: [
          attemptWhere ?? {},
          {
            status: PaymentAttemptStatus.SUCCEEDED,
          },
        ],
      },
    }),
    prisma.shopPaymentAttempt.count({
      where: {
        AND: [
          attemptWhere ?? {},
          {
            status: {
              in: [...FAILED_ATTEMPT_STATUSES],
            },
          },
        ],
      },
    }),
    webhookLogWhere === null
      ? Promise.resolve(0)
      : prisma.webhookEventLog.count({
          where: callbackWhere,
        }),
    webhookLogWhere === null
      ? Promise.resolve(0)
      : prisma.webhookEventLog.count({
          where: {
            AND: [
              callbackWhere ?? {},
              {
                processingStatus: "SUCCEEDED",
              },
            ],
          },
        }),
    webhookLogWhere === null
      ? Promise.resolve(0)
      : prisma.webhookEventLog.count({
          where: {
            AND: [
              callbackWhere ?? {},
              {
                processingStatus: {
                  in: ["FAILED", "REJECTED"],
                },
              },
            ],
          },
        }),
    webhookLogWhere === null
      ? Promise.resolve(0)
      : prisma.webhookEventLog.count({
          where: {
            AND: [
              callbackWhere ?? {},
              {
                processingStatus: "PROCESSING",
              },
            ],
          },
        }),
    prisma.orderSyncTask.count({
      where: {
        AND: [
          syncTaskWhere ?? {},
          {
            status: {
              in: [...QUEUED_SYNC_TASK_STATUSES],
            },
          },
        ],
      },
    }),
    prisma.orderSyncTask.count({
      where: {
        AND: [
          syncTaskWhere ?? {},
          {
            status: SyncTaskStatus.FAILED,
          },
        ],
      },
    }),
  ]);

  return {
    summary: {
      totalAttempts,
      inFlightAttempts,
      succeededAttempts,
      failedAttempts,
      totalCallbacks,
      succeededCallbacks,
      failedCallbacks,
      pendingCallbacks,
      queuedSyncTasks,
      failedSyncTasks,
    },
    attempts,
    callbackLogs,
    syncTasks,
    controlAuditLogs,
    controlAuditDigest,
    filters: input.filters,
    filterOptions: {
      channelCodes: channelRows.map((row) => row.channelCode),
    },
  };
}

async function listPaymentOperationsControlAuditLogs(input: {
  scopeControlAuditWhere?: Prisma.ControlAuditLogWhereInput;
  filters: PaymentOperationsFilters;
  take?: number;
}) {
  const controlAuditWhere = buildControlAuditWhere({
    scopeWhere: input.scopeControlAuditWhere,
    filters: input.filters,
  });

  return prisma.controlAuditLog.findMany({
    where: controlAuditWhere,
    select: controlAuditLogSelect,
    orderBy: [{ createdAt: "desc" }],
    take: input.take ?? 500,
  });
}

export async function getAdminPaymentOperationsData(
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
) {
  return loadPaymentOperationsData({
    scopeAttemptWhere: undefined,
    scopeSyncTaskWhere: undefined,
    scopeWebhookLogWhere: undefined,
    scopeControlAuditWhere: undefined,
    filters: normalizePaymentOperationsFilters(search ?? {}),
  });
}

export async function getMerchantPaymentOperationsData(
  merchantAccountId: string,
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
) {
  const filters = normalizePaymentOperationsFilters(search ?? {});
  const scopeAttemptWhere = buildMerchantPaymentAttemptWhere(merchantAccountId);
  const scopeSyncTaskWhere = buildMerchantSyncTaskWhere(merchantAccountId);
  const scopeWebhookLogWhere = await buildWebhookWhereFromAttempts(scopeAttemptWhere);

  return loadPaymentOperationsData({
    scopeAttemptWhere,
    scopeSyncTaskWhere,
    scopeWebhookLogWhere,
    scopeControlAuditWhere: {
      merchantAccountId,
    },
    filters,
  });
}

export async function listAdminControlAuditLogsForExport(
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
  options?: {
    take?: number;
  },
) {
  return listPaymentOperationsControlAuditLogs({
    scopeControlAuditWhere: undefined,
    filters: normalizePaymentOperationsFilters(search ?? {}),
    take: options?.take,
  });
}

export async function listMerchantControlAuditLogsForExport(
  merchantAccountId: string,
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
  options?: {
    take?: number;
  },
) {
  return listPaymentOperationsControlAuditLogs({
    scopeControlAuditWhere: {
      merchantAccountId,
    },
    filters: normalizePaymentOperationsFilters(search ?? {}),
    take: options?.take,
  });
}

export async function getAdminControlAuditDigestForExport(
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
) {
  return getPaymentOperationsControlAuditDigest({
    scopeControlAuditWhere: undefined,
    filters: normalizePaymentOperationsFilters(search ?? {}),
  });
}

export async function getMerchantControlAuditDigestForExport(
  merchantAccountId: string,
  search?: Partial<Record<keyof PaymentOperationsFilters, string | undefined>>,
) {
  return getPaymentOperationsControlAuditDigest({
    scopeControlAuditWhere: {
      merchantAccountId,
    },
    filters: normalizePaymentOperationsFilters(search ?? {}),
  });
}

async function requirePaymentProfileForOrderNo(orderNo: string) {
  const paymentProfile = await getPaymentProfileForOrderNo(orderNo);
  return paymentProfile ?? requireDefaultPaymentProfile();
}

async function requirePaymentProfileForProduct(paymentProfileId?: string | null) {
  if (paymentProfileId) {
    return requirePaymentProfileById(paymentProfileId);
  }

  return requireDefaultPaymentProfile();
}

async function syncProductPriceCache(tx: Prisma.TransactionClient, productId: string) {
  const activeSku = await tx.productSku.findFirst({
    where: {
      productId,
      enabled: true,
    },
    orderBy: [{ priceCents: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const fallbackSku = activeSku
    ? null
    : await tx.productSku.findFirst({
        where: {
          productId,
        },
        orderBy: [{ priceCents: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
      });

  if (!activeSku && !fallbackSku) {
    return;
  }

  await tx.product.update({
    where: {
      id: productId,
    },
    data: {
      priceCents: activeSku?.priceCents ?? fallbackSku?.priceCents ?? 0,
    },
  });
}

function normalizeSkuName(value: string) {
  const name = value.trim();
  return name || DEFAULT_SKU_NAME;
}

function normalizeProductSaleMode(value: ProductSaleMode) {
  return value === ProductSaleMode.MULTI ? ProductSaleMode.MULTI : ProductSaleMode.SINGLE;
}

async function assertProductSlugAvailable(input: {
  slug: string;
  excludeProductId?: string;
}) {
  const existing = await prisma.product.findFirst({
    where: {
      slug: input.slug,
      ...(input.excludeProductId
        ? {
            id: {
              not: input.excludeProductId,
            },
          }
        : {}),
    },
    select: {
      id: true,
    },
  });

  if (existing) {
    throw new Error("商品别名已存在，请换一个。");
  }
}

async function assertProductDeletionAllowed(
  tx: Prisma.TransactionClient,
  productId: string,
) {
  const [orderCount, cardStates] = await Promise.all([
    tx.shopOrder.count({
      where: {
        productId,
      },
    }),
    tx.cardItem.groupBy({
      by: ["status"],
      where: {
        productId,
      },
      _count: {
        _all: true,
      },
    }),
  ]);

  if (orderCount > 0) {
    throw new Error("这个商品已有历史订单，不能直接删除，请改为归档处理。");
  }

  const reservedCount = cardStates.find((row) => row.status === CardItemStatus.RESERVED)?._count._all ?? 0;
  const soldCount = cardStates.find((row) => row.status === CardItemStatus.SOLD)?._count._all ?? 0;

  if (reservedCount > 0 || soldCount > 0) {
    throw new Error("这个商品存在已占用或已售库存，暂时不能直接删除。");
  }
}

async function assertSkuDeletionAllowed(
  tx: Prisma.TransactionClient,
  skuId: string,
) {
  const sku = await tx.productSku.findUnique({
    where: {
      id: skuId,
    },
    select: {
      id: true,
      productId: true,
      product: {
        select: {
          id: true,
          _count: {
            select: {
              skus: true,
            },
          },
        },
      },
    },
  });

  if (!sku) {
    throw new Error("SKU 不存在。");
  }

  if (sku.product._count.skus <= 1) {
    throw new Error("商品至少需要保留一个 SKU，不能把最后一个规格删除。");
  }

  const [orderCount, cardStates] = await Promise.all([
    tx.shopOrder.count({
      where: {
        skuId,
      },
    }),
    tx.cardItem.groupBy({
      by: ["status"],
      where: {
        skuId,
      },
      _count: {
        _all: true,
      },
    }),
  ]);

  if (orderCount > 0) {
    throw new Error("这个 SKU 已有关联订单，不能直接删除。");
  }

  const reservedCount = cardStates.find((row) => row.status === CardItemStatus.RESERVED)?._count._all ?? 0;
  const soldCount = cardStates.find((row) => row.status === CardItemStatus.SOLD)?._count._all ?? 0;

  if (reservedCount > 0 || soldCount > 0) {
    throw new Error("这个 SKU 还有已占用或已售库存，暂时不能删除。");
  }

  return sku;
}

async function requireMerchantOwnedPaymentProfileForProduct(
  merchantAccountId: string,
  nextStatus: ProductStatus,
) {
  const paymentProfile = await getMerchantOwnedPaymentProfile(merchantAccountId);

  if (!paymentProfile) {
    throw new Error("请先在商户中心配置自己的 NovaPay 商户参数，再创建商品。");
  }

  if (!paymentProfile.isActive && nextStatus === ProductStatus.ACTIVE) {
    throw new Error("你的收款商户当前未启用，请先启用商户参数后再上架商品。");
  }

  return paymentProfile;
}

function applyPublicSaleMode<
  TProduct extends {
    saleMode: ProductSaleMode;
    skus: Array<{
      id: string;
      priceCents: number;
      stock: StockSummary;
    }>;
    stock: StockSummary;
    startingPriceCents: number;
  },
>(product: TProduct): TProduct {
  if (product.saleMode !== ProductSaleMode.SINGLE) {
    return product;
  }

  const primarySku = product.skus[0];

  if (!primarySku) {
    return product;
  }

  return {
    ...product,
    skus: [primarySku],
    stock: primarySku.stock,
    startingPriceCents: primarySku.priceCents,
  };
}

export async function listActiveProducts() {
  return listStorefrontProducts({
    status: ProductStatus.ACTIVE,
  });
}

export async function getPublicProductBySlug(slug: string) {
  return getStorefrontProduct({
    slug,
    status: ProductStatus.ACTIVE,
  });
}

export async function getPlatformStorefrontProductBySlug(slug: string) {
  return getStorefrontProduct({
    slug,
    status: ProductStatus.ACTIVE,
    OR: [
      {
        paymentProfileId: null,
      },
      {
        paymentProfile: {
          is: {
            ownerId: null,
          },
        },
      },
    ],
  });
}

async function listStorefrontProducts(where: Prisma.ProductWhereInput) {
  const products = await prisma.product.findMany({
    where,
    include: publicProductInclude,
    orderBy: [{ createdAt: "desc" }],
  });

  const hydratedProducts = await hydrateProductsWithSkuStock(products);
  return hydratedProducts.map((product) => applyPublicSaleMode(product)) as PublicStorefrontProduct[];
}

async function getStorefrontProduct(where: Prisma.ProductWhereInput) {
  const product = await prisma.product.findFirst({
    where,
    include: publicProductInclude,
  });

  if (!product) {
    return null;
  }

  const [hydrated] = await hydrateProductsWithSkuStock([product]);
  return applyPublicSaleMode(hydrated) as PublicStorefrontProduct;
}

export async function listPlatformActiveProducts() {
  return listStorefrontProducts({
    status: ProductStatus.ACTIVE,
    OR: [
      {
        paymentProfileId: null,
      },
      {
        paymentProfile: {
          is: {
            ownerId: null,
          },
        },
      },
    ],
  });
}

export async function listActiveProductsByMerchant(merchantAccountId: string) {
  return listStorefrontProducts({
    status: ProductStatus.ACTIVE,
    paymentProfile: {
      is: {
        ownerId: merchantAccountId,
      },
    },
  });
}

export async function getMerchantStorefrontProductBySlug(
  merchantAccountId: string,
  slug: string,
) {
  return getStorefrontProduct({
    slug,
    status: ProductStatus.ACTIVE,
    paymentProfile: {
      is: {
        ownerId: merchantAccountId,
      },
    },
  });
}

async function releaseOrderReservation(
  tx: Prisma.TransactionClient,
  orderId: string,
  nextStatus: ShopOrderStatus,
  failureMessage?: string | null,
  payload?: unknown,
  attemptUpdate?: Prisma.ShopPaymentAttemptUpdateManyMutationInput,
) {
  const now = new Date();

  await tx.cardItem.updateMany({
    where: {
      orderId,
      status: CardItemStatus.RESERVED,
    },
    data: {
      status: CardItemStatus.AVAILABLE,
      orderId: null,
      reservedAt: null,
      updatedAt: now,
    },
  });

  await tx.shopOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: nextStatus,
      failureMessage: failureMessage ?? null,
      lastNovaPayload: payload === undefined ? undefined : toJsonString(payload),
      updatedAt: now,
    },
  });

  if (attemptUpdate) {
    await syncPaymentAttemptsForOrder(tx, orderId, attemptUpdate);
  }
}

async function fulfillOrder(
  tx: Prisma.TransactionClient,
  orderId: string,
  payload: {
    gatewayOrderId?: string | null;
    providerStatus?: string | null;
    status?: string | null;
    paidAt?: string | null;
  },
  rawPayload?: unknown,
  attemptUpdate?: Prisma.ShopPaymentAttemptUpdateManyMutationInput,
) {
  const order = await tx.shopOrder.findUnique({
    where: {
      id: orderId,
    },
  });

  const now = new Date();

  if (!order) {
    throw new Error("订单不存在。");
  }

  if (order.status === ShopOrderStatus.FULFILLED) {
    const paidAt = parseOptionalDate(payload.paidAt) ?? order.paidAt ?? now;

    if (attemptUpdate) {
      await syncPaymentAttemptsForOrder(tx, orderId, attemptUpdate, { includeTerminal: true });
    }

    return tx.shopOrder.update({
      where: {
        id: orderId,
      },
      data: {
        novapayOrderId: payload.gatewayOrderId ?? order.novapayOrderId,
        novapayStatus: payload.status ?? order.novapayStatus,
        paidAt,
        lastSyncedAt: now,
        lastNovaPayload: rawPayload === undefined ? undefined : toJsonString(rawPayload),
        updatedAt: now,
      },
    });
  }

  await tx.cardItem.updateMany({
    where: {
      orderId,
      status: CardItemStatus.RESERVED,
    },
    data: {
      status: CardItemStatus.SOLD,
      reservedAt: null,
      soldAt: parseOptionalDate(payload.paidAt) ?? now,
      updatedAt: now,
    },
  });

  if (attemptUpdate) {
    await syncPaymentAttemptsForOrder(tx, orderId, attemptUpdate, { includeTerminal: true });
  }

  return tx.shopOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: ShopOrderStatus.FULFILLED,
      novapayOrderId: payload.gatewayOrderId ?? order.novapayOrderId,
      novapayStatus: payload.status ?? order.novapayStatus,
      paidAt: parseOptionalDate(payload.paidAt) ?? now,
      fulfilledAt: now,
      failureMessage: null,
      lastSyncedAt: now,
      lastNovaPayload: rawPayload === undefined ? undefined : toJsonString(rawPayload),
      updatedAt: now,
    },
  });
}

async function applyRemoteOrderResult(
  orderNo: string,
  remoteOrder: Record<string, unknown>,
  context: RemoteOrderContext,
) {
  const order = await prisma.shopOrder.findUnique({
    where: {
      orderNo,
    },
    include: orderInclude,
  });

  if (!order) {
    return null;
  }

  const remoteStatus = normalizeOptionalString(remoteOrder.status);
  const providerStatus = normalizeOptionalString(remoteOrder.providerStatus);
  const gatewayOrderId = normalizeOptionalString(remoteOrder.gatewayOrderId);
  const paidAt = normalizeOptionalString(remoteOrder.paidAt);
  const checkoutUrl = normalizeOptionalString(remoteOrder.checkoutUrl);
  const hostedCheckoutUrl = normalizeOptionalString(remoteOrder.hostedCheckoutUrl);

  if (isNovaPaySuccessStatus(remoteStatus)) {
    const attemptUpdate = buildPaymentAttemptRemoteUpdate({
      remoteOrder,
      context,
      remoteStatus,
      gatewayOrderId,
      checkoutUrl,
      hostedCheckoutUrl,
      fallbackOrderStatus: ShopOrderStatus.FULFILLED,
    });

    await prisma.$transaction((tx) =>
      fulfillOrder(
        tx,
        order.id,
        {
          gatewayOrderId,
          providerStatus,
          status: remoteStatus,
          paidAt,
        },
        buildAttemptRemotePayload(context, remoteOrder),
        attemptUpdate,
      ),
    );
  } else if (isNovaPayFailedStatus(remoteStatus)) {
    const nextStatus =
      order.expiresAt <= new Date() ? ShopOrderStatus.EXPIRED : ShopOrderStatus.FAILED;
    const attemptUpdate = buildPaymentAttemptRemoteUpdate({
      remoteOrder,
      context,
      remoteStatus,
      gatewayOrderId,
      checkoutUrl,
      hostedCheckoutUrl,
      fallbackOrderStatus: nextStatus,
    });

    await prisma.$transaction((tx) =>
      releaseOrderReservation(
        tx,
        order.id,
        nextStatus,
        "支付未完成，库存已回退。",
        buildAttemptRemotePayload(context, remoteOrder),
        attemptUpdate,
      ),
    );
  } else {
    const attemptUpdate = buildPaymentAttemptRemoteUpdate({
      remoteOrder,
      context,
      remoteStatus,
      gatewayOrderId,
      checkoutUrl,
      hostedCheckoutUrl,
      fallbackOrderStatus: order.status,
    });

    await prisma.$transaction(async (tx) => {
      const now = new Date();

      await tx.shopOrder.update({
        where: {
          id: order.id,
        },
        data: {
          novapayOrderId: gatewayOrderId ?? order.novapayOrderId,
          novapayStatus: remoteStatus,
          checkoutUrl: checkoutUrl ?? order.checkoutUrl,
          hostedCheckoutUrl: hostedCheckoutUrl ?? order.hostedCheckoutUrl,
          lastSyncedAt: now,
          lastNovaPayload: toJsonString(buildAttemptRemotePayload(context, remoteOrder)),
          updatedAt: now,
        },
      });

      await syncPaymentAttemptsForOrder(tx, order.id, attemptUpdate, { includeTerminal: true });
    });
  }

  const refreshedOrder = await prisma.shopOrder.findUnique({
    where: {
      id: order.id,
    },
    include: orderInclude,
  });

  return refreshedOrder ? hydrateOrderWithCardSecrets(refreshedOrder) : null;
}

export async function cleanupExpiredOrders() {
  const staleOrders = await prisma.shopOrder.findMany({
    where: {
      status: ShopOrderStatus.PENDING_PAYMENT,
      expiresAt: {
        lt: new Date(),
      },
    },
    select: {
      id: true,
      orderNo: true,
      expiresAt: true,
    },
    orderBy: [{ expiresAt: "asc" }],
    take: 20,
  });

  for (const order of staleOrders) {
    try {
      const paymentProfile = await requirePaymentProfileForOrderNo(order.orderNo);
      const queried = await queryNovaPayOrder(order.orderNo, paymentProfile);
      const synced = await applyRemoteOrderResult(
        order.orderNo,
        queried.order as unknown as Record<string, unknown>,
        { source: "expiry_query" },
      );

      if (synced?.status === ShopOrderStatus.FULFILLED) {
        continue;
      }

      if (synced?.status === ShopOrderStatus.FAILED || synced?.status === ShopOrderStatus.EXPIRED) {
        continue;
      }

      const closed = await closeNovaPayOrder(order.orderNo, paymentProfile);
      await applyRemoteOrderResult(
        order.orderNo,
        closed.order as unknown as Record<string, unknown>,
        { source: "expiry_close" },
      );
    } catch {
      const context = { source: "expiry_fallback" } satisfies RemoteOrderContext;

      await prisma.$transaction((tx) =>
        releaseOrderReservation(
          tx,
          order.id,
          ShopOrderStatus.EXPIRED,
          "订单超时未支付，系统已释放卡密库存。",
          buildAttemptRemotePayload(context),
          buildPaymentAttemptFailureUpdate({
            context,
            status: PaymentAttemptStatus.EXPIRED,
            errorMessage: "订单超时未支付，系统已释放卡密库存。",
          }),
        ),
      );
    }
  }
}

export async function createShopOrder(input: {
  skuId: string;
  channelCode?: string;
  quantity: number;
  customerEmail: string;
}) {
  await cleanupExpiredOrders();
  const email = normalizeEmail(input.customerEmail);
  const quantity = Math.max(1, Math.min(10, Math.floor(input.quantity)));

  const reserved = await prisma.$transaction(async (tx) => {
    const sku = await tx.productSku.findUnique({
      where: {
        id: input.skuId,
      },
      include: {
        product: true,
      },
    });

    if (!sku || !sku.enabled || sku.product.status !== ProductStatus.ACTIVE) {
      throw new Error("所选规格不存在或当前不可售。");
    }

    const paymentProfile = await requirePaymentProfileForProduct(sku.product.paymentProfileId);
    const selectedChannelCode = input.channelCode?.trim() || paymentProfile.defaultChannelCode;

    if (!paymentProfile.enabledChannelCodes.includes(selectedChannelCode)) {
      throw new Error("所选支付方式当前不可用，请重新选择。");
    }

    const availableCards = await tx.cardItem.findMany({
      where: {
        skuId: sku.id,
        status: CardItemStatus.AVAILABLE,
      },
      orderBy: [{ createdAt: "asc" }],
      take: quantity,
    });

    if (availableCards.length < quantity) {
      throw new Error("该规格库存不足，暂时无法完成下单。");
    }

    const orderNo = generateOrderNo();
    const publicToken = generateToken();
    const traceId = generateToken();
    const expiresAt = new Date(Date.now() + ORDER_RESERVE_MINUTES * 60_000);
    const createPayload = {
      externalOrderId: orderNo,
      amount: centsToAmount(sku.priceCents * quantity),
      subject: `${sku.product.name} - ${sku.name}`,
      description: `${sku.product.name} / ${sku.name} x${quantity}`,
      ...getOrderUrls(publicToken),
      channelCode: selectedChannelCode,
    };
    const order = await tx.shopOrder.create({
      data: {
        orderNo,
        publicToken,
        productId: sku.product.id,
        paymentProfileId: paymentProfile.id,
        skuId: sku.id,
        quantity,
        customerEmail: email,
        amountCents: sku.priceCents * quantity,
        channelCode: selectedChannelCode,
        expiresAt,
      },
    });

    const attempt = await tx.shopPaymentAttempt.create({
      data: {
        shopOrderId: order.id,
        externalOrderId: order.orderNo,
        merchantChannelAccountId: null,
        channelCode: createPayload.channelCode,
        amountCents: order.amountCents,
        status: PaymentAttemptStatus.CREATED,
        expiresAt,
        traceId,
        createRequestPayload: toJsonString({
          traceId,
          merchantCode: paymentProfile.merchantCode,
          paymentProfileId: paymentProfile.id,
          ...createPayload,
        }),
      },
    });

    const now = new Date();
    const result = await tx.cardItem.updateMany({
      where: {
        id: {
          in: availableCards.map((card) => card.id),
        },
        status: CardItemStatus.AVAILABLE,
      },
      data: {
        status: CardItemStatus.RESERVED,
        orderId: order.id,
        reservedAt: now,
        updatedAt: now,
      },
    });

    if (result.count !== quantity) {
      throw new Error("库存正在被其他订单占用，请稍后重试。");
    }

    return {
      order,
      attempt,
      paymentProfile,
      product: sku.product,
      sku,
      createPayload,
      traceId,
    };
  });

  try {
    const createContext = {
      source: "create",
      traceId: reserved.traceId,
    } satisfies RemoteOrderContext;
    const payment = await createNovaPayOrder(reserved.createPayload, reserved.paymentProfile);
    const createNow = new Date();
    const [updated] = await prisma.$transaction([
      prisma.shopOrder.update({
        where: {
          id: reserved.order.id,
        },
        data: {
          novapayOrderId: payment.order.gatewayOrderId ?? payment.order.id,
          novapayStatus: payment.order.status,
          checkoutUrl: payment.order.checkoutUrl,
          hostedCheckoutUrl: payment.order.hostedCheckoutUrl,
          lastNovaCreateResponse: toJsonString(payment),
          lastSyncedAt: createNow,
        },
        include: orderInclude,
      }),
      prisma.shopPaymentAttempt.update({
        where: {
          id: reserved.attempt.id,
        },
        data: {
          novapayOrderId: payment.order.gatewayOrderId ?? payment.order.id,
          status: resolvePaymentAttemptStatus({
            remoteStatus: payment.order.status,
          }),
          checkoutUrl: payment.order.checkoutUrl,
          hostedCheckoutUrl: payment.order.hostedCheckoutUrl,
          createResponsePayload: toJsonString(payment),
          lastRemotePayload: toJsonString(
            buildAttemptRemotePayload(
              createContext,
              payment.order as unknown as Record<string, unknown>,
            ),
          ),
          lastSyncedAt: createNow,
        },
      }),
    ]);

    if (isNovaPaySuccessStatus(payment.order.status)) {
      return applyRemoteOrderResult(
        updated.orderNo,
        payment.order as unknown as Record<string, unknown>,
        createContext,
      );
    }

    return hydrateOrderWithCardSecrets(updated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "创建支付订单失败。";
    const failureContext = {
      source: "create_error",
      traceId: reserved.traceId,
    } satisfies RemoteOrderContext;

    await prisma.$transaction((tx) =>
      releaseOrderReservation(
        tx,
        reserved.order.id,
        ShopOrderStatus.FAILED,
        errorMessage,
        buildAttemptRemotePayload(failureContext, undefined, {
          externalOrderId: reserved.order.orderNo,
        }),
        buildPaymentAttemptFailureUpdate({
          context: failureContext,
          status: PaymentAttemptStatus.FAILED,
          errorMessage,
          payload: {
            externalOrderId: reserved.order.orderNo,
          },
        }),
      ),
    );

    await enqueueOrderSyncTask({
      taskType: "novapay.order.create.reconcile",
      shopOrderId: reserved.order.id,
      paymentAttemptId: reserved.attempt.id,
      lastError: errorMessage,
      payload: {
        externalOrderId: reserved.order.orderNo,
        paymentProfileId: reserved.paymentProfile.id,
        traceId: reserved.traceId,
      },
    });

    throw error;
  }
}

export async function getOrderByPublicToken(publicToken: string) {
  const order = await prisma.shopOrder.findUnique({
    where: {
      publicToken,
    },
    include: orderInclude,
  });

  return order ? hydrateOrderWithCardSecrets(order) : null;
}

export async function lookupOrder(orderNo: string, customerEmail: string) {
  const order = await prisma.shopOrder.findUnique({
    where: {
      orderNo: orderNo.trim(),
    },
    include: orderInclude,
  });

  if (!order) {
    return null;
  }

  if (order.customerEmail !== normalizeEmail(customerEmail)) {
    return null;
  }

  return hydrateOrderWithCardSecrets(order);
}

async function refreshOrderByPublicTokenWithAccess(
  publicToken: string,
  options?: {
    merchantAccountId?: string;
    source?: string;
  },
) {
  const order = await prisma.shopOrder.findUnique({
    where: {
      publicToken,
    },
    select: {
      orderNo: true,
      publicToken: true,
      status: true,
      paymentProfile: {
        select: {
          ownerId: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("订单不存在。");
  }

  if (options?.merchantAccountId && order.paymentProfile?.ownerId !== options.merchantAccountId) {
    throw new Error("你没有权限操作这笔订单。");
  }

  if (order.status !== ShopOrderStatus.PENDING_PAYMENT) {
    return getOrderByPublicToken(publicToken);
  }

  const paymentProfile = await requirePaymentProfileForOrderNo(order.orderNo);
  const queried = await queryNovaPayOrder(order.orderNo, paymentProfile);
  return applyRemoteOrderResult(
    order.orderNo,
    queried.order as unknown as Record<string, unknown>,
    { source: options?.source ?? "manual_query" },
  );
}

export async function refreshOrderByPublicToken(publicToken: string) {
  return refreshOrderByPublicTokenWithAccess(publicToken, {
    source: "manual_query",
  });
}

export async function refreshMerchantOwnedOrderByPublicToken(
  publicToken: string,
  merchantAccountId: string,
) {
  return refreshOrderByPublicTokenWithAccess(publicToken, {
    merchantAccountId,
    source: "merchant_manual_query",
  });
}

export async function refreshOrderByLookup(orderNo: string, customerEmail: string) {
  const order = await lookupOrder(orderNo, customerEmail);

  if (!order) {
    throw new Error("未找到对应订单。");
  }

  if (order.status !== ShopOrderStatus.PENDING_PAYMENT) {
    return order;
  }

  const paymentProfile = await requirePaymentProfileForOrderNo(order.orderNo);
  const queried = await queryNovaPayOrder(order.orderNo, paymentProfile);
  return applyRemoteOrderResult(
    order.orderNo,
    queried.order as unknown as Record<string, unknown>,
    { source: "lookup_query" },
  );
}

export async function handleNovaPayCallback(input: {
  externalOrderId: string;
  order: Record<string, unknown>;
  callbackEventId?: string | null;
  traceId?: string | null;
}) {
  return applyRemoteOrderResult(input.externalOrderId, input.order, {
    source: "callback",
    callbackEventId: input.callbackEventId ?? null,
    traceId: input.traceId ?? null,
  });
}

export async function runOrderSyncTask(taskId: string) {
  const task = await prisma.orderSyncTask.findUnique({
    where: {
      id: taskId.trim(),
    },
    select: orderSyncTaskExecutionSelect,
  });

  if (!task) {
    throw new Error("补偿任务不存在。");
  }

  if (task.status === SyncTaskStatus.RUNNING) {
    throw new Error("补偿任务正在执行中，请稍后再试。");
  }

  const payload = parseSyncTaskPayload(task.payload);
  const externalOrderId =
    task.shopOrder?.orderNo ??
    task.paymentAttempt?.shopOrder?.orderNo ??
    task.paymentAttempt?.externalOrderId ??
    getPayloadString(payload, "externalOrderId");

  if (!externalOrderId) {
    throw new Error("补偿任务缺少订单号，暂时无法执行。");
  }

  const traceId = task.paymentAttempt?.traceId ?? getPayloadString(payload, "traceId");
  const payloadPaymentProfileId = getPayloadString(payload, "paymentProfileId");
  const now = new Date();

  await prisma.orderSyncTask.update({
    where: {
      id: task.id,
    },
    data: {
      status: SyncTaskStatus.RUNNING,
      startedAt: now,
      finishedAt: null,
      lastError: null,
      retryCount: {
        increment: 1,
      },
    },
  });

  try {
    const paymentProfile =
      task.shopOrder?.orderNo || task.paymentAttempt?.shopOrder?.orderNo
        ? await requirePaymentProfileForOrderNo(externalOrderId)
        : payloadPaymentProfileId
          ? await requirePaymentProfileById(payloadPaymentProfileId)
          : await requirePaymentProfileForOrderNo(externalOrderId);
    const queried = await queryNovaPayOrder(externalOrderId, paymentProfile);
    const synced = await applyRemoteOrderResult(
      externalOrderId,
      queried.order as unknown as Record<string, unknown>,
      {
        source: "sync_task_manual",
        traceId,
      },
    );

    if (!synced) {
      throw new Error("本地订单仍不存在，暂时无法完成这条补偿任务。");
    }

    await prisma.orderSyncTask.update({
      where: {
        id: task.id,
      },
      data: {
        status: SyncTaskStatus.SUCCEEDED,
        finishedAt: new Date(),
        lastError: null,
      },
    });

    return synced;
  } catch (error) {
    const message = error instanceof Error ? error.message : "补偿任务执行失败。";

    await prisma.orderSyncTask.update({
      where: {
        id: task.id,
      },
      data: {
        status: SyncTaskStatus.FAILED,
        finishedAt: new Date(),
        lastError: message,
      },
    });

    throw error;
  }
}

export async function runMerchantOwnedOrderSyncTask(taskId: string, merchantAccountId: string) {
  const task = await prisma.orderSyncTask.findUnique({
    where: {
      id: taskId.trim(),
    },
    select: {
      id: true,
      shopOrder: {
        select: {
          paymentProfile: {
            select: {
              ownerId: true,
            },
          },
        },
      },
      paymentAttempt: {
        select: {
          shopOrder: {
            select: {
              paymentProfile: {
                select: {
                  ownerId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!task) {
    throw new Error("补偿任务不存在。");
  }

  const ownerId =
    task.shopOrder?.paymentProfile?.ownerId ?? task.paymentAttempt?.shopOrder?.paymentProfile?.ownerId ?? null;

  if (ownerId !== merchantAccountId) {
    throw new Error("你没有权限操作这条补偿任务。");
  }

  return runOrderSyncTask(task.id);
}

export async function replayWebhookEventLog(logId: string) {
  const log = await prisma.webhookEventLog.findUnique({
    where: {
      id: logId.trim(),
    },
    select: {
      id: true,
      externalEventId: true,
      externalOrderId: true,
      eventType: true,
      traceId: true,
      requestBody: true,
    },
  });

  if (!log) {
    throw new Error("回调日志不存在。");
  }

  const payload = parseWebhookRequestBody(log.requestBody);
  const payloadOrder =
    payload.order && typeof payload.order === "object"
      ? (payload.order as Record<string, unknown>)
      : null;
  const externalOrderId =
    log.externalOrderId ??
    normalizeOptionalString(payloadOrder?.externalOrderId) ??
    normalizeOptionalString(payload.externalOrderId);
  const traceId =
    log.traceId ??
    normalizeOptionalString(payload.traceId) ??
    normalizeOptionalString(payloadOrder?.traceId);
  const eventType = log.eventType || normalizeOptionalString(payload.event) || "unknown";

  if (eventType !== "payment.order.updated" || !payloadOrder) {
    throw new Error("当前回调日志不是可重放的支付结果通知。");
  }

  if (!externalOrderId) {
    throw new Error("这条回调日志缺少外部订单号，暂时无法重放。");
  }

  await prisma.webhookEventLog.update({
    where: {
      id: log.id,
    },
    data: {
      processingStatus: "PROCESSING",
      processingError: null,
      traceId: traceId ?? undefined,
    },
  });

  const paymentAttempt = await prisma.shopPaymentAttempt.findUnique({
    where: {
      externalOrderId,
    },
    select: {
      id: true,
      shopOrderId: true,
    },
  });

  try {
    const order = await handleNovaPayCallback({
      externalOrderId,
      order: payloadOrder,
      callbackEventId: log.externalEventId,
      traceId,
    });

    if (!order) {
      const message = "未找到对应订单，已重新加入补偿队列。";

      await prisma.webhookEventLog.update({
        where: {
          id: log.id,
        },
        data: {
          processingStatus: "FAILED",
          processingError: message,
          traceId: traceId ?? undefined,
        },
      });

      await enqueueOrderSyncTask({
        taskType: "novapay.callback.reconcile",
        shopOrderId: paymentAttempt?.shopOrderId ?? null,
        paymentAttemptId: paymentAttempt?.id ?? null,
        lastError: message,
        payload: {
          externalEventId: log.externalEventId,
          externalOrderId,
          traceId,
          eventType,
          order: payloadOrder,
        },
      });

      throw new Error(message);
    }

    await prisma.webhookEventLog.update({
      where: {
        id: log.id,
      },
      data: {
        processingStatus: "SUCCEEDED",
        processingError: null,
        traceId: traceId ?? undefined,
      },
    });

    return order;
  } catch (error) {
    const message = error instanceof Error ? error.message : "回调重放失败。";

    await prisma.webhookEventLog.update({
      where: {
        id: log.id,
      },
      data: {
        processingStatus: "FAILED",
        processingError: message,
        traceId: traceId ?? undefined,
      },
    });

    await enqueueOrderSyncTask({
      taskType: "novapay.callback.reconcile",
      shopOrderId: paymentAttempt?.shopOrderId ?? null,
      paymentAttemptId: paymentAttempt?.id ?? null,
      lastError: message,
      payload: {
        externalEventId: log.externalEventId,
        externalOrderId,
        traceId,
        eventType,
        order: payloadOrder,
      },
    });

    throw error;
  }
}

export async function replayMerchantOwnedWebhookEventLog(logId: string, merchantAccountId: string) {
  const log = await prisma.webhookEventLog.findUnique({
    where: {
      id: logId.trim(),
    },
    select: {
      id: true,
      externalOrderId: true,
      traceId: true,
    },
  });

  if (!log) {
    throw new Error("回调日志不存在。");
  }

  const ownerId = await resolveWebhookLogOwnerId(log);

  if (ownerId !== merchantAccountId) {
    throw new Error("你没有权限重放这条回调日志。");
  }

  return replayWebhookEventLog(log.id);
}

export async function getMerchantDashboardData(merchantAccountId: string): Promise<{
  products: AdminDashboardProduct[];
  inventoryItems: InventoryCardItemSnapshot[];
  orders: AdminDashboardOrder[];
  stats: {
    productCount: number;
    activeCount: number;
    skuCount: number;
    availableCards: number;
    reservedCards: number;
    soldCards: number;
    totalOrders: number;
    pendingOrders: number;
    fulfilledOrders: number;
    failedOrders: number;
    expiredOrders: number;
    pendingVolume: number;
    paidVolume: number;
  };
}> {
  await cleanupExpiredOrders();

  const [products, inventoryItems, orders] = await Promise.all([
    prisma.product.findMany({
      where: {
        paymentProfile: {
          is: {
            ownerId: merchantAccountId,
          },
        },
      },
      include: {
        paymentProfile: {
          select: dashboardPaymentProfileSelect,
        },
        skus: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        },
      },
      orderBy: [{ createdAt: "desc" }],
    }),
    listInventoryCardItems({
      where: {
        product: {
          paymentProfile: {
            is: {
              ownerId: merchantAccountId,
            },
          },
        },
      },
    }),
    prisma.shopOrder.findMany({
      where: {
        paymentProfile: {
          is: {
            ownerId: merchantAccountId,
          },
        },
      },
      include: orderInclude,
      orderBy: [{ createdAt: "desc" }],
    }),
  ]);

  const hydratedProducts: AdminDashboardProduct[] = await hydrateProductsWithSkuStock(products);

  return {
    products: hydratedProducts,
    inventoryItems,
    orders: hydrateOrdersWithCardSecrets(orders),
    stats: {
      productCount: hydratedProducts.length,
      activeCount: hydratedProducts.filter((product) => product.status === ProductStatus.ACTIVE).length,
      skuCount: hydratedProducts.reduce((sum, product) => sum + product.skus.length, 0),
      availableCards: hydratedProducts.reduce((sum, product) => sum + product.stock.available, 0),
      reservedCards: hydratedProducts.reduce((sum, product) => sum + product.stock.reserved, 0),
      soldCards: hydratedProducts.reduce((sum, product) => sum + product.stock.sold, 0),
      totalOrders: orders.length,
      pendingOrders: orders.filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT).length,
      fulfilledOrders: orders.filter((order) => order.status === ShopOrderStatus.FULFILLED).length,
      failedOrders: orders.filter((order) => order.status === ShopOrderStatus.FAILED).length,
      expiredOrders: orders.filter((order) => order.status === ShopOrderStatus.EXPIRED).length,
      pendingVolume: orders
        .filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT)
        .reduce((sum, order) => sum + order.amountCents, 0),
      paidVolume: orders
        .filter((order) => order.status === ShopOrderStatus.FULFILLED)
        .reduce((sum, order) => sum + order.amountCents, 0),
    },
  };
}

export async function getAdminDashboardData(): Promise<{
  products: AdminDashboardProduct[];
  inventoryItems: InventoryCardItemSnapshot[];
  orders: AdminDashboardOrder[];
  stats: {
    productCount: number;
    activeCount: number;
    skuCount: number;
    availableCards: number;
    pendingOrders: number;
    fulfilledOrders: number;
    paidVolume: number;
  };
}> {
  await cleanupExpiredOrders();
  const [products, inventoryItems, orders] = await Promise.all([
    prisma.product.findMany({
      include: {
        paymentProfile: {
          select: dashboardPaymentProfileSelect,
        },
        skus: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        },
      },
      orderBy: [{ createdAt: "desc" }],
    }),
    listInventoryCardItems(),
    prisma.shopOrder.findMany({
      include: orderInclude,
      orderBy: [{ createdAt: "desc" }],
      take: 24,
    }),
  ]);

  const hydratedProducts: AdminDashboardProduct[] = await hydrateProductsWithSkuStock(products);

  return {
    products: hydratedProducts,
    inventoryItems,
    orders: hydrateOrdersWithCardSecrets(orders),
    stats: {
      productCount: products.length,
      activeCount: products.filter((product) => product.status === ProductStatus.ACTIVE).length,
      skuCount: hydratedProducts.reduce((sum, product) => sum + product.skus.length, 0),
      availableCards: hydratedProducts.reduce((sum, product) => sum + product.stock.available, 0),
      pendingOrders: orders.filter((order) => order.status === ShopOrderStatus.PENDING_PAYMENT).length,
      fulfilledOrders: orders.filter((order) => order.status === ShopOrderStatus.FULFILLED).length,
      paidVolume: orders
        .filter((order) => order.status === ShopOrderStatus.FULFILLED)
        .reduce((sum, order) => sum + order.amountCents, 0),
    },
  };
}

export async function createMerchantProduct(input: {
  merchantAccountId: string;
  name: string;
  slugValue?: string;
  summary?: string;
  description?: string;
  saleMode: ProductSaleMode;
  status: ProductStatus;
  initialSkuName?: string;
  initialSkuSummary?: string;
  initialSkuPrice: string;
}) {
  const name = input.name.trim();

  if (!name) {
    throw new Error("商品名称不能为空。");
  }

  const slug = slugify(input.slugValue?.trim() || name);
  const skuName = normalizeSkuName(input.initialSkuName ?? "");
  const skuPriceCents = parsePriceToCents(input.initialSkuPrice);
  const saleMode = normalizeProductSaleMode(input.saleMode);
  const paymentProfile = await requireMerchantOwnedPaymentProfileForProduct(
    input.merchantAccountId,
    input.status,
  );

  await assertProductSlugAvailable({ slug });

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name,
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        priceCents: skuPriceCents,
        saleMode,
        paymentProfileId: paymentProfile.id,
        status: input.status,
      },
    });

    await tx.productSku.create({
      data: {
        productId: product.id,
        name: skuName,
        summary: input.initialSkuSummary?.trim() || null,
        priceCents: skuPriceCents,
        enabled: true,
        sortOrder: 0,
      },
    });
  });
}

export async function updateMerchantProduct(input: {
  merchantAccountId: string;
  productId: string;
  name: string;
  slugValue?: string;
  summary?: string;
  description?: string;
  saleMode: ProductSaleMode;
  status: ProductStatus;
}) {
  const name = input.name.trim();
  const slug = slugify(input.slugValue?.trim() || name);
  const saleMode = normalizeProductSaleMode(input.saleMode);
  const paymentProfile = await requireMerchantOwnedPaymentProfileForProduct(
    input.merchantAccountId,
    input.status,
  );

  if (!name) {
    throw new Error("商品名称不能为空。");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: input.productId,
      paymentProfile: {
        is: {
          ownerId: input.merchantAccountId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    throw new Error("你只能修改自己名下的商品。");
  }

  await assertProductSlugAvailable({
    slug,
    excludeProductId: input.productId,
  });

  return prisma.product.update({
    where: {
      id: input.productId,
    },
    data: {
      name,
      slug,
      summary: input.summary?.trim() || null,
      description: input.description?.trim() || null,
      saleMode,
      paymentProfileId: paymentProfile.id,
      status: input.status,
    },
    select: {
      slug: true,
    },
  });
}

export async function createMerchantProductSku(input: {
  merchantAccountId: string;
  productId: string;
  name: string;
  summary?: string;
  price: string;
  enabled: boolean;
}) {
  const name = normalizeSkuName(input.name);
  const priceCents = parsePriceToCents(input.price);

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.findFirst({
      where: {
        id: input.productId,
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
    });

    if (!product) {
      throw new Error("你只能给自己名下的商品新增 SKU。");
    }

    if (product.saleMode === ProductSaleMode.SINGLE) {
      throw new Error("当前商品处于单商品模式，请先切换为多 SKU 模式后再新增规格。");
    }

    const lastSku = await tx.productSku.findFirst({
      where: {
        productId: input.productId,
      },
      orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    });

    await tx.productSku.create({
      data: {
        productId: input.productId,
        name,
        summary: input.summary?.trim() || null,
        priceCents,
        enabled: input.enabled,
        sortOrder: (lastSku?.sortOrder ?? -1) + 1,
      },
    });

    await syncProductPriceCache(tx, input.productId);
  });
}

export async function updateMerchantProductSku(input: {
  merchantAccountId: string;
  skuId: string;
  name: string;
  summary?: string;
  price: string;
  enabled: boolean;
}) {
  const name = normalizeSkuName(input.name);
  const priceCents = parsePriceToCents(input.price);

  await prisma.$transaction(async (tx) => {
    const sku = await tx.productSku.findFirst({
      where: {
        id: input.skuId,
        product: {
          paymentProfile: {
            is: {
              ownerId: input.merchantAccountId,
            },
          },
        },
      },
      select: {
        id: true,
        productId: true,
      },
    });

    if (!sku) {
      throw new Error("你只能修改自己名下商品的 SKU。");
    }

    await tx.productSku.update({
      where: {
        id: input.skuId,
      },
      data: {
        name,
        summary: input.summary?.trim() || null,
        priceCents,
        enabled: input.enabled,
      },
    });

    await syncProductPriceCache(tx, sku.productId);
  });
}

export async function deleteMerchantProduct(input: {
  merchantAccountId: string;
  productId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findFirst({
      where: {
        id: input.productId,
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!product) {
      throw new Error("你只能删除自己名下的商品。");
    }

    await assertProductDeletionAllowed(tx, product.id);

    await tx.cardItem.deleteMany({
      where: {
        productId: product.id,
      },
    });
    await tx.productSku.deleteMany({
      where: {
        productId: product.id,
      },
    });
    await tx.product.delete({
      where: {
        id: product.id,
      },
    });

    return product;
  });
}

export async function deleteMerchantProductSku(input: {
  merchantAccountId: string;
  skuId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const sku = await tx.productSku.findFirst({
      where: {
        id: input.skuId,
        product: {
          paymentProfile: {
            is: {
              ownerId: input.merchantAccountId,
            },
          },
        },
      },
      select: {
        id: true,
        productId: true,
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!sku) {
      throw new Error("你只能删除自己名下商品的 SKU。");
    }

    await assertSkuDeletionAllowed(tx, sku.id);

    await tx.cardItem.deleteMany({
      where: {
        skuId: sku.id,
      },
    });
    await tx.productSku.delete({
      where: {
        id: sku.id,
      },
    });
    await compactProductSkuSortOrders(tx, sku.productId);
    await syncProductPriceCache(tx, sku.productId);

    return {
      productSlug: sku.product.slug,
    };
  });
}

export async function createProduct(input: {
  name: string;
  slugValue?: string;
  summary?: string;
  description?: string;
  saleMode: ProductSaleMode;
  paymentProfileId?: string;
  status: ProductStatus;
  initialSkuName?: string;
  initialSkuSummary?: string;
  initialSkuPrice: string;
}) {
  const name = input.name.trim();

  if (!name) {
    throw new Error("商品名称不能为空。");
  }

  const slug = slugify(input.slugValue?.trim() || name);
  const skuName = normalizeSkuName(input.initialSkuName ?? "");
  const skuPriceCents = parsePriceToCents(input.initialSkuPrice);
  const saleMode = normalizeProductSaleMode(input.saleMode);
  const paymentProfileId = await resolvePaymentProfileId(input.paymentProfileId);

  await assertProductSlugAvailable({ slug });

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name,
        slug,
        summary: input.summary?.trim() || null,
        description: input.description?.trim() || null,
        priceCents: skuPriceCents,
        saleMode,
        paymentProfileId,
        status: input.status,
      },
    });

    await tx.productSku.create({
      data: {
        productId: product.id,
        name: skuName,
        summary: input.initialSkuSummary?.trim() || null,
        priceCents: skuPriceCents,
        enabled: true,
        sortOrder: 0,
      },
    });
  });
}

export async function updateProduct(input: {
  productId: string;
  name: string;
  slugValue?: string;
  summary?: string;
  description?: string;
  saleMode: ProductSaleMode;
  paymentProfileId?: string;
  status: ProductStatus;
}) {
  const name = input.name.trim();
  const slug = slugify(input.slugValue?.trim() || name);
  const saleMode = normalizeProductSaleMode(input.saleMode);
  const paymentProfileId = await resolvePaymentProfileId(input.paymentProfileId);

  if (!name) {
    throw new Error("商品名称不能为空。");
  }

  await assertProductSlugAvailable({
    slug,
    excludeProductId: input.productId,
  });

  return prisma.product.update({
    where: {
      id: input.productId,
    },
    data: {
      name,
      slug,
      summary: input.summary?.trim() || null,
      description: input.description?.trim() || null,
      saleMode,
      paymentProfileId,
      status: input.status,
    },
    select: {
      slug: true,
    },
  });
}

export async function createProductSku(input: {
  productId: string;
  name: string;
  summary?: string;
  price: string;
  enabled: boolean;
}) {
  const name = normalizeSkuName(input.name);
  const priceCents = parsePriceToCents(input.price);

  await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: {
        id: input.productId,
      },
    });

    if (!product) {
      throw new Error("商品不存在。");
    }

    if (product.saleMode === ProductSaleMode.SINGLE) {
      throw new Error("当前商品处于单商品模式，请先切换为多 SKU 模式后再新增规格。");
    }

    const lastSku = await tx.productSku.findFirst({
      where: {
        productId: input.productId,
      },
      orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    });

    await tx.productSku.create({
      data: {
        productId: input.productId,
        name,
        summary: input.summary?.trim() || null,
        priceCents,
        enabled: input.enabled,
        sortOrder: (lastSku?.sortOrder ?? -1) + 1,
      },
    });

    await syncProductPriceCache(tx, input.productId);
  });
}

export async function updateProductSku(input: {
  skuId: string;
  name: string;
  summary?: string;
  price: string;
  enabled: boolean;
}) {
  const name = normalizeSkuName(input.name);
  const priceCents = parsePriceToCents(input.price);

  await prisma.$transaction(async (tx) => {
    const sku = await tx.productSku.findUnique({
      where: {
        id: input.skuId,
      },
    });

    if (!sku) {
      throw new Error("SKU 不存在。");
    }

    await tx.productSku.update({
      where: {
        id: input.skuId,
      },
      data: {
        name,
        summary: input.summary?.trim() || null,
        priceCents,
        enabled: input.enabled,
      },
    });

    await syncProductPriceCache(tx, sku.productId);
  });
}

export async function deleteProduct(input: {
  productId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: {
        id: input.productId,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!product) {
      throw new Error("商品不存在。");
    }

    await assertProductDeletionAllowed(tx, product.id);

    await tx.cardItem.deleteMany({
      where: {
        productId: product.id,
      },
    });
    await tx.productSku.deleteMany({
      where: {
        productId: product.id,
      },
    });
    await tx.product.delete({
      where: {
        id: product.id,
      },
    });

    return product;
  });
}

export async function deleteProductSku(input: {
  skuId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const sku = await assertSkuDeletionAllowed(tx, input.skuId);

    const product = await tx.product.findUniqueOrThrow({
      where: {
        id: sku.productId,
      },
      select: {
        slug: true,
      },
    });

    await tx.cardItem.deleteMany({
      where: {
        skuId: sku.id,
      },
    });
    await tx.productSku.delete({
      where: {
        id: sku.id,
      },
    });
    await compactProductSkuSortOrders(tx, sku.productId);
    await syncProductPriceCache(tx, sku.productId);

    return {
      productSlug: product.slug,
    };
  });
}

export async function importCards(input: {
  skuId: string;
  batchName?: string;
  rawCards: string;
}) {
  const lines = input.rawCards
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("请至少导入一条卡密。");
  }

  const sku = await prisma.productSku.findUnique({
    where: {
      id: input.skuId,
    },
  });

  if (!sku) {
    throw new Error("请选择有效的 SKU。");
  }

  await prisma.cardItem.createMany({
    data: lines.map((secret) => ({
      productId: sku.productId,
      skuId: sku.id,
      batchName: input.batchName?.trim() || null,
      secret: encryptText(secret),
    })),
  });
}

export async function importMerchantCards(input: {
  merchantAccountId: string;
  skuId: string;
  batchName?: string;
  rawCards: string;
}) {
  const lines = input.rawCards
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("请至少导入一条卡密。");
  }

  const sku = await prisma.productSku.findFirst({
    where: {
      id: input.skuId,
      product: {
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
    },
    select: {
      id: true,
      productId: true,
      product: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!sku) {
    throw new Error("你只能给自己名下商品的 SKU 导入卡密。");
  }

  await prisma.cardItem.createMany({
    data: lines.map((secret) => ({
      productId: sku.productId,
      skuId: sku.id,
      batchName: input.batchName?.trim() || null,
      secret: encryptText(secret),
    })),
  });

  return {
    productSlug: sku.product.slug,
    importedCount: lines.length,
  };
}

export async function updateCardItem(input: {
  cardItemId: string;
  batchName?: string;
  secret: string;
}) {
  const secret = input.secret.trim();

  if (!secret) {
    throw new Error("卡密内容不能为空。");
  }

  const card = await prisma.cardItem.findUnique({
    where: {
      id: input.cardItemId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!card) {
    throw new Error("库存记录不存在。");
  }

  if (card.status !== CardItemStatus.AVAILABLE) {
    throw new Error("只有未售出的库存才能编辑卡密内容。");
  }

  return prisma.cardItem.update({
    where: {
      id: card.id,
    },
    data: {
      batchName: input.batchName?.trim() || null,
      secret: encryptText(secret),
    },
  });
}

export async function updateMerchantCardItem(input: {
  merchantAccountId: string;
  cardItemId: string;
  batchName?: string;
  secret: string;
}) {
  const secret = input.secret.trim();

  if (!secret) {
    throw new Error("卡密内容不能为空。");
  }

  const card = await prisma.cardItem.findFirst({
    where: {
      id: input.cardItemId,
      product: {
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!card) {
    throw new Error("你只能编辑自己名下的库存记录。");
  }

  if (card.status !== CardItemStatus.AVAILABLE) {
    throw new Error("只有未售出的库存才能编辑卡密内容。");
  }

  return prisma.cardItem.update({
    where: {
      id: card.id,
    },
    data: {
      batchName: input.batchName?.trim() || null,
      secret: encryptText(secret),
    },
  });
}

export async function deleteCardItem(input: {
  cardItemId: string;
}) {
  const card = await prisma.cardItem.findUnique({
    where: {
      id: input.cardItemId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!card) {
    throw new Error("库存记录不存在。");
  }

  if (card.status !== CardItemStatus.AVAILABLE) {
    throw new Error("只有未售出的库存才能删除。");
  }

  await prisma.cardItem.delete({
    where: {
      id: card.id,
    },
  });
}

export async function deleteMerchantCardItem(input: {
  merchantAccountId: string;
  cardItemId: string;
}) {
  const card = await prisma.cardItem.findFirst({
    where: {
      id: input.cardItemId,
      product: {
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!card) {
    throw new Error("你只能删除自己名下的库存记录。");
  }

  if (card.status !== CardItemStatus.AVAILABLE) {
    throw new Error("只有未售出的库存才能删除。");
  }

  await prisma.cardItem.delete({
    where: {
      id: card.id,
    },
  });
}

export async function clearAvailableCardsForSku(input: {
  skuId: string;
}) {
  const sku = await prisma.productSku.findUnique({
    where: {
      id: input.skuId,
    },
    select: {
      id: true,
    },
  });

  if (!sku) {
    throw new Error("SKU 不存在。");
  }

  const result = await prisma.cardItem.deleteMany({
    where: {
      skuId: sku.id,
      status: CardItemStatus.AVAILABLE,
    },
  });

  return {
    clearedCount: result.count,
  };
}

export async function clearAvailableMerchantCardsForSku(input: {
  merchantAccountId: string;
  skuId: string;
}) {
  const sku = await prisma.productSku.findFirst({
    where: {
      id: input.skuId,
      product: {
        paymentProfile: {
          is: {
            ownerId: input.merchantAccountId,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!sku) {
    throw new Error("你只能清理自己名下 SKU 的库存。");
  }

  const result = await prisma.cardItem.deleteMany({
    where: {
      skuId: sku.id,
      status: CardItemStatus.AVAILABLE,
    },
  });

  return {
    clearedCount: result.count,
  };
}

export function getOrderStatusLabel(status: ShopOrderStatus) {
  switch (status) {
    case ShopOrderStatus.PENDING_PAYMENT:
      return "待支付";
    case ShopOrderStatus.FULFILLED:
      return "已发货";
    case ShopOrderStatus.EXPIRED:
      return "已过期";
    case ShopOrderStatus.FAILED:
      return "已失败";
    default:
      return status;
  }
}

export function getOrderStatusTone(status: ShopOrderStatus) {
  switch (status) {
    case ShopOrderStatus.FULFILLED:
      return "success";
    case ShopOrderStatus.PENDING_PAYMENT:
      return "warning";
    default:
      return "muted";
  }
}

export function getPaymentAttemptStatusLabel(status: PaymentAttemptStatus) {
  switch (status) {
    case PaymentAttemptStatus.CREATED:
      return "已创建";
    case PaymentAttemptStatus.PENDING:
      return "待支付";
    case PaymentAttemptStatus.PROCESSING:
      return "处理中";
    case PaymentAttemptStatus.SUCCEEDED:
      return "已成功";
    case PaymentAttemptStatus.FAILED:
      return "已失败";
    case PaymentAttemptStatus.CANCELLED:
      return "已取消";
    case PaymentAttemptStatus.EXPIRED:
      return "已过期";
    default:
      return status;
  }
}

export function getPaymentAttemptStatusTone(status: PaymentAttemptStatus) {
  switch (status) {
    case PaymentAttemptStatus.SUCCEEDED:
      return "success";
    case PaymentAttemptStatus.CREATED:
    case PaymentAttemptStatus.PENDING:
    case PaymentAttemptStatus.PROCESSING:
      return "warning";
    default:
      return "muted";
  }
}

export function getSyncTaskStatusLabel(status: SyncTaskStatus) {
  switch (status) {
    case SyncTaskStatus.PENDING:
      return "待执行";
    case SyncTaskStatus.RUNNING:
      return "执行中";
    case SyncTaskStatus.SUCCEEDED:
      return "已完成";
    case SyncTaskStatus.FAILED:
      return "已失败";
    default:
      return status;
  }
}

export function getSyncTaskStatusTone(status: SyncTaskStatus) {
  switch (status) {
    case SyncTaskStatus.SUCCEEDED:
      return "success";
    case SyncTaskStatus.PENDING:
    case SyncTaskStatus.RUNNING:
      return "warning";
    default:
      return "muted";
  }
}

export function getWebhookProcessingStatusLabel(status: string) {
  switch (status) {
    case "PROCESSING":
      return "处理中";
    case "SUCCEEDED":
      return "已完成";
    case "FAILED":
      return "处理失败";
    case "REJECTED":
      return "已拒绝";
    case "IGNORED":
      return "已忽略";
    default:
      return status;
  }
}

export function getWebhookProcessingStatusTone(status: string) {
  switch (status) {
    case "SUCCEEDED":
      return "success";
    case "PROCESSING":
      return "warning";
    default:
      return "muted";
  }
}

export function describeOrderAmount(amountCents: number) {
  return formatCny(amountCents);
}
