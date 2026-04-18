import type { Prisma } from "@prisma/client";
import {
  buildPaymentProfileAuditState,
  describePaymentProfileAuditChange,
} from "@/lib/control-audit";
import {
  decryptOptionalText,
  decryptText,
  encryptText,
} from "@/lib/encryption";
import {
  normalizeEnabledChannelCodes,
  serializeEnabledChannelCodes,
} from "@/lib/payment-channels";
import { prisma } from "@/lib/prisma";
import { getEnv } from "@/lib/env";

const paymentProfileSelect = {
  id: true,
  ownerId: true,
  name: true,
  merchantCode: true,
  apiKey: true,
  apiSecret: true,
  notifySecret: true,
  defaultChannelCode: true,
  enabledChannelCodes: true,
  isActive: true,
  isDefault: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PaymentProfileSelect;

type PaymentProfileRow = Prisma.PaymentProfileGetPayload<{
  select: typeof paymentProfileSelect;
}>;

export type PaymentProfileSnapshot = Omit<
  PaymentProfileRow,
  "apiKey" | "apiSecret" | "notifySecret" | "enabledChannelCodes"
> & {
  apiKey: string;
  apiSecret: string;
  notifySecret: string | null;
  enabledChannelCodes: string[];
};

function hydratePaymentProfile(profile: PaymentProfileRow): PaymentProfileSnapshot {
  return {
    ...profile,
    apiKey: decryptText(profile.apiKey, "NovaPay API Key"),
    apiSecret: decryptText(profile.apiSecret, "NovaPay API Secret"),
    notifySecret: decryptOptionalText(profile.notifySecret, "NovaPay 回调验签密钥"),
    enabledChannelCodes: normalizeEnabledChannelCodes(
      profile.enabledChannelCodes,
      profile.defaultChannelCode,
    ),
  };
}

function hydrateOptionalPaymentProfile(profile: PaymentProfileRow | null) {
  return profile ? hydratePaymentProfile(profile) : null;
}

function hydratePaymentProfiles(profiles: PaymentProfileRow[]) {
  return profiles.map((profile) => hydratePaymentProfile(profile));
}

function buildStoredPaymentProfileInput(input: {
  name: string;
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  notifySecret: string;
  defaultChannelCode: string;
  enabledChannelCodes: string[];
}) {
  return {
    name: input.name,
    merchantCode: input.merchantCode,
    apiKey: encryptText(input.apiKey),
    apiSecret: encryptText(input.apiSecret),
    notifySecret: input.notifySecret.trim() ? encryptText(input.notifySecret) : null,
    defaultChannelCode: input.defaultChannelCode,
    enabledChannelCodes: serializeEnabledChannelCodes(input.enabledChannelCodes),
  };
}

export const paymentProfileRevisionSummarySelect = {
  id: true,
  paymentProfileId: true,
  version: true,
  sourceScope: true,
  actorType: true,
  actorId: true,
  actorLabel: true,
  changeType: true,
  summary: true,
  createdAt: true,
} satisfies Prisma.PaymentProfileRevisionSelect;

type PaymentProfileRevisionSummaryRow = Prisma.PaymentProfileRevisionGetPayload<{
  select: typeof paymentProfileRevisionSummarySelect;
}>;

export type PaymentProfileRevisionSummary = PaymentProfileRevisionSummaryRow & {
  diffHighlights: string[];
};

const paymentProfileRevisionListSelect = {
  ...paymentProfileRevisionSummarySelect,
  snapshot: true,
} satisfies Prisma.PaymentProfileRevisionSelect;

type PaymentProfileRevisionListRow = Prisma.PaymentProfileRevisionGetPayload<{
  select: typeof paymentProfileRevisionListSelect;
}>;

const paymentProfileRevisionHistorySelect = {
  id: true,
  paymentProfileId: true,
  version: true,
  snapshot: true,
} satisfies Prisma.PaymentProfileRevisionSelect;

type PaymentProfileRevisionHistoryRow = Prisma.PaymentProfileRevisionGetPayload<{
  select: typeof paymentProfileRevisionHistorySelect;
}>;

export type PaymentProfileRevisionSnapshot = {
  ownerId: string | null;
  name: string;
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  notifySecret: string | null;
  defaultChannelCode: string;
  enabledChannelCodes: string[];
  isActive: boolean;
  isDefault: boolean;
};

type PaymentProfileRevisionMeta = {
  sourceScope: string;
  actorType: string;
  actorId?: string | null;
  actorLabel: string;
  changeType: string;
  summary: string;
};

type PaymentProfileRevisionDelegate = {
  findMany: typeof prisma.paymentProfileRevision.findMany;
  findFirst: typeof prisma.paymentProfileRevision.findFirst;
  findUnique: typeof prisma.paymentProfileRevision.findUnique;
  create: typeof prisma.paymentProfileRevision.create;
};

function getPaymentProfileRevisionDelegate(
  client: Prisma.TransactionClient | typeof prisma,
): PaymentProfileRevisionDelegate | null {
  const delegate = (client as typeof prisma & {
    paymentProfileRevision?: PaymentProfileRevisionDelegate;
  }).paymentProfileRevision;

  if (
    delegate &&
    typeof delegate.findMany === "function" &&
    typeof delegate.findFirst === "function" &&
    typeof delegate.findUnique === "function" &&
    typeof delegate.create === "function"
  ) {
    return delegate;
  }

  return null;
}

function isPrismaStorageMissingError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error.code === "P2021" || error.code === "P2022")
  );
}

