"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  name: string;
  multiple?: boolean;
  initialValue?: string | null;
  label?: string;
  hint?: string;
};

function parseInitialValue(value: string | null | undefined, multiple: boolean): string[] {
  if (!value) {
    return [];
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  if (multiple) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
      }
    } catch {
      return [];
    }
    return [];
  }

  return [trimmed];
}

function serialize(urls: string[], multiple: boolean): string {
  if (multiple) {
    return urls.length > 0 ? JSON.stringify(urls) : "";
  }

  return urls[0] ?? "";
}

export function ImageUploadField({
  name,
  multiple = false,
  initialValue,
  label,
  hint,
}: ImageUploadFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>(() => parseInitialValue(initialValue, multiple));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = useCallback(
    async (files: FileList) => {
      setError(null);
      setUploading(true);

      try {
        const uploaded: string[] = [];

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

          uploaded.push(payload.url);

          if (!multiple) {
            break;
          }
        }

        setUrls((previous) => (multiple ? [...previous, ...uploaded] : uploaded.slice(0, 1)));
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : "上传失败，请稍后再试。");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [multiple],
  );

  function handleRemove(index: number) {
    setUrls((previous) => previous.filter((_, position) => position !== index));
  }

  function handleMove(index: number, direction: -1 | 1) {
    setUrls((previous) => {
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
    <div className="flex flex-col gap-2">
      {label ? <span className="text-sm font-medium tracking-tight">{label}</span> : null}

      <input type="hidden" name={name} value={serialize(urls, multiple)} readOnly />

      {urls.length > 0 ? (
        <div className={cn("grid gap-3", multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1")}>
          {urls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative overflow-hidden rounded-md border border-border/60 bg-muted/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={multiple ? `详情图 ${index + 1}` : "店铺封面"}
                className="h-32 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-background/85 px-1.5 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                {multiple ? (
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleMove(index, -1)}
                      disabled={index === 0}
                      aria-label="上移"
                    >
                      <ArrowLeft />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleMove(index, 1)}
                      disabled={index === urls.length - 1}
                      aria-label="下移"
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">封面</span>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => handleRemove(index)}
                  aria-label="删除"
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple={multiple}
          className="hidden"
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              void uploadFiles(event.target.files);
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
          {uploading ? "上传中…" : multiple ? "添加图片" : urls.length > 0 ? "更换图片" : "上传图片"}
        </Button>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
