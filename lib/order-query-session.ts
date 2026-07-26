import { cookies } from "next/headers";
import { getEnv } from "@/lib/env";
import {
  decodeOrderQueryAccess,
  encodeOrderQueryAccess,
} from "@/lib/order-query-token";

const COOKIE_NAME = "noveshop_order_query_access";
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 30;
const MAX_AUTHORIZED_ORDERS = 20;

function getSigningSecret() {
  return getEnv().merchantSessionSecret;
}

export async function getAuthorizedOrderPublicTokens() {
  const store = await cookies();
  return (
    decodeOrderQueryAccess(store.get(COOKIE_NAME)?.value, getSigningSecret())?.publicTokens ?? []
  );
}

export async function grantOrderQueryAccess(publicToken: string) {
  const token = publicToken.trim();
  if (!token) return;

  const store = await cookies();
  const existing = decodeOrderQueryAccess(
    store.get(COOKIE_NAME)?.value,
    getSigningSecret(),
  );
  const publicTokens = [
    token,
    ...(existing?.publicTokens ?? []).filter((item) => item !== token),
  ].slice(0, MAX_AUTHORIZED_ORDERS);
  const expiresAt = Date.now() + SESSION_AGE_SECONDS * 1_000;

  store.set(
    COOKIE_NAME,
    encodeOrderQueryAccess({ publicTokens, expiresAt }, getSigningSecret()),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(expiresAt),
    },
  );
}
