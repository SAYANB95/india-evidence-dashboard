import { boolean, doublePrecision, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";

export const jurisdictions = pgTable("jurisdictions", {
  id: text("id").primaryKey(), name: text("name").notNull(), type: text("type").notNull(), parentId: text("parent_id"),
  active: boolean("active").notNull().default(true), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("jurisdiction_name_unique").on(table.name)]);

export const sources = pgTable("sources", {
  id: text("id").primaryKey(), title: text("title").notNull(), publisher: text("publisher").notNull(), url: text("url").notNull(),
  sourceType: text("source_type").notNull(), publicationDate: text("publication_date"), retrievedAt: text("retrieved_at").notNull(),
  archivedUrl: text("archived_url"), checksum: text("checksum"), lastCheckedAt: text("last_checked_at"),
  linkStatus: text("link_status").notNull().default("unchecked"), httpStatus: integer("http_status"),
  consecutiveFailures: integer("consecutive_failures").notNull().default(0), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
}, table => [uniqueIndex("source_url_unique").on(table.url)]);

export const evidenceRecords = pgTable("evidence_records", {
  id: text("id").primaryKey(), jurisdictionId: text("jurisdiction_id").notNull().references(() => jurisdictions.id), topic: text("topic").notNull(),
  measure: text("measure").notNull(), title: text("title").notNull(), definition: text("definition").notNull(), limitation: text("limitation").notNull(),
  evidenceStatus: text("evidence_status").notNull(), workflowStatus: text("workflow_status").notNull().default("draft"),
  sourceId: text("source_id").references(() => sources.id), owner: text("owner"), createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(), publishedAt: text("published_at"),
});

export const observations = pgTable("observations", {
  id: text("id").primaryKey(), recordId: text("record_id").notNull().references(() => evidenceRecords.id),
  sourceId: text("source_id").notNull().references(() => sources.id), periodStart: text("period_start"), periodEnd: text("period_end"),
  periodLabel: text("period_label").notNull(), valueNumeric: doublePrecision("value_numeric"), valueText: text("value_text"), unit: text("unit"),
  denominator: text("denominator"), provisional: boolean("provisional").notNull().default(false), observedAt: text("observed_at"),
  retrievedAt: text("retrieved_at").notNull(), createdAt: text("created_at").notNull(),
});

export const promises = pgTable("promises", {
  id: text("id").primaryKey(), recordId: text("record_id").notNull().references(() => evidenceRecords.id), issuingBody: text("issuing_body").notNull(),
  commitmentText: text("commitment_text").notNull(), announcementDate: text("announcement_date").notNull(), baseline: text("baseline"),
  target: text("target").notNull(), deadline: text("deadline"), assessmentStatus: text("assessment_status").notNull(), rationale: text("rationale").notNull(),
  evidenceCutoff: text("evidence_cutoff").notNull(), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const revisions = pgTable("revisions", {
  id: text("id").primaryKey(), recordId: text("record_id").notNull().references(() => evidenceRecords.id), revisionNumber: integer("revision_number").notNull(),
  changedFieldsJson: text("changed_fields_json").notNull(), reason: text("reason").notNull(), actorId: text("actor_id").notNull(), createdAt: text("created_at").notNull(),
}, table => [uniqueIndex("record_revision_unique").on(table.recordId, table.revisionNumber)]);

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(), recordId: text("record_id").notNull().references(() => evidenceRecords.id), reviewType: text("review_type").notNull(),
  decision: text("decision").notNull(), note: text("note").notNull(), reviewerId: text("reviewer_id").notNull(), createdAt: text("created_at").notNull(),
});

export const corrections = pgTable("corrections", {
  id: text("id").primaryKey(), recordId: text("record_id").references(() => evidenceRecords.id), requesterContactHash: text("requester_contact_hash"),
  requestText: text("request_text").notNull(), supportingUrl: text("supporting_url"), status: text("status").notNull().default("received"),
  publicResponse: text("public_response"), createdAt: text("created_at").notNull(), resolvedAt: text("resolved_at"),
});

export const schemes = pgTable("schemes", {
  id: text("id").primaryKey(), name: text("name").notNull(), shortName: text("short_name").notNull(), responsibleBody: text("responsible_body").notNull(),
  category: text("category").notNull(), supportType: text("support_type").notNull(), status: text("status").notNull(), amountDescription: text("amount_description").notNull(),
  interestDescription: text("interest_description").notNull(), collateralDescription: text("collateral_description").notNull(), limitation: text("limitation").notNull(),
  sourceId: text("source_id").notNull().references(() => sources.id), sourceCheckedAt: text("source_checked_at").notNull(), createdAt: text("created_at").notNull(), updatedAt: text("updated_at").notNull(),
});

export const schemeJurisdictions = pgTable("scheme_jurisdictions", {
  id: text("id").primaryKey(), schemeId: text("scheme_id").notNull().references(() => schemes.id), jurisdictionId: text("jurisdiction_id").notNull().references(() => jurisdictions.id),
  availabilityStatus: text("availability_status").notNull(), localAgency: text("local_agency"), localSourceId: text("local_source_id").references(() => sources.id), checkedAt: text("checked_at").notNull(),
}, table => [uniqueIndex("scheme_jurisdiction_unique").on(table.schemeId, table.jurisdictionId)]);

export const eligibilityRules = pgTable("eligibility_rules", {
  id: text("id").primaryKey(), schemeId: text("scheme_id").notNull().references(() => schemes.id), field: text("field").notNull(), operator: text("operator").notNull(),
  expectedValue: text("expected_value").notNull(), ruleText: text("rule_text").notNull(), sourceId: text("source_id").notNull().references(() => sources.id), sortOrder: integer("sort_order").notNull(),
});

export const applicationChannels = pgTable("application_channels", {
  id: text("id").primaryKey(), schemeId: text("scheme_id").notNull().references(() => schemes.id), channelType: text("channel_type").notNull(),
  label: text("label").notNull(), url: text("url"), instructions: text("instructions").notNull(), activeStatus: text("active_status").notNull(), checkedAt: text("checked_at").notNull(),
});

export const sourceChecks = pgTable("source_checks", {
  id: text("id").primaryKey(), sourceId: text("source_id").notNull().references(() => sources.id), checkedAt: text("checked_at").notNull(),
  status: text("status").notNull(), httpStatus: integer("http_status"), finalUrl: text("final_url"), responseMs: integer("response_ms"), error: text("error"),
});
