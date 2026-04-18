import Link from "next/link";
import { Fragment } from "react";
import {
  replayAdminCallbackLogAction,
  refreshAdminPaymentOrderAction,
  runAdminSyncTaskAction,
  updateControlAuditReviewAction,
} from "@/app/admin/actions";
import {
  replayMerchantCallbackLogAction,
  refreshMerchantPaymentOrderAction,
  runMerchantSyncTaskAction,
} from "@/app/merchant/actions";
import type { PaymentProfileSnapshot } from "@/lib/payment-profile";
import {
  PAYMENT_OPERATION_ATTEMPT_FILTERS,
  PAYMENT_OPERATION_CALLBACK_FILTERS,
  PAYMENT_OPERATION_CONTROL_OUTCOME_FILTERS,
  PAYMENT_OPERATION_CONTROL_RISK_FILTERS,
  PAYMENT_OPERATION_CONTROL_REVIEW_FILTERS,
  PAYMENT_OPERATION_SYNC_FILTERS,
  describeOrderAmount,
  getOrderStatusLabel,
  getOrderStatusTone,
  getPaymentAttemptStatusLabel,
  getPaymentAttemptStatusTone,
  getSyncTaskStatusLabel,
  getSyncTaskStatusTone,
  getWebhookProcessingStatusLabel,
  getWebhookProcessingStatusTone,
  type PaymentOperationAttemptFilter,
  type PaymentOperationCallbackFilter,
  type PaymentOperationControlOutcomeFilter,
  type PaymentOperationControlRiskFilter,
  type PaymentOperationControlReviewFilter,
  type PaymentOperationSyncFilter,
  type PaymentOperationsData,
} from "@/lib/shop";
import { formatDateTime } from "@/lib/utils";

type PaymentProfileOption = Pick<
  PaymentProfileSnapshot,
  "id" | "name" | "merchantCode" | "ownerId" | "isActive" | "isDefault"
>;
type PaymentTone = "success" | "warning" | "muted";

type ControlAuditQuickView = {
  key: string;
  label: string;
  count: number;
  detail: string;
  tone: PaymentTone;
  href: string;
  active: boolean;
};

function formatTaskType(taskType: string) {
  switch (taskType) {
    case "novapay.order.create.reconcile":
      return "建单补偿";
    case "novapay.callback.reconcile":
      return "回调补偿";
    default:
      return taskType;
  }
}

function buildOrderPath(publicToken: string) {
  return `/orders/${publicToken}`;
}

function buildCallbackHealthCopy(data: PaymentOperationsData) {
  if (data.summary.totalCallbacks === 0) {
    return "还没有收到回调事件，系统会在首笔支付通知后开始沉淀日志。";
  }

  if (data.summary.failedCallbacks > 0) {
    return `${data.summary.failedCallbacks} 条回调存在失败或拒绝记录，建议优先检查签名、外部订单号和补偿任务。`;
  }

  if (data.summary.pendingCallbacks > 0) {
    return `${data.summary.pendingCallbacks} 条回调仍在处理中，链路已进入异步消化阶段。`;
  }

  return "回调链路当前健康，最近事件都已完成处理。";
}

function buildSyncCopy(data: PaymentOperationsData) {
  if (data.summary.queuedSyncTasks === 0 && data.summary.failedSyncTasks === 0) {
    return "当前没有遗留补偿任务，支付链路处于稳定态。";
  }

  return `队列中还有 ${data.summary.queuedSyncTasks} 条待执行任务，累计 ${data.summary.failedSyncTasks} 条失败任务需要关注。`;
}

function getAttemptFilterLabel(filter: PaymentOperationAttemptFilter) {
  switch (filter) {
    case "in_flight":
      return "进行中";
    case "succeeded":
      return "已成功";
    case "failed":
      return "失败";
    case "cancelled":
      return "已取消";
    case "expired":
      return "已过期";
    case "all":
    default:
      return "全部尝试";
  }
}

function getCallbackFilterLabel(filter: PaymentOperationCallbackFilter) {
  switch (filter) {
    case "processing":
      return "处理中";
    case "succeeded":
      return "已成功";
    case "failed":
      return "失败";
    case "rejected":
      return "已拒绝";
    case "invalid_signature":
      return "签名失败";
    case "all":
    default:
      return "全部回调";
  }
}

function getSyncFilterLabel(filter: PaymentOperationSyncFilter) {
  switch (filter) {
    case "queued":
      return "待执行";
    case "running":
      return "执行中";
    case "failed":
      return "失败";
    case "completed":
      return "已完成";
    case "all":
    default:
      return "全部任务";
  }
}

function getControlReviewFilterLabel(filter: PaymentOperationControlReviewFilter) {
  switch (filter) {
    case "pending":
      return "待复核";
    case "reviewed":
      return "已复核";
    case "all":
    default:
      return "全部留痕";
  }
}

function getControlRiskFilterLabel(filter: PaymentOperationControlRiskFilter) {
  switch (filter) {
    case "high":
      return "高风险";
    case "medium":
      return "中风险";
    case "low":
      return "低风险";
    case "all":
    default:
      return "全部风险";
  }
}

function getControlOutcomeFilterLabel(filter: PaymentOperationControlOutcomeFilter) {
  switch (filter) {
    case "failed":
      return "执行失败";
    case "succeeded":
      return "执行成功";
    case "all":
    default:
      return "全部结果";
  }
}

function buildPaymentProfileLabel(profile: PaymentProfileOption) {
  return profile.ownerId ? `${profile.name} · ${profile.merchantCode}` : `${profile.name} · 平台直营`;
}

function buildActiveFilters(
  scope: "admin" | "merchant",
  data: PaymentOperationsData,
  paymentProfiles?: PaymentProfileOption[],
) {
  const activeFilters: string[] = [];

  if (data.filters.keyword) {
    activeFilters.push(`关键词: ${data.filters.keyword}`);
  }

  if (scope === "admin" && data.filters.paymentProfileId !== "all") {
    const currentProfile = paymentProfiles?.find((profile) => profile.id === data.filters.paymentProfileId);
    activeFilters.push(`支付商户: ${currentProfile ? buildPaymentProfileLabel(currentProfile) : "已选择"}`);
  }

  if (data.filters.channelCode !== "all") {
    activeFilters.push(`通道: ${data.filters.channelCode}`);
  }

  if (data.filters.attemptStatus !== "all") {
    activeFilters.push(`尝试: ${getAttemptFilterLabel(data.filters.attemptStatus)}`);
  }

  if (data.filters.callbackStatus !== "all") {
    activeFilters.push(`回调: ${getCallbackFilterLabel(data.filters.callbackStatus)}`);
  }

  if (data.filters.syncStatus !== "all") {
    activeFilters.push(`补偿: ${getSyncFilterLabel(data.filters.syncStatus)}`);
  }

  if (data.filters.controlReviewStatus !== "all") {
    activeFilters.push(`控制复核: ${getControlReviewFilterLabel(data.filters.controlReviewStatus)}`);
  }

  if (data.filters.controlRiskLevel !== "all") {
    activeFilters.push(`控制风险: ${getControlRiskFilterLabel(data.filters.controlRiskLevel)}`);
  }

  if (data.filters.controlOutcome !== "all") {
    activeFilters.push(`控制结果: ${getControlOutcomeFilterLabel(data.filters.controlOutcome)}`);
  }

  return activeFilters;
}

function buildEmptyStateTitle(scope: "admin" | "merchant", hasFilters: boolean) {
  if (hasFilters) {
    return "当前筛选条件下没有匹配记录";
  }

  return scope === "admin" ? "支付观测中心已启用" : "收款观测中心已启用";
}

function buildEmptyStateCopy(hasFilters: boolean) {
  if (hasFilters) {
    return "可以放宽关键词、状态或通道条件，继续排查订单、回调和补偿队列。";
  }

  return "等你完成一笔真实下单后，这里会自动出现支付尝试、回调日志和补偿任务的企业级监控视图。";
}

function formatJsonPreview(raw: string | null | undefined) {
  if (!raw) {
    return "暂无可展示的结构化数据。";
  }

  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

function buildPaymentOperationsHref(basePath: string, filters: PaymentOperationsData["filters"]) {
  const params = new URLSearchParams();

  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }

  if (filters.paymentProfileId !== "all") {
    params.set("paymentProfileId", filters.paymentProfileId);
  }

  if (filters.channelCode !== "all") {
    params.set("channelCode", filters.channelCode);
  }

  if (filters.attemptStatus !== "all") {
    params.set("attemptStatus", filters.attemptStatus);
  }

  if (filters.callbackStatus !== "all") {
    params.set("callbackStatus", filters.callbackStatus);
  }

  if (filters.syncStatus !== "all") {
    params.set("syncStatus", filters.syncStatus);
  }

  if (filters.controlReviewStatus !== "all") {
    params.set("controlReviewStatus", filters.controlReviewStatus);
  }

  if (filters.controlRiskLevel !== "all") {
    params.set("controlRiskLevel", filters.controlRiskLevel);
  }

  if (filters.controlOutcome !== "all") {
    params.set("controlOutcome", filters.controlOutcome);
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function buildReturnTo(basePath: string, data: PaymentOperationsData) {
  return buildPaymentOperationsHref(basePath, data.filters);
}

function buildControlAuditExportHref(
  scope: "admin" | "merchant",
  filters: PaymentOperationsData["filters"],
) {
  return buildPaymentOperationsHref(
    scope === "admin" ? "/admin/payments/control-audit/export" : "/merchant/payments/control-audit/export",
    filters,
  );
}

function buildControlAuditWeeklyExportHref(
  scope: "admin" | "merchant",
  filters: PaymentOperationsData["filters"],
) {
  return buildPaymentOperationsHref(
    scope === "admin"
      ? "/admin/payments/control-audit/weekly-export"
      : "/merchant/payments/control-audit/weekly-export",
    filters,
  );
}

function getAttemptRelatedCallbacks(
  data: PaymentOperationsData,
  attempt: PaymentOperationsData["attempts"][number],
) {
  return data.callbackLogs.filter(
    (log) => log.externalOrderId === attempt.externalOrderId || (log.traceId && log.traceId === attempt.traceId),
  );
}

function getAttemptRelatedSyncTasks(
  data: PaymentOperationsData,
  attempt: PaymentOperationsData["attempts"][number],
) {
  return data.syncTasks.filter(
    (task) =>
      task.paymentAttempt?.externalOrderId === attempt.externalOrderId ||
      task.shopOrder?.orderNo === attempt.shopOrder.orderNo,
  );
}

function buildAttemptTimeline(
  attempt: PaymentOperationsData["attempts"][number],
  callbacks: PaymentOperationsData["callbackLogs"],
  syncTasks: PaymentOperationsData["syncTasks"],
) {
  const items = [
    {
      id: `attempt-created-${attempt.id}`,
      time: attempt.createdAt,
      title: "发起支付尝试",
      detail: `${describeOrderAmount(attempt.amountCents)} · ${attempt.channelCode}`,
      tone: "muted",
    },
    ...(attempt.lastSyncedAt
      ? [
          {
            id: `attempt-synced-${attempt.id}`,
            time: attempt.lastSyncedAt,
            title: "最近一次状态同步",
            detail: `${getPaymentAttemptStatusLabel(attempt.status)} / ${getOrderStatusLabel(attempt.shopOrder.status)}`,
            tone: "success",
          },
        ]
      : []),
    ...callbacks.map((log) => ({
      id: `callback-${log.id}`,
      time: log.createdAt,
      title: `收到回调 ${getWebhookProcessingStatusLabel(log.processingStatus)}`,
      detail: `${log.eventType} · ${log.signatureValid ? "签名有效" : "签名失败"}`,
      tone: log.signatureValid ? "success" : "warning",
    })),
    ...syncTasks.flatMap((task) => [
      {
        id: `task-created-${task.id}`,
        time: task.createdAt,
        title: `生成${formatTaskType(task.taskType)}`,
        detail: `${getSyncTaskStatusLabel(task.status)} · 第 ${task.retryCount} 次执行`,
        tone: task.status === "FAILED" ? "warning" : "muted",
      },
      ...(task.startedAt
        ? [
            {
              id: `task-started-${task.id}`,
              time: task.startedAt,
              title: `${formatTaskType(task.taskType)}开始执行`,
              detail: "补偿任务已进入处理阶段。",
              tone: "muted",
            },
          ]
        : []),
      ...(task.finishedAt
        ? [
            {
              id: `task-finished-${task.id}`,
              time: task.finishedAt,
              title: `${formatTaskType(task.taskType)}执行结束`,
              detail: task.lastError ?? "任务执行完成。",
              tone: task.status === "FAILED" ? "warning" : "success",
            },
          ]
        : []),
    ]),
  ];

  return items.sort((left, right) => right.time.getTime() - left.time.getTime());
}

function buildSyncTaskTimeline(task: PaymentOperationsData["syncTasks"][number]) {
  const items = [
    {
      id: `task-${task.id}-created`,
      time: task.createdAt,
      title: "任务创建",
      detail: `${formatTaskType(task.taskType)} 已入队，当前状态 ${getSyncTaskStatusLabel(task.status)}。`,
      tone: "muted",
    },
    ...(task.startedAt
      ? [
          {
            id: `task-${task.id}-started`,
            time: task.startedAt,
            title: "开始执行",
            detail: `已发起第 ${task.retryCount} 次执行。`,
            tone: "muted",
          },
        ]
      : []),
    ...(task.finishedAt
      ? [
          {
            id: `task-${task.id}-finished`,
            time: task.finishedAt,
            title: task.status === "FAILED" ? "执行失败" : "执行完成",
            detail: task.lastError ?? "任务已成功完成并回写支付状态。",
            tone: task.status === "FAILED" ? "warning" : "success",
          },
        ]
      : []),
  ];

  return items.sort((left, right) => right.time.getTime() - left.time.getTime());
}

type PaymentOrderBundle = {
  key: string;
  orderNo: string;
  publicToken: string | null;
  productName: string;
  skuName: string;
  customerEmail: string | null;
  merchantName: string | null;
  merchantCode: string | null;
  amountCents: number | null;
  channelCode: string | null;
  orderStatus: PaymentOperationsData["attempts"][number]["shopOrder"]["status"] | null;
  attemptStatus: PaymentOperationsData["attempts"][number]["status"] | null;
  checkoutUrl: string | null;
  hostedCheckoutUrl: string | null;
  traceId: string | null;
  attempt: PaymentOperationsData["attempts"][number] | null;
  callbacks: PaymentOperationsData["callbackLogs"];
  syncTasks: PaymentOperationsData["syncTasks"];
  lastActivityAt: Date | null;
};

type PaymentOrderShape =
  | PaymentOperationsData["attempts"][number]["shopOrder"]
  | NonNullable<PaymentOperationsData["syncTasks"][number]["shopOrder"]>;
type PaymentOrderDiagnostics = {
  failedCallbacks: number;
  queuedTasks: number;
  failedTasks: number;
  callbackOnly: boolean;
  missingCheckout: boolean;
  missingCallback: boolean;
};
type PaymentOrderAlert = {
  bundle: PaymentOrderBundle;
  score: number;
  severityLabel: string;
  severityTone: PaymentTone;
  summary: string;
  reasons: string[];
};
type MerchantHealthCard = {
  key: string;
  paymentProfileId: string | null;
  name: string;
  merchantCode: string | null;
  ownerLabel: string;
  isActive: boolean;
  isDefault: boolean;
  isConfigured: boolean;
  orderCount: number;
  succeededOrders: number;
  inFlightOrders: number;
  callbackFailures: number;
  queuedTasks: number;
  failedTasks: number;
  totalAmountCents: number;
  lastActivityAt: Date | null;
  statusTone: PaymentTone;
  statusLabel: string;
  statusSummary: string;
  riskScore: number;
};
type PaymentTrendBucket = {
  key: string;
  label: string;
  attempts: number;
  succeeded: number;
  callbackFailures: number;
  syncPressure: number;
};
type PaymentSlaMetric = {
  label: string;
  value: string;
  detail: string;
  tone: PaymentTone;
};
type PaymentSlaSnapshot = {
  grade: string;
  headline: string;
  detail: string;
  tone: PaymentTone;
  metrics: PaymentSlaMetric[];
};
type PaymentRecommendation = {
  id: string;
  title: string;
  detail: string;
  tone: PaymentTone;
  href: string | null;
  cta: string | null;
};
type PaymentLatencyBand = {
  key: string;
  label: string;
  count: number;
  tone: PaymentTone;
  detail: string;
};
type PaymentLatencySnapshot = {
  observedCount: number;
  inFlightCount: number;
  callbackOnlyCount: number;
  p50: string;
  p90: string;
  longest: string;
  bands: PaymentLatencyBand[];
};
type MerchantSlaRank = {
  key: string;
  rank: number;
  name: string;
  merchantCode: string | null;
  paymentProfileId: string | null;
  orderCount: number;
  successRate: string;
  closureRate: string;
  avgLatency: string;
  grade: string;
  score: number;
  tone: PaymentTone;
  summary: string;
};
type ChannelInsightCard = {
  key: string;
  channelCode: string;
  attemptCount: number;
  succeededCount: number;
  inFlightCount: number;
  callbackFailures: number;
  queuedTasks: number;
  failedTasks: number;
  totalAmountCents: number;
  averageAmountCents: number | null;
  successRate: string;
  tone: PaymentTone;
  summary: string;
  href: string;
};
type ReconciliationCard = {
  key: string;
  name: string;
  merchantCode: string | null;
  paymentProfileId: string | null;
  paymentSuccessCount: number;
  callbackSuccessCount: number;
  fulfilledCount: number;
  callbackGapCount: number;
  fulfillmentGapCount: number;
  failedTasks: number;
  queuedTasks: number;
  totalGapCount: number;
  tone: PaymentTone;
  summary: string;
  href: string;
};
type PaymentAuditEvent = {
  id: string;
  time: Date;
  lane: "payment" | "callback" | "sync" | "fulfillment";
  laneLabel: string;
  title: string;
  detail: string;
  tone: PaymentTone;
  orderLabel: string;
  merchantLabel: string;
  href: string;
};
type PaymentAuditSnapshot = {
  totalEvents: number;
  paymentEvents: number;
  callbackEvents: number;
  syncEvents: number;
  fulfillmentEvents: number;
  signatureFailures: number;
  issueOrders: number;
  highlights: string[];
};
type ControlAuditSnapshot = {
  totalLogs: number;
  configChangeCount: number;
  riskyOperationCount: number;
  failedCount: number;
  highRiskCount: number;
  pendingCount: number;
  reviewedCount: number;
  adminCount: number;
  merchantCount: number;
  highlights: string[];
};

function buildOrderBundleKey(input: { orderNo?: string | null; traceId?: string | null; fallbackId: string }) {
  if (input.orderNo) {
    return `order:${input.orderNo}`;
  }

  if (input.traceId) {
    return `trace:${input.traceId}`;
  }

  return input.fallbackId;
}

function createEmptyOrderBundle(key: string): PaymentOrderBundle {
  return {
    key,
    orderNo: "",
    publicToken: null,
    productName: "等待识别商品",
    skuName: "等待识别规格",
    customerEmail: null,
    merchantName: null,
    merchantCode: null,
    amountCents: null,
    channelCode: null,
    orderStatus: null,
    attemptStatus: null,
    checkoutUrl: null,
    hostedCheckoutUrl: null,
    traceId: null,
    attempt: null,
    callbacks: [],
    syncTasks: [],
    lastActivityAt: null,
  };
}

function updateBundleActivity(bundle: PaymentOrderBundle, time?: Date | null) {
  if (!time) {
    return;
  }

  if (!bundle.lastActivityAt || time.getTime() > bundle.lastActivityAt.getTime()) {
    bundle.lastActivityAt = time;
  }
}

function hydrateBundleFromOrderShape(
  bundle: PaymentOrderBundle,
  order: PaymentOrderShape,
) {
  bundle.orderNo = order.orderNo;
  bundle.publicToken = order.publicToken;
  bundle.productName = order.product.name;
  bundle.skuName = order.sku.name;
  bundle.customerEmail = order.customerEmail;
  bundle.merchantName = order.paymentProfile?.name ?? null;
  bundle.merchantCode = order.paymentProfile?.merchantCode ?? null;
  bundle.amountCents = order.amountCents;
  bundle.channelCode = order.channelCode;
  bundle.orderStatus = order.status;
  updateBundleActivity(bundle, order.updatedAt);
}

function buildPaymentOrderBundles(data: PaymentOperationsData) {
  const bundleMap = new Map<string, PaymentOrderBundle>();

  for (const attempt of data.attempts) {
    const key = buildOrderBundleKey({
      orderNo: attempt.shopOrder.orderNo,
      traceId: attempt.traceId,
      fallbackId: `attempt:${attempt.id}`,
    });
    const bundle = bundleMap.get(key) ?? createEmptyOrderBundle(key);

    hydrateBundleFromOrderShape(bundle, attempt.shopOrder);
    bundle.attempt = attempt;
    bundle.attemptStatus = attempt.status;
    bundle.checkoutUrl = attempt.checkoutUrl;
    bundle.hostedCheckoutUrl = attempt.hostedCheckoutUrl;
    bundle.traceId = attempt.traceId;
    updateBundleActivity(bundle, attempt.updatedAt);

    bundleMap.set(key, bundle);
  }

  for (const task of data.syncTasks) {
    const key = buildOrderBundleKey({
      orderNo: task.shopOrder?.orderNo ?? task.paymentAttempt?.externalOrderId,
      traceId: task.paymentAttempt?.traceId,
      fallbackId: `task:${task.id}`,
    });
    const bundle = bundleMap.get(key) ?? createEmptyOrderBundle(key);

    if (task.shopOrder) {
      hydrateBundleFromOrderShape(bundle, task.shopOrder);
    } else if (task.paymentAttempt?.externalOrderId && !bundle.orderNo) {
      bundle.orderNo = task.paymentAttempt.externalOrderId;
    }

    bundle.traceId = bundle.traceId ?? task.paymentAttempt?.traceId ?? null;
    bundle.amountCents = bundle.amountCents ?? task.paymentAttempt?.amountCents ?? null;
    bundle.channelCode = bundle.channelCode ?? task.paymentAttempt?.channelCode ?? null;
    bundle.syncTasks = [...bundle.syncTasks, task];
    updateBundleActivity(bundle, task.finishedAt ?? task.startedAt ?? task.createdAt);

    bundleMap.set(key, bundle);
  }

  for (const log of data.callbackLogs) {
    const key = buildOrderBundleKey({
      orderNo: log.externalOrderId,
      traceId: log.traceId,
      fallbackId: `callback:${log.id}`,
    });
    const bundle = bundleMap.get(key) ?? createEmptyOrderBundle(key);

    if (log.externalOrderId && !bundle.orderNo) {
      bundle.orderNo = log.externalOrderId;
    }

    bundle.traceId = bundle.traceId ?? log.traceId ?? null;
    bundle.callbacks = [...bundle.callbacks, log];
    updateBundleActivity(bundle, log.updatedAt);

    bundleMap.set(key, bundle);
  }

  return [...bundleMap.values()]
    .map((bundle) => ({
      ...bundle,
      callbacks: [...bundle.callbacks].sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime()),
      syncTasks: [...bundle.syncTasks].sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime()),
    }))
    .sort((left, right) => {
      const rightTime = right.lastActivityAt?.getTime() ?? 0;
      const leftTime = left.lastActivityAt?.getTime() ?? 0;
      return rightTime - leftTime;
    });
}