function getEnvPaymentProfileInput() {
  const env = getEnv();

  if (!env.allowEnvPaymentProfileBootstrap) {
    return null;
  }

  if (!env.novaPayMerchantCode || !env.novaPayApiKey || !env.novaPayApiSecret) {
    return null;
  }

  const defaultChannelCode = env.defaultChannelCode.trim() || "alipay.page";

  return {
    name: "环境默认商户",
    merchantCode: env.novaPayMerchantCode.trim(),
    apiKey: env.novaPayApiKey.trim(),
    apiSecret: env.novaPayApiSecret.trim(),
    notifySecret: env.novaPayNotifySecret.trim(),
    defaultChannelCode,
    enabledChannelCodes: normalizeEnabledChannelCodes(defaultChannelCode, defaultChannelCode),
    isActive: true,
    isDefault: true,
  };
}

function normalizeRequired(value: string, label: string) {
  const normalized = value.trim();

  if (!normalized) {
    throw new Error(`${label}不能为空。`);
  }

  return normalized;
}

function normalizeOptionalId(value?: string | null) {
  const normalized = value?.trim() ?? "";
  return normalized || null;
}

function normalizePaymentProfileInput(input: {
  name: string;
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  notifySecret?: string;
  defaultChannelCode?: string;
  enabledChannelCodes?: string | string[];
}) {
  const defaultChannelCode = input.defaultChannelCode?.trim() || "alipay.page";
  const enabledChannelCodes = normalizeEnabledChannelCodes(
    input.enabledChannelCodes ?? defaultChannelCode,
    defaultChannelCode,
  );

  return {
    name: normalizeRequired(input.name, "商户名称"),
    merchantCode: normalizeRequired(input.merchantCode, "商户号"),
    apiKey: normalizeRequired(input.apiKey, "API Key"),
    apiSecret: normalizeRequired(input.apiSecret, "API Secret"),
    notifySecret: String(input.notifySecret ?? "").trim(),
    defaultChannelCode: enabledChannelCodes[0] ?? defaultChannelCode,
    enabledChannelCodes,
  };
}

function serializePaymentProfileRevisionSnapshot(
  snapshot: PaymentProfileRevisionSnapshot,
) {
  return encryptText(JSON.stringify(snapshot));
}

function buildPaymentProfileRevisionSnapshot(
  profile: PaymentProfileSnapshot,
): PaymentProfileRevisionSnapshot {
  return {
    ownerId: profile.ownerId,
    name: profile.name,
    merchantCode: profile.merchantCode,
    apiKey: profile.apiKey,
    apiSecret: profile.apiSecret,
    notifySecret: profile.notifySecret ?? null,
    defaultChannelCode: profile.defaultChannelCode,
    enabledChannelCodes: profile.enabledChannelCodes,
    isActive: profile.isActive,
    isDefault: profile.isDefault,
  };
}

