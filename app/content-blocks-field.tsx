"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Bold, ImagePlus, Link2, Loader2, Palette, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalloutVariant, ContentBlock } from "@/lib/content-blocks";
import { RichText } from "@/app/components/rich-text";

type ContentBlocksFieldProps = {
  name: string;
  initialValue?: string | null;
  label?: string;
  hint?: string;
};

// 编辑器内部块:在 ContentBlock 基础上加一个仅客户端使用的 id,用于 React key 和移动/删除定位。
type EditorBlock = ContentBlock & { id: string };

let blockIdCounter = 0;
function nextBlockId() {
  blockIdCounter += 1;
  return `block-${blockIdCounter}`;
}

const CALLOUT_VARIANT_SET: ReadonlySet<string> = new Set(["success", "warning", "danger", "info"]);

function parseInitialValue(value: string | null | undefined): EditorBlock[] {
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

  const blocks: EditorBlock[] = [];
  for (const raw of parsed) {
    if (!raw || typeof raw !== "object") {
      continue;
    }
    const candidate = raw as { type?: unknown; text?: unknown; url?: unknown; variant?: unknown };
    if (candidate.type === "text" && typeof candidate.text === "string") {
      blocks.push({ id: nextBlockId(), type: "text", text: candidate.text });
    } else if (candidate.type === "callout" && typeof candidate.text === "string") {
      const variant = CALLOUT_VARIANT_SET.has(candidate.variant as string)
        ? (candidate.variant as CalloutVariant)
        : "info";
      blocks.push({ id: nextBlockId(), type: "callout", variant, text: candidate.text });
    } else if (candidate.type === "image" && typeof candidate.url === "string") {
      blocks.push({ id: nextBlockId(), type: "image", url: candidate.url });
    }
  }
  return blocks;
}

// 序列化进隐藏 input:剥掉客户端 id,丢弃空文字/提示块。
function serialize(blocks: EditorBlock[]): string {
  const cleaned: ContentBlock[] = [];
  for (const block of blocks) {
    if (block.type === "text") {
      const text = block.text.trim();
      if (text) {
        cleaned.push({ type: "text", text });
      }
    } else if (block.type === "callout") {
      const text = block.text.trim();
      if (text) {
        cleaned.push({ type: "callout", variant: block.variant, text });
      }
    } else {
      cleaned.push({ type: "image", url: block.url });
    }
  }
  return cleaned.length > 0 ? JSON.stringify(cleaned) : "";
}

const COLOR_OPTIONS: Array<{ key: string; label: string; swatch: string }> = [
  { key: "success", label: "绿色", swatch: "bg-emerald-500" },
  { key: "warning", label: "黄色", swatch: "bg-amber-500" },
  { key: "danger", label: "红色", swatch: "bg-red-500" },
  { key: "info", label: "蓝色", swatch: "bg-blue-500" },
  { key: "muted", label: "灰色", swatch: "bg-muted-foreground" },
];

const CALLOUT_OPTIONS: Array<{ variant: CalloutVariant; label: string; dot: string }> = [
  { variant: "success", label: "成功 / 绿色", dot: "bg-emerald-500" },
  { variant: "warning", label: "提醒 / 黄色", dot: "bg-amber-500" },
  { variant: "danger", label: "警告 / 红色", dot: "bg-red-500" },
  { variant: "info", label: "信息 / 蓝色", dot: "bg-blue-500" },
];

const CALLOUT_PREVIEW_CLASS: Record<CalloutVariant, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
};

// 在 textarea 当前选区上套用标记。返回新文本和新的选区位置。
function applyMarker(
  value: string,
  selStart: number,
  selEnd: number,
  kind: "bold" | "link" | { color: string },
): { text: string; selStart: number; selEnd: number } {
  const selected = value.slice(selStart, selEnd) || (kind === "link" ? "链接文字" : "文字");
  let wrapped: string;

  if (kind === "bold") {
    wrapped = `**${selected}**`;
  } else if (kind === "link") {
    wrapped = `[${selected}](https://)`;
  } else {
    wrapped = `[[${kind.color}:${selected}]]`;
  }

  const text = value.slice(0, selStart) + wrapped + value.slice(selEnd);
  return { text, selStart, selEnd: selStart + wrapped.length };
}