function getOrderBundleDiagnostics(bundle: PaymentOrderBundle): PaymentOrderDiagnostics {
  const failedCallbacks = bundle.callbacks.filter(
    (log) => log.processingStatus === "FAILED" || log.processingStatus === "REJECTED" || !log.signatureValid,
  ).length;
  const queuedTasks = bundle.syncTasks.filter((task) => task.status === "PENDING" || task.status === "RUNNING").length;
  const failedTasks = bundle.syncTasks.filter((task) => task.status === "FAILED").length;

  return {
    failedCallbacks,
    queuedTasks,
    failedTasks,
    callbackOnly: !bundle.attempt && bundle.callbacks.length > 0,
    missingCheckout: bundle.orderStatus === "PENDING_PAYMENT" && !bundle.checkoutUrl && !bundle.hostedCheckoutUrl,
    missingCallback: bundle.callbacks.length === 0 && bundle.attemptStatus === "SUCCEEDED",
  };
}

function buildOrderBundleFlags(bundle: PaymentOrderBundle) {
  const diagnostics = getOrderBundleDiagnostics(bundle);
  const flags: string[] = [];

  if (diagnostics.callbackOnly) {
    flags.push("仅收到回调日志");
  }

  if (diagnostics.failedCallbacks > 0) {
    flags.push(`${diagnostics.failedCallbacks} 条异常回调`);
  }

  if (diagnostics.failedTasks > 0) {
    flags.push(`${diagnostics.failedTasks} 条失败补偿`);
  }

  if (diagnostics.queuedTasks > 0) {
    flags.push(`${diagnostics.queuedTasks} 条待执行补偿`);
  }

  if (diagnostics.missingCheckout) {
    flags.push("待支付但缺少收银台链接");
  }

  if (diagnostics.missingCallback) {
    flags.push("已成功但未见回调日志");
  }

  return flags;
}

function buildOrderBundleTimeline(bundle: PaymentOrderBundle) {
  const items = [
    ...(bundle.attempt
      ? buildAttemptTimeline(bundle.attempt, bundle.callbacks, bundle.syncTasks)
      : []),
    ...(!bundle.attempt
      ? bundle.callbacks.map((log) => ({
          id: `callback-only-${log.id}`,
          time: log.createdAt,
          title: `收到回调 ${getWebhookProcessingStatusLabel(log.processingStatus)}`,
          detail: `${log.eventType} · ${log.signatureValid ? "签名有效" : "签名失败"}`,
          tone: log.signatureValid ? "success" : "warning",
        }))
      : []),
    ...(!bundle.attempt ? bundle.syncTasks.flatMap((task) => buildSyncTaskTimeline(task)) : []),
  ];

  return items.sort((left, right) => right.time.getTime() - left.time.getTime());
}

function buildFocusedOrderHref(basePath: string, data: PaymentOperationsData, bundle: PaymentOrderBundle) {
  const keyword = bundle.orderNo || bundle.traceId || bundle.customerEmail || data.filters.keyword;
  return buildPaymentOperationsHref(basePath, {
    ...data.filters,
    keyword,
  });
}

function buildPaymentProfileHref(basePath: string, data: PaymentOperationsData, paymentProfileId: string) {
  return buildPaymentOperationsHref(basePath, {
    ...data.filters,
    paymentProfileId,
  });
}

function buildOrderAlertQueue(orderBundles: PaymentOrderBundle[]): PaymentOrderAlert[] {
  return orderBundles
    .flatMap((bundle) => {
      const diagnostics = getOrderBundleDiagnostics(bundle);
      const reasons: string[] = [];
      let score = 0;

      if (diagnostics.callbackOnly) {
        reasons.push("只有回调日志，没有识别到支付尝试");
        score += 96;
      }

      if (diagnostics.failedTasks > 0) {
        reasons.push(`${diagnostics.failedTasks} 条补偿执行失败`);
        score += 74 + diagnostics.failedTasks * 4;
      }

      if (diagnostics.failedCallbacks > 0) {
        reasons.push(`${diagnostics.failedCallbacks} 条回调处理异常`);
        score += 68 + diagnostics.failedCallbacks * 4;
      }

      if (diagnostics.missingCheckout) {
        reasons.push("待支付订单缺少收银台地址");
        score += 56;
      }

      if (diagnostics.missingCallback) {
        reasons.push("支付成功后未见回调日志");
        score += 34;
      }

      if (diagnostics.queuedTasks > 0) {
        reasons.push(`${diagnostics.queuedTasks} 条补偿等待执行`);
        score += 26 + diagnostics.queuedTasks * 3;
      }

      if (bundle.attemptStatus === "FAILED") {
        reasons.push("支付尝试已失败");
        score += 42;
      }

      if (bundle.attemptStatus === "EXPIRED") {
        reasons.push("支付尝试已过期");
        score += 16;
      }

      if (bundle.attemptStatus === "CANCELLED") {
        reasons.push("支付尝试已取消");
        score += 12;
      }

      if (bundle.orderStatus === "FAILED") {
        reasons.push("订单状态已失败");
        score += 20;
      }

      if (score === 0) {
        return [];
      }

      const severity =
        score >= 120
          ? { label: "P0 紧急", tone: "warning" as const }
          : score >= 72
            ? { label: "P1 高优", tone: "warning" as const }
            : { label: "P2 关注", tone: "muted" as const };

      return [
        {
          bundle,
          score,
          severityLabel: severity.label,
          severityTone: severity.tone,
          summary: reasons[0] ?? "订单链路需要关注",
          reasons: reasons.slice(0, 4),
        },
      ];
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      const rightTime = right.bundle.lastActivityAt?.getTime() ?? 0;
      const leftTime = left.bundle.lastActivityAt?.getTime() ?? 0;
      return rightTime - leftTime;
    })
    .slice(0, 6);
}

function createMerchantHealthCard(
  key: string,
  profile?: PaymentProfileOption | null,
  fallback?: {
    name?: string | null;
    merchantCode?: string | null;
  },
): MerchantHealthCard {
  return {
    key,
    paymentProfileId: profile?.id ?? null,
    name: profile?.name ?? fallback?.name ?? "待识别商户",
    merchantCode: profile?.merchantCode ?? fallback?.merchantCode ?? null,
    ownerLabel: profile ? (profile.ownerId ? "商户自营" : "平台直营") : "待识别商户",
    isActive: profile?.isActive ?? true,
    isDefault: profile?.isDefault ?? false,
    isConfigured: Boolean(profile),
    orderCount: 0,
    succeededOrders: 0,
    inFlightOrders: 0,
    callbackFailures: 0,
    queuedTasks: 0,
    failedTasks: 0,
    totalAmountCents: 0,
    lastActivityAt: null,
    statusTone: "muted",
    statusLabel: "观察中",
    statusSummary: "等待订单链路进入该商户视图。",
    riskScore: 0,
  };
}

function buildMerchantHealthCards(
  orderBundles: PaymentOrderBundle[],
  paymentProfiles?: PaymentProfileOption[],
): MerchantHealthCard[] {
  const cardMap = new Map<string, MerchantHealthCard>();
  const profileByMerchantCode = new Map((paymentProfiles ?? []).map((profile) => [profile.merchantCode, profile]));

  for (const profile of paymentProfiles ?? []) {
    cardMap.set(`profile:${profile.id}`, createMerchantHealthCard(`profile:${profile.id}`, profile));
  }

  for (const bundle of orderBundles) {
    const matchedProfile = bundle.merchantCode ? profileByMerchantCode.get(bundle.merchantCode) ?? null : null;
    const key = matchedProfile
      ? `profile:${matchedProfile.id}`
      : bundle.merchantCode
        ? `code:${bundle.merchantCode}`
        : `unknown:${bundle.key}`;
    const card =
      cardMap.get(key) ??
      createMerchantHealthCard(key, matchedProfile, {
        name: bundle.merchantName,
        merchantCode: bundle.merchantCode,
      });
    const diagnostics = getOrderBundleDiagnostics(bundle);

    card.orderCount += 1;
    card.succeededOrders += bundle.orderStatus === "FULFILLED" || bundle.attemptStatus === "SUCCEEDED" ? 1 : 0;
    card.inFlightOrders +=
      bundle.attemptStatus === "CREATED" || bundle.attemptStatus === "PENDING" || bundle.attemptStatus === "PROCESSING"
        ? 1
        : 0;
    card.callbackFailures += diagnostics.failedCallbacks;
    card.queuedTasks += diagnostics.queuedTasks;
    card.failedTasks += diagnostics.failedTasks;
    card.totalAmountCents += bundle.amountCents ?? 0;

    if (!card.lastActivityAt || (bundle.lastActivityAt && bundle.lastActivityAt.getTime() > card.lastActivityAt.getTime())) {
      card.lastActivityAt = bundle.lastActivityAt;
    }

    cardMap.set(key, card);
  }

  return [...cardMap.values()]
    .map((card) => {
      const riskScore =
        card.failedTasks * 72 +
        card.callbackFailures * 44 +
        card.queuedTasks * 18 +
        card.inFlightOrders * 10 +
        (!card.isConfigured && card.orderCount > 0 ? 52 : 0) +
        (!card.isActive ? 20 : 0);
      const successRate = card.orderCount > 0 ? Math.round((card.succeededOrders / card.orderCount) * 100) : 0;
      let statusTone: PaymentTone = "success";
      let statusLabel = "健康";
      let statusSummary = `成功订单占比 ${successRate}% ，最近支付链路保持稳定。`;

      if (!card.isConfigured && card.orderCount > 0) {
        statusTone = "warning";
        statusLabel = "未建档";
        statusSummary = "当前视图里出现了未绑定商户档案的订单链路，建议优先核对商户参数。";
      } else if (!card.isActive) {
        statusTone = "muted";
        statusLabel = "已停用";
        statusSummary = "该商户参数已停用，当前不参与新订单路由。";
      } else if (card.failedTasks > 0 || card.callbackFailures > 0) {
        statusTone = "warning";
        statusLabel = "高风险";
        statusSummary = `存在 ${card.callbackFailures} 条异常回调、${card.failedTasks} 条失败补偿，需要尽快排障。`;
      } else if (card.queuedTasks > 0 || card.inFlightOrders > 0) {
        statusTone = "muted";
        statusLabel = "观察中";
        statusSummary = `还有 ${card.inFlightOrders} 笔在途订单、${card.queuedTasks} 条待执行补偿。`;
      } else if (card.orderCount === 0) {
        statusTone = "muted";
        statusLabel = "暂无流量";
        statusSummary = "当前筛选窗口内还没有新的支付链路进入该商户。";
      }

      return {
        ...card,
        statusTone,
        statusLabel,
        statusSummary,
        riskScore,
      };
    })
    .filter((card) => card.orderCount > 0 || card.isDefault || card.isActive)
    .sort((left, right) => {
      if (right.riskScore !== left.riskScore) {
        return right.riskScore - left.riskScore;
      }

      const rightTime = right.lastActivityAt?.getTime() ?? 0;
      const leftTime = left.lastActivityAt?.getTime() ?? 0;

      if (rightTime !== leftTime) {
        return rightTime - leftTime;
      }

      return right.orderCount - left.orderCount;
    })
    .slice(0, 6);
}

