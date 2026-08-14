import { createHash, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { count, gte } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db/postgres";
import { visitorSessions } from "@/db/pg-schema";

const COOKIE_NAME = "ied_visitor";
const ACTIVE_WINDOW_MINUTES = 5;
const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function noStore(status = 200) {
  return { status, headers: { "Cache-Control": "private, no-store, max-age=0" } };
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  return origin === new URL(request.url).origin && (!fetchSite || fetchSite === "same-origin");
}

function likelyBot(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  return /bot|crawler|spider|slurp|preview|facebookexternalhit|whatsapp/i.test(userAgent);
}

async function totals() {
  const db = getDb();
  const cutoff = new Date(Date.now() - ACTIVE_WINDOW_MINUTES * 60_000).toISOString();
  const [[total], [active]] = await Promise.all([
    db.select({ value: count() }).from(visitorSessions),
    db.select({ value: count() }).from(visitorSessions).where(gte(visitorSessions.lastSeenAt, cutoff)),
  ]);
  return {
    status: "available" as const,
    activeVisitors: active.value,
    totalVisitors: total.value,
    activeWindowMinutes: ACTIVE_WINDOW_MINUTES,
    refreshedAt: new Date().toISOString(),
    limitation: "Anonymous browsers, not verified individual people. A cleared cookie or another device may count again.",
  };
}

export async function GET() {
  if (!isDatabaseConfigured()) return Response.json({ status: "unavailable" }, noStore(503));
  try {
    return Response.json(await totals(), noStore());
  } catch {
    return Response.json({ status: "unavailable" }, noStore(503));
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ status: "rejected" }, noStore(403));
  if (!isDatabaseConfigured()) return Response.json({ status: "unavailable" }, noStore(503));

  try {
    const cookieStore = await cookies();
    const existing = cookieStore.get(COOKIE_NAME)?.value;
    const visitorId = existing && VISITOR_ID.test(existing) ? existing : randomUUID();
    const now = new Date().toISOString();

    if (!likelyBot(request)) {
      const visitorHash = createHash("sha256").update(visitorId).digest("hex");
      await getDb().insert(visitorSessions).values({ visitorHash, firstSeenAt: now, lastSeenAt: now }).onConflictDoUpdate({
        target: visitorSessions.visitorHash,
        set: { lastSeenAt: now },
      });
      if (visitorId !== existing) {
        cookieStore.set(COOKIE_NAME, visitorId, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          priority: "low",
        });
      }
    }

    return Response.json(await totals(), noStore());
  } catch {
    return Response.json({ status: "unavailable" }, noStore(503));
  }
}
