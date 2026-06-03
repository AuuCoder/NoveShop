"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/lib/content-blocks";

type ContentBlocksFieldProps = {
  name: string;
  initialValue?: string | null;
  label?: string;
  hint?: string;
};

// 编辑器内部块:在 ContentBlock 基础上加一个仅客户端使用的 id,用于 React key 和移动/删除定位。
type EditorBlock = (ContentBlock & { id: string });

let blockIdCounter = 0;
function nextBlockId() {
  blockIdCounter += 1;
  return `block-${blockIdCounter}`;
}

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
    const candidate = raw as { type?: unknown; text?: unknown; url?: unknown };
    if (candidate.type === "text" && typeof candidate.text === "string") {
      blocks.push({ id: nextBlockId(), type: "text", text: candidate.text });
    } else if (candidate.type === "image" && typeof candidate.url === "string") {
      blocks.push({ id: nextBlockId(), type: "image", url: candidate.url });
    }
  }
  return blocks;
}

// 序列化进隐藏 input:剥掉客户端 id,丢弃空文字块。
function serialize(blocks: EditorBlock[]): string {
  const cleaned: ContentBlock[] = [];
  for (const block of blocks) {
    if (block.type === "text") {
      const text = block.text.trim();
      if (text) {
        cleaned.push({ type: "text", text });
      }
    } else {
      cleaned.push({ type: "image", url: block.url });
    }
  }
  return cleaned.length > 0 ? JSON.stringify(cleaned) : "";
}

export function ContentBlocksField({ name, initialValue, label, hint }: ContentBlocksFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => parseInitialValue(initialValue));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTextBlock = useCallback(() => {
    setBlocks((previous) => [...previous, { id: nextBlockId(), type: "text", text: "" }]);
  }, []);

  const updateTextBlock = useCallback((id: string, text: string) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === id && block.type === "text" ? { ...block, text } : block,
      ),
    );
  }, []);

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
                  {block.type === "text" ? `文字块 ${index + 1}` : `图片块 ${index + 1}`}
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

              {block.type === "text" ? (
                <textarea
                  value={block.text}
                  onChange={(event) => updateTextBlock(block.id, event.target.value)}
                  rows={4}
                  placeholder="输入这一段介绍文字…"
                  className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
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
          还没有内容。点击下方按钮添加文字段落或图片，按顺序图文混排。
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
