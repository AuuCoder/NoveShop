"use client";

import { useCallback, useRef, useState } from "react";
import { FileUp, Loader2, X } from "lucide-react";

import { formatFileSize } from "@/lib/utils";

type ImportMode = "lines" | "single" | "file";

type UploadedDeliveryFile = {
  storageKey: string;
  fileName: string;
  size: number;
};

const MODE_OPTIONS: Array<{ value: ImportMode; label: string; hint: string }> = [
  { value: "lines", label: "一行一条", hint: "每行一条卡密，适合批量卡密。" },
  { value: "single", label: "整段文本", hint: "整段内容作为一条发货，适合超长 JSON / 多行文案。" },
  { value: "file", label: "上传文件", hint: "每个文件作为一条独立发货，单文件最大 50MB。" },
];

/**
 * 入库卡密内容字段：支持三种发货模式（一行一条 / 整段文本 / 上传文件）。
 * 通过隐藏字段 importMode + deliveryFiles 把状态带给 server action。
 */
export function CardImportFields({ idPrefix }: { idPrefix: string }) {
  const [mode, setMode] = useState<ImportMode>("lines");
  const [files, setFiles] = useState<UploadedDeliveryFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (fileList: FileList) => {
    setError(null);
    setUploading(true);

    try {
      const uploaded: UploadedDeliveryFile[] = [];

      for (const file of Array.from(fileList)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("kind", "delivery");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const payload = (await response.json().catch(() => null)) as
          | { storageKey?: string; fileName?: string; size?: number; error?: string }
          | null;

        if (!response.ok || !payload?.storageKey) {
          throw new Error(payload?.error ?? "上传失败，请稍后再试。");
        }

        uploaded.push({
          storageKey: payload.storageKey,
          fileName: payload.fileName ?? file.name,
          size: typeof payload.size === "number" ? payload.size : file.size,
        });
      }

      setFiles((previous) => [...previous, ...uploaded]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "上传失败，请稍后再试。");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, []);

  function handleRemove(index: number) {
    setFiles((previous) => previous.filter((_, position) => position !== index));
  }

  const textRequired = mode !== "file";

  return (
    <div className="admin-import-modes">
      <input type="hidden" name="importMode" value={mode} readOnly />
      <input type="hidden" name="deliveryFiles" value={JSON.stringify(files)} readOnly />

      <div className="field">
        <label>发货方式</label>
        <div className="admin-segmented">
          {MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={mode === option.value ? "admin-segmented-item is-active" : "admin-segmented-item"}
              onClick={() => setMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="small-copy">{MODE_OPTIONS.find((option) => option.value === mode)?.hint}</p>
      </div>

      {mode === "file" ? (
        <div className="field">
          <label>发货文件</label>
          <input
            ref={fileInputRef}
            id={`${idPrefix}-delivery-file`}
            type="file"
            multiple
            className="hidden"
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                void uploadFiles(event.target.files);
              }
            }}
          />
          <button
            type="button"
            className="button button-secondary admin-import-upload-trigger"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? <Loader2 className="admin-spin" size={15} /> : <FileUp size={15} />}
            {uploading ? "上传中…" : "选择文件上传"}
          </button>

          {files.length > 0 ? (
            <ul className="admin-import-file-list">
              {files.map((file, index) => (
                <li key={`${file.storageKey}-${index}`} className="admin-import-file-item">
                  <div className="admin-import-file-meta">
                    <span className="admin-import-file-name">{file.fileName}</span>
                    {formatFileSize(file.size) ? (
                      <span className="admin-import-file-size">{formatFileSize(file.size)}</span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="admin-import-file-remove"
                    onClick={() => handleRemove(index)}
                    aria-label="移除"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="small-copy">每个文件会作为一条独立发货入库，单文件最大 50MB。</p>
          )}

          {error ? <p className="admin-import-error">{error}</p> : null}
        </div>
      ) : (
        <div className="field">
          <label htmlFor={`${idPrefix}-raw-cards`}>
            {mode === "single" ? "发货文本（整段）" : "卡密内容"}
          </label>
          <textarea
            id={`${idPrefix}-raw-cards`}
            name="rawCards"
            placeholder={
              mode === "single"
                ? "粘贴整段文本（支持超长 JSON / 多行文案），作为一条发货。"
                : "一行一条卡密\nCARD-001\nCARD-002"
            }
            required={textRequired}
          />
        </div>
      )}
    </div>
  );
}
