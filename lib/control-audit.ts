import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeEnabledChannelCodes } from "@/lib/payment-channels";

export const CONTROL_AUDIT_SCOPES = ["ADMIN", "MERCHANT"] as const;
export const CONTROL_AUDIT_OUTCOMES = ["SUCCEEDED", "FAILED"] as const;
export const CONTROL_AUDIT_RISK_LEVELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
export const CONTROL_AUDIT_REVIEW_STATUSES = ["PENDING", "REVIEWED"] as const;

export type ControlAuditScope = (typeof CONTROL_AUDIT_SCOPES)[number];
export type ControlAuditOutcome = (typeof CONTROL_AUDIT_OUTCOMES)[number];
export type ControlAuditRiskLevel = (typeof CONTROL_AUDIT_RISK_LEVELS)[number];
export type ControlAuditReviewStatus = (typeof CONTROL_AUDIT_REVIEW_STATUSES)[number];

type PaymentProfileAuditInput = {
  id?: string | null;
  ownerId?: string | null;
  name: string;
  merchantCode: string;
  defaultChannelCode?: string | null;
  enabledChannelCodes?: string[] | string | null;
  isActive: boolean;
  isDefault: boolean;
  apiKey?: string | null;
  apiSecret?: string | null;
  notifySecret?: string | null;
};

export type PaymentProfileAuditState = {
  id: string | null;
  ownerId: string | null;
  name: string;
  merchantCode: string;
  defaultChannelCode: string;
  enabledChannelCodes: string[];
  isActive: boolean;
  isDefault: boolean;
  hasApiKey: boolean;
  hasApiSecret: boolean;
  hasNotifySecret: boolean;
};

export const controlAuditLogSelect = {
  id: true,
  scope: true,
  actorType: true,
  actorId: true,
  actorLabel: true,
  merchantAccountId: true,
  paymentProfileId: true,
  actionType: true,
  riskLevel: true,
  outcome: true,
  targetType: true,
  targetId: true,
  targetLabel: true,
  summary: true,
  detail: true,
  payload: true,
  reviewStatus: true,
  reviewerType: true,
  reviewerId: true,
  reviewerLabel: true,
  reviewNote: true,
  reviewedAt: true,
  createdAt: true,
} satisfies Prisma.ControlAuditLogSelect;

export type ControlAuditLogSnapshot = Prisma.ControlAuditLogGetPayload<{
  select: typeof controlAuditLogSelect;
}>;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function serializePayload(payload: unknown) {
  if (payload === undefined) {
    return null;
  }

  if (payload === null) {
    return "null";
  }

  if (typeof payload === "string") {
    return payload;
  }

  try {
    return JSON.stringify(payload);
  } catch {
    return JSON.stringify({
      fallback: "payload_serialization_failed",
    });
  }
}

export function buildPaymentProfileAuditState(
  input: PaymentProfileAuditInput | null | undefined,
): PaymentProfileAuditState | null {
  if (!input) {
    return null;
  }

  return {
    id: input.id?.trim() || null,
    ownerId: input.ownerId?.trim() || null,
    name: normalizeString(input.name),
    merchantCode: normalizeString(input.merchantCode),
    defaultChannelCode: normalizeString(input.defaultChannelCode) || "alipay.page",
    enabledChannelCodes: normalizeEnabledChannelCodes(
      input.enabledChannelCodes ?? "",
      normalizeString(input.defaultChannelCode) || "alipay.page",
    ),
    isActive: Boolean(input.isActive),
    isDefault: Boolean(input.isDefault),
    hasApiKey: normalizeString(input.apiKey).length > 0,
    hasApiSecret: normalizeString(input.apiSecret).length > 0,
    hasNotifySecret: normalizeString(input.notifySecret).length > 0,
  };
}

export function describePaymentProfileAuditChange(input: {
  before: PaymentProfileAuditState | null;
  after: PaymentProfileAuditState;
  apiCredentialTouched?: boolean;
  notifySecretTouched?: boolean;
}) {
  const changes: string[] = [];
  const before = input.before;

  if (!before) {
    changes.push("新增 NovaPay 商户接入");
  } else {
    if (before.name !== input.after.name) {
      changes.push("更新商户名称");
    }

    if (before.merchantCode !== input.after.merchantCode) {
      changes.push("切换商户号");
    }

    if (before.defaultChannelCode !== input.after.defaultChannelCode) {
      changes.push("调整默认支付通道");
    }

    if (before.enabledChannelCodes.join(",") !== input.after.enabledChannelCodes.join(",")) {
      changes.push("调整可用支付方式");
    }

    if (before.isActive !== input.after.isActive) {
      changes.push(input.after.isActive ? "重新启用商户" : "停用商户");
    }

    if (before.isDefault !== input.after.isDefault) {
      changes.push(input.after.isDefault ? "切换为默认商户" : "取消默认商户");
    }
  }

  if (input.apiCredentialTouched) {
    changes.push("轮换 API 凭证");
  }

  if (input.notifySecretTouched) {
    changes.push(input.after.hasNotifySecret ? "更新回调密钥" : "清空回调密钥");
  }

  return changes.length > 0 ? changes.join("，") : "更新支付商户基础信息";
}

