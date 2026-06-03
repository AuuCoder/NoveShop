import { readFile } from "node:fs/promises";

import { NextResponse } from "next/server";

import { getImageContentType, resolveUploadPath } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;

  if (!segments || segments.length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = resolveUploadPath(segments);

  if (!filePath) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": getImageContentType(filePath),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
