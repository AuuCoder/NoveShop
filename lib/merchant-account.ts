import type { Prisma } from "@prisma/client";
import { ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

const merchantAccountSelect = {
  id: true,
  name: true,
  email: true,
  isActive: true,
  storeAnnouncementEnabled: true,
  storeAnnouncementTitle: true,
  storeAnnouncementBody: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.MerchantAccountSelect;

export type MerchantAccountSnapshot = Prisma.MerchantAccountGetPayload<{
  select: typeof merchantAccountSelect;
}>;

const merchantAccountWithProfileSelect = {
  ...merchantAccountSelect,
  paymentProfile: {
    select: {
      id: true,
      name: true,
      merchantCode: true,
      defaultChannelCode: true,
      isActive: true,
      isDefault: true,
      updatedAt: true,
    },
  },
} satisfies Prisma.MerchantAccountSelect;

export type MerchantAccountWithProfileSnapshot = Prisma.MerchantAccountGetPayload<{
  select: typeof merchantAccountWithProfileSelect;
}>;

const merchantStorefrontSelect = {
  id: true,
  name: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  paymentProfile: {
    select: {
      id: true,
      name: true,
      merchantCode: true,
      isActive: true,
      updatedAt: true,
      products: {
        where: {
          status: ProductStatus.ACTIVE,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          skus: {
            where: {
              enabled: true,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
      },
    },
  },
} satisfies Prisma.MerchantAccountSelect;

type MerchantStorefrontRaw = Prisma.MerchantAccountGetPayload<{
  select: typeof merchantStorefrontSelect;
}>;

export type MerchantStorefrontSnapshot = Omit<MerchantStorefrontRaw, "paymentProfile"> & {
  paymentProfile: Omit<NonNullable<MerchantStorefrontRaw["paymentProfile"]>, "products"> & {
    productCount: number;
    skuCount: number;
    featuredProducts: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
};

function normalizeName(value: string) {
  const name = value.trim();

  if (!name) {
    throw new Error("商户名称不能为空。");
  }

  return name;
}

function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();

  if (!email) {
    throw new Error("邮箱不能为空。");
  }

  if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    throw new Error("请输入有效的邮箱地址。");
  }

  return email;
}

function normalizePassword(value: string) {
  if (value.length < 6) {
    throw new Error("密码至少需要 6 位。");
  }

  return value;
}

async function assertMerchantEmailAvailable(email: string, merchantAccountId?: string) {
  const duplicate = await prisma.merchantAccount.findFirst({
    where: {
      email,
      ...(merchantAccountId
        ? {
            id: {
              not: merchantAccountId,
            },
          }
        : {}),
    },
    select: {
      id: true,
    },
  });

  if (duplicate) {
    throw new Error("这个邮箱已经被其他商户使用。");
  }
}

export async function getMerchantAccountById(merchantAccountId: string) {
  return prisma.merchantAccount.findUnique({
    where: {
      id: merchantAccountId,
    },
    select: merchantAccountSelect,
  });
}

export async function getMerchantAccountWithProfileById(merchantAccountId: string) {
  return prisma.merchantAccount.findUnique({
    where: {
      id: merchantAccountId,
    },
    select: merchantAccountWithProfileSelect,
  });
}

export async function getMerchantAccountByEmail(emailInput: string) {
  const email = normalizeEmail(emailInput);

  return prisma.merchantAccount.findUnique({
    where: {
      email,
    },
    select: merchantAccountSelect,
  });
}

export async function listMerchantAccounts() {
  return prisma.merchantAccount.findMany({
    select: merchantAccountWithProfileSelect,
    orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
  });
}

export async function createMerchantAccount(input: {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}) {
  const name = normalizeName(input.name);
  const email = normalizeEmail(input.email);
  const passwordHash = await hashPassword(normalizePassword(input.password));

  await assertMerchantEmailAvailable(email);

  return prisma.merchantAccount.create({
    data: {
      name,
      email,
      passwordHash,
      isActive: input.isActive ?? true,
    },
    select: merchantAccountSelect,
  });
}

export async function updateMerchantAccount(input: {
  merchantAccountId: string;
  name: string;
  email: string;
  isActive: boolean;
}) {
  const name = normalizeName(input.name);
  const email = normalizeEmail(input.email);

  const existing = await prisma.merchantAccount.findUnique({
    where: {
      id: input.merchantAccountId,
    },
    select: {
      id: true,
    },
  });

  if (!existing) {
    throw new Error("商户账号不存在。");
  }

  await assertMerchantEmailAvailable(email, input.merchantAccountId);

  return prisma.merchantAccount.update({
    where: {
      id: input.merchantAccountId,
    },
    data: {
      name,
      email,
      isActive: input.isActive,
    },
    select: merchantAccountSelect,
  });
}

export async function updateMerchantSelfAccount(input: {
  merchantAccountId: string;
  name: string;
  email: string;
}) {
  const name = normalizeName(input.name);
  const email = normalizeEmail(input.email);

  const existing = await prisma.merchantAccount.findUnique({
    where: {
      id: input.merchantAccountId,
    },
    select: {
      id: true,
      isActive: true,
    },
  });

  if (!existing) {
    throw new Error("商户账号不存在。");
  }

  if (!existing.isActive) {
    throw new Error("当前商户账号已停用，暂时不能修改资料。");
  }

  await assertMerchantEmailAvailable(email, input.merchantAccountId);

  return prisma.merchantAccount.update({
    where: {
      id: input.merchantAccountId,
    },
    data: {
      name,
      email,
    },
    select: merchantAccountSelect,
  });
}

export async function changeMerchantAccountPassword(input: {
  merchantAccountId: string;
  currentPassword: string;
  newPassword: string;
}) {
  const currentPassword = normalizePassword(input.currentPassword);
  const newPassword = normalizePassword(input.newPassword);
  const account = await prisma.merchantAccount.findUnique({
    where: {
      id: input.merchantAccountId,
    },
    select: {
      id: true,
      passwordHash: true,
      isActive: true,
    },
  });

  if (!account) {
    throw new Error("商户账号不存在。");
  }

  if (!account.isActive) {
    throw new Error("当前商户账号已停用，暂时不能修改密码。");
  }

  if (!(await verifyPassword(currentPassword, account.passwordHash))) {
    throw new Error("当前密码不正确。");
  }

  if (currentPassword === newPassword) {
    throw new Error("新密码不能和当前密码相同。");
  }

  return prisma.merchantAccount.update({
    where: {
      id: input.merchantAccountId,
    },
    data: {
      passwordHash: await hashPassword(newPassword),
    },
    select: merchantAccountSelect,
  });
}

export async function resetMerchantAccountPassword(input: {
  merchantAccountId: string;
  newPassword: string;
}) {
  const newPassword = normalizePassword(input.newPassword);
  const account = await prisma.merchantAccount.findUnique({
    where: {
      id: input.merchantAccountId,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  });

  if (!account) {
    throw new Error("商户账号不存在。");
  }

  if (await verifyPassword(newPassword, account.passwordHash)) {
    throw new Error("新密码不能和当前密码相同。");
  }

  return prisma.merchantAccount.update({
    where: {
      id: input.merchantAccountId,
    },
    data: {
      passwordHash: await hashPassword(newPassword),
    },
    select: merchantAccountSelect,
  });
}

export async function deleteMerchantAccount(merchantAccountId: string) {
  const account = await prisma.merchantAccount.findUnique({
    where: {
      id: merchantAccountId,
    },
    select: {
      id: true,
      paymentProfile: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!account) {
    throw new Error("商户账号不存在。");
  }

  if (account.paymentProfile) {
    throw new Error("该商户已经配置支付商户或绑定商品，暂时不能直接删除。");
  }

  await prisma.merchantAccount.delete({
    where: {
      id: merchantAccountId,
    },
  });
}

export async function listMerchantStorefronts(): Promise<MerchantStorefrontSnapshot[]> {
  const merchants = await prisma.merchantAccount.findMany({
    where: {
      isActive: true,
      paymentProfile: {
        is: {
          products: {
            some: {
              status: ProductStatus.ACTIVE,
            },
          },
        },
      },
    },
    select: merchantStorefrontSelect,
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return merchants
    .map((merchant) => {
      if (!merchant.paymentProfile) {
        return null;
      }

      return {
        ...merchant,
        paymentProfile: {
          id: merchant.paymentProfile.id,
          name: merchant.paymentProfile.name,
          merchantCode: merchant.paymentProfile.merchantCode,
          isActive: merchant.paymentProfile.isActive,
          updatedAt: merchant.paymentProfile.updatedAt,
          productCount: merchant.paymentProfile.products.length,
          skuCount: merchant.paymentProfile.products.reduce(
            (sum, product) => sum + product.skus.length,
            0,
          ),
          featuredProducts: merchant.paymentProfile.products.slice(0, 3).map((product) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
          })),
        },
      } satisfies MerchantStorefrontSnapshot;
    })
    .filter((merchant): merchant is MerchantStorefrontSnapshot => Boolean(merchant));
}

export async function registerMerchantAccount(input: {
  name: string;
  email: string;
  password: string;
}) {
  return createMerchantAccount({
    ...input,
    isActive: true,
  });
}

export async function authenticateMerchantAccount(input: {
  email: string;
  password: string;
}) {
  const email = normalizeEmail(input.email);
  const password = normalizePassword(input.password);
  const account = await prisma.merchantAccount.findUnique({
    where: {
      email,
    },
  });

  if (!account || !(await verifyPassword(password, account.passwordHash))) {
    throw new Error("邮箱或密码不正确。");
  }

  if (!account.isActive) {
    throw new Error("该商户账号已停用，请联系管理员。");
  }

  return {
    id: account.id,
    name: account.name,
    email: account.email,
    isActive: account.isActive,
    storeAnnouncementEnabled: account.storeAnnouncementEnabled,
    storeAnnouncementTitle: account.storeAnnouncementTitle,
    storeAnnouncementBody: account.storeAnnouncementBody,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  } satisfies MerchantAccountSnapshot;
}

export async function requireActiveMerchantAccountById(merchantAccountId: string) {
  const account = await getMerchantAccountById(merchantAccountId);

  if (!account || !account.isActive) {
    throw new Error("商户账号不存在或已停用。");
  }

  return account;
}
