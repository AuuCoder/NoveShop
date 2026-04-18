import { NextResponse } from "next/server";
import { buildControlAuditExportFilename, buildControlAuditCsv } from "@/lib/control-audit-export";
import { getMerchantSession } from "@/lib/merchant-session";
import { listMerchantControlAuditLogsForExport } from "@/lib/shop";

export const runtime = "nodejs";

function getSearchObject(request: Request) {
  return Object.fromEntries(new URL(request.url).searchParams.entries()) as Record<string, string | undefined>;
}

export async function GET(request: Request) {
  const merchant = await getMerchantSession();

  if (!merchant) {
    return NextResponse.redirect(new URL("/merchant/login", request.url));
  }

  const logs = await listMerchantControlAuditLogsForExport(merchant.id, getSearchObject(request));
  const body = buildControlAuditCsv({
    logs,
    scopeLabel: `商户控制台(${merchant.name})`,
  });
  const filename = buildControlAuditExportFilename({
    scope: "merchant",
    actorLabel: merchant.email,
  });

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
