import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { enqueueOrderSyncTask, handleNovaPayCallback } from "@/lib/shop";
import { getPaymentProfileForOrderNo } from "@/lib/payment-profile";
import { getEnv } from "@/lib/env";
import { verifyNovaPayCallbackSignature } from "@/lib/novapay";
import { prisma } from "@/lib/prisma";
import { getStorefrontPathsForProduct } from "@/lib/storefront";

export const runtime = "nodejs";

const CALLBACK_PROVIDER = "novapay";

type CallbackPayload = {
  id?: unknown;
  eventId?: unknown;
  event?: unknown;
  traceId?: unknown;
  order?: Record<string, unknown>;
};

function pickString(value: unknown) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || null;
}

function isTimestampFresh(raw: string) {
  const parsed = Date.parse(raw);

  if (!Number.isFinite(parsed)) {
    return false;
  }

  return Math.abs(Date.now() - parsed) <= 5 * 60 * 1000;
}

function isUniqueConstraintError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

function buildWebhookEventId(payload: CallbackPayload, rawBody: string) {
  const directId =
    pickString(payload.eventId) ??
    pickString(payload.id) ??
    pickString(payload.order?.eventId) ??
    pickString(payload.order?.id);

  if (directId) {
    return directId;
  }

  const eventType = pickString(payload.event) ?? "unknown";
  const externalOrderId = pickString(payload.order?.externalOrderId) ?? "unknown";
  const status = pickString(payload.order?.status) ?? "unknown";
  const paidAt = pickString(payload.order?.paidAt) ?? "unknown";
  const digest = createHash("sha256").update(rawBody).digest("hex").slice(0, 16);

  return `${eventType}:${externalOrderId}:${status}:${paidAt}:${digest}`;
}

