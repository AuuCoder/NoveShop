import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

function resolveDatabaseUrl(rawUrl: string) {
  if (!rawUrl.startsWith("file:./")) {
    return rawUrl;
  }

  return `file:${path.resolve(process.cwd(), rawUrl.slice("file:".length))}`;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: resolveDatabaseUrl(process.env.DATABASE_URL ?? "file:./prisma/dev.db"),
  },
});
