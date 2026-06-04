import { isStoredUploadPath } from "@/lib/uploads";

export type CalloutVariant = "success" | "warning" | "danger" | "info";

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; url: string }
  | { type: "callout"; variant: CalloutVariant; text: string };

const CALLOUT_VARIANTS: ReadonlySet<string> = new Set([
  "success",
  "warning",
  "danger",
  "info",
]);

function normalizeCalloutVariant(value: unknown): CalloutVariant {
  return typeof value === "string" && CALLOUT_VARIANTS.has(value)
    ? (value as CalloutVariant)
    : "info";
}

const MAX_BLOCKS = 50;
const MAX_TEXT_LENGTH = 5000;

/**
 * 解析存库的图文块 JSON 字符串为干净的 ContentBlock 数组。
 * 解析失败 / 非数组 → []。逐项校验:
 * - text 块:取 text 字段、trim、丢弃空串、限长。
 * - image 块:url 必须通过 isStoredUploadPath(以 /uploads/ 开头且无 ..),否则丢弃。
 */
export function parseContentBlocks(value: string | null | undefined): ContentBlock[] {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const blocks: ContentBlock[] = [];

  for (const raw of parsed) {
    if (!raw || typeof raw !== "object") {
      continue;
    }

    const candidate = raw as { type?: unknown; text?: unknown; url?: unknown };

    if (candidate.type === "text") {
      if (typeof candidate.text !== "string") {
        continue;
      }
      const text = candidate.text.trim().slice(0, MAX_TEXT_LENGTH);
      if (!text) {
        continue;
      }
      blocks.push({ type: "text", text });
    } else if (candidate.type === "callout") {
      if (typeof candidate.text !== "string") {
        continue;
      }
      const text = candidate.text.trim().slice(0, MAX_TEXT_LENGTH);
      if (!text) {
        continue;
      }
      blocks.push({
        type: "callout",
        variant: normalizeCalloutVariant((candidate as { variant?: unknown }).variant),
        text,
      });
    } else if (candidate.type === "image") {
      if (typeof candidate.url !== "string") {
        continue;
      }
      const url = candidate.url.trim();
      if (!isStoredUploadPath(url)) {
        continue;
      }
      blocks.push({ type: "image", url });
    }

    if (blocks.length >= MAX_BLOCKS) {
      break;
    }
  }

  return blocks;
}

/**
 * 写库前的统一守卫:清洗后序列化。空数组返回 null。
 */
export function serializeContentBlocks(value: string | null | undefined): string | null {
  const blocks = parseContentBlocks(value);
  return blocks.length > 0 ? JSON.stringify(blocks) : null;
}

/**
 * 迁移用:把旧的纯文本 description + 图片列表转成初始图文块序列。
 * description 非空 → 一个文字块在前;detailImages 每张 → 一个图片块在后,匹配旧版式。
 */
export function buildSeedContentBlocks(
  description: string | null | undefined,
  detailImages: string[] | null | undefined,
): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  const text = (description ?? "").trim();
  if (text) {
    blocks.push({ type: "text", text: text.slice(0, MAX_TEXT_LENGTH) });
  }

  for (const image of detailImages ?? []) {
    if (typeof image === "string" && isStoredUploadPath(image.trim())) {
      blocks.push({ type: "image", url: image.trim() });
    }
  }

  return blocks;
}

/**
 * 给编辑器算初始 JSON:已有 contentBlocks 用它,否则用旧字段 seed。
 * 返回 JSON 字符串或 null(空)。
 */
export function buildEditorInitialValue(input: {
  contentBlocks?: string | null;
  description?: string | null;
  detailImages?: string[] | null;
}): string | null {
  const existing = parseContentBlocks(input.contentBlocks);
  if (existing.length > 0) {
    return JSON.stringify(existing);
  }

  const seeded = buildSeedContentBlocks(input.description, input.detailImages);
  return seeded.length > 0 ? JSON.stringify(seeded) : null;
}

/**
 * 把图文块里的文字块拼成纯文本,供搜索匹配和控制台展示用。
 * 优先用 contentBlocks 里的文字;为空时回退到旧的 description 字段,
 * 保证老商品(详情尚未迁移成块)仍可搜索/显示。块之间用换行分隔。
 */
export function getContentBlocksPlainText(input: {
  contentBlocks?: string | null;
  description?: string | null;
}): string {
  const text = parseContentBlocks(input.contentBlocks)
    .filter(
      (block): block is Extract<ContentBlock, { type: "text" | "callout" }> =>
        block.type === "text" || block.type === "callout",
    )
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (text) {
    return text;
  }

  return (input.description ?? "").trim();
}