function parsePaymentProfileRevisionSnapshot(
  snapshot: string,
): PaymentProfileRevisionSnapshot {
  const parsed = JSON.parse(decryptText(snapshot, "支付商户版本快照")) as Partial<PaymentProfileRevisionSnapshot>;

  if (
    typeof parsed.name !== "string" ||
    typeof parsed.merchantCode !== "string" ||
    typeof parsed.apiKey !== "string" ||
    typeof parsed.apiSecret !== "string"
  ) {
    throw new Error("版本快照损坏，暂时无法回滚。");
  }

  return {
    ownerId: typeof parsed.ownerId === "string" && parsed.ownerId.trim() ? parsed.ownerId.trim() : null,
    name: parsed.name,
    merchantCode: parsed.merchantCode,
    apiKey: parsed.apiKey,
    apiSecret: parsed.apiSecret,
    notifySecret: typeof parsed.notifySecret === "string" && parsed.notifySecret.trim() ? parsed.notifySecret : null,
    defaultChannelCode:
      typeof parsed.defaultChannelCode === "string" && parsed.defaultChannelCode.trim()
        ? parsed.defaultChannelCode
        : "alipay.page",
    enabledChannelCodes: normalizeEnabledChannelCodes(
      Array.isArray(parsed.enabledChannelCodes)
        ? parsed.enabledChannelCodes.filter((item): item is string => typeof item === "string")
        : "",
      typeof parsed.defaultChannelCode === "string" && parsed.defaultChannelCode.trim()
        ? parsed.defaultChannelCode
        : "alipay.page",
    ),
    isActive: Boolean(parsed.isActive),
    isDefault: Boolean(parsed.isDefault),
  };
}

function tryParsePaymentProfileRevisionSnapshot(
  snapshot: string,
): PaymentProfileRevisionSnapshot | null {
  try {
    return parsePaymentProfileRevisionSnapshot(snapshot);
  } catch {
    return null;
  }
}

function buildPaymentProfileRevisionDiffHighlights(input: {
  current: PaymentProfileRevisionSnapshot | null;
  previous: PaymentProfileRevisionSnapshot | null;
  changeType: string;
}) {
  if (!input.current) {
    return ["当前版本快照暂时无法解析"];
  }

  const afterState = buildPaymentProfileAuditState({
    id: null,
    ownerId: input.current.ownerId,
    name: input.current.name,
    merchantCode: input.current.merchantCode,
    defaultChannelCode: input.current.defaultChannelCode,
    enabledChannelCodes: input.current.enabledChannelCodes,
    isActive: input.current.isActive,
    isDefault: input.current.isDefault,
    apiKey: input.current.apiKey,
    apiSecret: input.current.apiSecret,
    notifySecret: input.current.notifySecret,
  });

  const beforeState = input.previous
    ? buildPaymentProfileAuditState({
        id: null,
        ownerId: input.previous.ownerId,
        name: input.previous.name,
        merchantCode: input.previous.merchantCode,
        defaultChannelCode: input.previous.defaultChannelCode,
        enabledChannelCodes: input.previous.enabledChannelCodes,
        isActive: input.previous.isActive,
        isDefault: input.previous.isDefault,
        apiKey: input.previous.apiKey,
        apiSecret: input.previous.apiSecret,
        notifySecret: input.previous.notifySecret,
      })
    : null;

  if (!afterState) {
    return ["当前版本快照暂时无法解析"];
  }

  const apiCredentialTouched = input.previous
    ? input.previous.apiKey !== input.current.apiKey || input.previous.apiSecret !== input.current.apiSecret
    : input.current.apiKey.trim().length > 0 || input.current.apiSecret.trim().length > 0;
  const notifySecretTouched = input.previous
    ? (input.previous.notifySecret?.trim() || null) !== (input.current.notifySecret?.trim() || null)
    : Boolean(input.current.notifySecret?.trim());
  const description = describePaymentProfileAuditChange({
    before: beforeState,
    after: afterState,
    apiCredentialTouched,
    notifySecretTouched,
  });
  const highlights = description
    .split("，")
    .map((item) => item.trim())
    .filter((item) => item && item !== "更新支付商户基础信息");

  if (highlights.length > 0) {
    return highlights;
  }

  switch (input.changeType) {
    case "CREATE":
      return ["创建首个支付配置快照"];
    case "ROLLBACK":
      return ["回滚后字段与上一版一致"];
    case "UPDATE":
    default:
      return ["未识别到可展示的字段差异"];
  }
}

