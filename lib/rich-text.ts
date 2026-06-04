// 轻量内联富文本标记解析器。
//
// 支持的语法(可嵌套):
//   **加粗**
//   [显示文字](https://example.com)      链接(仅 http/https/mailto/站内 / 开头)
//   [[success:绿色文字]]                  语义色:success/warning/danger/info/muted(含别名)
//
// 解析结果是一棵内联节点树,由 <RichText> 组件安全渲染成 React 元素,
// 不使用 dangerouslySetInnerHTML,因此不存在 HTML 注入风险。

export type RichColorVariant = "success" | "warning" | "danger" | "info" | "muted";

export type RichInlineNode =
  | { type: "text"; value: string }
  | { type: "bold"; children: RichInlineNode[] }
  | { type: "color"; variant: RichColorVariant; children: RichInlineNode[] }
  | { type: "link"; href: string; children: RichInlineNode[] };

const MAX_DEPTH = 6;

// 颜色名(含中英文常用别名)→ 语义变体
const COLOR_ALIASES: Record<string, RichColorVariant> = {
  success: "success",
  green: "success",
  warning: "warning",
  warn: "warning",
  yellow: "warning",
  amber: "warning",
  danger: "danger",
  error: "danger",
  red: "danger",
  info: "info",
  blue: "info",
  muted: "muted",
  gray: "muted",
  grey: "muted",
};

// 语义变体 → Tailwind 文字颜色类(亮/暗主题各取一档)
export const RICH_COLOR_TEXT_CLASS: Record<RichColorVariant, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  danger: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
  muted: "text-muted-foreground",
};

/**
 * 校验并规范化链接地址。只放行 http(s)://、mailto: 和站内绝对路径 /…,
 * 其余(如 javascript:)一律拒绝,返回 null。
 */
export function sanitizeRichLinkHref(raw: string): string | null {
  const href = raw.trim();

  if (!href) {
    return null;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return href;
  }

  if (/^https?:\/\//i.test(href) || /^mailto:/i.test(href)) {
    return href;
  }

  return null;
}

type TokenMatch = {
  index: number;
  length: number;
  build: (depth: number) => RichInlineNode;
};

const COLOR_PATTERN = /\[\[([a-zA-Z\u4e00-\u9fa5]+):([\s\S]*?)\]\]/;
const BOLD_PATTERN = /\*\*([\s\S]+?)\*\*/;
const LINK_PATTERN = /\[([^[\]]+)\]\(([^\s)]+)\)/;

function findNextToken(input: string): TokenMatch | null {
  const candidates: TokenMatch[] = [];

  const color = COLOR_PATTERN.exec(input);
  if (color) {
    const raw = color[0];
    const variant = COLOR_ALIASES[color[1].toLowerCase()];
    candidates.push({
      index: color.index,
      length: raw.length,
      build: (depth) =>
        variant
          ? { type: "color", variant, children: parseInline(color[2], depth + 1) }
          : { type: "text", value: raw },
    });
  }

  const bold = BOLD_PATTERN.exec(input);
  if (bold) {
    candidates.push({
      index: bold.index,
      length: bold[0].length,
      build: (depth) => ({ type: "bold", children: parseInline(bold[1], depth + 1) }),
    });
  }

  const link = LINK_PATTERN.exec(input);
  if (link) {
    const raw = link[0];
    const href = sanitizeRichLinkHref(link[2]);
    candidates.push({
      index: link.index,
      length: raw.length,
      build: (depth) =>
        href
          ? { type: "link", href, children: parseInline(link[1], depth + 1) }
          : { type: "text", value: raw },
    });
  }

  if (candidates.length === 0) {
    return null;
  }

  // 取最靠前的匹配;同一起点按 颜色 > 加粗 > 链接 的先后顺序(push 顺序即优先级)。
  return candidates.reduce((best, current) => (current.index < best.index ? current : best));
}

function parseInline(input: string, depth: number): RichInlineNode[] {
  if (!input) {
    return [];
  }

  if (depth > MAX_DEPTH) {
    return [{ type: "text", value: input }];
  }

  const nodes: RichInlineNode[] = [];
  let rest = input;

  while (rest.length > 0) {
    const match = findNextToken(rest);

    if (!match) {
      nodes.push({ type: "text", value: rest });
      break;
    }

    if (match.index > 0) {
      nodes.push({ type: "text", value: rest.slice(0, match.index) });
    }

    nodes.push(match.build(depth));
    rest = rest.slice(match.index + match.length);
  }

  return nodes;
}

/**
 * 把一段带内联标记的文本解析成内联节点树。
 */
export function parseRichText(input: string | null | undefined): RichInlineNode[] {
  if (!input) {
    return [];
  }

  return parseInline(input, 0);
}