export function resolvePaymentProfileAuditRisk(input: {
  before: PaymentProfileAuditState | null;
  after: PaymentProfileAuditState;
  apiCredentialTouched?: boolean;
  notifySecretTouched?: boolean;
}): ControlAuditRiskLevel {
  const before = input.before;

  if (!before) {
    return input.after.isActive || input.after.isDefault ? "HIGH" : "MEDIUM";
  }

  if (!input.after.isActive && before.isActive) {
    return "HIGH";
  }

  if (before.isDefault !== input.after.isDefault) {
    return "HIGH";
  }

  if (before.defaultChannelCode !== input.after.defaultChannelCode) {
    return "HIGH";
  }

  if (before.enabledChannelCodes.join(",") !== input.after.enabledChannelCodes.join(",")) {
    return "HIGH";
  }

  if (before.merchantCode !== input.after.merchantCode) {
    return "HIGH";
  }

  if (input.apiCredentialTouched || input.notifySecretTouched) {
    return "HIGH";
  }

  return "MEDIUM";
}

export async function createControlAuditLog(input: {
  scope: ControlAuditScope;
  actorType: string;
  actorId?: string | null;
  actorLabel: string;
  merchantAccountId?: string | null;
  paymentProfileId?: string | null;
  actionType: string;
  riskLevel: ControlAuditRiskLevel;
  outcome?: ControlAuditOutcome;
  targetType: string;
  targetId?: string | null;
  targetLabel: string;
  summary: string;
  detail?: string | null;
  payload?: unknown;
}) {
  return prisma.controlAuditLog.create({
    data: {
      scope: input.scope,
      actorType: input.actorType,
      actorId: input.actorId?.trim() || null,
      actorLabel: normalizeString(input.actorLabel),
      merchantAccountId: input.merchantAccountId?.trim() || null,
      paymentProfileId: input.paymentProfileId?.trim() || null,
      actionType: normalizeString(input.actionType),
      riskLevel: input.riskLevel,
      outcome: input.outcome ?? "SUCCEEDED",
      targetType: normalizeString(input.targetType),
      targetId: input.targetId?.trim() || null,
      targetLabel: normalizeString(input.targetLabel),
      summary: normalizeString(input.summary),
      detail: normalizeString(input.detail) || null,
      payload: serializePayload(input.payload),
      reviewStatus: "PENDING",
    },
    select: controlAuditLogSelect,
  });
}

export async function captureControlAuditLog(
  input: Parameters<typeof createControlAuditLog>[0],
) {
  try {
    return await createControlAuditLog(input);
  } catch (error) {
    console.error("Failed to persist control audit log", error);
    return null;
  }
}

export async function listControlAuditLogs(input?: {
  where?: Prisma.ControlAuditLogWhereInput;
  take?: number;
}) {
  return prisma.controlAuditLog.findMany({
    where: input?.where,
    select: controlAuditLogSelect,
    orderBy: [{ createdAt: "desc" }],
    take: input?.take ?? 12,
  });
}

export async function updateControlAuditReview(input: {
  logId: string;
  reviewStatus: ControlAuditReviewStatus;
  reviewerType: string;
  reviewerId?: string | null;
  reviewerLabel: string;
  reviewNote?: string | null;
}) {
  return prisma.controlAuditLog.update({
    where: {
      id: input.logId.trim(),
    },
    data:
      input.reviewStatus === "REVIEWED"
        ? {
            reviewStatus: "REVIEWED",
            reviewerType: normalizeString(input.reviewerType),
            reviewerId: input.reviewerId?.trim() || null,
            reviewerLabel: normalizeString(input.reviewerLabel),
            reviewNote: normalizeString(input.reviewNote) || "已完成控制面复核。",
            reviewedAt: new Date(),
          }
        : {
            reviewStatus: "PENDING",
            reviewerType: null,
            reviewerId: null,
            reviewerLabel: null,
            reviewNote: normalizeString(input.reviewNote) || null,
            reviewedAt: null,
          },
    select: controlAuditLogSelect,
  });
}
