import { NextResponse } from "next/server";
import { buildControlAuditExportFilename, buildControlAuditWeeklyCsv } from "@/lib/control-audit-export";
import { getMerchantSession } from "@/lib/merchant-session";
import {
  getMerchantControlAuditDigestForExport,
  normalizePaymentOperationsFilters,
} from "@/lib/shop";

export const runtime = "nodejs";

function getSearchObject(request: Request) {
  return Object.fromEntries(new URL(request.url).searchParams.entries()) as Record<string, string | undefined>;
}

export async function GET(request: Request) {
  const merchant = await getMerchantSession();

  if (!merchant) {
    return NextResponse.redirect(new URL("/merchant/login", request.url));
  }

  const search = getSearchObject(request);
  const filters = normalizePaymentOperationsFilters(search);
  const digest = await getMerchantControlAuditDigestForExport(merchant.id, search);
  const body = buildControlAuditWeeklyCsv({
    digest,
    filters,
    scopeLabel: `商户控制台(${merchant.name})`,
  });
  const filename = buildControlAuditExportFilename({
    scope: "merchant",
    actorLabel: merchant.email,
    reportType: "weekly",
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
