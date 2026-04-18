import type { ControlAuditLogSnapshot } from "@/lib/control-audit";
import type { ControlAuditDigestSnapshot, PaymentOperationsFilters } from "@/lib/shop";

function escapeCsvCell(value: string | number | boolean | null | undefined) {
  const normalized = String(value ?? "").replace(/"/g, "\"\"");
  return `"${normalized}"`;
}

function formatExportDateTime(value: Date | null | undefined) {
  if (!value) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(value);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${lookup.year}-${lookup.month}-${lookup.day} ${lookup.hour}:${lookup.minute}:${lookup.second}`;
}

function normalizePayload(raw: string | null | undefined) {
  if (!raw) {
    return "";
  }

  try {
    return JSON.stringify(JSON.parse(raw));
  } catch {
    return raw;
  }
}

export function buildControlAuditCsv(input: {
  logs: ControlAuditLogSnapshot[];
  scopeLabel: string;
}) {
  const header = [
    "控制台范围",
    "留痕时间",
    "复核时间",
    "风险级别",
    "执行结果",
    "复核状态",
    "操作者",
    "复核人",
    "动作编号",
    "对象类型",
    "操作对象",
    "摘要",
    "详情",
    "复核说明",
    "商户账号ID",
    "支付配置ID",
    "原始载荷",
  ];

  const rows = input.logs.map((log) => [
    input.scopeLabel,
    formatExportDateTime(log.createdAt),
    formatExportDateTime(log.reviewedAt),
    log.riskLevel,
    log.outcome,
    log.reviewStatus,
    log.actorLabel,
    log.reviewerLabel ?? "",
    log.actionType,
    log.targetType,
    log.targetLabel,
    log.summary,
    log.detail ?? "",
    log.reviewNote ?? "",
    log.merchantAccountId ?? "",
    log.paymentProfileId ?? "",
    normalizePayload(log.payload),
  ]);

  return `\uFEFF${[header, ...rows]
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
    .join("\n")}`;
}

export function buildControlAuditExportFilename(input: {
  scope: "admin" | "merchant";
  actorLabel?: string | null;
  reportType?: "logs" | "weekly";
  now?: Date;
}) {
  const now = input.now ?? new Date();
  const parts = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const timestamp = `${lookup.year}${lookup.month}${lookup.day}-${lookup.hour}${lookup.minute}${lookup.second}`;
  const actorSegment = (input.actorLabel ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const reportSegment = input.reportType === "weekly" ? "control-audit-weekly" : "control-audit";

  if (input.scope === "merchant" && actorSegment) {
    return `noveshop-merchant-${reportSegment}-${actorSegment}-${timestamp}.csv`;
  }

  return `noveshop-${input.scope}-${reportSegment}-${timestamp}.csv`;
}

function getControlReviewFilterLabel(value: PaymentOperationsFilters["controlReviewStatus"]) {
  switch (value) {
    case "pending":
      return "待复核";
    case "reviewed":
      return "已复核";
    case "all":
    default:
      return "全部";
  }
}

function getControlRiskFilterLabel(value: PaymentOperationsFilters["controlRiskLevel"]) {
  switch (value) {
    case "high":
      return "高风险";
    case "medium":
      return "中风险";
    case "low":
      return "低风险";
    case "all":
    default:
      return "全部";
  }
}

function getControlOutcomeFilterLabel(value: PaymentOperationsFilters["controlOutcome"]) {
  switch (value) {
    case "failed":
      return "执行失败";
    case "succeeded":
      return "执行成功";
    case "all":
    default:
      return "全部";
  }
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

function buildWeeklyFilterSummary(filters: PaymentOperationsFilters) {
  const items: string[] = [];

  if (filters.keyword) {
    items.push(`关键词: ${filters.keyword}`);
  }

  if (filters.paymentProfileId !== "all") {
    items.push(`支付商户ID: ${filters.paymentProfileId}`);
  }

  if (filters.controlReviewStatus !== "all") {
    items.push(`控制复核: ${getControlReviewFilterLabel(filters.controlReviewStatus)}`);
  }

  if (filters.controlRiskLevel !== "all") {
    items.push(`控制风险: ${getControlRiskFilterLabel(filters.controlRiskLevel)}`);
  }

  if (filters.controlOutcome !== "all") {
    items.push(`控制结果: ${getControlOutcomeFilterLabel(filters.controlOutcome)}`);
  }

  return items.length > 0 ? items.join(" / ") : "全部控制面留痕";
}

export function buildControlAuditWeeklyCsv(input: {
  digest: ControlAuditDigestSnapshot;
  filters: PaymentOperationsFilters;
  scopeLabel: string;
  now?: Date;
}) {
  const now = formatExportDateTime(input.now ?? new Date());
  const rows: Array<Array<string | number>> = [
    ["报表项", "内容"],
    ["报表类型", "控制面近 7 天周报"],
    ["控制台范围", input.scopeLabel],
    ["导出时间", now],
    ["生效筛选", buildWeeklyFilterSummary(input.filters)],
    [],
    ["近 7 天按日摘要"],
    ["日期", "控制动作总数", "待复核", "执行失败", "高风险"],
    ...input.digest.daily.map((item) => [
      item.label,
      item.totalCount,
      item.pendingCount,
      item.failedCount,
      item.highRiskCount,
    ]),
    [],
    ["高频控制动作"],
    ["动作类型", "出现次数", "待复核", "执行失败", "高风险"],
    ...input.digest.topActions.map((item) => [
      formatControlAuditActionType(item.actionType),
      item.count,
      item.pendingCount,
      item.failedCount,
      item.highRiskCount,
    ]),
  ];

  return `\uFEFF${rows.map((row) => row.map((cell) => escapeCsvCell(cell)).join(",")).join("\n")}`;
}
