import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaMySqlClient } from "../generated/prisma-mysql-client";
import { PrismaClient as PrismaPostgreSqlClient } from "../generated/prisma-postgresql-client";
import { getEnv } from "@/lib/env";
import {
  createMySqlAdapter,
  createPostgreSqlAdapter,
  createSqliteAdapter,
} from "@/lib/prisma-adapters";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const env = getEnv();
const enforceProductionDatabase =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build" &&
  process.env.ALLOW_SQLITE_IN_PRODUCTION !== "true";

if (enforceProductionDatabase && env.databaseEngine === "sqlite") {
  throw new Error("生产环境已禁止继续使用 SQLite，请先迁移到 PostgreSQL 或 MySQL 后再启动。");
}

function createPrismaClient() {
  const log =
    (process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]) satisfies Prisma.LogLevel[];

  switch (env.databaseEngine) {
    case "sqlite": {
      const adapter = createSqliteAdapter(env.databaseUrl);

      return new PrismaClient({
        adapter,
        log,
      });
    }
    case "postgresql": {
      const adapter = createPostgreSqlAdapter(env.databaseUrl);

      return new PrismaPostgreSqlClient({
        adapter,
        log,
      }) as unknown as PrismaClient;
    }
    case "mysql": {
      const adapter = createMySqlAdapter(env.databaseUrl);

      return new PrismaMySqlClient({
        adapter,
        log,
      }) as unknown as PrismaClient;
    }
    default:
      throw new Error(`暂不支持数据库引擎 ${env.databaseEngine}，请改用 sqlite、postgresql 或 mysql。`);
  }
}

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
