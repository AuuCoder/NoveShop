import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEnv } from "@/lib/env";

const COOKIE_NAME = "noveshop_admin_session";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7;

interface SessionPayload {
  username: string;
  expiresAt: number;
}

function sign(value: string) {
  return createHmac("sha256", getEnv().adminSessionSecret).update(value).digest("hex");
}

function encodePayload(payload: SessionPayload) {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${data}.${sign(data)}`;
}

function decodePayload(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionPayload;

    if (decoded.expiresAt <= Date.now()) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const payload = decodePayload(store.get(COOKIE_NAME)?.value);
  return Boolean(payload && payload.username === getEnv().adminUsername);
}

export async function requireAdminSession() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }
}

export async function createAdminSession() {
  const store = await cookies();
  const expiresAt = Date.now() + SESSION_AGE_SECONDS * 1000;

  store.set(COOKIE_NAME, encodePayload({ username: getEnv().adminUsername, expiresAt }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroyAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
