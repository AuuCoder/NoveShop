import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-session";
import { getMerchantSession } from "@/lib/merchant-session";
import { UploadValidationError, saveDeliveryFile, saveUploadedImage } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const [admin, merchant] = await Promise.all([
    isAdminAuthenticated(),
    getMerchantSession(),
  ]);

  if (!admin && !merchant) {
    return NextResponse.json({ error: "未授权。" }, { status: 401 });
  }

  let file: unknown;
  let kind = "image";

  try {
    const form = await request.formData();
    file = form.get("file");
    kind = String(form.get("kind") ?? "image");
  } catch {
    return NextResponse.json({ error: "无法解析上传内容。" }, { status: 400 });
  }

  try {
    if (kind === "delivery") {
      const saved = await saveDeliveryFile(file as File);
      return NextResponse.json({
        storageKey: saved.storageKey,
        fileName: saved.fileName,
        size: saved.size,
      });
    }

    const url = await saveUploadedImage(file as File);
    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "上传失败，请稍后再试。" }, { status: 500 });
  }
}
