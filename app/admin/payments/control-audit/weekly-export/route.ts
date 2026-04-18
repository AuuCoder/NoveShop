import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  buildControlAuditExportFilename,
  buildControlAuditWeeklyCsv,
} from "@/lib/control-audit-export";
import { getAdminControlAuditDigestForExport, normalizePaymentOperationsFilters } from "@/lib/shop";

export const runtime = "nodejs";

function getSearchObject(request: Request) {
  return Object.fromEntries(new URL(request.url).searchParams.entries()) as Record<string, string | undefined>;
}

export async function GET(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const search = getSearchObject(request);
  const filters = normalizePaymentOperationsFilters(search);
  const digest = await getAdminControlAuditDigestForExport(search);
  const body = buildControlAuditWeeklyCsv({
    digest,
    filters,
    scopeLabel: "平台控制台",
  });
  const filename = buildControlAuditExportFilename({
    scope: "admin",
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
