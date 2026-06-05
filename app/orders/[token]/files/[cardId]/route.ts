import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { Readable } from "node:stream";

import { NextResponse } from "next/server";

import { getDeliveryFileForDownload } from "@/lib/shop";

export const runtime = "nodejs";

function encodeContentDisposition(fileName: string) {
  // ASCII 回退 + RFC 5987 的 UTF-8 文件名，兼容中文等非 ASCII 文件名。
  const asciiFallback = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  const encoded = encodeURIComponent(fileName);
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string; cardId: string }> },
) {
  const { token, cardId } = await params;

  const target = await getDeliveryFileForDownload(token, cardId);

  if (!target) {
    return new NextResponse(null, { status: 404 });
  }

  let fileSize: number;
  try {
    const stats = await stat(target.filePath);
    if (!stats.isFile()) {
      return new NextResponse(null, { status: 404 });
    }
    fileSize = stats.size;
  } catch {
    return new NextResponse(null, { status: 404 });
  }

  const nodeStream = createReadStream(target.filePath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Length": String(fileSize),
      "Content-Disposition": encodeContentDisposition(target.fileName),
      "Cache-Control": "private, no-store",
    },
  });
}
