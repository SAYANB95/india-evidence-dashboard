import { createHash } from "node:crypto";
import { getDb } from "../db/postgres";
import * as tables from "../db/pg-schema";
import { editorialRecords } from "../lib/editorial";
import { jurisdictions as jurisdictionList } from "../lib/evidence";
import { schemes as schemeSeed } from "../lib/schemes";

const db = getDb();
const now = new Date().toISOString();
const hash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 20);
const jurisdictionId = (name: string) => jurisdictionList.find(item => item.name === name)?.slug || "india";
const statusMap: Record<string, string> = {
  "Open doorway": "open_doorway", "Lender-mediated": "lender_mediated",
  "Verify current terms": "verify_current_terms", "Legacy / successor pending": "legacy_successor_pending",
};

async function seed() {
  await db.insert(tables.jurisdictions).values([
    { id: "india", name: "India", type: "country", parentId: null, active: true, createdAt: now, updatedAt: now },
    ...jurisdictionList.map(item => ({ id: item.slug, name: item.name, type: item.type === "State" ? "state" : "union_territory", parentId: "india", active: true, createdAt: now, updatedAt: now })),
  ]).onConflictDoNothing();

  const sourceByUrl = new Map<string, { id: string; title: string; publisher: string; url: string; sourceType: string; retrievedAt: string; createdAt: string; updatedAt: string }>();
  for (const item of schemeSeed) sourceByUrl.set(item.sourceUrl, { id: `source-${hash(item.sourceUrl)}`, title: item.sourceLabel, publisher: item.sourceLabel.split(" — ")[0], url: item.sourceUrl, sourceType: item.sourceUrl.endsWith(".pdf") ? "official_pdf" : "official_page", retrievedAt: now, createdAt: now, updatedAt: now });
  for (const item of editorialRecords) sourceByUrl.set(item.sourceUrl, { id: `source-${hash(item.sourceUrl)}`, title: item.sourceLabel, publisher: item.sourceLabel, url: item.sourceUrl, sourceType: item.sourceLabel.includes("CAG") ? "audit" : "official_page", retrievedAt: now, createdAt: now, updatedAt: now });
  await db.insert(tables.sources).values([...sourceByUrl.values()]).onConflictDoNothing();

  await db.insert(tables.evidenceRecords).values(editorialRecords.map(item => ({
    id: item.id, jurisdictionId: jurisdictionId(item.jurisdiction), topic: item.topic, measure: item.kind === "Toll plaza" ? "fee_plaza_record" : "project_milestone",
    title: item.title, definition: item.definition, limitation: item.limitation, evidenceStatus: item.missingFields.length ? "data_gap" : "available",
    workflowStatus: item.workflow === "Ready for import" ? "source_review" : "draft", sourceId: sourceByUrl.get(item.sourceUrl)!.id,
    owner: null, createdAt: now, updatedAt: now, publishedAt: null,
  }))).onConflictDoNothing();
  await db.insert(tables.observations).values(editorialRecords.map(item => ({
    id: `observation-${item.id}`, recordId: item.id, sourceId: sourceByUrl.get(item.sourceUrl)!.id, periodLabel: item.sourcePeriod,
    valueText: item.currentValue, provisional: false, retrievedAt: now, createdAt: now,
  }))).onConflictDoNothing();

  await db.insert(tables.schemes).values(schemeSeed.map(item => ({
    id: item.id, name: item.name, shortName: item.shortName, responsibleBody: item.sourceLabel.split(" — ")[0], category: item.category,
    supportType: item.supportType, status: statusMap[item.status], amountDescription: item.amount, interestDescription: item.interest,
    collateralDescription: item.collateral, limitation: item.limitation, sourceId: sourceByUrl.get(item.sourceUrl)!.id,
    sourceCheckedAt: item.sourceChecked, createdAt: now, updatedAt: now,
  }))).onConflictDoNothing();

  const schemeJurisdictions = schemeSeed.flatMap(scheme => jurisdictionList.map(jurisdiction => ({
    id: `${scheme.id}-${jurisdiction.slug}`, schemeId: scheme.id, jurisdictionId: jurisdiction.slug,
    availabilityStatus: "national_route", localAgency: null, localSourceId: null, checkedAt: scheme.sourceChecked,
  })));
  await db.insert(tables.schemeJurisdictions).values(schemeJurisdictions).onConflictDoNothing();

  const rules = schemeSeed.flatMap(scheme => scheme.eligibility.map((rule, index) => ({
    id: `${scheme.id}-eligibility-${index + 1}`, schemeId: scheme.id, field: "published_condition", operator: "required",
    expectedValue: rule, ruleText: rule, sourceId: sourceByUrl.get(scheme.sourceUrl)!.id, sortOrder: index + 1,
  })));
  await db.insert(tables.eligibilityRules).values(rules).onConflictDoNothing();

  await db.insert(tables.applicationChannels).values(schemeSeed.map(scheme => ({
    id: `${scheme.id}-primary-channel`, schemeId: scheme.id, channelType: scheme.applyUrl ? "official_portal" : "offline_office",
    label: scheme.applicationRoute, url: scheme.applyUrl, instructions: scheme.accessSteps.join(" "),
    activeStatus: scheme.applyUrl ? "verified" : "status_check_required", checkedAt: scheme.sourceChecked,
  }))).onConflictDoNothing();

  console.log(JSON.stringify({ jurisdictions: jurisdictionList.length + 1, sources: sourceByUrl.size, evidenceRecords: editorialRecords.length, schemes: schemeSeed.length, schemeJurisdictions: schemeJurisdictions.length, eligibilityRules: rules.length }, null, 2));
}

seed().catch(error => { console.error(error); process.exitCode = 1; });
