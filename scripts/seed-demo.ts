import "dotenv/config";
import { randomBytes } from "node:crypto";
import { ProductSaleMode, ProductStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";

const DEMO_SLUG = "demo-faka-product";

const demoSkus = [
  {
    name: "日卡",
    summary: "适合短时体验或测试支付链路",
    priceCents: 990,
    sortOrder: 0,
    stock: 4,
  },
  {
    name: "月卡",
    summary: "默认热销规格，自动发卡演示最直观",
    priceCents: 1990,
    sortOrder: 1,
    stock: 6,
  },
  {
    name: "季卡",
    summary: "高客单价 SKU，用于测试多规格定价",
    priceCents: 4990,
    sortOrder: 2,
    stock: 3,
  },
];

async function ensureSkuCards(productId: string, skuId: string, count: number, batchName: string) {
  const existingCount = await prisma.cardItem.count({
    where: {
      skuId,
    },
  });

  if (existingCount >= count) {
    return;
  }

  await prisma.cardItem.createMany({
    data: Array.from({ length: count - existingCount }, (_, index) => ({
      productId,
      skuId,
      batchName,
      secret: `DEMO-${skuId.slice(-4).toUpperCase()}-${index + existingCount + 1}-${randomBytes(3)
        .toString("hex")
        .toUpperCase()}`,
    })),
  });
}

async function main() {
  const defaultPaymentProfile = await prisma.paymentProfile.findFirst({
    where: {
      isActive: true,
    },
    orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
    },
  });

  let product = await prisma.product.findUnique({
    where: {
      slug: DEMO_SLUG,
    },
    include: {
      skus: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!product) {
    product = await prisma.product.create({
      data: {
        name: "演示发卡商品",
        slug: DEMO_SLUG,
        summary: "用于预览模板和联调 NovaPay 的示例商品",
        description:
          "这是一条自动生成的演示商品数据，用来快速查看首页模板、商品详情、多 SKU 配置和后台库存管理效果。你可以登录后台后直接修改或删除它。",
        priceCents: demoSkus[0].priceCents,
        saleMode: ProductSaleMode.MULTI,
        paymentProfileId: defaultPaymentProfile?.id ?? null,
        status: ProductStatus.ACTIVE,
      },
      include: {
        skus: true,
      },
    });
  } else {
    product = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        summary: "用于预览模板和联调 NovaPay 的示例商品",
        description:
          "这是一条自动生成的演示商品数据，用来快速查看首页模板、商品详情、多 SKU 配置和后台库存管理效果。你可以登录后台后直接修改或删除它。",
        saleMode: ProductSaleMode.MULTI,
        paymentProfileId: defaultPaymentProfile?.id ?? null,
        status: ProductStatus.ACTIVE,
      },
      include: {
        skus: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  }

  if (product.skus.length === 1 && product.skus[0]?.name === "默认规格") {
    await prisma.productSku.update({
      where: {
        id: product.skus[0].id,
      },
      data: {
        name: "月卡",
        summary: "默认热销规格，自动发卡演示最直观",
        priceCents: 1990,
        enabled: true,
        sortOrder: 1,
      },
    });
  }

  const refreshed = await prisma.product.findUniqueOrThrow({
    where: {
      id: product.id,
    },
    include: {
      skus: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  for (const demoSku of demoSkus) {
    const existing = refreshed.skus.find((sku) => sku.name === demoSku.name);

    const sku =
      existing ??
      (await prisma.productSku.create({
        data: {
          productId: refreshed.id,
          name: demoSku.name,
          summary: demoSku.summary,
          priceCents: demoSku.priceCents,
          enabled: true,
          sortOrder: demoSku.sortOrder,
        },
      }));

    if (existing) {
      await prisma.productSku.update({
        where: {
          id: existing.id,
        },
        data: {
          summary: demoSku.summary,
          priceCents: demoSku.priceCents,
          enabled: true,
          sortOrder: demoSku.sortOrder,
        },
      });
    }

    await ensureSkuCards(refreshed.id, sku.id, demoSku.stock, `2026-04 演示批次 / ${demoSku.name}`);
  }

  await prisma.product.update({
    where: {
      id: refreshed.id,
    },
    data: {
      saleMode: ProductSaleMode.MULTI,
      paymentProfileId: defaultPaymentProfile?.id ?? null,
      priceCents: Math.min(...demoSkus.map((sku) => sku.priceCents)),
    },
  });

  console.log(`Seeded demo product ${refreshed.name} with multi-SKU inventory.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
