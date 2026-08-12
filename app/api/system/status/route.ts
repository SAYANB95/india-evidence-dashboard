import { getSystemStatus } from "../../../../lib/system-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getSystemStatus();
  return Response.json({
    status: status.database === "connected" ? "operational" : status.database === "unconfigured" ? "not-configured" : "degraded",
    coverage: { jurisdictions: status.jurisdictions, evidenceRecords: status.evidenceRecords, schemes: status.schemes },
    sourceHealth: { available: status.availableSources, restricted: status.restrictedSources, unavailable: status.unavailableSources, checkFailed: status.checkFailedSources, lastCheckedAt: status.lastSourceCheck },
    checkedAt: new Date().toISOString(),
  }, {
    status: status.database === "unavailable" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
