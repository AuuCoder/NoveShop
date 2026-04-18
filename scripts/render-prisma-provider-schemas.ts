import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const schemaPath = path.join(rootDir, "prisma", "schema.prisma");

type ProviderTarget = {
  name: "postgresql" | "mysql";
  output: string;
};

const providerTargets: ProviderTarget[] = [
  {
    name: "postgresql",
    output: "../generated/prisma-postgresql-client",
  },
  {
    name: "mysql",
    output: "../generated/prisma-mysql-client",
  },
];

async function main() {
  const source = await readFile(schemaPath, "utf8");

  for (const target of providerTargets) {
    const rendered = source
      .replace(
        /generator client \{\s*provider = "prisma-client-js"\s*\}/m,
        `generator client {\n  provider = "prisma-client-js"\n  output   = "${target.output}"\n}`,
      )
      .replace(
        /datasource db \{\s*provider = "sqlite"\s*\}/m,
        `datasource db {\n  provider = "${target.name}"\n}`,
      );

    const outputPath = path.join(rootDir, "prisma", `schema.${target.name}.prisma`);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, rendered, "utf8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
