export type SkuPricingTier = {
  minQuantity: number;
  maxQuantity: number | null;
  unitPriceCents: number;
};

export const MAX_PUBLIC_ORDER_QUANTITY = 5000;

const PRICE_INPUT_PATTERN = /^\d+(\.\d{1,2})?$/;

function parseTierPriceToCents(raw: string, lineNumber: number) {
  const normalized = raw
    .trim()
    .replace(/[元￥¥]/g, "")
    .replace(/\/件/g, "")
    .replace(/每件/g, "")
    .trim();

  if (!PRICE_INPUT_PATTERN.test(normalized)) {
    throw new Error(`第 ${lineNumber} 行价格格式不正确，请输入类似 9.90 的金额。`);
  }

  return Math.round(Number(normalized) * 100);
}

function normalizeTierSequence(tiers: SkuPricingTier[]) {
  const normalized = [...tiers].sort((left, right) => left.minQuantity - right.minQuantity);
  let previousMax: number | null = 0;

  for (const tier of normalized) {
    if (!Number.isInteger(tier.minQuantity) || tier.minQuantity < 1) {
      throw new Error("阶梯价的起始数量必须是大于 0 的整数。");
    }

    if (tier.maxQuantity !== null) {
      if (!Number.isInteger(tier.maxQuantity) || tier.maxQuantity < tier.minQuantity) {
        throw new Error("阶梯价的结束数量必须大于或等于起始数量。");
      }
    }

    if (previousMax === null || tier.minQuantity <= previousMax) {
      throw new Error("阶梯价数量区间不能重叠，请按从小到大的顺序配置。");
    }

    previousMax = tier.maxQuantity;
  }

  return normalized;
}

export function parseSkuPricingTiersInput(raw: string | null | undefined) {
  const lines = String(raw ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [] as SkuPricingTier[];
  }

  const tiers: SkuPricingTier[] = [];
  let previousMax = 0;

  for (const [index, line] of lines.entries()) {
    const lineNumber = index + 1;
    const compact = line.replace(/\s+/g, "");
    let minQuantity: number | null = null;
    let maxQuantity: number | null = null;
    let rawPrice = "";

    const rangeMatch = compact.match(/^(\d+)[\-~至到](\d+)(?:=|:|：)?(.+)$/);
    const lowerBoundMatch = compact.match(/^(\d+)(?:以下|以内|及以下|<=?)(?:=|:|：)?(.+)$/);
    const upperBoundMatch = compact.match(/^(\d+)(?:以上|及以上|>=?|\+)(?:=|:|：)?(.+)$/);

    if (rangeMatch) {
      minQuantity = Number(rangeMatch[1]);
      maxQuantity = Number(rangeMatch[2]);
      rawPrice = rangeMatch[3] ?? "";
    } else if (lowerBoundMatch) {
      minQuantity = previousMax + 1;
      maxQuantity = Number(lowerBoundMatch[1]);
      rawPrice = lowerBoundMatch[2] ?? "";
    } else if (upperBoundMatch) {
      minQuantity = Number(upperBoundMatch[1]);
      maxQuantity = null;
      rawPrice = upperBoundMatch[2] ?? "";
    } else {
      throw new Error(
        `第 ${lineNumber} 行阶梯价格式不正确，请使用“1-10=10.00”或“10以下=10.00”这样的格式。`,
      );
    }

    const unitPriceCents = parseTierPriceToCents(rawPrice, lineNumber);
    tiers.push({
      minQuantity,
      maxQuantity,
      unitPriceCents,
    });

    previousMax = maxQuantity ?? Number.MAX_SAFE_INTEGER;
  }

  return normalizeTierSequence(tiers);
}

export function parseStoredSkuPricingTiers(raw: string | null | undefined) {
  const normalized = String(raw ?? "").trim();

  if (!normalized) {
    return [] as SkuPricingTier[];
  }

  try {
    const parsed = JSON.parse(normalized) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    const tiers = parsed
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }

        const candidate = item as Record<string, unknown>;
        const minQuantity = Number(candidate.minQuantity);
        const maxQuantity =
          candidate.maxQuantity === null || candidate.maxQuantity === undefined
            ? null
            : Number(candidate.maxQuantity);
        const unitPriceCents = Number(candidate.unitPriceCents);

        if (!Number.isInteger(minQuantity) || !Number.isInteger(unitPriceCents)) {
          return null;
        }

        if (maxQuantity !== null && !Number.isInteger(maxQuantity)) {
          return null;
        }

        return {
          minQuantity,
          maxQuantity,
          unitPriceCents,
        } satisfies SkuPricingTier;
      })
      .filter((item): item is SkuPricingTier => Boolean(item));

    return normalizeTierSequence(tiers);
  } catch {
    try {
      return parseSkuPricingTiersInput(normalized);
    } catch {
      return [];
    }
  }
}

export function serializeSkuPricingTiers(raw: string | null | undefined) {
  const tiers = parseSkuPricingTiersInput(raw);
  return tiers.length > 0 ? JSON.stringify(tiers) : null;
}

export function formatSkuPricingTiersForForm(raw: string | null | undefined) {
  const tiers = parseStoredSkuPricingTiers(raw);
  return tiers
    .map((tier) => {
      const rangeLabel =
        tier.maxQuantity === null
          ? `${tier.minQuantity}+`
          : tier.minQuantity === 1
            ? `${tier.maxQuantity}以下`
            : `${tier.minQuantity}-${tier.maxQuantity}`;

      return `${rangeLabel}=${(tier.unitPriceCents / 100).toFixed(2)}`;
    })
    .join("\n");
}

export function describeSkuPricingTier(tier: SkuPricingTier) {
  const quantityLabel =
    tier.maxQuantity === null
      ? `${tier.minQuantity} 件及以上`
      : tier.minQuantity === tier.maxQuantity
        ? `${tier.minQuantity} 件`
        : `${tier.minQuantity}-${tier.maxQuantity} 件`;

  return `${quantityLabel}：¥${(tier.unitPriceCents / 100).toFixed(2)}/件`;
}

export function getSkuUnitPriceCents(
  basePriceCents: number,
  pricingTiersRaw: string | null | undefined,
  quantity: number,
) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const tiers = parseStoredSkuPricingTiers(pricingTiersRaw);
  const matchedTier = tiers.find(
    (tier) =>
      normalizedQuantity >= tier.minQuantity &&
      (tier.maxQuantity === null || normalizedQuantity <= tier.maxQuantity),
  );

  return matchedTier?.unitPriceCents ?? basePriceCents;
}

export function getSkuLowestUnitPriceCents(basePriceCents: number, pricingTiersRaw: string | null | undefined) {
  const tiers = parseStoredSkuPricingTiers(pricingTiersRaw);

  if (tiers.length === 0) {
    return basePriceCents;
  }

  return Math.min(basePriceCents, ...tiers.map((tier) => tier.unitPriceCents));
}
