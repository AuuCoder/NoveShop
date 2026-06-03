import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const categorySelect = {
  id: true,
  ownerId: true,
  name: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CategorySelect;

export type CategorySnapshot = Prisma.CategoryGetPayload<{
  select: typeof categorySelect;
}>;

const MAX_CATEGORY_NAME_LENGTH = 40;

function normalizeCategoryName(value: string | null | undefined): string {
  const name = (value ?? "").trim();

  if (!name) {
    throw new Error("分类名称不能为空。");
  }

  if (name.length > MAX_CATEGORY_NAME_LENGTH) {
    throw new Error(`分类名称不能超过 ${MAX_CATEGORY_NAME_LENGTH} 个字符。`);
  }

  return name;
}

// ownerId 为 null 表示平台店分类(管理员维护),否则归属某个商户。
export async function listCategoriesByOwner(
  ownerId: string | null,
): Promise<CategorySnapshot[]> {
  return prisma.category.findMany({
    where: { ownerId },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: categorySelect,
  });
}

export async function createCategory(input: {
  ownerId: string | null;
  name: string;
}): Promise<CategorySnapshot> {
  const name = normalizeCategoryName(input.name);

  const existing = await prisma.category.findFirst({
    where: { ownerId: input.ownerId, name },
    select: { id: true },
  });

  if (existing) {
    throw new Error("已存在同名分类。");
  }

  const lastSort = await prisma.category.aggregate({
    where: { ownerId: input.ownerId },
    _max: { sortOrder: true },
  });

  return prisma.category.create({
    data: {
      ownerId: input.ownerId,
      name,
      sortOrder: (lastSort._max.sortOrder ?? -1) + 1,
    },
    select: categorySelect,
  });
}

async function requireOwnedCategory(id: string, ownerId: string | null) {
  const category = await prisma.category.findFirst({
    where: { id, ownerId },
    select: { id: true },
  });

  if (!category) {
    throw new Error("分类不存在或不属于当前店铺。");
  }

  return category;
}

export async function renameCategory(input: {
  id: string;
  ownerId: string | null;
  name: string;
}): Promise<CategorySnapshot> {
  const name = normalizeCategoryName(input.name);
  await requireOwnedCategory(input.id, input.ownerId);

  const duplicate = await prisma.category.findFirst({
    where: { ownerId: input.ownerId, name, id: { not: input.id } },
    select: { id: true },
  });

  if (duplicate) {
    throw new Error("已存在同名分类。");
  }

  return prisma.category.update({
    where: { id: input.id },
    data: { name },
    select: categorySelect,
  });
}

// 删除分类:关联商品的 categoryId 由数据库 onDelete: SetNull 自动置空,不会连带删除商品。
export async function deleteCategory(input: {
  id: string;
  ownerId: string | null;
}): Promise<void> {
  await requireOwnedCategory(input.id, input.ownerId);

  await prisma.category.delete({
    where: { id: input.id },
  });
}

// 校验某个分类归属当前 owner,供商品写库时使用。返回规范化后的 categoryId(空值返回 null)。
export async function resolveOwnedCategoryId(
  categoryId: string | null | undefined,
  ownerId: string | null,
): Promise<string | null> {
  const trimmed = (categoryId ?? "").trim();

  if (!trimmed) {
    return null;
  }

  await requireOwnedCategory(trimmed, ownerId);

  return trimmed;
}
