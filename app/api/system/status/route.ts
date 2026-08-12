import { getSystemStatus } from "../../../../lib/system-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getSystemStatus();
  return Response.json({ ...status, checkedAt: new Date().toISOString(), writesEnabled: false, authentication: "pending marketplace acceptance" }, {
    status: status.database === "unavailable" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
