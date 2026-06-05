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
  { value: "lines", label: "一行一条", hint: "每行视为一条卡密，空行自动忽略，适合批量卡号 / 兑换码。" },
  { value: "single", label: "整段文本", hint: "整段内容作为一条发货，适合超长 JSON、账号密码或多行文案。" },
  { value: "file", label: "上传文件", hint: "每个文件作为一条独立发货，单文件最大 50MB。" },
];

/**
 * 入库卡密内容字段：支持三种发货模式（一行一条 / 整段文本 / 上传文件）。
 * 通过隐藏字段 importMode + deliveryFiles 把状态带给 server action。
 */
export function CardImportFields({ idPrefix }: { idPrefix: string }) {
  const [mode, setMode] = useState<ImportMode>("lines");
  const [rawCards, setRawCards] = useState("");
  const [files, setFiles] = useState<UploadedDeliveryFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
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
          throw new Error(payload?.error ?? `「${file.name}」上传失败，请稍后再试。`);
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

  const discardUploadedFile = useCallback((storageKey: string) => {
    void fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storageKey }),
    }).catch(() => {
      // 清理失败不阻塞用户操作；服务端删卡链路仍会兜底回收。
    });
  }, []);

  const handleRemove = useCallback(
    (index: number) => {
      setFiles((previous) => {
        const target = previous[index];
        if (target) {
          discardUploadedFile(target.storageKey);
        }
        return previous.filter((_, position) => position !== index);
      });
    },
    [discardUploadedFile],
  );

  const handleModeChange = useCallback(
    (next: ImportMode) => {
      setError(null);
      setMode((current) => {
        // 离开「上传文件」时，回收已上传但不会入库的孤儿文件。
        if (current === "file" && next !== "file") {
          setFiles((previous) => {
            previous.forEach((file) => discardUploadedFile(file.storageKey));
            return [];
          });
        }
        return next;
      });
    },
    [discardUploadedFile],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        void uploadFiles(event.dataTransfer.files);
      }
    },
    [uploadFiles],
  );

  const textRequired = mode !== "file";

  return (
    <div className="admin-import-modes">
      <input type="hidden" name="importMode" value={mode} readOnly />
      <input type="hidden" name="deliveryFiles" value={JSON.stringify(files)} readOnly />

      <div className="field">
        <label>发货方式</label>
        <div className="admin-segmented" role="tablist">
          {MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={mode === option.value}
              className={mode === option.value ? "admin-segmented-item is-active" : "admin-segmented-item"}
              onClick={() => handleModeChange(option.value)}
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

          <div
            className={dragging ? "admin-import-dropzone is-dragging" : "admin-import-dropzone"}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            {uploading ? <Loader2 className="admin-spin" size={20} /> : <FileUp size={20} />}
            <span className="admin-import-dropzone-title">
              {uploading ? "上传中…" : "点击选择，或拖拽文件到此处"}
            </span>
            <span className="admin-import-dropzone-hint">每个文件作为一条独立发货，单文件最大 50MB</span>
          </div>

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
                    aria-label={`移除 ${file.fileName}`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

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
            value={rawCards}
            onChange={(event) => setRawCards(event.target.value)}
            placeholder={
              mode === "single"
                ? "粘贴整段文本（支持超长 JSON / 多行文案），整体作为一条发货。"
                : "一行一条卡密，例如：\nCARD-0001\nCARD-0002\nCARD-0003"
            }
            required={textRequired}
          />
        </div>
      )}
    </div>
  );
}
