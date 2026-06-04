import { Fragment, type ReactNode } from "react";

import {
  parseRichText,
  RICH_COLOR_TEXT_CLASS,
  type RichInlineNode,
} from "@/lib/rich-text";
import { cn } from "@/lib/utils";

function renderNodes(nodes: RichInlineNode[], keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    switch (node.type) {
      case "text":
        return <Fragment key={key}>{node.value}</Fragment>;
      case "bold":
        return (
          <strong key={key} className="font-semibold">
            {renderNodes(node.children, key)}
          </strong>
        );
      case "color":
        return (
          <span key={key} className={cn("font-medium", RICH_COLOR_TEXT_CLASS[node.variant])}>
            {renderNodes(node.children, key)}
          </span>
        );
      case "link": {
        const external = /^https?:\/\//i.test(node.href);
        return (
          <a
            key={key}
            href={node.href}
            className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {renderNodes(node.children, key)}
          </a>
        );
      }
      default:
        return null;
    }
  });
}

/**
 * 安全渲染一段带内联标记(加粗 / 颜色 / 链接)的文本。
 * 解析为节点树后用 React 元素渲染,不使用 dangerouslySetInnerHTML。
 */
export function RichText({ text }: { text: string }) {
  return <>{renderNodes(parseRichText(text), "rt")}</>;
}
