import "dotenv/config";
import { prisma } from "../lib/prisma";
import { getEnv } from "../lib/env";

async function main() {
  const env = getEnv();

  if (env.databaseEngine === "sqlite") {
    throw new Error("生产预检失败：DATABASE_URL 仍指向 SQLite，请先迁移到 PostgreSQL 或 MySQL。");
  }

  await prisma.$queryRaw`SELECT 1`;

  const [activePaymentProfiles, merchantAccounts, products, cardItems] = await Promise.all([
    prisma.paymentProfile.count({
      where: {
        isActive: true,
      },
    }),
    prisma.merchantAccount.count(),
    prisma.product.count(),
    prisma.cardItem.count(),
  ]);

  if (!env.allowEnvPaymentProfileBootstrap && activePaymentProfiles < 1) {
    throw new Error("生产预检失败：当前没有可用的支付商户，请先在后台配置至少一个已启用的 NovaPay 收款商户。");
  }

  console.log(
    JSON.stringify(
      {
        status: "ok",
        databaseEngine: env.databaseEngine,
        shopPublicBaseUrl: env.shopPublicBaseUrl,
        novaPayBaseUrl: env.novaPayBaseUrl,
        allowEnvPaymentProfileBootstrap: env.allowEnvPaymentProfileBootstrap,
        activePaymentProfiles,
        merchantAccounts,
        products,
        cardItems,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
