"use client";

import { useCallback, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CoverImageFieldProps = {
  name: string;
  initialValue?: string | null;
  label?: string;
  hint?: string;
};

// 单张封面图上传控件:隐藏 input 存 /uploads/ 路径,预览 + 上传/更换/移除。复用 /api/upload。
export function CoverImageField({ name, initialValue, label, hint }: CoverImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>(initialValue?.trim() ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);

    try {
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

      setUrl(payload.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "上传失败，请稍后再试。");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {label ? <label className="text-sm font-medium tracking-tight">{label}</label> : null}

      <input type="hidden" name={name} value={url} readOnly />

      {url ? (
        <div className="relative inline-flex w-fit overflow-hidden rounded-md border border-border/60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="封面预览"
            className="h-32 w-32 object-cover"
            loading="lazy"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80 text-muted-foreground transition hover:text-destructive"
            aria-label="移除封面"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid h-32 w-32 place-items-center rounded-md border border-dashed border-border/60 bg-muted/30 text-xs text-muted-foreground">
          暂无封面
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadImage(file);
          }
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? <Loader2 className={cn("animate-spin")} /> : <ImagePlus />}
          {uploading ? "上传中…" : url ? "更换封面" : "上传封面"}
        </Button>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
