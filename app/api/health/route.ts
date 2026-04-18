import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.merchantAccount.count();

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      databaseEngine: getEnv().databaseEngine,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        databaseEngine: getEnv().databaseEngine,
        error: error instanceof Error ? error.message : "health_check_failed",
      },
      { status: 503 },
    );
  }
}
