import path from "node:path";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

export function resolveDatabaseUrl(rawUrl: string) {
  if (!rawUrl.startsWith("file:./")) {
    return rawUrl;
  }

  return `file:${path.resolve(process.cwd(), rawUrl.slice("file:".length))}`;
}

export function createSqliteAdapter(databaseUrl: string) {
  return new PrismaBetterSqlite3({
    url: resolveDatabaseUrl(databaseUrl),
  });
}

export function createPostgreSqlAdapter(databaseUrl: string) {
  const parsed = new URL(databaseUrl);
  const schema = parsed.searchParams.get("schema")?.trim() || undefined;

  if (schema) {
    parsed.searchParams.delete("schema");
  }

  const connectionString = parsed.toString();

  return schema
    ? new PrismaPg({ connectionString }, { schema })
    : new PrismaPg({ connectionString });
}

export function createMySqlAdapter(databaseUrl: string) {
  const parsed = new URL(databaseUrl);
  const database = parsed.pathname.replace(/^\/+/, "");

  if (!database) {
    throw new Error("MySQL DATABASE_URL 缺少数据库名。");
  }

  return new PrismaMariaDb({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database,
  });
}
