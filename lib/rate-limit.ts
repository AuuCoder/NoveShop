import { headers } from "next/headers";

type RateLimitState = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, RateLimitState>();

function getClientFingerprint(headerMap: Awaited<ReturnType<typeof headers>>) {
  const forwardedFor = headerMap.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headerMap.get("x-real-ip")?.trim();
  const userAgent = headerMap.get("user-agent")?.trim();

  return forwardedFor || realIp || userAgent || "anonymous";
}

function cleanupExpiredStates(now: number) {
  for (const [key, state] of store.entries()) {
    if (state.expiresAt <= now) {
      store.delete(key);
    }
  }
}

export async function assertRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
  message: string;
}) {
  const headerMap = await headers();
  const now = Date.now();
  cleanupExpiredStates(now);

  const storageKey = `${input.key}:${getClientFingerprint(headerMap)}`;
  const current = store.get(storageKey);

  if (!current || current.expiresAt <= now) {
    store.set(storageKey, {
      count: 1,
      expiresAt: now + input.windowMs,
    });
    return;
  }

  if (current.count >= input.limit) {
    throw new Error(input.message);
  }

  store.set(storageKey, {
    count: current.count + 1,
    expiresAt: current.expiresAt,
  });
}
