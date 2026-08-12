import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "../../../../db/postgres";
import { sourceChecks, sources } from "../../../../db/pg-schema";
import { safeSourceFetch } from "../../../../lib/safe-source-probe";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function probe(url: string) {
  const started = Date.now();
  try {
    let response = await safeSourceFetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000), cache: "no-store" });
    if (!response.ok) response = await safeSourceFetch(url, { headers: { Range: "bytes=0-0" }, signal: AbortSignal.timeout(8000), cache: "no-store" });
    const restricted = [401, 403, 406, 429].includes(response.status);
    return { status: response.ok ? "available" : restricted ? "restricted" : response.status >= 300 && response.status < 400 ? "redirected" : "unavailable", httpStatus: response.status, finalUrl: response.url, responseMs: Date.now() - started, error: null };
  } catch (error) {
    return { status: "check_failed", httpStatus: null, finalUrl: null, responseMs: Date.now() - started, error: error instanceof Error ? error.message.slice(0, 300) : "Unknown source check error" };
  }
}

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) return Response.json({ error: "Database unconfigured" }, { status: 503 });
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return Response.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const db = getDb();
  const sourceRows = await db.select().from(sources);
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(sourceRows.map(async source => {
    const result = await probe(source.url);
    await db.insert(sourceChecks).values({ id: randomUUID(), sourceId: source.id, checkedAt, ...result });
    await db.update(sources).set({ linkStatus: result.status, httpStatus: result.httpStatus, lastCheckedAt: checkedAt, consecutiveFailures: ["available", "restricted"].includes(result.status) ? 0 : source.consecutiveFailures + 1, updatedAt: checkedAt }).where(eq(sources.id, source.id));
    return { id: source.id, status: result.status, httpStatus: result.httpStatus };
  }));
  return Response.json({ checkedAt, checked: results.length, available: results.filter(item => item.status === "available").length, restricted: results.filter(item => item.status === "restricted").length, unavailable: results.filter(item => item.status === "unavailable").length, checkFailed: results.filter(item => item.status === "check_failed").length });
}