async function createWebhookEventLog(input: {
  externalEventId: string;
  externalOrderId?: string | null;
  eventType: string;
  traceId?: string | null;
  signatureValid: boolean;
  requestHeaders?: string | null;
  requestBody: string;
  processingStatus: string;
  processingError?: string | null;
}) {
  try {
    const eventLog = await prisma.webhookEventLog.create({
      data: {
        provider: CALLBACK_PROVIDER,
        externalEventId: input.externalEventId,
        externalOrderId: input.externalOrderId ?? null,
        eventType: input.eventType,
        traceId: input.traceId ?? null,
        signatureValid: input.signatureValid,
        requestHeaders: input.requestHeaders ?? null,
        requestBody: input.requestBody,
        processingStatus: input.processingStatus,
        processingError: input.processingError ?? null,
      },
    });

    return { duplicate: false, eventLog };
  } catch (error) {
    if (!isUniqueConstraintError(error)) {
      throw error;
    }

    const eventLog = await prisma.webhookEventLog.findUnique({
      where: {
        provider_externalEventId: {
          provider: CALLBACK_PROVIDER,
          externalEventId: input.externalEventId,
        },
      },
    });

    return { duplicate: true, eventLog };
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-novapay-timestamp")?.trim() ?? "";
  const signature = request.headers.get("x-novapay-signature")?.trim() ?? "";

  let payload: CallbackPayload;

  try {
    payload = JSON.parse(rawBody) as CallbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid callback body." }, { status: 400 });
  }

  const eventType = pickString(payload.event) ?? "unknown";
  const externalEventId = buildWebhookEventId(payload, rawBody);
  const externalOrderId = pickString(payload.order?.externalOrderId) ?? "";
  const paymentAttempt = externalOrderId
    ? await prisma.shopPaymentAttempt.findUnique({
        where: {
          externalOrderId,
        },
        select: {
          id: true,
          shopOrderId: true,
          traceId: true,
        },
      })
    : null;
  const traceId = pickString(payload.traceId) ?? pickString(payload.order?.traceId) ?? paymentAttempt?.traceId ?? null;
  const requestHeaders = JSON.stringify(Object.fromEntries(request.headers.entries()));

  const paymentProfile = externalOrderId ? await getPaymentProfileForOrderNo(externalOrderId) : null;
  const env = getEnv();
  const notifySecret =
    paymentProfile?.notifySecret ??
    (env.allowEnvPaymentProfileBootstrap ? env.novaPayNotifySecret : "");
  const isSupportedEvent = eventType === "payment.order.updated" && !!payload.order;

  let signatureValid = true;
  let processingStatus = isSupportedEvent ? "PROCESSING" : "IGNORED";
  let processingError: string | null = null;

  if (notifySecret && (!timestamp || !signature)) {
    signatureValid = false;
    processingStatus = "REJECTED";
    processingError = "Missing callback signature headers.";
  } else if (notifySecret && !isTimestampFresh(timestamp)) {
    signatureValid = false;
    processingStatus = "REJECTED";
    processingError = "Callback timestamp expired.";
  } else if (notifySecret && !verifyNovaPayCallbackSignature(rawBody, timestamp, signature, notifySecret)) {
    signatureValid = false;
    processingStatus = "REJECTED";
    processingError = "Invalid callback signature.";
  }

  if (isSupportedEvent && !externalOrderId && !processingError) {
    processingStatus = "IGNORED";
    processingError = "missing_external_order_id";
  }

  const eventLogResult = await createWebhookEventLog({
    externalEventId,
    externalOrderId,
    eventType,
    traceId,
    signatureValid,
    requestHeaders,
    requestBody: rawBody,
    processingStatus,
    processingError,
  });

  if (eventLogResult.duplicate) {
    return NextResponse.json({
      received: true,
      deduplicated: true,
      processingStatus: eventLogResult.eventLog?.processingStatus ?? null,
    });
  }

  const eventLog = eventLogResult.eventLog;

  if (!eventLog) {
    return NextResponse.json({ error: "Failed to persist callback log." }, { status: 500 });
  }

  if (processingStatus === "REJECTED") {
    return NextResponse.json({ error: processingError ?? "Invalid callback signature." }, { status: 401 });
  }

  if (processingStatus === "IGNORED" || !payload.order) {
    return NextResponse.json({
      received: true,
      ignored: true,
      reason: processingError ?? "unsupported_event",
    });
  }

  try {
    const order = await handleNovaPayCallback({
      externalOrderId,
      order: payload.order,
      callbackEventId: externalEventId,
      traceId,
    });

    if (!order) {
      const message = "未找到对应订单，已加入补偿队列。";

      await prisma.webhookEventLog.update({
        where: {
          id: eventLog.id,
        },
        data: {
          processingStatus: "FAILED",
          processingError: message,
          traceId: traceId ?? undefined,
        },
      });

      await enqueueOrderSyncTask({
        taskType: "novapay.callback.reconcile",
        shopOrderId: paymentAttempt?.shopOrderId ?? null,
        paymentAttemptId: paymentAttempt?.id ?? null,
        lastError: message,
        payload: {
          externalEventId,
          externalOrderId,
          traceId,
          eventType,
          order: payload.order,
        },
      });

      return NextResponse.json({ received: true, queued: true, reason: "order_not_found" }, { status: 202 });
    }

    await prisma.webhookEventLog.update({
      where: {
        id: eventLog.id,
      },
      data: {
        processingStatus: "SUCCEEDED",
        processingError: null,
        traceId: traceId ?? undefined,
      },
    });

    revalidatePath("/");
    for (const path of getStorefrontPathsForProduct(order.product.slug, order.paymentProfile?.ownerId)) {
      revalidatePath(path);
    }
    revalidatePath(`/orders/${order.publicToken}`);
    revalidatePath("/query");
    revalidatePath("/admin");

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Callback processing failed.";

    await prisma.webhookEventLog.update({
      where: {
        id: eventLog.id,
      },
      data: {
        processingStatus: "FAILED",
        processingError: message,
        traceId: traceId ?? undefined,
      },
    });

    await enqueueOrderSyncTask({
      taskType: "novapay.callback.reconcile",
      shopOrderId: paymentAttempt?.shopOrderId ?? null,
      paymentAttemptId: paymentAttempt?.id ?? null,
      lastError: message,
      payload: {
        externalEventId,
        externalOrderId,
        traceId,
        eventType,
        order: payload.order,
      },
    });

    return NextResponse.json({ error: "Callback processing failed." }, { status: 500 });
  }
}