async function enrichPaymentProfileRevisionSummaries(
  rows: PaymentProfileRevisionListRow[],
): Promise<PaymentProfileRevisionSummary[]> {
  if (rows.length === 0) {
    return [];
  }

  const revisionDelegate = getPaymentProfileRevisionDelegate(prisma);

  if (!revisionDelegate) {
    return rows.map((row) => {
      const { snapshot, ...revisionSummary } = row;
      void snapshot;

      return {
        ...revisionSummary,
        diffHighlights: ["当前环境尚未加载版本历史模型，重启后台后可恢复差异追踪"],
      };
    });
  }

  const paymentProfileIds = Array.from(new Set(rows.map((row) => row.paymentProfileId)));
  let historyRows: PaymentProfileRevisionHistoryRow[];

  try {
    historyRows = await revisionDelegate.findMany({
      where: {
        paymentProfileId: {
          in: paymentProfileIds,
        },
      },
      select: paymentProfileRevisionHistorySelect,
      orderBy: [{ paymentProfileId: "asc" }, { version: "desc" }],
    });
  } catch (error) {
    if (isPrismaStorageMissingError(error)) {
      return rows.map(({ snapshot, ...revisionSummary }) => {
        void snapshot;

        return {
          ...revisionSummary,
          diffHighlights: ["当前环境尚未同步版本历史数据表，已跳过差异展示"],
        };
      });
    }

    throw error;
  }
  const previousSnapshotMap = new Map<string, PaymentProfileRevisionSnapshot | null>();
  const historyLookup = new Map<string, PaymentProfileRevisionHistoryRow[]>();

  for (const row of historyRows) {
    const existing = historyLookup.get(row.paymentProfileId) ?? [];
    existing.push(row);
    historyLookup.set(row.paymentProfileId, existing);
  }

  for (const revisions of historyLookup.values()) {
    revisions.forEach((revision, index) => {
      const previousRevision = revisions[index + 1];
      previousSnapshotMap.set(
        revision.id,
        previousRevision ? tryParsePaymentProfileRevisionSnapshot(previousRevision.snapshot) : null,
      );
    });
  }

  return rows.map(({ snapshot, ...row }) => {
    const currentSnapshot = tryParsePaymentProfileRevisionSnapshot(snapshot);

    return {
      ...row,
      diffHighlights: buildPaymentProfileRevisionDiffHighlights({
        current: currentSnapshot,
        previous: previousSnapshotMap.get(row.id) ?? null,
        changeType: row.changeType,
      }),
    };
  });
}

async function createPaymentProfileRevisionWithTx(
  tx: Prisma.TransactionClient,
  profile: PaymentProfileRow | PaymentProfileSnapshot,
  meta: PaymentProfileRevisionMeta,
) {
  const snapshotProfile =
    Array.isArray((profile as PaymentProfileSnapshot).enabledChannelCodes)
      ? (profile as PaymentProfileSnapshot)
      : hydratePaymentProfile(profile as PaymentProfileRow);
  const revisionDelegate = getPaymentProfileRevisionDelegate(tx);

  if (!revisionDelegate) {
    return null;
  }

  try {
    const latestRevision = await revisionDelegate.findFirst({
      where: {
        paymentProfileId: profile.id,
      },
      select: {
        version: true,
      },
      orderBy: [{ version: "desc" }],
    });

    return revisionDelegate.create({
      data: {
        paymentProfileId: snapshotProfile.id,
        version: (latestRevision?.version ?? 0) + 1,
        sourceScope: meta.sourceScope.trim(),
        actorType: meta.actorType.trim(),
        actorId: meta.actorId?.trim() || null,
        actorLabel: meta.actorLabel.trim(),
        changeType: meta.changeType.trim(),
        summary: meta.summary.trim(),
        snapshot: serializePaymentProfileRevisionSnapshot(
          buildPaymentProfileRevisionSnapshot(snapshotProfile),
        ),
      },
      select: paymentProfileRevisionSummarySelect,
    });
  } catch (error) {
    if (isPrismaStorageMissingError(error)) {
      return null;
    }

    throw error;
  }
}

