import { count, desc, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "../db/postgres";
import { corrections, evidenceRecords, jurisdictions, schemeJurisdictions, schemes, sources } from "../db/pg-schema";

export type SystemStatus = {
  database: "connected" | "unconfigured" | "unavailable";
  jurisdictions: number; sources: number; evidenceRecords: number; schemes: number; schemeJurisdictions: number; correctionRequests: number;
  availableSources: number; restrictedSources: number; unavailableSources: number; checkFailedSources: number; lastSourceCheck: string | null;
};

export async function getSystemStatus(): Promise<SystemStatus> {
  const empty = { jurisdictions: 0, sources: 0, evidenceRecords: 0, schemes: 0, schemeJurisdictions: 0, correctionRequests: 0, availableSources: 0, restrictedSources: 0, unavailableSources: 0, checkFailedSources: 0, lastSourceCheck: null };
  if (!isDatabaseConfigured()) return { database: "unconfigured", ...empty };
  try {
    const db = getDb();
    const [[jurisdictionCount], [sourceCount], [recordCount], [schemeCount], [coverageCount], [correctionCount], [availableCount], [restrictedCount], [unavailableCount], [checkFailedCount], latest] = await Promise.all([
      db.select({ value: count() }).from(jurisdictions), db.select({ value: count() }).from(sources), db.select({ value: count() }).from(evidenceRecords),
      db.select({ value: count() }).from(schemes), db.select({ value: count() }).from(schemeJurisdictions), db.select({ value: count() }).from(corrections),
      db.select({ value: count() }).from(sources).where(eq(sources.linkStatus, "available")),
      db.select({ value: count() }).from(sources).where(eq(sources.linkStatus, "restricted")),
      db.select({ value: count() }).from(sources).where(eq(sources.linkStatus, "unavailable")),
      db.select({ value: count() }).from(sources).where(eq(sources.linkStatus, "check_failed")),
      db.select({ value: sources.lastCheckedAt }).from(sources).orderBy(desc(sources.lastCheckedAt)).limit(1),
    ]);
    return { database: "connected", jurisdictions: jurisdictionCount.value, sources: sourceCount.value, evidenceRecords: recordCount.value, schemes: schemeCount.value, schemeJurisdictions: coverageCount.value, correctionRequests: correctionCount.value, availableSources: availableCount.value, restrictedSources: restrictedCount.value, unavailableSources: unavailableCount.value, checkFailedSources: checkFailedCount.value, lastSourceCheck: latest[0]?.value || null };
  } catch {
    return { database: "unavailable", ...empty };
  }
}
