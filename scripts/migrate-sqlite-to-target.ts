import { PrismaClient as SqlitePrismaClient } from "@prisma/client";
import { PrismaClient as PrismaMySqlClient } from "../generated/prisma-mysql-client";
import { PrismaClient as PrismaPostgreSqlClient } from "../generated/prisma-postgresql-client";
import {
  createMySqlAdapter,
  createPostgreSqlAdapter,
  createSqliteAdapter,
  resolveDatabaseUrl,
} from "../lib/prisma-adapters";

function detectDatabaseEngine(databaseUrl: string) {
  if (databaseUrl.startsWith("postgresql:") || databaseUrl.startsWith("postgres:")) {
    return "postgresql" as const;
  }

  if (databaseUrl.startsWith("mysql:")) {
    return "mysql" as const;
  }

  throw new Error("TARGET_DATABASE_URL 目前仅支持 PostgreSQL 或 MySQL。");
}

type AnyPrismaClient = {
  merchantAccount: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    count: (...args: unknown[]) => Promise<number>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  paymentProfile: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  paymentProfileRevision: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  product: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  productSku: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  shopOrder: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  cardItem: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  shopPaymentAttempt: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  webhookEventLog: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  controlAuditLog: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  orderSyncTask: {
    findMany: (...args: unknown[]) => Promise<unknown[]>;
    createMany: (...args: unknown[]) => Promise<unknown>;
    deleteMany: (...args: unknown[]) => Promise<unknown>;
  };
  $disconnect: () => Promise<void>;
};

function createTargetClient(targetDatabaseUrl: string): AnyPrismaClient {
  process.env.DATABASE_URL = targetDatabaseUrl;

  switch (detectDatabaseEngine(targetDatabaseUrl)) {
    case "postgresql":
      return new PrismaPostgreSqlClient({
        adapter: createPostgreSqlAdapter(targetDatabaseUrl),
      }) as unknown as AnyPrismaClient;
    case "mysql":
      return new PrismaMySqlClient({
        adapter: createMySqlAdapter(targetDatabaseUrl),
      }) as unknown as AnyPrismaClient;
  }
}

async function main() {
  const sourceDatabaseUrl = resolveDatabaseUrl(
    process.env.SOURCE_DATABASE_URL ?? process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  );
  const targetDatabaseUrl = process.env.TARGET_DATABASE_URL?.trim();
  const shouldClearTarget = process.env.CLEAR_TARGET === "true";

  if (!targetDatabaseUrl) {
    throw new Error("请配置 TARGET_DATABASE_URL，例如 PostgreSQL 或 MySQL 连接串。");
  }

  const source = new SqlitePrismaClient({
    adapter: createSqliteAdapter(sourceDatabaseUrl),
    log: ["warn", "error"],
  });
  const target = createTargetClient(targetDatabaseUrl);

  try {
    const targetCount = await target.merchantAccount.count();

    if (targetCount > 0 && !shouldClearTarget) {
      throw new Error("目标数据库已存在数据。请先清空，或带上 CLEAR_TARGET=true 再执行迁移。");
    }

    if (shouldClearTarget) {
      await target.orderSyncTask.deleteMany();
      await target.webhookEventLog.deleteMany();
      await target.controlAuditLog.deleteMany();
      await target.shopPaymentAttempt.deleteMany();
      await target.cardItem.deleteMany();
      await target.shopOrder.deleteMany();
      await target.productSku.deleteMany();
      await target.product.deleteMany();
      await target.paymentProfileRevision.deleteMany();
      await target.paymentProfile.deleteMany();
      await target.merchantAccount.deleteMany();
    }

    const [
      merchantAccounts,
      paymentProfiles,
      paymentProfileRevisions,
      products,
      productSkus,
      shopOrders,
      cardItems,
      shopPaymentAttempts,
      webhookEventLogs,
      controlAuditLogs,
      orderSyncTasks,
    ] = await Promise.all([
      source.merchantAccount.findMany(),
      source.paymentProfile.findMany(),
      source.paymentProfileRevision.findMany(),
      source.product.findMany(),
      source.productSku.findMany(),
      source.shopOrder.findMany(),
      source.cardItem.findMany(),
      source.shopPaymentAttempt.findMany(),
      source.webhookEventLog.findMany(),
      source.controlAuditLog.findMany(),
      source.orderSyncTask.findMany(),
    ]);

    await target.merchantAccount.createMany({ data: merchantAccounts });
    await target.paymentProfile.createMany({ data: paymentProfiles });
    await target.paymentProfileRevision.createMany({ data: paymentProfileRevisions });
    await target.product.createMany({ data: products });
    await target.productSku.createMany({ data: productSkus });
    await target.shopOrder.createMany({ data: shopOrders });
    await target.cardItem.createMany({ data: cardItems });
    await target.shopPaymentAttempt.createMany({ data: shopPaymentAttempts });
    await target.webhookEventLog.createMany({ data: webhookEventLogs });
    await target.controlAuditLog.createMany({ data: controlAuditLogs });
    await target.orderSyncTask.createMany({ data: orderSyncTasks });

    console.log(
      JSON.stringify(
        {
          sourceDatabaseUrl,
          targetDatabaseEngine: detectDatabaseEngine(targetDatabaseUrl),
          migrated: {
            merchantAccounts: merchantAccounts.length,
            paymentProfiles: paymentProfiles.length,
            paymentProfileRevisions: paymentProfileRevisions.length,
            products: products.length,
            productSkus: productSkus.length,
            shopOrders: shopOrders.length,
            cardItems: cardItems.length,
            shopPaymentAttempts: shopPaymentAttempts.length,
            webhookEventLogs: webhookEventLogs.length,
            controlAuditLogs: controlAuditLogs.length,
            orderSyncTasks: orderSyncTasks.length,
          },
        },
        null,
        2,
      ),
    );
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