async function syncDefaultPaymentProfile(
  tx: Prisma.TransactionClient,
  preferredId?: string | null,
) {
  const enabledProfiles = await tx.paymentProfile.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      isDefault: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }, { createdAt: "desc" }],
  });

  if (enabledProfiles.length === 0) {
    await tx.paymentProfile.updateMany({
      where: {
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    return null;
  }

  const targetId =
    (preferredId && enabledProfiles.some((profile) => profile.id === preferredId) ? preferredId : null) ??
    enabledProfiles.find((profile) => profile.isDefault)?.id ??
    enabledProfiles[0]?.id ??
    null;

  if (!targetId) {
    return null;
  }

  await tx.paymentProfile.updateMany({
    where: {
      id: {
        not: targetId,
      },
      isDefault: true,
    },
    data: {
      isDefault: false,
    },
  });

  await tx.paymentProfile.update({
    where: {
      id: targetId,
    },
    data: {
      isDefault: true,
    },
  });

  return targetId;
}

export async function listPaymentProfiles() {
  const profiles = await prisma.paymentProfile.findMany({
    select: paymentProfileSelect,
    orderBy: [{ isDefault: "desc" }, { isActive: "desc" }, { updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return hydratePaymentProfiles(profiles);
}

export async function getDefaultPaymentProfile() {
  const profile = await prisma.paymentProfile.findFirst({
    where: {
      isActive: true,
    },
    select: paymentProfileSelect,
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return hydrateOptionalPaymentProfile(profile);
}

export async function ensureDefaultPaymentProfile() {
  const existing = await getDefaultPaymentProfile();

  if (existing) {
    if (existing.isDefault) {
      return existing;
    }

    const profile = await prisma.paymentProfile.update({
      where: {
        id: existing.id,
      },
      data: {
        isDefault: true,
      },
      select: paymentProfileSelect,
    });

    return hydratePaymentProfile(profile);
  }

  const envProfile = getEnvPaymentProfileInput();

  if (!envProfile) {
    return null;
  }

  const profile = await prisma.paymentProfile.create({
    data: {
      ...buildStoredPaymentProfileInput(envProfile),
      isActive: envProfile.isActive,
      isDefault: envProfile.isDefault,
    },
    select: paymentProfileSelect,
  });

  return hydratePaymentProfile(profile);
}

export async function requireDefaultPaymentProfile() {
  const profile = await ensureDefaultPaymentProfile();

  if (!profile) {
    throw new Error("请先在后台配置至少一个可用的 NovaPay 商户。");
  }

  return profile;
}

export async function getPaymentProfileById(paymentProfileId: string) {
  const id = normalizeOptionalId(paymentProfileId);

  if (!id) {
    return null;
  }

  const profile = await prisma.paymentProfile.findUnique({
    where: {
      id,
    },
    select: paymentProfileSelect,
  });

  return hydrateOptionalPaymentProfile(profile);
}

export async function getMerchantOwnedPaymentProfile(merchantAccountId: string) {
  const profile = await prisma.paymentProfile.findUnique({
    where: {
      ownerId: merchantAccountId,
    },
    select: paymentProfileSelect,
  });

  return hydrateOptionalPaymentProfile(profile);
}

export async function requirePaymentProfileById(paymentProfileId: string) {
  const profile = await getPaymentProfileById(paymentProfileId);

  if (!profile) {
    throw new Error("所选支付商户不存在。");
  }

  if (!profile.isActive) {
    throw new Error("所选支付商户已停用，请重新选择。");
  }

  return profile;
}

export async function resolvePaymentProfileId(input?: string | null) {
  const paymentProfileId = normalizeOptionalId(input);

  if (paymentProfileId) {
    return (await requirePaymentProfileById(paymentProfileId)).id;
  }

  return (await requireDefaultPaymentProfile()).id;
}

export async function getCheckoutChannelConfiguration(paymentProfileId?: string | null) {
  const profile = paymentProfileId
    ? await getPaymentProfileById(paymentProfileId)
    : await ensureDefaultPaymentProfile();

  if (!profile || !profile.isActive) {
    return null;
  }

  return {
    defaultChannelCode: profile.defaultChannelCode,
    enabledChannelCodes: profile.enabledChannelCodes,
  };
}

export async function savePaymentProfile(input: {
  paymentProfileId?: string;
  name: string;
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  notifySecret?: string;
  defaultChannelCode?: string;
  enabledChannelCodes?: string | string[];
  isActive: boolean;
  isDefault: boolean;
  revision?: PaymentProfileRevisionMeta;
}) {
  const paymentProfileId = normalizeOptionalId(input.paymentProfileId);
  const normalized = normalizePaymentProfileInput(input);
  const stored = buildStoredPaymentProfileInput(normalized);

  return prisma.$transaction(async (tx) => {
    const profile = paymentProfileId
      ? await tx.paymentProfile.update({
          where: {
            id: paymentProfileId,
          },
          data: {
            ...stored,
            isActive: input.isActive,
            isDefault: input.isDefault && input.isActive,
          },
          select: paymentProfileSelect,
        })
      : await tx.paymentProfile.create({
          data: {
            ...stored,
            isActive: input.isActive,
            isDefault: input.isDefault && input.isActive,
          },
          select: paymentProfileSelect,
        });

    await syncDefaultPaymentProfile(
      tx,
      profile.isActive && profile.isDefault ? profile.id : null,
    );

    const finalProfile = await tx.paymentProfile.findUniqueOrThrow({
      where: {
        id: profile.id,
      },
      select: paymentProfileSelect,
    });

    if (input.revision) {
      await createPaymentProfileRevisionWithTx(tx, finalProfile, input.revision);
    }

    return hydratePaymentProfile(finalProfile);
  });
}

export async function saveMerchantOwnedPaymentProfile(input: {
  merchantAccountId: string;
  name: string;
  merchantCode: string;
  apiKey: string;
  apiSecret: string;
  notifySecret?: string;
  defaultChannelCode?: string;
  enabledChannelCodes?: string | string[];
  isActive: boolean;
  revision?: PaymentProfileRevisionMeta;
}) {
  const normalized = normalizePaymentProfileInput(input);
  const stored = buildStoredPaymentProfileInput(normalized);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.paymentProfile.findUnique({
      where: {
        ownerId: input.merchantAccountId,
      },
      select: {
        id: true,
        isDefault: true,
      },
    });

    const profile = existing
      ? await tx.paymentProfile.update({
          where: {
            id: existing.id,
          },
          data: {
            ...stored,
            isActive: input.isActive,
            isDefault: existing.isDefault && input.isActive,
          },
          select: paymentProfileSelect,
        })
      : await tx.paymentProfile.create({
          data: {
            ownerId: input.merchantAccountId,
            ...stored,
            isActive: input.isActive,
            isDefault: false,
          },
          select: paymentProfileSelect,
        });

    await syncDefaultPaymentProfile(
      tx,
      profile.isActive && profile.isDefault ? profile.id : null,
    );

    const finalProfile = await tx.paymentProfile.findUniqueOrThrow({
      where: {
        id: profile.id,
      },
      select: paymentProfileSelect,
    });

    if (input.revision) {
      await createPaymentProfileRevisionWithTx(tx, finalProfile, input.revision);
    }

    return hydratePaymentProfile(finalProfile);
  });
}

async function assertPaymentProfileDeletionAllowed(
  tx: Prisma.TransactionClient,
  paymentProfileId: string,
) {
  const profile = await tx.paymentProfile.findUnique({
    where: {
      id: paymentProfileId,
    },
    select: {
      id: true,
      ownerId: true,
      isDefault: true,
      _count: {
        select: {
          products: true,
          orders: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("支付商户不存在。");
  }

  if (profile._count.products > 0) {
    throw new Error("这套支付商户仍然绑定了商品，解除绑定后才能删除。");
  }

  if (profile._count.orders > 0) {
    throw new Error("这套支付商户已有订单记录，暂时不能直接删除。");
  }

  return profile;
}

export async function deletePaymentProfile(paymentProfileId: string) {
  const id = normalizeOptionalId(paymentProfileId);

  if (!id) {
    throw new Error("支付商户不存在。");
  }

  return prisma.$transaction(async (tx) => {
    const profile = await assertPaymentProfileDeletionAllowed(tx, id);

    await tx.paymentProfile.delete({
      where: {
        id: profile.id,
      },
    });
    await syncDefaultPaymentProfile(tx, null);

    return profile;
  });
}

export async function deleteMerchantOwnedPaymentProfile(merchantAccountId: string) {
  return prisma.$transaction(async (tx) => {
    const profile = await tx.paymentProfile.findUnique({
      where: {
        ownerId: merchantAccountId,
      },
      select: {
        id: true,
      },
    });

    if (!profile) {
      throw new Error("当前商户还没有配置可删除的支付商户。");
    }

    await assertPaymentProfileDeletionAllowed(tx, profile.id);
    await tx.paymentProfile.delete({
      where: {
        id: profile.id,
      },
    });
    await syncDefaultPaymentProfile(tx, null);

    return profile;
  });
}

export async function listPaymentProfileRevisionSummaries(input?: {
  paymentProfileId?: string;
  paymentProfileIds?: string[];
  take?: number;
}) {
  const revisionDelegate = getPaymentProfileRevisionDelegate(prisma);

  if (!revisionDelegate) {
    return [];
  }

  const ids = input?.paymentProfileIds?.map((value) => value.trim()).filter(Boolean) ?? [];

  let rows: PaymentProfileRevisionListRow[];

  try {
    rows = await revisionDelegate.findMany({
      where: {
        ...(input?.paymentProfileId
          ? {
              paymentProfileId: input.paymentProfileId.trim(),
            }
          : {}),
        ...(ids.length > 0
          ? {
              paymentProfileId: {
                in: ids,
              },
            }
          : {}),
      },
      select: paymentProfileRevisionListSelect,
      orderBy: [{ createdAt: "desc" }],
      take: input?.take ?? 24,
    });
  } catch (error) {
    if (isPrismaStorageMissingError(error)) {
      return [];
    }

    throw error;
  }

  return enrichPaymentProfileRevisionSummaries(rows);
}

export async function getPaymentProfileRevisionById(revisionId: string) {
  const id = normalizeOptionalId(revisionId);

  if (!id) {
    return null;
  }

  const revisionDelegate = getPaymentProfileRevisionDelegate(prisma);

  if (!revisionDelegate) {
    return null;
  }

  let revision;

  try {
    revision = await revisionDelegate.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        paymentProfileId: true,
        version: true,
        sourceScope: true,
        actorType: true,
        actorId: true,
        actorLabel: true,
        changeType: true,
        summary: true,
        snapshot: true,
        createdAt: true,
        paymentProfile: {
          select: paymentProfileSelect,
        },
      },
    });
  } catch (error) {
    if (isPrismaStorageMissingError(error)) {
      return null;
    }

    throw error;
  }

  if (!revision) {
    return null;
  }

  return {
    ...revision,
    paymentProfile: revision.paymentProfile ? hydratePaymentProfile(revision.paymentProfile) : null,
  };
}

export async function rollbackPaymentProfileToRevision(input: {
  revisionId: string;
  actor: PaymentProfileRevisionMeta;
}) {
  const revision = await getPaymentProfileRevisionById(input.revisionId);

  if (!revision || !revision.paymentProfile) {
    throw new Error("目标版本不存在，暂时无法回滚。");
  }

  const snapshot = parsePaymentProfileRevisionSnapshot(revision.snapshot);

  return savePaymentProfile({
    paymentProfileId: revision.paymentProfileId,
    name: snapshot.name,
    merchantCode: snapshot.merchantCode,
    apiKey: snapshot.apiKey,
    apiSecret: snapshot.apiSecret,
    notifySecret: snapshot.notifySecret ?? "",
    defaultChannelCode: snapshot.defaultChannelCode,
    enabledChannelCodes: snapshot.enabledChannelCodes,
    isActive: snapshot.isActive,
    isDefault: snapshot.isDefault,
    revision: input.actor,
  });
}

export async function rollbackMerchantOwnedPaymentProfileToRevision(input: {
  revisionId: string;
  merchantAccountId: string;
  actor: PaymentProfileRevisionMeta;
}) {
  const revision = await getPaymentProfileRevisionById(input.revisionId);

  if (!revision || !revision.paymentProfile) {
    throw new Error("目标版本不存在，暂时无法回滚。");
  }

  if (revision.paymentProfile.ownerId !== input.merchantAccountId) {
    throw new Error("你没有权限回滚这套商户参数。");
  }

  const snapshot = parsePaymentProfileRevisionSnapshot(revision.snapshot);

  return saveMerchantOwnedPaymentProfile({
    merchantAccountId: input.merchantAccountId,
    name: snapshot.name,
    merchantCode: snapshot.merchantCode,
    apiKey: snapshot.apiKey,
    apiSecret: snapshot.apiSecret,
    notifySecret: snapshot.notifySecret ?? "",
    defaultChannelCode: snapshot.defaultChannelCode,
    enabledChannelCodes: snapshot.enabledChannelCodes,
    isActive: snapshot.isActive,
    revision: input.actor,
  });
}

export async function getPaymentProfileForOrderNo(orderNo: string) {
  const order = await prisma.shopOrder.findUnique({
    where: {
      orderNo,
    },
    select: {
      paymentProfile: {
        select: paymentProfileSelect,
      },
    },
  });

  return hydrateOptionalPaymentProfile(order?.paymentProfile ?? null);
}
