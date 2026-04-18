const DEV_DATABASE_URL = "file:./prisma/dev.db";
const DEV_SHOP_PUBLIC_BASE_URL = "http://localhost:3001";
const DEV_NOVAPAY_BASE_URL = "http://localhost:3000";
const DEV_ADMIN_USERNAME = "admin";
const DEV_ADMIN_PASSWORD = "change-me";
const DEV_ADMIN_SESSION_SECRET = "noveshop-dev-admin-session-secret";
const DEV_MERCHANT_SESSION_SECRET = "noveshop-dev-merchant-session-secret";
const DEV_DATA_ENCRYPTION_KEY = "noveshop-dev-data-encryption-key";

function shouldEnforceProductionEnv() {
  return (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PHASE !== "phase-production-build" &&
    process.env.ALLOW_SQLITE_IN_PRODUCTION !== "true"
  );
}

function hasText(value: string | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

function readRequired(
  name: string,
  options?: {
    developmentDefault?: string;
    message?: string;
  },
) {
  const value = process.env[name];

  if (hasText(value)) {
    return value as string;
  }

  if (!shouldEnforceProductionEnv() && options?.developmentDefault !== undefined) {
    return options.developmentDefault;
  }

  throw new Error(options?.message ?? `缺少环境变量 ${name}。`);
}

function detectDatabaseEngine(databaseUrl: string) {
  if (databaseUrl.startsWith("file:") || databaseUrl.startsWith("sqlite:")) {
    return "sqlite";
  }

  if (databaseUrl.startsWith("postgresql:") || databaseUrl.startsWith("postgres:")) {
    return "postgresql";
  }

  if (databaseUrl.startsWith("mysql:")) {
    return "mysql";
  }

  if (databaseUrl.startsWith("sqlserver:")) {
    return "sqlserver";
  }

  return "unknown";
}

export function getEnv() {
  const isProduction = process.env.NODE_ENV === "production";
  const enforceProductionEnv = shouldEnforceProductionEnv();
  const hasLegacyEnvPaymentProfile =
    hasText(process.env.NOVAPAY_MERCHANT_CODE) &&
    hasText(process.env.NOVAPAY_API_KEY) &&
    hasText(process.env.NOVAPAY_API_SECRET) &&
    hasText(process.env.NOVAPAY_NOTIFY_SECRET);
  const databaseUrl = readRequired("DATABASE_URL", {
    developmentDefault: DEV_DATABASE_URL,
    message: "生产环境必须显式配置 DATABASE_URL，且不能继续使用 SQLite 文件库。",
  });
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  const adminPassword =
    process.env.ADMIN_PASSWORD ??
    (!enforceProductionEnv || !hasText(adminPasswordHash) ? DEV_ADMIN_PASSWORD : "");

  if (enforceProductionEnv && !hasText(adminPassword) && !hasText(adminPasswordHash)) {
    throw new Error("请配置 ADMIN_PASSWORD 或 ADMIN_PASSWORD_HASH 作为后台管理员凭证。");
  }

  return {
    isProduction,
    isDevelopment: !isProduction,
    databaseUrl,
    databaseEngine: detectDatabaseEngine(databaseUrl),
    shopPublicBaseUrl: readRequired("SHOP_PUBLIC_BASE_URL", {
      developmentDefault: DEV_SHOP_PUBLIC_BASE_URL,
      message: "生产环境必须配置 SHOP_PUBLIC_BASE_URL，供订单回跳与公开链接使用。",
    }),
    adminUsername: readRequired("ADMIN_USERNAME", {
      developmentDefault: DEV_ADMIN_USERNAME,
      message: "请配置 ADMIN_USERNAME 作为后台管理员账号。",
    }),
    adminPassword,
    adminPasswordHash,
    adminSessionSecret: readRequired("ADMIN_SESSION_SECRET", {
      developmentDefault: DEV_ADMIN_SESSION_SECRET,
      message: "生产环境必须配置 ADMIN_SESSION_SECRET，不能使用默认后台会话密钥。",
    }),
    merchantSessionSecret: readRequired("MERCHANT_SESSION_SECRET", {
      developmentDefault: DEV_MERCHANT_SESSION_SECRET,
      message: "生产环境必须配置 MERCHANT_SESSION_SECRET，不能使用默认商户会话密钥。",
    }),
    dataEncryptionKey: readRequired("DATA_ENCRYPTION_KEY", {
      developmentDefault: DEV_DATA_ENCRYPTION_KEY,
      message: "生产环境必须配置 DATA_ENCRYPTION_KEY，用于加密支付密钥和卡密。",
    }),
    novaPayBaseUrl: readRequired("NOVAPAY_BASE_URL", {
      developmentDefault: DEV_NOVAPAY_BASE_URL,
      message: "生产环境必须配置 NOVAPAY_BASE_URL。",
    }),
    novaPayMerchantCode: process.env.NOVAPAY_MERCHANT_CODE ?? "",
    novaPayApiKey: process.env.NOVAPAY_API_KEY ?? "",
    novaPayApiSecret: process.env.NOVAPAY_API_SECRET ?? "",
    novaPayNotifySecret: process.env.NOVAPAY_NOTIFY_SECRET ?? "",
    allowEnvPaymentProfileBootstrap:
      process.env.ALLOW_ENV_PAYMENT_PROFILE_BOOTSTRAP === "true" ||
      (!enforceProductionEnv && hasLegacyEnvPaymentProfile),
    hasLegacyEnvPaymentProfile,
    defaultChannelCode: process.env.DEFAULT_CHANNEL_CODE ?? "alipay.page",
  };
}