function getPercent(part: number, total: number) {
  if (total <= 0) {
    return null;
  }

  return Math.round((part / total) * 100);
}

function formatPercentValue(value: number | null) {
  return value == null ? "暂无" : `${value}%`;
}

function buildPaymentSlaSnapshot(data: PaymentOperationsData): PaymentSlaSnapshot {
  const successRate = getPercent(data.summary.succeededAttempts, data.summary.totalAttempts);
  const callbackCloseRate = getPercent(data.summary.succeededCallbacks, data.summary.totalCallbacks);
  const inflightRate = getPercent(data.summary.inFlightAttempts, data.summary.totalAttempts);
  const backlogCount = data.summary.queuedSyncTasks + data.summary.failedSyncTasks;

  if (
    data.summary.totalAttempts === 0 &&
    data.summary.totalCallbacks === 0 &&
    data.summary.queuedSyncTasks === 0 &&
    data.summary.failedSyncTasks === 0
  ) {
    return {
      grade: "N/A",
      headline: "支付链路等待首笔真实样本",
      detail: "当前还没有足够的支付样本沉淀 SLA，建议先完成一次真实下单和回调联调。",
      tone: "muted",
      metrics: [
        {
          label: "支付成功率",
          value: "暂无",
          detail: "首笔支付尝试完成后开始计算。",
          tone: "muted",
        },
        {
          label: "回调闭环率",
          value: "暂无",
          detail: "首条回调进入后开始统计。",
          tone: "muted",
        },
        {
          label: "在途压力",
          value: "暂无",
          detail: "当前没有支付尝试仍在处理。",
          tone: "muted",
        },
        {
          label: "补偿积压",
          value: "0",
          detail: "当前没有待执行或失败补偿。",
          tone: "success",
        },
      ],
    };
  }

  const scoreParts = [
    successRate ?? 100,
    callbackCloseRate ?? 100,
    Math.max(0, 100 - (inflightRate ?? 0)),
    Math.max(0, 100 - backlogCount * 12),
  ];
  const score = Math.round(scoreParts.reduce((sum, item) => sum + item, 0) / scoreParts.length);
  const tone: PaymentTone = score >= 88 ? "success" : score >= 70 ? "muted" : "warning";
  const grade = score >= 94 ? "A+" : score >= 88 ? "A" : score >= 78 ? "B" : score >= 70 ? "C" : "D";
  const headline =
    tone === "success"
      ? "当前支付链路稳定，已接近企业级日常运行状态。"
      : tone === "muted"
        ? "支付链路整体可控，但仍有几个环节需要持续观察。"
        : "支付链路存在明显波动，建议按异常队列优先处理。";
  const detail =
    backlogCount > 0
      ? `当前仍有 ${backlogCount} 条补偿任务堆积，优先清空失败补偿会更快提升整体 SLA。`
      : "当前没有明显的补偿积压，可以重点关注成功率和回调闭环率。";

  return {
    grade,
    headline,
    detail,
    tone,
    metrics: [
      {
        label: "支付成功率",
        value: formatPercentValue(successRate),
        detail: `${data.summary.succeededAttempts}/${data.summary.totalAttempts} 笔支付尝试已成功。`,
        tone: successRate == null ? "muted" : successRate >= 80 ? "success" : successRate >= 60 ? "muted" : "warning",
      },
      {
        label: "回调闭环率",
        value: formatPercentValue(callbackCloseRate),
        detail: `${data.summary.succeededCallbacks}/${data.summary.totalCallbacks} 条回调已被成功处理。`,
        tone:
          callbackCloseRate == null
            ? "muted"
            : callbackCloseRate >= 90
              ? "success"
              : callbackCloseRate >= 70
                ? "muted"
                : "warning",
      },
      {
        label: "在途压力",
        value: formatPercentValue(inflightRate),
        detail: `${data.summary.inFlightAttempts} 笔支付尝试仍在建单、待支付或处理中。`,
        tone: inflightRate == null ? "muted" : inflightRate <= 20 ? "success" : inflightRate <= 40 ? "muted" : "warning",
      },
      {
        label: "补偿积压",
        value: `${backlogCount}`,
        detail: `待执行 ${data.summary.queuedSyncTasks} / 失败 ${data.summary.failedSyncTasks}`,
        tone: backlogCount === 0 ? "success" : data.summary.failedSyncTasks > 0 ? "warning" : "muted",
      },
    ],
  };
}

function formatTrendBucketLabel(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:00`;
}

function buildPaymentTrendBuckets(data: PaymentOperationsData) {
  const bucketCount = 6;
  const bucketMs = 4 * 60 * 60 * 1000;
  const end = Date.now();
  const start = end - bucketCount * bucketMs;
  const buckets: PaymentTrendBucket[] = Array.from({ length: bucketCount }, (_, index) => {
    const bucketStart = new Date(start + index * bucketMs);

    return {
      key: `${bucketStart.toISOString()}-${index}`,
      label: formatTrendBucketLabel(bucketStart),
      attempts: 0,
      succeeded: 0,
      callbackFailures: 0,
      syncPressure: 0,
    };
  });

  function getBucketIndex(time: Date) {
    const diff = time.getTime() - start;

    if (diff < 0) {
      return -1;
    }

    const index = Math.floor(diff / bucketMs);
    return index >= 0 && index < bucketCount ? index : -1;
  }

  for (const attempt of data.attempts) {
    const index = getBucketIndex(attempt.createdAt);

    if (index === -1) {
      continue;
    }

    buckets[index].attempts += 1;

    if (attempt.status === "SUCCEEDED") {
      buckets[index].succeeded += 1;
    }
  }

  for (const log of data.callbackLogs) {
    const index = getBucketIndex(log.createdAt);

    if (index === -1) {
      continue;
    }

    if (log.processingStatus === "FAILED" || log.processingStatus === "REJECTED" || !log.signatureValid) {
      buckets[index].callbackFailures += 1;
    }
  }

  for (const task of data.syncTasks) {
    const index = getBucketIndex(task.createdAt);

    if (index === -1) {
      continue;
    }

    if (task.status === "PENDING" || task.status === "RUNNING" || task.status === "FAILED") {
      buckets[index].syncPressure += 1;
    }
  }

  const chartMax = Math.max(
    1,
    ...buckets.flatMap((bucket) => [bucket.attempts, bucket.succeeded, bucket.callbackFailures, bucket.syncPressure]),
  );

  return {
    buckets,
    chartMax,
    sampleSize: data.attempts.length + data.callbackLogs.length + data.syncTasks.length,
  };
}

function buildPaymentRecommendations(input: {
  scope: "admin" | "merchant";
  data: PaymentOperationsData;
  basePath: string;
  merchantHealthCards: MerchantHealthCard[];
}) {
  const recommendations: PaymentRecommendation[] = [];

  if (input.data.summary.failedSyncTasks > 0) {
    recommendations.push({
      id: "failed-sync",
      title: "优先清空失败补偿任务",
      detail: `当前有 ${input.data.summary.failedSyncTasks} 条补偿执行失败，先处理这里最能直接改善履约稳定性。`,
      tone: "warning",
      href: buildPaymentOperationsHref(input.basePath, {
        ...input.data.filters,
        syncStatus: "failed",
      }),
      cta: "查看失败补偿",
    });
  }

  if (input.data.summary.failedCallbacks > 0) {
    recommendations.push({
      id: "failed-callbacks",
      title: "排查异常回调和签名配置",
      detail: `当前有 ${input.data.summary.failedCallbacks} 条回调失败或被拒绝，建议核对 notify secret、traceId 与订单映射。`,
      tone: "warning",
      href: buildPaymentOperationsHref(input.basePath, {
        ...input.data.filters,
        callbackStatus: "failed",
      }),
      cta: "查看异常回调",
    });
  }

  if (input.data.summary.inFlightAttempts > 0) {
    recommendations.push({
      id: "in-flight",
      title: "关注长时间在途的支付尝试",
      detail: `还有 ${input.data.summary.inFlightAttempts} 笔支付仍在生命周期中，适合集中检查建单、收银台和超时状态。`,
      tone: "muted",
      href: buildPaymentOperationsHref(input.basePath, {
        ...input.data.filters,
        attemptStatus: "in_flight",
      }),
      cta: "查看进行中订单",
    });
  }

  if (input.scope === "admin") {
    const riskiestMerchant = input.merchantHealthCards.find((card) => card.riskScore > 0 && card.paymentProfileId);

    if (riskiestMerchant?.paymentProfileId) {
      recommendations.push({
        id: "merchant-health",
        title: `重点关注商户 ${riskiestMerchant.name}`,
        detail: riskiestMerchant.statusSummary,
        tone: riskiestMerchant.statusTone,
        href: buildPaymentProfileHref(input.basePath, input.data, riskiestMerchant.paymentProfileId),
        cta: "进入商户视图",
      });
    }
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "stable",
      title: "链路当前稳定，可继续做联调巡检",
      detail:
        input.data.summary.totalAttempts === 0
          ? "当前还没有真实支付样本，建议先跑一笔测试订单，完成回调和发卡闭环。"
          : "当前未发现高优先级异常，可以继续关注商品配置、商户路由和真实交易转化。",
      tone: "success",
      href: input.data.summary.totalAttempts === 0 ? (input.scope === "admin" ? "/admin/products" : "/merchant/products") : input.basePath,
      cta: input.data.summary.totalAttempts === 0 ? "前往商品中心" : "返回支付总览",
    });
  }

  return recommendations.slice(0, 4);
}

function formatLatencyMinutes(minutes: number | null) {
  if (minutes == null) {
    return "暂无";
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remain = minutes % 60;

  if (remain === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remain}m`;
}

function percentile(sortedValues: number[], ratio: number) {
  if (sortedValues.length === 0) {
    return null;
  }

  const index = Math.min(sortedValues.length - 1, Math.max(0, Math.ceil(sortedValues.length * ratio) - 1));
  return sortedValues[index];
}

function getBundleClosureMinutes(bundle: PaymentOrderBundle) {
  if (!bundle.attempt) {
    return null;
  }

  const isTerminalAttempt =
    bundle.attemptStatus === "SUCCEEDED" ||
    bundle.attemptStatus === "FAILED" ||
    bundle.attemptStatus === "CANCELLED" ||
    bundle.attemptStatus === "EXPIRED";
  const isTerminalOrder =
    bundle.orderStatus === "FULFILLED" || bundle.orderStatus === "FAILED" || bundle.orderStatus === "EXPIRED";
  const callbackFinished = bundle.callbacks.some((log) => log.processingStatus === "SUCCEEDED");
  const taskFinished = bundle.syncTasks.some((task) => task.status === "SUCCEEDED" || task.status === "FAILED");

  if (!isTerminalAttempt && !isTerminalOrder && !callbackFinished && !taskFinished) {
    return null;
  }

  const closingCandidates = [
    bundle.attempt.updatedAt,
    bundle.attempt.lastSyncedAt,
    ...bundle.callbacks
      .filter((log) => log.processingStatus === "SUCCEEDED")
      .map((log) => log.createdAt),
    ...bundle.syncTasks.filter((task) => task.finishedAt).map((task) => task.finishedAt as Date),
  ].filter((value): value is Date => Boolean(value));

  const closingAt =
    closingCandidates.sort((left, right) => right.getTime() - left.getTime())[0] ?? bundle.attempt.updatedAt;
  const diff = Math.max(0, closingAt.getTime() - bundle.attempt.createdAt.getTime());

  return Math.round(diff / 60000);
}

function buildPaymentLatencySnapshot(orderBundles: PaymentOrderBundle[]): PaymentLatencySnapshot {
  const observedLatencies = orderBundles
    .map((bundle) => getBundleClosureMinutes(bundle))
    .filter((value): value is number => value != null)
    .sort((left, right) => left - right);
  const inFlightCount = orderBundles.filter((bundle) => bundle.attempt && getBundleClosureMinutes(bundle) == null).length;
  const callbackOnlyCount = orderBundles.filter((bundle) => !bundle.attempt && bundle.callbacks.length > 0).length;
  const bandDefinitions = [
    {
      key: "under-5",
      label: "5 分钟内",
      tone: "success" as const,
      matcher: (minutes: number) => minutes < 5,
      detail: "支付与履约几乎实时闭环。",
    },
    {
      key: "under-15",
      label: "5-15 分钟",
      tone: "success" as const,
      matcher: (minutes: number) => minutes >= 5 && minutes < 15,
      detail: "大多数企业级支付链路会落在这个区间。",
    },
    {
      key: "under-30",
      label: "15-30 分钟",
      tone: "muted" as const,
      matcher: (minutes: number) => minutes >= 15 && minutes < 30,
      detail: "已出现可感知等待，建议关注回调与补偿效率。",
    },
    {
      key: "under-60",
      label: "30-60 分钟",
      tone: "warning" as const,
      matcher: (minutes: number) => minutes >= 30 && minutes < 60,
      detail: "闭环明显偏慢，需要检查支付和履约链路阻塞点。",
    },
    {
      key: "over-60",
      label: "60 分钟以上",
      tone: "warning" as const,
      matcher: (minutes: number) => minutes >= 60,
      detail: "这类订单应优先进入人工排障或补偿。",
    },
    {
      key: "in-flight",
      label: "仍在进行中",
      tone: "muted" as const,
      matcher: () => false,
      detail: "订单还没有走到可观测的闭环终点。",
    },
  ];

  const bands = bandDefinitions.map((band) => ({
    key: band.key,
    label: band.label,
    tone: band.tone,
    count: band.key === "in-flight" ? inFlightCount : observedLatencies.filter((minutes) => band.matcher(minutes)).length,
    detail: band.detail,
  }));

  return {
    observedCount: observedLatencies.length,
    inFlightCount,
    callbackOnlyCount,
    p50: formatLatencyMinutes(percentile(observedLatencies, 0.5)),
    p90: formatLatencyMinutes(percentile(observedLatencies, 0.9)),
    longest: formatLatencyMinutes(observedLatencies[observedLatencies.length - 1] ?? null),
    bands,
  };
}