export function ContentBlocksField({ name, initialValue, label, hint }: ContentBlocksFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => parseInitialValue(initialValue));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [colorMenuFor, setColorMenuFor] = useState<string | null>(null);

  const addTextBlock = useCallback(() => {
    setBlocks((previous) => [...previous, { id: nextBlockId(), type: "text", text: "" }]);
  }, []);

  const addCalloutBlock = useCallback((variant: CalloutVariant) => {
    setBlocks((previous) => [...previous, { id: nextBlockId(), type: "callout", variant, text: "" }]);
  }, []);

  const updateText = useCallback((id: string, text: string) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === id && (block.type === "text" || block.type === "callout")
          ? { ...block, text }
          : block,
      ),
    );
  }, []);

  const setCalloutVariant = useCallback((id: string, variant: CalloutVariant) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === id && block.type === "callout" ? { ...block, variant } : block,
      ),
    );
  }, []);

  const format = useCallback(
    (id: string, kind: "bold" | "link" | { color: string }) => {
      const textarea = textareaRefs.current[id];
      if (!textarea) {
        return;
      }
      const { selectionStart, selectionEnd, value } = textarea;
      const result = applyMarker(value, selectionStart, selectionEnd, kind);
      updateText(id, result.text);
      // 等 React 重渲染后恢复选区,方便连续操作。
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(result.selStart, result.selEnd);
      });
      setColorMenuFor(null);
    },
    [updateText],
  );

  const uploadImage = useCallback(async (files: FileList) => {
    setError(null);
    setUploading(true);

    try {
      const added: EditorBlock[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const payload = (await response.json().catch(() => null)) as
          | { url?: string; error?: string }
          | null;

        if (!response.ok || !payload?.url) {
          throw new Error(payload?.error ?? "上传失败，请稍后再试。");
        }

        added.push({ id: nextBlockId(), type: "image", url: payload.url });
      }

      setBlocks((previous) => [...previous, ...added]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "上传失败，请稍后再试。");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, []);

  function handleRemove(id: string) {
    setBlocks((previous) => previous.filter((block) => block.id !== id));
  }

  function handleMove(index: number, direction: -1 | 1) {
    setBlocks((previous) => {
      const target = index + direction;
      if (target < 0 || target >= previous.length) {
        return previous;
      }
      const next = [...previous];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function renderTextEditor(block: Extract<EditorBlock, { type: "text" | "callout" }>) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <Button type="button" variant="ghost" size="icon-xs" onClick={() => format(block.id, "bold")} aria-label="加粗" title="加粗">
            <Bold />
          </Button>
          <Button type="button" variant="ghost" size="icon-xs" onClick={() => format(block.id, "link")} aria-label="插入链接" title="插入链接">
            <Link2 />
          </Button>
          <div className="relative">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setColorMenuFor((current) => (current === block.id ? null : block.id))}
              aria-label="文字颜色"
              title="文字颜色"
            >
              <Palette />
            </Button>
            {colorMenuFor === block.id ? (
              <div className="absolute left-0 top-full z-10 mt-1 flex flex-col gap-0.5 rounded-md border border-border/60 bg-popover p-1 shadow-md">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.key}
                    type="button"
                    onClick={() => format(block.id, { color: color.key })}
                    className="flex items-center gap-2 rounded px-2 py-1 text-xs hover:bg-muted"
                  >
                    <span className={cn("h-3 w-3 rounded-full", color.swatch)} />
                    {color.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          {block.type === "callout" ? (
            <div className="ml-1 flex items-center gap-1">
              {CALLOUT_OPTIONS.map((option) => (
                <button
                  key={option.variant}
                  type="button"
                  onClick={() => setCalloutVariant(block.id, option.variant)}
                  aria-label={option.label}
                  title={option.label}
                  className={cn(
                    "h-4 w-4 rounded-full border transition-transform",
                    option.dot,
                    block.variant === option.variant
                      ? "ring-2 ring-ring ring-offset-1 ring-offset-background"
                      : "opacity-60 hover:opacity-100",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>

        <textarea
          ref={(element) => {
            textareaRefs.current[block.id] = element;
          }}
          value={block.text}
          onChange={(event) => updateText(block.id, event.target.value)}
          rows={block.type === "callout" ? 3 : 4}
          placeholder={
            block.type === "callout"
              ? "提示框内容…可选中文字后用上方按钮加粗 / 上色 / 加链接"
              : "输入这一段介绍文字…选中文字后用上方按钮加粗 / 上色 / 加链接"
          }
          className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />

        {block.text.trim() ? (
          <div className="rounded-md border border-dashed border-border/60 bg-muted/10 px-3 py-2">
            <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">预览</p>
            {block.type === "callout" ? (
              <div
                className={cn(
                  "rounded-md border px-3 py-2 text-sm leading-relaxed whitespace-pre-line",
                  CALLOUT_PREVIEW_CLASS[block.variant],
                )}
              >
                <RichText text={block.text} />
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                <RichText text={block.text} />
              </p>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  function blockLabel(block: EditorBlock, index: number) {
    if (block.type === "text") {
      return `文字块 ${index + 1}`;
    }
    if (block.type === "callout") {
      return `提示框 ${index + 1}`;
    }
    return `图片块 ${index + 1}`;
  }

  return (
    <div className="flex flex-col gap-3">
      {label ? <span className="text-sm font-medium tracking-tight">{label}</span> : null}

      <input type="hidden" name={name} value={serialize(blocks)} readOnly />

      {blocks.length > 0 ? (
        <div className="flex flex-col gap-3">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="flex flex-col gap-2 rounded-md border border-border/60 bg-muted/20 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {blockLabel(block, index)}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    aria-label="上移"
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleMove(index, 1)}
                    disabled={index === blocks.length - 1}
                    aria-label="下移"
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-xs"
                    onClick={() => handleRemove(block.id)}
                    aria-label="删除"
                  >
                    <X />
                  </Button>
                </div>
              </div>

              {block.type === "text" || block.type === "callout" ? (
                renderTextEditor(block)
              ) : (
                <div className="overflow-hidden rounded-md border border-border/60 bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={`详情图 ${index + 1}`}
                    className="max-h-72 w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          还没有内容。用下方按钮添加文字段落、彩色提示框或图片，按顺序图文混排。
        </p>
      )}

      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            void uploadImage(event.target.files);
          }
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={addTextBlock}>
          <Plus />
          添加文字
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => addCalloutBlock("success")}>
          <Plus />
          添加提示框
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? <Loader2 className={cn("animate-spin")} /> : <ImagePlus />}
          {uploading ? "上传中…" : "添加图片"}
        </Button>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