function buildMerchantSlaRanks(
  merchantHealthCards: MerchantHealthCard[],
  orderBundles: PaymentOrderBundle[],
): MerchantSlaRank[] {
  const latencyBucketByMerchant = new Map<string, number[]>();
  const closedCountByMerchant = new Map<string, number>();
  const merchantKeyByCode = new Map(
    merchantHealthCards.filter((card) => card.merchantCode).map((card) => [card.merchantCode as string, card.key]),
  );
  const merchantKeyByName = new Map(merchantHealthCards.map((card) => [card.name, card.key]));

  for (const bundle of orderBundles) {
    const merchantKey =
      (bundle.merchantCode ? merchantKeyByCode.get(bundle.merchantCode) : undefined) ??
      (bundle.merchantName ? merchantKeyByName.get(bundle.merchantName) : undefined);

    if (!merchantKey) {
      continue;
    }

    const closureMinutes = getBundleClosureMinutes(bundle);

    if (closureMinutes != null) {
      latencyBucketByMerchant.set(merchantKey, [...(latencyBucketByMerchant.get(merchantKey) ?? []), closureMinutes]);
      closedCountByMerchant.set(merchantKey, (closedCountByMerchant.get(merchantKey) ?? 0) + 1);
    }
  }

  return merchantHealthCards
    .filter((card) => card.orderCount > 0)
    .map((card) => {
      const latencies = (latencyBucketByMerchant.get(card.key) ?? []).sort((left, right) => left - right);
      const avgLatencyMinutes =
        latencies.length > 0 ? Math.round(latencies.reduce((sum, item) => sum + item, 0) / latencies.length) : null;
      const successRateValue = getPercent(card.succeededOrders, card.orderCount) ?? 0;
      const closureRateValue = getPercent(closedCountByMerchant.get(card.key) ?? 0, card.orderCount) ?? 0;
      const latencyScore = avgLatencyMinutes == null ? 42 : Math.max(0, 100 - Math.min(avgLatencyMinutes, 120));
      const score = Math.max(
        0,
        Math.min(
          100,
          Math.round(
            successRateValue * 0.48 +
              closureRateValue * 0.22 +
              latencyScore * 0.18 +
              (card.isActive ? 8 : 0) -
              Math.min(card.riskScore, 120) * 0.14,
          ),
        ),
      );
      const tone: PaymentTone = score >= 88 ? "success" : score >= 72 ? "muted" : "warning";
      const grade = score >= 94 ? "A+" : score >= 88 ? "A" : score >= 80 ? "B" : score >= 72 ? "C" : "D";
      const summary =
        tone === "success"
          ? "成功率和闭环速度都比较稳。"
          : tone === "muted"
            ? "整体可控，但还有继续优化空间。"
            : "异常浓度或闭环速度已经影响 SLA。";

      return {
        key: card.key,
        rank: 0,
        name: card.name,
        merchantCode: card.merchantCode,
        paymentProfileId: card.paymentProfileId,
        orderCount: card.orderCount,
        successRate: formatPercentValue(getPercent(card.succeededOrders, card.orderCount)),
        closureRate: formatPercentValue(getPercent(closedCountByMerchant.get(card.key) ?? 0, card.orderCount)),
        avgLatency: formatLatencyMinutes(avgLatencyMinutes),
        grade,
        score,
        tone,
        summary,
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return right.orderCount - left.orderCount;
    })
    .slice(0, 6)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}

function buildChannelHref(basePath: string, data: PaymentOperationsData, channelCode: string) {
  return buildPaymentOperationsHref(basePath, {
    ...data.filters,
    channelCode,
  });
}

function buildChannelInsightCards(
  data: PaymentOperationsData,
  orderBundles: PaymentOrderBundle[],
  basePath: string,
): ChannelInsightCard[] {
  const channelMap = new Map<string, Omit<ChannelInsightCard, "successRate" | "tone" | "summary" | "href">>();

  for (const attempt of data.attempts) {
    const entry = channelMap.get(attempt.channelCode) ?? {
      key: attempt.channelCode,
      channelCode: attempt.channelCode,
      attemptCount: 0,
      succeededCount: 0,
      inFlightCount: 0,
      callbackFailures: 0,
      queuedTasks: 0,
      failedTasks: 0,
      totalAmountCents: 0,
      averageAmountCents: null,
    };

    entry.attemptCount += 1;
    entry.totalAmountCents += attempt.amountCents;

    if (attempt.status === "SUCCEEDED") {
      entry.succeededCount += 1;
    }

    if (attempt.status === "CREATED" || attempt.status === "PENDING" || attempt.status === "PROCESSING") {
      entry.inFlightCount += 1;
    }

    channelMap.set(attempt.channelCode, entry);
  }

  for (const bundle of orderBundles) {
    if (!bundle.channelCode) {
      continue;
    }

    const diagnostics = getOrderBundleDiagnostics(bundle);
    const entry = channelMap.get(bundle.channelCode) ?? {
      key: bundle.channelCode,
      channelCode: bundle.channelCode,
      attemptCount: 0,
      succeededCount: 0,
      inFlightCount: 0,
      callbackFailures: 0,
      queuedTasks: 0,
      failedTasks: 0,
      totalAmountCents: 0,
      averageAmountCents: null,
    };

    entry.callbackFailures += diagnostics.failedCallbacks;
    entry.queuedTasks += diagnostics.queuedTasks;
    entry.failedTasks += diagnostics.failedTasks;

    channelMap.set(bundle.channelCode, entry);
  }

  return [...channelMap.values()]
    .map((entry) => {
      const successRateValue = getPercent(entry.succeededCount, entry.attemptCount);
      const averageAmountCents = entry.attemptCount > 0 ? Math.round(entry.totalAmountCents / entry.attemptCount) : null;
      const tone: PaymentTone =
        entry.failedTasks > 0 || entry.callbackFailures > 0
          ? "warning"
          : entry.inFlightCount > 0 || entry.queuedTasks > 0
            ? "muted"
            : "success";
      const summary =
        tone === "warning"
          ? `存在 ${entry.callbackFailures} 条异常回调、${entry.failedTasks} 条失败补偿。`
          : tone === "muted"
            ? `还有 ${entry.inFlightCount} 笔在途订单、${entry.queuedTasks} 条待执行补偿。`
            : "当前通道链路稳定，可作为重点路由候选。";

      return {
        ...entry,
        averageAmountCents,
        successRate: formatPercentValue(successRateValue),
        tone,
        summary,
        href: buildChannelHref(basePath, data, entry.channelCode),
      };
    })
    .sort((left, right) => {
      const rightRisk = right.failedTasks + right.callbackFailures;
      const leftRisk = left.failedTasks + left.callbackFailures;

      if (rightRisk !== leftRisk) {
        return rightRisk - leftRisk;
      }

      if (right.attemptCount !== left.attemptCount) {
        return right.attemptCount - left.attemptCount;
      }

      return left.channelCode.localeCompare(right.channelCode);
    })
    .slice(0, 6);
}

function buildReconciliationCards(
  scope: "admin" | "merchant",
  data: PaymentOperationsData,
  orderBundles: PaymentOrderBundle[],
  merchantHealthCards: MerchantHealthCard[],
  basePath: string,
): ReconciliationCard[] {
  const cardMap = new Map<string, ReconciliationCard>();

  if (scope === "admin") {
    for (const merchant of merchantHealthCards) {
      cardMap.set(merchant.key, {
        key: merchant.key,
        name: merchant.name,
        merchantCode: merchant.merchantCode,
        paymentProfileId: merchant.paymentProfileId,
        paymentSuccessCount: 0,
        callbackSuccessCount: 0,
        fulfilledCount: 0,
        callbackGapCount: 0,
        fulfillmentGapCount: 0,
        failedTasks: 0,
        queuedTasks: 0,
        totalGapCount: 0,
        tone: "muted",
        summary: "等待支付样本进入当前商户。",
        href: merchant.paymentProfileId ? buildPaymentProfileHref(basePath, data, merchant.paymentProfileId) : basePath,
      });
    }
  } else {
    cardMap.set("merchant:self", {
      key: "merchant:self",
      name: "当前商户",
      merchantCode: null,
      paymentProfileId: null,
      paymentSuccessCount: 0,
      callbackSuccessCount: 0,
      fulfilledCount: 0,
      callbackGapCount: 0,
      fulfillmentGapCount: 0,
      failedTasks: 0,
      queuedTasks: 0,
      totalGapCount: 0,
      tone: "muted",
      summary: "等待支付样本进入当前商户。",
      href: basePath,
    });
  }

  const merchantCodeToKey = new Map(
    merchantHealthCards.filter((card) => card.merchantCode).map((card) => [card.merchantCode as string, card.key]),
  );
  const merchantNameToKey = new Map(merchantHealthCards.map((card) => [card.name, card.key]));

  for (const bundle of orderBundles) {
    const key =
      scope === "admin"
        ? (bundle.merchantCode ? merchantCodeToKey.get(bundle.merchantCode) : undefined) ??
          (bundle.merchantName ? merchantNameToKey.get(bundle.merchantName) : undefined) ??
          `unknown:${bundle.key}`
        : "merchant:self";
    const existing = cardMap.get(key) ?? {
      key,
      name: bundle.merchantName ?? "待识别商户",
      merchantCode: bundle.merchantCode,
      paymentProfileId: null,
      paymentSuccessCount: 0,
      callbackSuccessCount: 0,
      fulfilledCount: 0,
      callbackGapCount: 0,
      fulfillmentGapCount: 0,
      failedTasks: 0,
      queuedTasks: 0,
      totalGapCount: 0,
      tone: "muted" as PaymentTone,
      summary: "等待支付样本进入当前商户。",
      href: basePath,
    };
    const diagnostics = getOrderBundleDiagnostics(bundle);
    const callbackClosed = bundle.callbacks.some((log) => log.processingStatus === "SUCCEEDED");
    const paymentSucceeded = bundle.attemptStatus === "SUCCEEDED";
    const fulfilled = bundle.orderStatus === "FULFILLED";

    existing.paymentSuccessCount += paymentSucceeded ? 1 : 0;
    existing.callbackSuccessCount += callbackClosed ? 1 : 0;
    existing.fulfilledCount += fulfilled ? 1 : 0;
    existing.callbackGapCount += paymentSucceeded && !callbackClosed ? 1 : 0;
    existing.fulfillmentGapCount += (paymentSucceeded || callbackClosed) && !fulfilled ? 1 : 0;
    existing.failedTasks += diagnostics.failedTasks;
    existing.queuedTasks += diagnostics.queuedTasks;

    cardMap.set(key, existing);
  }

  return [...cardMap.values()]
    .map((card) => {
      const totalGapCount = card.callbackGapCount + card.fulfillmentGapCount + card.failedTasks + card.queuedTasks;
      const tone: PaymentTone = totalGapCount > 0 ? (card.failedTasks > 0 || card.callbackGapCount > 0 ? "warning" : "muted") : "success";
      const summary =
        tone === "warning"
          ? `当前仍有 ${card.callbackGapCount} 笔待回调闭环、${card.fulfillmentGapCount} 笔待履约闭环。`
          : tone === "muted"
            ? `当前还有 ${card.queuedTasks} 条补偿待执行，建议继续观察。`
            : "支付、回调和履约当前已经基本对齐。";

      return {
        ...card,
        totalGapCount,
        tone,
        summary,
      };
    })
    .filter((card) => scope === "merchant" || card.paymentSuccessCount + card.callbackSuccessCount + card.fulfilledCount + card.totalGapCount > 0)
    .sort((left, right) => {
      if (right.totalGapCount !== left.totalGapCount) {
        return right.totalGapCount - left.totalGapCount;
      }

      return right.paymentSuccessCount - left.paymentSuccessCount;
    })
    .slice(0, scope === "admin" ? 6 : 1);
}

function buildAuditEvents(
  orderBundles: PaymentOrderBundle[],
  data: PaymentOperationsData,
  basePath: string,
): PaymentAuditEvent[] {
  const events: PaymentAuditEvent[] = [];

  for (const bundle of orderBundles) {
    const href = buildFocusedOrderHref(basePath, data, bundle);
    const orderLabel = bundle.orderNo || "等待识别订单";
    const merchantLabel = bundle.merchantName ?? "待识别商户";

    if (bundle.attempt) {
      events.push({
        id: `audit-attempt-created-${bundle.attempt.id}`,
        time: bundle.attempt.createdAt,
        lane: "payment",
        laneLabel: "支付",
        title: "发起支付尝试",
        detail: `${describeOrderAmount(bundle.attempt.amountCents)} · ${bundle.attempt.channelCode}`,
        tone: "muted",
        orderLabel,
        merchantLabel,
        href,
      });

      if (bundle.attemptStatus === "SUCCEEDED") {
        events.push({
          id: `audit-attempt-succeeded-${bundle.attempt.id}`,
          time: bundle.attempt.lastSyncedAt ?? bundle.attempt.updatedAt,
          lane: "payment",
          laneLabel: "支付",
          title: "NovaPay 支付成功",
          detail: `${bundle.attempt.novapayOrderId ?? "待补网关单号"} · ${bundle.channelCode ?? "待识别通道"}`,
          tone: "success",
          orderLabel,
          merchantLabel,
          href,
        });
      } else if (bundle.attemptStatus === "FAILED" || bundle.attemptStatus === "CANCELLED" || bundle.attemptStatus === "EXPIRED") {
        events.push({
          id: `audit-attempt-terminal-${bundle.attempt.id}`,
          time: bundle.attempt.updatedAt,
          lane: "payment",
          laneLabel: "支付",
          title: `支付尝试${getPaymentAttemptStatusLabel(bundle.attemptStatus)}`,
          detail: `${bundle.attempt.externalOrderId} · ${bundle.channelCode ?? "待识别通道"}`,
          tone: bundle.attemptStatus === "FAILED" ? "warning" : "muted",
          orderLabel,
          merchantLabel,
          href,
        });
      }
    }

    for (const log of bundle.callbacks) {
      events.push({
        id: `audit-callback-${log.id}`,
        time: log.updatedAt,
        lane: "callback",
        laneLabel: "回调",
        title: `NovaPay 回调${getWebhookProcessingStatusLabel(log.processingStatus)}`,
        detail: `${log.eventType} · ${log.signatureValid ? "签名有效" : "签名失败"}`,
        tone: log.signatureValid && log.processingStatus === "SUCCEEDED" ? "success" : "warning",
        orderLabel,
        merchantLabel,
        href,
      });
    }

    for (const task of bundle.syncTasks) {
      events.push({
        id: `audit-sync-created-${task.id}`,
        time: task.createdAt,
        lane: "sync",
        laneLabel: "补偿",
        title: `${formatTaskType(task.taskType)}入队`,
        detail: `${getSyncTaskStatusLabel(task.status)} · 第 ${task.retryCount} 次执行`,
        tone: task.status === "FAILED" ? "warning" : "muted",
        orderLabel,
        merchantLabel,
        href,
      });

      if (task.finishedAt) {
        events.push({
          id: `audit-sync-finished-${task.id}`,
          time: task.finishedAt,
          lane: "sync",
          laneLabel: "补偿",
          title: task.status === "FAILED" ? `${formatTaskType(task.taskType)}失败` : `${formatTaskType(task.taskType)}完成`,
          detail: task.lastError ?? "补偿执行完成并已回写链路状态。",
          tone: task.status === "FAILED" ? "warning" : "success",
          orderLabel,
          merchantLabel,
          href,
        });
      }
    }

    if (bundle.orderStatus === "FULFILLED") {
      events.push({
        id: `audit-fulfillment-${bundle.key}`,
        time: bundle.lastActivityAt ?? bundle.attempt?.shopOrder.updatedAt ?? new Date(),
        lane: "fulfillment",
        laneLabel: "履约",
        title: "订单已自动发货",
        detail: `${bundle.productName} / ${bundle.skuName}`,
        tone: "success",
        orderLabel,
        merchantLabel,
        href,
      });
    } else if (bundle.orderStatus === "FAILED" || bundle.orderStatus === "EXPIRED") {
      events.push({
        id: `audit-fulfillment-terminal-${bundle.key}`,
        time: bundle.lastActivityAt ?? bundle.attempt?.shopOrder.updatedAt ?? new Date(),
        lane: "fulfillment",
        laneLabel: "履约",
        title: `订单${getOrderStatusLabel(bundle.orderStatus)}`,
        detail: `${bundle.productName} / ${bundle.skuName}`,
        tone: "warning",
        orderLabel,
        merchantLabel,
        href,
      });
    }
  }

  return events.sort((left, right) => right.time.getTime() - left.time.getTime()).slice(0, 18);
}

function buildAuditSnapshot(
  events: PaymentAuditEvent[],
  orderBundles: PaymentOrderBundle[],
  reconciliationCards: ReconciliationCard[],
): PaymentAuditSnapshot {
  const signatureFailures = orderBundles.reduce(
    (sum, bundle) => sum + bundle.callbacks.filter((log) => !log.signatureValid).length,
    0,
  );
  const issueOrders = orderBundles.filter((bundle) => buildOrderBundleFlags(bundle).length > 0).length;
  const callbackGapCount = reconciliationCards.reduce((sum, card) => sum + card.callbackGapCount, 0);
  const fulfillmentGapCount = reconciliationCards.reduce((sum, card) => sum + card.fulfillmentGapCount, 0);
  const failedSyncCount = reconciliationCards.reduce((sum, card) => sum + card.failedTasks, 0);
  const highlights: string[] = [];

  if (signatureFailures > 0) {
    highlights.push(`发现 ${signatureFailures} 条签名失败回调，建议优先核对 notify secret 与来源 IP。`);
  }

  if (callbackGapCount > 0) {
    highlights.push(`有 ${callbackGapCount} 笔支付成功后仍未完成回调闭环，可能存在通知丢失或事件消费异常。`);
  }

  if (fulfillmentGapCount > 0) {
    highlights.push(`有 ${fulfillmentGapCount} 笔订单已完成支付或回调，但还没有完成履约发货。`);
  }

  if (failedSyncCount > 0) {
    highlights.push(`当前仍有 ${failedSyncCount} 条失败补偿任务，建议纳入人工审计处理。`);
  }

  if (highlights.length === 0) {
    highlights.push("当前支付、回调、补偿和履约链路已基本对齐，审计面没有发现高优先级缺口。");
  }

  return {
    totalEvents: events.length,
    paymentEvents: events.filter((event) => event.lane === "payment").length,
    callbackEvents: events.filter((event) => event.lane === "callback").length,
    syncEvents: events.filter((event) => event.lane === "sync").length,
    fulfillmentEvents: events.filter((event) => event.lane === "fulfillment").length,
    signatureFailures,
    issueOrders,
    highlights: highlights.slice(0, 4),
  };
}

function getControlAuditScopeLabel(scope: PaymentOperationsData["controlAuditLogs"][number]["scope"]) {
  return scope === "MERCHANT" ? "商户" : "平台";
}

function getControlAuditScopeTone(scope: PaymentOperationsData["controlAuditLogs"][number]["scope"]): PaymentTone {
  return scope === "MERCHANT" ? "success" : "muted";
}

function getControlAuditRiskLabel(riskLevel: PaymentOperationsData["controlAuditLogs"][number]["riskLevel"]) {
  switch (riskLevel) {
    case "CRITICAL":
      return "核心风险";
    case "HIGH":
      return "高风险";
    case "MEDIUM":
      return "配置变更";
    case "LOW":
    default:
      return "常规";
  }
}

function getControlAuditRiskTone(riskLevel: PaymentOperationsData["controlAuditLogs"][number]["riskLevel"]): PaymentTone {
  switch (riskLevel) {
    case "CRITICAL":
    case "HIGH":
      return "warning";
    case "MEDIUM":
      return "muted";
    case "LOW":
    default:
      return "success";
  }
}

function getControlAuditOutcomeLabel(outcome: PaymentOperationsData["controlAuditLogs"][number]["outcome"]) {
  return outcome === "FAILED" ? "执行失败" : "已留痕";
}

function getControlAuditOutcomeTone(outcome: PaymentOperationsData["controlAuditLogs"][number]["outcome"]): PaymentTone {
  return outcome === "FAILED" ? "warning" : "success";
}

function getControlAuditReviewLabel(
  reviewStatus: PaymentOperationsData["controlAuditLogs"][number]["reviewStatus"],
) {
  return reviewStatus === "REVIEWED" ? "已复核" : "待复核";
}

function getControlAuditReviewTone(
  reviewStatus: PaymentOperationsData["controlAuditLogs"][number]["reviewStatus"],
): PaymentTone {
  return reviewStatus === "REVIEWED" ? "success" : "warning";
}

function formatControlAuditActionType(actionType: string) {
  switch (actionType) {
    case "PAYMENT_PROFILE_CREATED":
      return "新增支付配置";
    case "PAYMENT_PROFILE_UPDATED":
      return "更新支付配置";
    case "PAYMENT_PROFILE_ROLLBACK":
      return "回滚支付配置";
    case "PAYMENT_ORDER_REFRESH":
      return "订单状态重查";
    case "SYNC_TASK_EXECUTED":
      return "执行补偿任务";
    case "WEBHOOK_REPLAY_EXECUTED":
      return "回放支付回调";
    default:
      return actionType;
  }
}

function buildControlAuditSnapshot(
  logs: PaymentOperationsData["controlAuditLogs"],
): ControlAuditSnapshot {
  const configChangeCount = logs.filter((log) => log.targetType === "PAYMENT_PROFILE").length;
  const failedCount = logs.filter((log) => log.outcome === "FAILED").length;
  const highRiskCount = logs.filter((log) => log.riskLevel === "HIGH" || log.riskLevel === "CRITICAL").length;
  const pendingCount = logs.filter((log) => log.reviewStatus === "PENDING").length;
  const reviewedCount = logs.filter((log) => log.reviewStatus === "REVIEWED").length;
  const adminCount = logs.filter((log) => log.scope === "ADMIN").length;
  const merchantCount = logs.filter((log) => log.scope === "MERCHANT").length;
  const riskyOperationCount = logs.length - configChangeCount;
  const highlights: string[] = [];

  if (pendingCount > 0) {
    highlights.push(`最近还有 ${pendingCount} 条控制面留痕待复核，建议优先关闭高风险和失败操作。`);
  }

  if (failedCount > 0) {
    highlights.push(`最近 ${failedCount} 次控制面操作执行失败，建议优先复核手动重查、补偿和回放动作。`);
  }

  if (highRiskCount > 0) {
    highlights.push(`最近 ${highRiskCount} 次高风险动作已经留痕，可继续结合审计流水核对回写结果。`);
  }

  if (configChangeCount > 0) {
    highlights.push(`最近 ${configChangeCount} 次支付配置变更已落库，商户参数调整现在可以追溯到具体操作者。`);
  }

  if (adminCount > 0 && merchantCount > 0) {
    highlights.push("平台与商户控制台都在产生支付操作，建议定期复核多商户配置与人工干预边界。");
  }

  if (highlights.length === 0) {
    highlights.push("最近控制面操作整体平稳，配置变更和风险动作都已经进入统一留痕。");
  }

  return {
    totalLogs: logs.length,
    configChangeCount,
    riskyOperationCount,
    failedCount,
    highRiskCount,
    pendingCount,
    reviewedCount,
    adminCount,
    merchantCount,
    highlights: highlights.slice(0, 4),
  };
}

function buildControlAuditQuickViews(input: {
  scope: "admin" | "merchant";
  basePath: string;
  data: PaymentOperationsData;
  snapshot: ControlAuditSnapshot;
}): ControlAuditQuickView[] {
  const baseFilters = {
    ...input.data.filters,
  };
  const reviewAllActive =
    input.data.filters.controlReviewStatus === "all" &&
    input.data.filters.controlRiskLevel === "all" &&
    input.data.filters.controlOutcome === "all";

  return [
    {
      key: "pending",
      label: "待复核视角",
      count: input.snapshot.pendingCount,
      detail: "优先处理还没有闭环确认的控制面动作。",
      tone: "warning",
      href: buildPaymentOperationsHref(input.basePath, {
        ...baseFilters,
        controlReviewStatus: "pending",
        controlRiskLevel: "all",
        controlOutcome: "all",
      }),
      active:
        input.data.filters.controlReviewStatus === "pending" &&
        input.data.filters.controlRiskLevel === "all" &&
        input.data.filters.controlOutcome === "all",
    },
    {
      key: "high-risk",
      label: "高风险视角",
      count: input.snapshot.highRiskCount,
      detail: "聚焦高风险和核心风险动作，适合快速排障。",
      tone: "warning",
      href: buildPaymentOperationsHref(input.basePath, {
        ...baseFilters,
        controlReviewStatus: "all",
        controlRiskLevel: "high",
        controlOutcome: "all",
      }),
      active:
        input.data.filters.controlReviewStatus === "all" &&
        input.data.filters.controlRiskLevel === "high" &&
        input.data.filters.controlOutcome === "all",
    },
    {
      key: "failed",
      label: "失败操作视角",
      count: input.snapshot.failedCount,
      detail: "直接聚焦执行失败的回放、补偿和配置动作。",
      tone: "warning",
      href: buildPaymentOperationsHref(input.basePath, {
        ...baseFilters,
        controlReviewStatus: "all",
        controlRiskLevel: "all",
        controlOutcome: "failed",
      }),
      active:
        input.data.filters.controlReviewStatus === "all" &&
        input.data.filters.controlRiskLevel === "all" &&
        input.data.filters.controlOutcome === "failed",
    },
    {
      key: "all",
      label: input.scope === "admin" ? "平台控制台账" : "商户控制台账",
      count: input.snapshot.totalLogs,
      detail: "恢复当前上下文下的全部控制面留痕视图。",
      tone: "success",
      href: buildPaymentOperationsHref(input.basePath, {
        ...baseFilters,
        controlReviewStatus: "all",
        controlRiskLevel: "all",
        controlOutcome: "all",
      }),
      active: reviewAllActive,
    },
  ];
}

function shouldShowPaymentSection(visibleSectionIds: readonly string[] | undefined, sectionId: string) {
  if (!visibleSectionIds || visibleSectionIds.length === 0) {
    return true;
  }

  return visibleSectionIds.includes(sectionId);
}

export function PaymentOperationsView({
  scope,
  data,
  paymentProfiles,
  basePath: basePathOverride,
  visibleSectionIds,
}: {
  scope: "admin" | "merchant";
  data: PaymentOperationsData;
  paymentProfiles?: PaymentProfileOption[];
  basePath?: string;
  visibleSectionIds?: readonly string[];
}) {
  const empty =
    data.attempts.length === 0 &&
    data.callbackLogs.length === 0 &&
    data.syncTasks.length === 0 &&
    data.controlAuditLogs.length === 0;
  const basePath = basePathOverride ?? (scope === "admin" ? "/admin/payments" : "/merchant/payments");
  const refreshOrderAction =
    scope === "admin" ? refreshAdminPaymentOrderAction : refreshMerchantPaymentOrderAction;
  const runSyncTaskAction = scope === "admin" ? runAdminSyncTaskAction : runMerchantSyncTaskAction;
  const replayCallbackAction =
    scope === "admin" ? replayAdminCallbackLogAction : replayMerchantCallbackLogAction;
  const reviewControlAction = scope === "admin" ? updateControlAuditReviewAction : null;
  const activeFilters = buildActiveFilters(scope, data, paymentProfiles);
  const hasFilters = activeFilters.length > 0;
  const returnTo = buildReturnTo(basePath, data);
  const controlAuditExportHref = buildControlAuditExportHref(scope, data.filters);
  const controlAuditWeeklyExportHref = buildControlAuditWeeklyExportHref(scope, data.filters);
  const allOrderBundles = buildPaymentOrderBundles(data);
  const orderBundles = allOrderBundles.slice(0, 8);
  const orderAlerts = buildOrderAlertQueue(allOrderBundles);
  const merchantHealthCards = scope === "admin" ? buildMerchantHealthCards(allOrderBundles, paymentProfiles) : [];
  const slaSnapshot = buildPaymentSlaSnapshot(data);
  const trend = buildPaymentTrendBuckets(data);
  const latencySnapshot = buildPaymentLatencySnapshot(allOrderBundles);
  const merchantSlaRanks = scope === "admin" ? buildMerchantSlaRanks(merchantHealthCards, allOrderBundles) : [];
  const channelInsights = buildChannelInsightCards(data, allOrderBundles, basePath);
  const reconciliationCards = buildReconciliationCards(scope, data, allOrderBundles, merchantHealthCards, basePath);
  const auditEvents = buildAuditEvents(allOrderBundles, data, basePath);
  const auditSnapshot = buildAuditSnapshot(auditEvents, allOrderBundles, reconciliationCards);
  const controlAuditSnapshot = buildControlAuditSnapshot(data.controlAuditLogs);
  const controlAuditQuickViews = buildControlAuditQuickViews({
    scope,
    basePath,
    data,
    snapshot: controlAuditSnapshot,
  });
  const recommendations = buildPaymentRecommendations({
    scope,
    data,
    basePath,
    merchantHealthCards,
  });
  const showSummaryStrip =
    shouldShowPaymentSection(visibleSectionIds, "payment-priority") ||
    shouldShowPaymentSection(visibleSectionIds, "payment-command") ||
    shouldShowPaymentSection(visibleSectionIds, "payment-control") ||
    shouldShowPaymentSection(visibleSectionIds, "payment-audit");

  return (
    <>
      {shouldShowPaymentSection(visibleSectionIds, "payment-filters") ? (
        <section id="payment-filters" className="admin-anchor-target admin-content-grid admin-ops-filter-layout">
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Filter</p>
                <h2 className="order-title">支付筛选工作台</h2>
              </div>
              <Link href={basePath} className="button-link">
                重置
              </Link>
            </div>

            <form action={basePath} method="get" className="inline-form">
              <div className="admin-ops-filter-grid">
                <div className="field admin-ops-filter-field-wide">
                  <label htmlFor={`${scope}PaymentKeyword`}>关键词</label>
                  <input
                    id={`${scope}PaymentKeyword`}
                    name="keyword"
                    defaultValue={data.filters.keyword}
                    placeholder="订单号 / traceId / 客户邮箱 / 商品名"
                  />
                </div>

                {scope === "admin" ? (
                  <div className="field">
                    <label htmlFor="adminPaymentProfileId">支付商户</label>
                    <select
                      id="adminPaymentProfileId"
                      name="paymentProfileId"
                      defaultValue={data.filters.paymentProfileId}
                    >
                      <option value="all">全部商户</option>
                      {paymentProfiles?.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {buildPaymentProfileLabel(profile)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <div className="field">
                  <label htmlFor={`${scope}PaymentChannel`}>支付通道</label>
                  <select
                    id={`${scope}PaymentChannel`}
                    name="channelCode"
                    defaultValue={data.filters.channelCode}
                  >
                    <option value="all">全部通道</option>
                    {data.filterOptions.channelCodes.map((channelCode) => (
                      <option key={channelCode} value={channelCode}>
                        {channelCode}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}PaymentAttemptStatus`}>支付尝试</label>
                  <select
                    id={`${scope}PaymentAttemptStatus`}
                    name="attemptStatus"
                    defaultValue={data.filters.attemptStatus}
                  >
                    {PAYMENT_OPERATION_ATTEMPT_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getAttemptFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}PaymentCallbackStatus`}>回调状态</label>
                  <select
                    id={`${scope}PaymentCallbackStatus`}
                    name="callbackStatus"
                    defaultValue={data.filters.callbackStatus}
                  >
                    {PAYMENT_OPERATION_CALLBACK_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getCallbackFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}PaymentSyncStatus`}>补偿状态</label>
                  <select id={`${scope}PaymentSyncStatus`} name="syncStatus" defaultValue={data.filters.syncStatus}>
                    {PAYMENT_OPERATION_SYNC_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getSyncFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}ControlReviewStatus`}>控制复核</label>
                  <select
                    id={`${scope}ControlReviewStatus`}
                    name="controlReviewStatus"
                    defaultValue={data.filters.controlReviewStatus}
                  >
                    {PAYMENT_OPERATION_CONTROL_REVIEW_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getControlReviewFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}ControlRiskLevel`}>控制风险</label>
                  <select
                    id={`${scope}ControlRiskLevel`}
                    name="controlRiskLevel"
                    defaultValue={data.filters.controlRiskLevel}
                  >
                    {PAYMENT_OPERATION_CONTROL_RISK_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getControlRiskFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor={`${scope}ControlOutcome`}>控制结果</label>
                  <select
                    id={`${scope}ControlOutcome`}
                    name="controlOutcome"
                    defaultValue={data.filters.controlOutcome}
                  >
                    {PAYMENT_OPERATION_CONTROL_OUTCOME_FILTERS.map((option) => (
                      <option key={option} value={option}>
                        {getControlOutcomeFilterLabel(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="button-row compact">
                <button type="submit" className="button-secondary">
                  应用筛选
                </button>
                <Link href={basePath} className="button-link">
                  清空条件
                </Link>
              </div>
            </form>
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Snapshot</p>
                <h2 className="order-title">当前视图摘要</h2>
              </div>
              <span className="badge muted">{scope === "admin" ? "平台支付工作台" : "商户支付工作台"}</span>
            </div>

            <div className="admin-stock-strip admin-ops-filter-strip">
              <div>
                <span>支付尝试</span>
                <strong>{data.summary.totalAttempts}</strong>
              </div>
              <div>
                <span>回调事件</span>
                <strong>{data.summary.totalCallbacks}</strong>
              </div>
              <div>
                <span>补偿任务</span>
                <strong>{data.syncTasks.length}</strong>
              </div>
              <div>
                <span>生效条件</span>
                <strong>{activeFilters.length}</strong>
              </div>
            </div>

            {activeFilters.length > 0 ? (
              <div className="admin-inline-tags admin-ops-filter-tags">
                {activeFilters.map((item) => (
                  <span key={item} className="badge muted">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="small-copy admin-ops-filter-copy">
                当前展示的是最近支付链路全景，可继续按商户、通道和链路状态快速收口。
              </p>
            )}
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-priority") ? (
        <section
        id="payment-priority"
        className={`admin-anchor-target ${
          scope === "admin" ? "admin-content-grid" : "admin-content-grid admin-ops-wide-grid"
        }`}
      >
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Priority</p>
                <h2 className="order-title">异常优先级队列</h2>
              </div>
              <span className="badge muted">{orderAlerts.length} 条待关注链路</span>
            </div>

            {orderAlerts.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有需要升级处理的订单" : "最近没有高优先级支付异常"}</strong>
                <p>当补偿失败、回调异常或订单卡在待支付阶段时，这里会自动把最需要先处理的链路顶上来。</p>
              </div>
            ) : (
              <div className="admin-ops-priority-list">
                {orderAlerts.map((alert) => {
                  const actionableTask =
                    alert.bundle.syncTasks.find((task) => task.status !== "SUCCEEDED") ?? alert.bundle.syncTasks[0] ?? null;
                  const latestCallback = alert.bundle.callbacks[0] ?? null;
                  const focusHref = buildFocusedOrderHref(basePath, data, alert.bundle);

                  return (
                    <article key={alert.bundle.key} className="admin-ops-priority-item">
                      <div className="admin-ops-priority-head">
                        <div>
                          <div className="admin-inline-tags">
                            <span className={`badge ${alert.severityTone}`}>{alert.severityLabel}</span>
                            <span className="badge muted">{alert.bundle.channelCode ?? "待识别通道"}</span>
                          </div>
                          <h3>{alert.bundle.orderNo || "等待识别订单"}</h3>
                          <p className="small-copy">{alert.summary}</p>
                        </div>

                        <div className="admin-ops-priority-meta">
                          <div>
                            <span>商户</span>
                            <strong>{alert.bundle.merchantName ?? "待识别"}</strong>
                          </div>
                          <div>
                            <span>金额</span>
                            <strong>
                              {alert.bundle.amountCents != null ? describeOrderAmount(alert.bundle.amountCents) : "待识别"}
                            </strong>
                          </div>
                          <div>
                            <span>最近活动</span>
                            <strong>{alert.bundle.lastActivityAt ? formatDateTime(alert.bundle.lastActivityAt) : "暂无"}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="admin-inline-tags admin-ops-priority-reasons">
                        {alert.reasons.map((reason) => (
                          <span key={reason} className="badge warning">
                            {reason}
                          </span>
                        ))}
                      </div>

                      <div className="admin-ops-order-actions">
                        {actionableTask ? (
                          <form action={runSyncTaskAction}>
                            <input type="hidden" name="taskId" value={actionableTask.id} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              立即执行补偿
                            </button>
                          </form>
                        ) : alert.bundle.publicToken ? (
                          <form action={refreshOrderAction}>
                            <input type="hidden" name="publicToken" value={alert.bundle.publicToken} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              立即重查订单
                            </button>
                          </form>
                        ) : null}

                        {!actionableTask && latestCallback ? (
                          <form action={replayCallbackAction}>
                            <input type="hidden" name="logId" value={latestCallback.id} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              回放最新回调
                            </button>
                          </form>
                        ) : null}

                        <Link href={focusHref} className="button-link">
                          聚焦此单
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </article>
        </div>

        {scope === "admin" ? (
          <div className="admin-column-stack">
            <article className="admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Merchants</p>
                  <h2 className="order-title">商户支付健康看板</h2>
                </div>
                <span className="badge muted">{merchantHealthCards.length} 个商户视图</span>
              </div>

              {merchantHealthCards.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>当前还没有可观测的商户链路</strong>
                  <p>等支付商户配置完成并产生真实订单后，这里会自动按商户输出健康状态与异常浓度。</p>
                </div>
              ) : (
                <div className="admin-ops-merchant-grid">
                  {merchantHealthCards.map((card) => {
                    const successRate = card.orderCount > 0 ? Math.round((card.succeededOrders / card.orderCount) * 100) : 0;

                    return (
                      <article key={card.key} className="admin-ops-merchant-card">
                        <div className="admin-ops-merchant-head">
                          <div>
                            <div className="admin-inline-tags">
                              <span className={`badge ${card.statusTone}`}>{card.statusLabel}</span>
                              <span className="badge muted">{card.ownerLabel}</span>
                              {card.isDefault ? <span className="badge success">默认路由</span> : null}
                            </div>
                            <h3>{card.name}</h3>
                            <p className="small-copy">{card.merchantCode ?? "未识别商户号"}</p>
                          </div>

                          {card.paymentProfileId ? (
                            <Link
                              href={buildPaymentProfileHref(basePath, data, card.paymentProfileId)}
                              className="button-link"
                            >
                              查看商户链路
                            </Link>
                          ) : null}
                        </div>

                        <div className="admin-ops-merchant-metrics">
                          <div>
                            <span>订单数</span>
                            <strong>{card.orderCount}</strong>
                          </div>
                          <div>
                            <span>GMV</span>
                            <strong>{describeOrderAmount(card.totalAmountCents)}</strong>
                          </div>
                          <div>
                            <span>成功率</span>
                            <strong>{card.orderCount > 0 ? `${successRate}%` : "暂无"}</strong>
                          </div>
                          <div>
                            <span>异常</span>
                            <strong>{card.callbackFailures + card.failedTasks}</strong>
                          </div>
                        </div>

                        <p className="small-copy admin-ops-merchant-copy">{card.statusSummary}</p>
                        <p className="small-copy admin-ops-merchant-copy">
                          最近活动: {card.lastActivityAt ? formatDateTime(card.lastActivityAt) : "暂无链路活动"}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </article>
          </div>
        ) : null}
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-command") ? (
        <section id="payment-command" className="admin-anchor-target admin-content-grid admin-ops-wide-grid">
        <div className="admin-column-stack admin-ops-span-full">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Command</p>
                <h2 className="order-title">订单指挥视图</h2>
              </div>
              <span className="badge muted">{orderBundles.length} 笔可视订单</span>
            </div>

            {orderBundles.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有可聚合的订单视图" : "还没有进入支付链路的订单"}</strong>
                <p>当支付尝试、回调或补偿任务出现后，这里会自动把它们按订单聚成一张运维卡片。</p>
              </div>
            ) : (
              <div className="admin-ops-order-grid">
                {orderBundles.map((bundle) => {
                  const flags = buildOrderBundleFlags(bundle);
                  const timeline = buildOrderBundleTimeline(bundle);
                  const latestCallback = bundle.callbacks[0] ?? null;
                  const actionableTask =
                    bundle.syncTasks.find((task) => task.status !== "SUCCEEDED") ?? bundle.syncTasks[0] ?? null;
                  const checkoutUrl = bundle.attempt?.hostedCheckoutUrl || bundle.attempt?.checkoutUrl || null;

                  return (
                    <article key={bundle.key} className="admin-ops-order-card">
                      <div className="admin-ops-order-head">
                        <div>
                          <p className="admin-section-kicker">Order</p>
                          <h3>{bundle.orderNo || "等待识别订单"}</h3>
                          <p className="small-copy">
                            {bundle.productName} / {bundle.skuName}
                          </p>
                        </div>
                        <div className="admin-inline-tags">
                          {bundle.orderStatus ? (
                            <span className={`badge ${getOrderStatusTone(bundle.orderStatus)}`}>
                              {getOrderStatusLabel(bundle.orderStatus)}
                            </span>
                          ) : null}
                          {bundle.attemptStatus ? (
                            <span className={`badge ${getPaymentAttemptStatusTone(bundle.attemptStatus)}`}>
                              {getPaymentAttemptStatusLabel(bundle.attemptStatus)}
                            </span>
                          ) : null}
                          <span className="badge muted">{bundle.channelCode ?? "待识别通道"}</span>
                        </div>
                      </div>

                      <div className="admin-ops-order-meta">
                        <div>
                          <span>客户</span>
                          <strong>{bundle.customerEmail ?? "待识别"}</strong>
                        </div>
                        <div>
                          <span>商户</span>
                          <strong>{bundle.merchantName ?? "待识别"}</strong>
                        </div>
                        <div>
                          <span>金额</span>
                          <strong>{bundle.amountCents != null ? describeOrderAmount(bundle.amountCents) : "待识别"}</strong>
                        </div>
                        <div>
                          <span>最近活动</span>
                          <strong>{bundle.lastActivityAt ? formatDateTime(bundle.lastActivityAt) : "暂无"}</strong>
                        </div>
                      </div>

                      {flags.length > 0 ? (
                        <div className="admin-inline-tags admin-ops-order-flags">
                          {flags.map((flag) => (
                            <span key={flag} className="badge warning">
                              {flag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="small-copy admin-ops-order-copy">
                          当前这笔订单链路稳定，可以直接从这里跳转订单页或继续做主动重查。
                        </p>
                      )}

                      <div className="admin-ops-order-actions">
                        {bundle.publicToken ? (
                          <form action={refreshOrderAction}>
                            <input type="hidden" name="publicToken" value={bundle.publicToken} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              重查订单
                            </button>
                          </form>
                        ) : null}

                        {actionableTask ? (
                          <form action={runSyncTaskAction}>
                            <input type="hidden" name="taskId" value={actionableTask.id} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              执行补偿
                            </button>
                          </form>
                        ) : null}

                        {latestCallback ? (
                          <form action={replayCallbackAction}>
                            <input type="hidden" name="logId" value={latestCallback.id} />
                            <input type="hidden" name="returnTo" value={returnTo} />
                            <button type="submit" className="button-secondary">
                              回放最新回调
                            </button>
                          </form>
                        ) : null}

                        {bundle.publicToken ? (
                          <Link href={buildOrderPath(bundle.publicToken)} className="button-link">
                            查看订单页
                          </Link>
                        ) : null}

                        {checkoutUrl ? (
                          <a href={checkoutUrl} className="button-link" target="_blank" rel="noreferrer">
                            打开收银台
                          </a>
                        ) : null}
                      </div>

                      <details className="admin-ops-detail-card admin-ops-order-detail">
                        <summary>展开全链路时间线</summary>
                        <div className="admin-ops-detail-stack">
                          <div className="admin-ops-detail-metric-grid">
                            <div className="admin-ops-detail-metric">
                              <span>回调总数</span>
                              <strong>{bundle.callbacks.length}</strong>
                            </div>
                            <div className="admin-ops-detail-metric">
                              <span>补偿任务</span>
                              <strong>{bundle.syncTasks.length}</strong>
                            </div>
                            <div className="admin-ops-detail-metric">
                              <span>Trace</span>
                              <strong>{bundle.traceId ? bundle.traceId.slice(-10) : "未记录"}</strong>
                            </div>
                            <div className="admin-ops-detail-metric">
                              <span>商户号</span>
                              <strong>{bundle.merchantCode ?? "未绑定"}</strong>
                            </div>
                          </div>

                          <div className="admin-ops-timeline-list">
                            {timeline.map((item) => (
                              <div key={item.id} className="admin-ops-timeline-item">
                                <span className={`badge ${item.tone}`}>{formatDateTime(item.time)}</span>
                                <div>
                                  <strong>{item.title}</strong>
                                  <p>{item.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>
                    </article>
                  );
                })}
              </div>
            )}
          </article>
        </div>
        </section>
      ) : null}

      {showSummaryStrip ? <section className="admin-stat-grid">
        <article className="admin-surface admin-stat-card tone-rose">
          <p>支付尝试</p>
          <strong>{data.summary.totalAttempts}</strong>
          <span>{data.summary.inFlightAttempts} 笔仍在建单、待支付或处理中。</span>
        </article>
        <article className="admin-surface admin-stat-card tone-blue">
          <p>成功支付</p>
          <strong>{data.summary.succeededAttempts}</strong>
          <span>{data.summary.failedAttempts} 笔尝试已进入失败、取消或过期状态。</span>
        </article>
        <article className="admin-surface admin-stat-card tone-violet">
          <p>回调健康</p>
          <strong>
            {data.summary.succeededCallbacks}/{data.summary.totalCallbacks}
          </strong>
          <span>{buildCallbackHealthCopy(data)}</span>
        </article>
        <article className="admin-surface admin-stat-card tone-gold">
          <p>补偿队列</p>
          <strong>
            {data.summary.queuedSyncTasks}/{data.summary.failedSyncTasks}
          </strong>
          <span>{buildSyncCopy(data)}</span>
        </article>
      </section> : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-control") ? (
        <section
        id="payment-control"
        className={`admin-anchor-target ${
          scope === "admin" ? "admin-content-grid" : "admin-content-grid admin-ops-wide-grid"
        }`}
      >
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Control</p>
                <h2 className="order-title">配置变更与风险操作</h2>
              </div>
              <div className="button-row compact">
                <a href={controlAuditExportHref} className="button-link">
                  导出台账 CSV
                </a>
                <span
                  className={`badge ${controlAuditSnapshot.failedCount > 0 || controlAuditSnapshot.highRiskCount > 0 ? "warning" : "success"}`}
                >
                  {controlAuditSnapshot.failedCount > 0 || controlAuditSnapshot.highRiskCount > 0 ? "需复核" : "可追溯"}
                </span>
              </div>
            </div>

            <div className="admin-stock-strip admin-ops-control-strip">
              <div>
                <span>最近留痕</span>
                <strong>{controlAuditSnapshot.totalLogs}</strong>
              </div>
              <div>
                <span>配置变更</span>
                <strong>{controlAuditSnapshot.configChangeCount}</strong>
              </div>
              <div>
                <span>风险动作</span>
                <strong>{controlAuditSnapshot.riskyOperationCount}</strong>
              </div>
              <div>
                <span>待复核</span>
                <strong>{controlAuditSnapshot.pendingCount}</strong>
              </div>
              <div>
                <span>已复核</span>
                <strong>{controlAuditSnapshot.reviewedCount}</strong>
              </div>
              <div>
                <span>失败操作</span>
                <strong>{controlAuditSnapshot.failedCount}</strong>
              </div>
            </div>

            <div className="admin-ops-control-quick-list">
              {controlAuditQuickViews.map((view) => (
                <Link
                  key={view.key}
                  href={view.href}
                  className={`admin-ops-control-quick-card${view.active ? " active" : ""}`}
                >
                  <div className="admin-inline-tags">
                    <span className={`badge ${view.tone}`}>{view.label}</span>
                    {view.active ? <span className="badge muted">当前视角</span> : null}
                  </div>
                  <strong>{view.count}</strong>
                  <p>{view.detail}</p>
                </Link>
              ))}
            </div>

            {data.controlAuditLogs.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有控制面留痕" : "还没有控制面留痕"}</strong>
                <p>当后台或商户修改支付配置、重查订单、执行补偿或回放回调时，这里会自动生成真实留痕。</p>
              </div>
            ) : (
              <div className="admin-ops-control-list">
                {data.controlAuditLogs.map((log) => (
                  <article key={log.id} className="admin-ops-control-card">
                    <div className="admin-ops-control-head">
                      <div>
                        <div className="admin-inline-tags">
                          <span className={`badge ${getControlAuditRiskTone(log.riskLevel)}`}>
                            {getControlAuditRiskLabel(log.riskLevel)}
                          </span>
                          <span className={`badge ${getControlAuditOutcomeTone(log.outcome)}`}>
                            {getControlAuditOutcomeLabel(log.outcome)}
                          </span>
                          <span className={`badge ${getControlAuditReviewTone(log.reviewStatus)}`}>
                            {getControlAuditReviewLabel(log.reviewStatus)}
                          </span>
                          <span className={`badge ${getControlAuditScopeTone(log.scope)}`}>
                            {getControlAuditScopeLabel(log.scope)}
                          </span>
                          <span className="badge muted">{formatDateTime(log.createdAt)}</span>
                        </div>
                        <h3>{log.summary}</h3>
                        <p className="small-copy">{log.detail ?? "已记录本次控制面动作的关键上下文。"}</p>
                      </div>
                    </div>

                    <div className="admin-ops-control-meta">
                      <div>
                        <span>操作者</span>
                        <strong>{log.actorLabel}</strong>
                      </div>
                      <div>
                        <span>操作对象</span>
                        <strong>{log.targetLabel}</strong>
                      </div>
                      <div>
                        <span>动作编号</span>
                        <strong>{log.actionType}</strong>
                      </div>
                    </div>

                    {scope === "admin" && reviewControlAction ? (
                      <div className="admin-ops-control-actions">
                        <form action={reviewControlAction} className="admin-ops-control-review-form">
                          <input type="hidden" name="logId" value={log.id} />
                          <input
                            type="hidden"
                            name="reviewStatus"
                            value={log.reviewStatus === "REVIEWED" ? "PENDING" : "REVIEWED"}
                          />
                          <input type="hidden" name="returnTo" value={returnTo} />
                          <div className="field admin-ops-control-review-field">
                            <label htmlFor={`${scope}ControlReviewNote-${log.id}`}>
                              {log.reviewStatus === "REVIEWED" ? "重新打开备注" : "复核备注"}
                            </label>
                            <input
                              id={`${scope}ControlReviewNote-${log.id}`}
                              name="reviewNote"
                              defaultValue={log.reviewStatus === "REVIEWED" ? log.reviewNote ?? "" : ""}
                              placeholder={
                                log.reviewStatus === "REVIEWED"
                                  ? "例如：回写结果仍需继续核对"
                                  : "例如：已核对商户参数、回调与补偿结果"
                              }
                            />
                          </div>
                          <button type="submit" className="button-secondary">
                            {log.reviewStatus === "REVIEWED" ? "重新打开" : "标记已复核"}
                          </button>
                        </form>

                        <div className="admin-ops-control-review-note">
                          {log.reviewStatus === "REVIEWED" && log.reviewerLabel ? (
                            <p className="small-copy">
                              {log.reviewerLabel} 于 {log.reviewedAt ? formatDateTime(log.reviewedAt) : "刚刚"} 完成复核。
                            </p>
                          ) : (
                            <p className="small-copy">建议管理员在确认配置、生效结果和回写状态后再关闭这条留痕。</p>
                          )}

                          {log.reviewNote ? (
                            <div className="admin-ops-control-note-card">
                              <span>复核说明</span>
                              <p>{log.reviewNote}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : log.reviewNote || (log.reviewStatus === "REVIEWED" && log.reviewerLabel) ? (
                      <div className="admin-ops-control-review-note">
                        {log.reviewStatus === "REVIEWED" && log.reviewerLabel ? (
                          <p className="small-copy">
                            {log.reviewerLabel} 于 {log.reviewedAt ? formatDateTime(log.reviewedAt) : "刚刚"} 完成复核。
                          </p>
                        ) : null}

                        {log.reviewNote ? (
                          <div className="admin-ops-control-note-card">
                            <span>复核说明</span>
                            <p>{log.reviewNote}</p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Controls</p>
                <h2 className="order-title">控制面摘要</h2>
              </div>
              <span
                className={`badge ${controlAuditSnapshot.failedCount > 0 || controlAuditSnapshot.highRiskCount > 0 ? "warning" : "success"}`}
              >
                {controlAuditSnapshot.failedCount > 0 || controlAuditSnapshot.highRiskCount > 0 ? "重点复核" : "运行稳定"}
              </span>
            </div>

            <div className="admin-ops-recommend-list">
              {controlAuditSnapshot.highlights.map((item) => (
                <article key={item} className="admin-ops-recommend-card">
                  <div className="admin-inline-tags">
                    <span className={`badge ${item.includes("失败") || item.includes("高风险") ? "warning" : "success"}`}>
                      {item.includes("失败") || item.includes("高风险") ? "控制提醒" : "控制结论"}
                    </span>
                  </div>
                  <div>
                    <strong>{item.includes("失败") || item.includes("高风险") ? "需要继续复核" : "当前结论"}</strong>
                    <p className="small-copy">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Weekly</p>
                <h2 className="order-title">近 7 天控制面摘要</h2>
              </div>
              <div className="button-row compact">
                <a href={controlAuditWeeklyExportHref} className="button-link">
                  导出周报 CSV
                </a>
                <span className="badge muted">审计周报视角</span>
              </div>
            </div>

            <div className="admin-ops-control-daily-list">
              {data.controlAuditDigest.daily.map((item) => (
                <article key={item.dateKey} className="admin-ops-control-daily-card">
                  <div className="admin-inline-tags">
                    <span className="badge muted">{item.label}</span>
                    {item.highRiskCount > 0 ? <span className="badge warning">{item.highRiskCount} 高风险</span> : null}
                  </div>
                  <strong>{item.totalCount}</strong>
                  <p>
                    待复核 {item.pendingCount} / 失败 {item.failedCount}
                  </p>
                </article>
              ))}
            </div>

            <div className="admin-subsection-head">
              <div>
                <h3>高频控制动作</h3>
                <p className="small-copy">基于当前筛选范围统计最近 7 天最常出现的控制面动作。</p>
              </div>
            </div>

            {data.controlAuditDigest.topActions.length === 0 ? (
              <div className="admin-empty-state">
                <strong>最近 7 天还没有控制面动作</strong>
                <p>等配置变更、手动重查、补偿或回放动作出现后，这里会自动沉淀审计摘要。</p>
              </div>
            ) : (
              <div className="admin-ops-control-action-list">
                {data.controlAuditDigest.topActions.map((item) => (
                  <article key={item.actionType} className="admin-ops-control-action-card">
                    <div className="admin-inline-tags">
                      <span className="badge muted">{formatControlAuditActionType(item.actionType)}</span>
                      {item.highRiskCount > 0 ? <span className="badge warning">{item.highRiskCount} 高风险</span> : null}
                    </div>
                    <strong>{item.count}</strong>
                    <p>
                      待复核 {item.pendingCount} / 失败 {item.failedCount}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-sla") ? (
        <section id="payment-sla" className="admin-anchor-target admin-content-grid">
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Stability</p>
                <h2 className="order-title">支付 SLA 与近端趋势</h2>
              </div>
              <span className={`badge ${slaSnapshot.tone}`}>{slaSnapshot.grade}</span>
            </div>

            <div className="admin-ops-sla-hero">
              <div className="admin-ops-sla-score">
                <span>稳定性评级</span>
                <strong>{slaSnapshot.grade}</strong>
              </div>

              <div className="admin-ops-sla-copy">
                <h3>{slaSnapshot.headline}</h3>
                <p>{slaSnapshot.detail}</p>
              </div>
            </div>

            <div className="admin-ops-sla-metrics">
              {slaSnapshot.metrics.map((metric) => (
                <div key={metric.label} className="admin-ops-sla-metric">
                  <span>{metric.label}</span>
                  <strong className={`tone-${metric.tone}`}>{metric.value}</strong>
                  <p>{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="admin-subsection">
              <div className="admin-subsection-head">
                <div>
                  <h3>近 24 小时趋势</h3>
                  <p className="small-copy">基于当前载入的最新 {trend.sampleSize} 条支付样本，展示每 4 小时的波动。</p>
                </div>
                <div className="admin-inline-tags">
                  <span className="badge success">成功支付</span>
                  <span className="badge muted">支付尝试</span>
                  <span className="badge warning">异常回调 / 补偿压力</span>
                </div>
              </div>

              <div className="admin-ops-trend-chart">
                {trend.buckets.map((bucket) => {
                  const max = trend.chartMax;
                  const attemptHeight =
                    bucket.attempts > 0 ? `${Math.max(8, Math.round((bucket.attempts / max) * 100))}%` : "0%";
                  const successHeight =
                    bucket.succeeded > 0 ? `${Math.max(8, Math.round((bucket.succeeded / max) * 100))}%` : "0%";
                  const issueValue = bucket.callbackFailures + bucket.syncPressure;
                  const issueHeight = issueValue > 0 ? `${Math.max(8, Math.round((issueValue / max) * 100))}%` : "0%";

                  return (
                    <div key={bucket.key} className="admin-ops-trend-column">
                      <div className="admin-ops-trend-bars">
                        <span className="admin-ops-trend-bar muted" style={{ height: attemptHeight }} />
                        <span className="admin-ops-trend-bar success" style={{ height: successHeight }} />
                        <span className="admin-ops-trend-bar warning" style={{ height: issueHeight }} />
                      </div>
                      <strong>{bucket.label}</strong>
                      <p>
                        尝试 {bucket.attempts} / 成功 {bucket.succeeded} / 异常 {bucket.callbackFailures + bucket.syncPressure}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Recommendations</p>
                <h2 className="order-title">自动巡检建议</h2>
              </div>
              <span className="badge muted">{recommendations.length} 条建议</span>
            </div>

            <div className="admin-ops-recommend-list">
              {recommendations.map((item) => (
                <article key={item.id} className="admin-ops-recommend-card">
                  <div className="admin-inline-tags">
                    <span className={`badge ${item.tone}`}>{item.tone === "warning" ? "优先处理" : item.tone === "success" ? "状态稳定" : "持续观察"}</span>
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <p className="small-copy">{item.detail}</p>
                  </div>

                  {item.href && item.cta ? (
                    <div className="admin-ops-recommend-actions">
                      <Link href={item.href} className="button-link">
                        {item.cta}
                      </Link>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-latency") ? (
        <section
        id="payment-latency"
        className={`admin-anchor-target ${
          scope === "admin" ? "admin-content-grid" : "admin-content-grid admin-ops-wide-grid"
        }`}
      >
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Latency</p>
                <h2 className="order-title">订单耗时分层</h2>
              </div>
              <span className="badge muted">{latencySnapshot.observedCount} 笔闭环样本</span>
            </div>

            <div className="admin-stock-strip admin-ops-latency-strip">
              <div>
                <span>P50 闭环</span>
                <strong>{latencySnapshot.p50}</strong>
              </div>
              <div>
                <span>P90 闭环</span>
                <strong>{latencySnapshot.p90}</strong>
              </div>
              <div>
                <span>最长链路</span>
                <strong>{latencySnapshot.longest}</strong>
              </div>
              <div>
                <span>进行中 / 仅回调</span>
                <strong>
                  {latencySnapshot.inFlightCount} / {latencySnapshot.callbackOnlyCount}
                </strong>
              </div>
            </div>

            <div className="admin-ops-latency-grid">
              {latencySnapshot.bands.map((band) => (
                <article key={band.key} className="admin-ops-latency-card">
                  <div className="admin-inline-tags">
                    <span className={`badge ${band.tone}`}>{band.label}</span>
                  </div>
                  <strong>{band.count}</strong>
                  <p>{band.detail}</p>
                </article>
              ))}
            </div>
          </article>
        </div>

        {scope === "admin" ? (
          <div className="admin-column-stack">
            <article className="admin-surface">
              <div className="admin-section-head">
                <div>
                  <p className="admin-section-kicker">Ranking</p>
                  <h2 className="order-title">商户 SLA 排名</h2>
                </div>
                <span className="badge muted">{merchantSlaRanks.length} 个商户样本</span>
              </div>

              {merchantSlaRanks.length === 0 ? (
                <div className="admin-empty-state">
                  <strong>当前还没有足够的商户样本用于排名</strong>
                  <p>等多商户支付链路产生更多真实订单后，这里会按成功率、闭环率和耗时输出企业级 SLA 排序。</p>
                </div>
              ) : (
                <div className="admin-ops-rank-list">
                  {merchantSlaRanks.map((item) => (
                    <article key={item.key} className="admin-ops-rank-card">
                      <div className="admin-ops-rank-head">
                        <div>
                          <div className="admin-inline-tags">
                            <span className="badge muted">#{item.rank}</span>
                            <span className={`badge ${item.tone}`}>{item.grade}</span>
                          </div>
                          <h3>{item.name}</h3>
                          <p className="small-copy">{item.merchantCode ?? "未识别商户号"}</p>
                        </div>

                        {item.paymentProfileId ? (
                          <Link href={buildPaymentProfileHref(basePath, data, item.paymentProfileId)} className="button-link">
                            查看商户链路
                          </Link>
                        ) : null}
                      </div>

                      <div className="admin-ops-rank-metrics">
                        <div>
                          <span>SLA 得分</span>
                          <strong>{item.score}</strong>
                        </div>
                        <div>
                          <span>成功率</span>
                          <strong>{item.successRate}</strong>
                        </div>
                        <div>
                          <span>闭环率</span>
                          <strong>{item.closureRate}</strong>
                        </div>
                        <div>
                          <span>平均闭环</span>
                          <strong>{item.avgLatency}</strong>
                        </div>
                      </div>

                      <p className="small-copy admin-ops-rank-copy">
                        {item.summary} 当前样本量 {item.orderCount} 笔。
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </article>
          </div>
        ) : null}
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-reconcile") ? (
        <section
        id="payment-reconcile"
        className={`admin-anchor-target ${
          scope === "admin" ? "admin-content-grid" : "admin-content-grid admin-ops-wide-grid"
        }`}
      >
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Channels</p>
                <h2 className="order-title">支付通道分析</h2>
              </div>
              <span className="badge muted">{channelInsights.length} 个通道视图</span>
            </div>

            {channelInsights.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有可分析的支付通道" : "还没有通道样本可分析"}</strong>
                <p>当支付尝试进入真实交易窗口后，这里会按通道输出成功率、客单价和异常压力。</p>
              </div>
            ) : (
              <div className="admin-ops-channel-grid">
                {channelInsights.map((channel) => (
                  <article key={channel.key} className="admin-ops-channel-card">
                    <div className="admin-ops-channel-head">
                      <div>
                        <div className="admin-inline-tags">
                          <span className={`badge ${channel.tone}`}>{channel.successRate}</span>
                          <span className="badge muted">{channel.channelCode}</span>
                        </div>
                        <h3>{channel.channelCode}</h3>
                        <p className="small-copy">{channel.summary}</p>
                      </div>

                      <Link href={channel.href} className="button-link">
                        聚焦此通道
                      </Link>
                    </div>

                    <div className="admin-ops-channel-metrics">
                      <div>
                        <span>支付尝试</span>
                        <strong>{channel.attemptCount}</strong>
                      </div>
                      <div>
                        <span>成功支付</span>
                        <strong>{channel.succeededCount}</strong>
                      </div>
                      <div>
                        <span>GMV</span>
                        <strong>{describeOrderAmount(channel.totalAmountCents)}</strong>
                      </div>
                      <div>
                        <span>平均客单</span>
                        <strong>
                          {channel.averageAmountCents != null ? describeOrderAmount(channel.averageAmountCents) : "暂无"}
                        </strong>
                      </div>
                    </div>

                    <p className="small-copy admin-ops-channel-copy">
                      在途 {channel.inFlightCount} 笔，异常回调 {channel.callbackFailures} 条，补偿压力{" "}
                      {channel.queuedTasks + channel.failedTasks} 条。
                    </p>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Reconciliation</p>
                <h2 className="order-title">{scope === "admin" ? "商户对账视图" : "当前商户对账视图"}</h2>
              </div>
              <span className="badge muted">{reconciliationCards.length} 个对账单元</span>
            </div>

            {reconciliationCards.length === 0 ? (
              <div className="admin-empty-state">
                <strong>当前还没有足够的对账样本</strong>
                <p>当支付成功、回调处理和自动发货开始沉淀后，这里会把每个商户的闭环缺口展示出来。</p>
              </div>
            ) : (
              <div className="admin-ops-reconcile-list">
                {reconciliationCards.map((item) => (
                  <article key={item.key} className="admin-ops-reconcile-card">
                    <div className="admin-ops-reconcile-head">
                      <div>
                        <div className="admin-inline-tags">
                          <span className={`badge ${item.tone}`}>
                            {item.totalGapCount > 0 ? `${item.totalGapCount} 个缺口` : "已对齐"}
                          </span>
                          {item.merchantCode ? <span className="badge muted">{item.merchantCode}</span> : null}
                        </div>
                        <h3>{item.name}</h3>
                        <p className="small-copy">{item.summary}</p>
                      </div>

                      <Link href={item.href} className="button-link">
                        查看对账链路
                      </Link>
                    </div>

                    <div className="admin-ops-reconcile-metrics">
                      <div>
                        <span>支付成功</span>
                        <strong>{item.paymentSuccessCount}</strong>
                      </div>
                      <div>
                        <span>回调闭环</span>
                        <strong>{item.callbackSuccessCount}</strong>
                      </div>
                      <div>
                        <span>已发货</span>
                        <strong>{item.fulfilledCount}</strong>
                      </div>
                      <div>
                        <span>待回调 / 待履约</span>
                        <strong>
                          {item.callbackGapCount} / {item.fulfillmentGapCount}
                        </strong>
                      </div>
                    </div>

                    <div className="admin-inline-tags admin-ops-reconcile-flags">
                      {item.failedTasks > 0 ? <span className="badge warning">{item.failedTasks} 条失败补偿</span> : null}
                      {item.queuedTasks > 0 ? <span className="badge muted">{item.queuedTasks} 条待执行补偿</span> : null}
                      {item.callbackGapCount > 0 ? <span className="badge warning">{item.callbackGapCount} 笔待回调闭环</span> : null}
                      {item.fulfillmentGapCount > 0 ? <span className="badge warning">{item.fulfillmentGapCount} 笔待履约闭环</span> : null}
                      {item.totalGapCount === 0 ? <span className="badge success">支付与履约已对齐</span> : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-audit") ? (
        <section
        id="payment-audit"
        className={`admin-anchor-target ${
          scope === "admin" ? "admin-content-grid" : "admin-content-grid admin-ops-wide-grid"
        }`}
      >
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Audit</p>
                <h2 className="order-title">审计流水</h2>
              </div>
              <span className="badge muted">{auditSnapshot.totalEvents} 条最近事件</span>
            </div>

            <div className="admin-stock-strip admin-ops-audit-strip">
              <div>
                <span>支付事件</span>
                <strong>{auditSnapshot.paymentEvents}</strong>
              </div>
              <div>
                <span>回调事件</span>
                <strong>{auditSnapshot.callbackEvents}</strong>
              </div>
              <div>
                <span>补偿事件</span>
                <strong>{auditSnapshot.syncEvents}</strong>
              </div>
              <div>
                <span>履约事件</span>
                <strong>{auditSnapshot.fulfillmentEvents}</strong>
              </div>
              <div>
                <span>签名失败</span>
                <strong>{auditSnapshot.signatureFailures}</strong>
              </div>
              <div>
                <span>异常订单</span>
                <strong>{auditSnapshot.issueOrders}</strong>
              </div>
            </div>

            {auditEvents.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有可展示的审计事件" : "还没有可追踪的审计事件"}</strong>
                <p>当支付、回调、补偿或履约进入真实链路后，这里会自动形成可追溯的企业级审计流水。</p>
              </div>
            ) : (
              <div className="admin-ops-audit-list">
                {auditEvents.map((event) => (
                  <article key={event.id} className="admin-ops-audit-card">
                    <div className="admin-ops-audit-head">
                      <div>
                        <div className="admin-inline-tags">
                          <span className={`badge ${event.tone}`}>{event.laneLabel}</span>
                          <span className="badge muted">{formatDateTime(event.time)}</span>
                        </div>
                        <h3>{event.title}</h3>
                        <p className="small-copy">{event.detail}</p>
                      </div>

                      <Link href={event.href} className="button-link">
                        定位链路
                      </Link>
                    </div>

                    <div className="admin-ops-audit-meta">
                      <div>
                        <span>订单</span>
                        <strong>{event.orderLabel}</strong>
                      </div>
                      <div>
                        <span>商户</span>
                        <strong>{event.merchantLabel}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Controls</p>
                <h2 className="order-title">审计摘要</h2>
              </div>
              <span className={`badge ${auditSnapshot.issueOrders > 0 || auditSnapshot.signatureFailures > 0 ? "warning" : "success"}`}>
                {auditSnapshot.issueOrders > 0 || auditSnapshot.signatureFailures > 0 ? "需复核" : "已对齐"}
              </span>
            </div>

            <div className="admin-ops-recommend-list">
              {auditSnapshot.highlights.map((item) => (
                <article key={item} className="admin-ops-recommend-card">
                  <div className="admin-inline-tags">
                    <span
                      className={`badge ${item.includes("失败") || item.includes("异常") || item.includes("缺口") ? "warning" : "success"}`}
                    >
                      {item.includes("失败") || item.includes("异常") || item.includes("缺口") ? "重点审计" : "审计通过"}
                    </span>
                  </div>
                  <div>
                    <strong>{item.includes("失败") || item.includes("异常") || item.includes("缺口") ? "发现审计线索" : "审计结论"}</strong>
                    <p className="small-copy">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-pipeline") ? (
        <section id="payment-pipeline" className="admin-anchor-target admin-content-grid">
        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Pipeline</p>
                <h2 className="order-title">支付链路分层</h2>
              </div>
              <span className="badge muted">{scope === "admin" ? "平台视角" : "商户视角"}</span>
            </div>

            <div className="admin-step-list">
              <div className="admin-step-item">
                <span>尝</span>
                <p>每次下单都会生成独立支付尝试，保留外部订单号、通道、金额、traceId 和最近同步时间。</p>
              </div>
              <div className="admin-step-item">
                <span>回</span>
                <p>回调会先做事件去重和签名校验，再决定是否更新订单与发卡状态，避免重复通知造成重复履约。</p>
              </div>
              <div className="admin-step-item">
                <span>补</span>
                <p>建单失败或回调处理异常时会自动生成补偿任务，方便后续对账、重试和人工排障。</p>
              </div>
            </div>
          </article>

          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Diagnostics</p>
                <h2 className="order-title">实时诊断</h2>
              </div>
            </div>

            <div className="admin-step-list">
              <div className="admin-step-item">
                <span>单</span>
                <p>待推进支付尝试：{data.summary.inFlightAttempts} 笔，说明还有订单仍在支付生命周期中。</p>
              </div>
              <div className="admin-step-item">
                <span>签</span>
                <p>
                  回调失败/拒绝：{data.summary.failedCallbacks} 条，可优先检查 notify secret、时间戳和外部订单映射。
                </p>
              </div>
              <div className="admin-step-item">
                <span>队</span>
                <p>补偿任务积压：{data.summary.queuedSyncTasks} 条，失败补偿任务：{data.summary.failedSyncTasks} 条。</p>
              </div>
            </div>
          </article>
        </div>

        <div className="admin-column-stack">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Callbacks</p>
                <h2 className="order-title">最近回调事件</h2>
              </div>
              <span className="badge muted">{data.callbackLogs.length} 条</span>
            </div>

            {data.callbackLogs.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有回调日志" : "最近还没有回调日志"}</strong>
                <p>支付通知到来后，这里会展示事件状态、外部订单号、traceId 和错误原因。</p>
              </div>
            ) : (
              <div className="admin-sku-stack admin-ops-log-list">
                {data.callbackLogs.map((log) => (
                  <div key={log.id} className="admin-sku-card admin-ops-log-card">
                    <div className="admin-sku-head">
                      <div>
                        <strong>{log.eventType}</strong>
                        <p className="small-copy">
                          {log.externalOrderId ?? "未附带订单号"} · {formatDateTime(log.createdAt)}
                        </p>
                      </div>
                      <div className="admin-inline-tags">
                        <span className={`badge ${getWebhookProcessingStatusTone(log.processingStatus)}`}>
                          {getWebhookProcessingStatusLabel(log.processingStatus)}
                        </span>
                        <span className={`badge ${log.signatureValid ? "success" : "warning"}`}>
                          {log.signatureValid ? "签名有效" : "签名失败"}
                        </span>
                      </div>
                    </div>
                    <p className="small-copy">
                      eventId: <code className="admin-code-chip">{log.externalEventId}</code>
                    </p>
                    {log.traceId ? (
                      <p className="small-copy">
                        trace: <code className="admin-code-chip">{log.traceId}</code>
                      </p>
                    ) : null}
                    <p className="small-copy">{log.processingError ?? "没有异常，回调已正常处理。"}</p>
                    <div className="admin-ops-log-actions">
                      <form action={replayCallbackAction}>
                        <input type="hidden" name="logId" value={log.id} />
                        <input type="hidden" name="returnTo" value={returnTo} />
                        <button type="submit" className="button-secondary">
                          回放回调
                        </button>
                      </form>
                    </div>
                    <details className="admin-ops-detail-card">
                      <summary>查看原始载荷</summary>
                      <div className="admin-ops-detail-stack">
                        {log.requestHeaders ? (
                          <div className="admin-ops-detail-block">
                            <strong>请求头</strong>
                            <pre className="admin-ops-json-block">{formatJsonPreview(log.requestHeaders)}</pre>
                          </div>
                        ) : null}
                        <div className="admin-ops-detail-block">
                          <strong>请求体</strong>
                          <pre className="admin-ops-json-block">{formatJsonPreview(log.requestBody)}</pre>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
        </section>
      ) : null}

      {shouldShowPaymentSection(visibleSectionIds, "payment-attempts") ? (
        <section id="payment-attempts" className="admin-anchor-target admin-content-grid admin-ops-wide-grid">
        <div className="admin-column-stack admin-ops-span-full">
          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Attempts</p>
                <h2 className="order-title">最近支付尝试</h2>
              </div>
              <span className="badge muted">{data.attempts.length} 条最近记录</span>
            </div>

            {data.attempts.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有支付尝试" : "还没有支付尝试"}</strong>
                <p>订单一旦发起支付，这里就会沉淀建单、回调和补偿链路的完整状态。</p>
              </div>
            ) : (
              <div className="admin-merchant-table-wrap">
                <table className="admin-merchant-table">
                  <thead>
                    <tr>
                      <th>订单 / 商品</th>
                      <th>{scope === "admin" ? "商户 / 客户" : "客户 / 商户"}</th>
                      <th>支付信息</th>
                      <th>状态</th>
                      <th>链路标识</th>
                      <th>时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.attempts.map((attempt) => {
                      const relatedCallbacks = getAttemptRelatedCallbacks(data, attempt);
                      const relatedSyncTasks = getAttemptRelatedSyncTasks(data, attempt);
                      const timeline = buildAttemptTimeline(attempt, relatedCallbacks, relatedSyncTasks);

                      return (
                        <Fragment key={attempt.id}>
                          <tr>
                            <td>
                              <div className="admin-merchant-primary-cell">
                                <strong>{attempt.externalOrderId}</strong>
                                <span>
                                  {attempt.shopOrder.product.name} / {attempt.shopOrder.sku.name}
                                </span>
                                <span>
                                  <Link href={buildOrderPath(attempt.shopOrder.publicToken)} className="button-link">
                                    查看订单页
                                  </Link>
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-config-cell">
                                <strong>
                                  {scope === "admin"
                                    ? attempt.shopOrder.paymentProfile?.name ?? "未绑定商户"
                                    : attempt.shopOrder.customerEmail}
                                </strong>
                                <span>
                                  {scope === "admin"
                                    ? `${attempt.shopOrder.paymentProfile?.merchantCode ?? "无商户号"} · ${attempt.shopOrder.customerEmail}`
                                    : `${attempt.shopOrder.paymentProfile?.name ?? "未绑定商户"} · ${attempt.shopOrder.paymentProfile?.merchantCode ?? "无商户号"}`}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-config-cell">
                                <strong>{describeOrderAmount(attempt.amountCents)}</strong>
                                <span>{attempt.channelCode}</span>
                                <span>{attempt.novapayOrderId ?? "等待网关订单号"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-state-cell">
                                <div className="admin-inline-tags">
                                  <span className={`badge ${getPaymentAttemptStatusTone(attempt.status)}`}>
                                    {getPaymentAttemptStatusLabel(attempt.status)}
                                  </span>
                                  <span className={`badge ${getOrderStatusTone(attempt.shopOrder.status)}`}>
                                    {getOrderStatusLabel(attempt.shopOrder.status)}
                                  </span>
                                </div>
                                <p className="small-copy">
                                  {attempt.syncTasks.length > 0
                                    ? `${attempt.syncTasks.length} 条关联补偿任务`
                                    : "暂无补偿任务"}
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-link-cell">
                                <span>
                                  trace: <code className="admin-code-chip">{attempt.traceId}</code>
                                </span>
                                <span>
                                  callback:{" "}
                                  <code className="admin-code-chip">{attempt.callbackEventId ?? "等待事件"}</code>
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-timestamp-cell">
                                <strong>{formatDateTime(attempt.updatedAt)}</strong>
                                <span>创建 {formatDateTime(attempt.createdAt)}</span>
                                <span>同步 {attempt.lastSyncedAt ? formatDateTime(attempt.lastSyncedAt) : "尚未同步"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-ops-inline-actions">
                                <form action={refreshOrderAction}>
                                  <input type="hidden" name="publicToken" value={attempt.shopOrder.publicToken} />
                                  <input type="hidden" name="returnTo" value={returnTo} />
                                  <button type="submit" className="button-secondary">
                                    立即重查
                                  </button>
                                </form>

                                {attempt.hostedCheckoutUrl || attempt.checkoutUrl ? (
                                  <a
                                    href={attempt.hostedCheckoutUrl || attempt.checkoutUrl || "#"}
                                    className="button-link"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    打开收银台
                                  </a>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                          <tr className="admin-ops-table-detail-row">
                            <td colSpan={7}>
                              <details className="admin-ops-detail-card admin-ops-table-detail">
                                <summary>查看链路详情</summary>
                                <div className="admin-ops-detail-stack">
                                  <div className="admin-ops-detail-metric-grid">
                                    <div className="admin-ops-detail-metric">
                                      <span>关联回调</span>
                                      <strong>{relatedCallbacks.length}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>补偿任务</span>
                                      <strong>{relatedSyncTasks.length}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>订单页</span>
                                      <strong>{attempt.shopOrder.publicToken.slice(-8)}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>到期时间</span>
                                      <strong>{attempt.expiresAt ? formatDateTime(attempt.expiresAt) : "未设置"}</strong>
                                    </div>
                                  </div>

                                  <div className="admin-ops-table-detail-grid">
                                    <div className="admin-ops-detail-block">
                                      <strong>链路时间线</strong>
                                      <div className="admin-ops-timeline-list">
                                        {timeline.map((item) => (
                                          <div key={item.id} className="admin-ops-timeline-item">
                                            <span className={`badge ${item.tone}`}>{formatDateTime(item.time)}</span>
                                            <div>
                                              <strong>{item.title}</strong>
                                              <p>{item.detail}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="admin-ops-payload-stack">
                                      {attempt.createRequestPayload ? (
                                        <div className="admin-ops-detail-block">
                                          <strong>建单请求</strong>
                                          <pre className="admin-ops-json-block">
                                            {formatJsonPreview(attempt.createRequestPayload)}
                                          </pre>
                                        </div>
                                      ) : null}

                                      {attempt.createResponsePayload ? (
                                        <div className="admin-ops-detail-block">
                                          <strong>建单响应</strong>
                                          <pre className="admin-ops-json-block">
                                            {formatJsonPreview(attempt.createResponsePayload)}
                                          </pre>
                                        </div>
                                      ) : null}

                                      {attempt.lastRemotePayload ? (
                                        <div className="admin-ops-detail-block">
                                          <strong>最近远端同步</strong>
                                          <pre className="admin-ops-json-block">
                                            {formatJsonPreview(attempt.lastRemotePayload)}
                                          </pre>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </details>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </article>

          <article className="admin-surface">
            <div className="admin-section-head">
              <div>
                <p className="admin-section-kicker">Reconcile</p>
                <h2 className="order-title">补偿与同步任务</h2>
              </div>
              <span className="badge muted">{data.syncTasks.length} 条最近任务</span>
            </div>

            {data.syncTasks.length === 0 ? (
              <div className="admin-empty-state">
                <strong>{hasFilters ? "当前筛选下没有补偿任务" : "当前没有补偿任务"}</strong>
                <p>当建单失败、回调未命中订单或链路异常时，系统会把任务投递到这里。</p>
              </div>
            ) : (
              <div className="admin-merchant-table-wrap">
                <table className="admin-merchant-table">
                  <thead>
                    <tr>
                      <th>任务</th>
                      <th>关联对象</th>
                      <th>状态</th>
                      <th>重试</th>
                      <th>错误信息</th>
                      <th>调度时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.syncTasks.map((task) => {
                      const timeline = buildSyncTaskTimeline(task);

                      return (
                        <Fragment key={task.id}>
                          <tr>
                            <td>
                              <div className="admin-merchant-primary-cell">
                                <strong>{formatTaskType(task.taskType)}</strong>
                                <span>{task.taskType}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-config-cell">
                                <strong>
                                  {task.paymentAttempt?.externalOrderId ?? task.shopOrder?.orderNo ?? "未绑定订单"}
                                </strong>
                                <span>
                                  {task.shopOrder
                                    ? `${task.shopOrder.product.name} / ${task.shopOrder.sku.name}`
                                    : "等待补齐订单上下文"}
                                </span>
                                {task.paymentAttempt?.traceId ? (
                                  <span>
                                    trace: <code className="admin-code-chip">{task.paymentAttempt.traceId}</code>
                                  </span>
                                ) : null}
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-state-cell">
                                <div className="admin-inline-tags">
                                  <span className={`badge ${getSyncTaskStatusTone(task.status)}`}>
                                    {getSyncTaskStatusLabel(task.status)}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-timestamp-cell">
                                <strong>{task.retryCount}</strong>
                                <span>创建 {formatDateTime(task.createdAt)}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-link-cell">
                                <span>{task.lastError ?? "没有错误，任务正在队列中等待或已完成。"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-merchant-timestamp-cell">
                                <strong>{formatDateTime(task.scheduledAt)}</strong>
                                <span>开始 {task.startedAt ? formatDateTime(task.startedAt) : "未开始"}</span>
                                <span>结束 {task.finishedAt ? formatDateTime(task.finishedAt) : "未结束"}</span>
                              </div>
                            </td>
                            <td>
                              <div className="admin-ops-inline-actions">
                                <form action={runSyncTaskAction}>
                                  <input type="hidden" name="taskId" value={task.id} />
                                  <input type="hidden" name="returnTo" value={returnTo} />
                                  <button type="submit" className="button-secondary">
                                    立即执行
                                  </button>
                                </form>

                                {task.shopOrder?.publicToken ? (
                                  <Link href={buildOrderPath(task.shopOrder.publicToken)} className="button-link">
                                    查看订单
                                  </Link>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                          <tr className="admin-ops-table-detail-row">
                            <td colSpan={7}>
                              <details className="admin-ops-detail-card admin-ops-table-detail">
                                <summary>查看任务详情</summary>
                                <div className="admin-ops-detail-stack">
                                  <div className="admin-ops-detail-metric-grid">
                                    <div className="admin-ops-detail-metric">
                                      <span>任务状态</span>
                                      <strong>{getSyncTaskStatusLabel(task.status)}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>执行次数</span>
                                      <strong>{task.retryCount}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>计划时间</span>
                                      <strong>{formatDateTime(task.scheduledAt)}</strong>
                                    </div>
                                    <div className="admin-ops-detail-metric">
                                      <span>关联订单</span>
                                      <strong>
                                        {task.paymentAttempt?.externalOrderId ?? task.shopOrder?.orderNo ?? "未绑定"}
                                      </strong>
                                    </div>
                                  </div>

                                  <div className="admin-ops-table-detail-grid">
                                    <div className="admin-ops-detail-block">
                                      <strong>执行时间线</strong>
                                      <div className="admin-ops-timeline-list">
                                        {timeline.map((item) => (
                                          <div key={item.id} className="admin-ops-timeline-item">
                                            <span className={`badge ${item.tone}`}>{formatDateTime(item.time)}</span>
                                            <div>
                                              <strong>{item.title}</strong>
                                              <p>{item.detail}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="admin-ops-detail-block">
                                      <strong>任务载荷</strong>
                                      <pre className="admin-ops-json-block">{formatJsonPreview(task.payload)}</pre>
                                    </div>
                                  </div>
                                </div>
                              </details>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </article>

          {empty ? (
            <article className="admin-surface">
              <div className="admin-empty-state">
                <strong>{buildEmptyStateTitle(scope, hasFilters)}</strong>
                <p>{buildEmptyStateCopy(hasFilters)}</p>
              </div>
            </article>
          ) : null}
        </div>
        </section>
      ) : null}
    </>
  );
}
