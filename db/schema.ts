import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const jurisdictions = sqliteTable("jurisdictions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", { enum: ["country", "state", "union_territory", "multi_jurisdiction"] }).notNull(),
  parentId: text("parent_id"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [uniqueIndex("jurisdiction_name_unique").on(table.name)]);

export const sources = sqliteTable("sources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  url: text("url").notNull(),
  sourceType: text("source_type", { enum: ["official_page", "official_pdf", "official_api", "audit", "research"] }).notNull(),
  publicationDate: text("publication_date"),
  retrievedAt: text("retrieved_at").notNull(),
  archivedUrl: text("archived_url"),
  checksum: text("checksum"),
  lastCheckedAt: text("last_checked_at"),
  linkStatus: text("link_status", { enum: ["unchecked", "available", "redirected", "unavailable"] }).notNull().default("unchecked"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [uniqueIndex("source_url_unique").on(table.url)]);

export const evidenceRecords = sqliteTable("evidence_records", {
  id: text("id").primaryKey(),
  jurisdictionId: text("jurisdiction_id").notNull().references(() => jurisdictions.id),
  topic: text("topic").notNull(),
  measure: text("measure").notNull(),
  title: text("title").notNull(),
  definition: text("definition").notNull(),
  limitation: text("limitation").notNull(),
  evidenceStatus: text("evidence_status", { enum: ["available", "periodic", "source_mapped", "data_gap", "disputed"] }).notNull(),
  workflowStatus: text("workflow_status", { enum: ["draft", "source_review", "definition_review", "ready", "published", "superseded", "rejected"] }).notNull().default("draft"),
  sourceId: text("source_id").references(() => sources.id),
  owner: text("owner"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  publishedAt: text("published_at"),
});

export const observations = sqliteTable("observations", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id),
  sourceId: text("source_id").notNull().references(() => sources.id),
  periodStart: text("period_start"),
  periodEnd: text("period_end"),
  periodLabel: text("period_label").notNull(),
  valueNumeric: real("value_numeric"),
  valueText: text("value_text"),
  unit: text("unit"),
  denominator: text("denominator"),
  provisional: integer("provisional", { mode: "boolean" }).notNull().default(false),
  observedAt: text("observed_at"),
  retrievedAt: text("retrieved_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const promises = sqliteTable("promises", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id),
  issuingBody: text("issuing_body").notNull(),
  commitmentText: text("commitment_text").notNull(),
  announcementDate: text("announcement_date").notNull(),
  baseline: text("baseline"),
  target: text("target").notNull(),
  deadline: text("deadline"),
  assessmentStatus: text("assessment_status", { enum: ["delivered", "partial", "ongoing", "delayed", "disputed", "insufficient_evidence"] }).notNull(),
  rationale: text("rationale").notNull(),
  evidenceCutoff: text("evidence_cutoff").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const revisions = sqliteTable("revisions", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id),
  revisionNumber: integer("revision_number").notNull(),
  changedFieldsJson: text("changed_fields_json").notNull(),
  reason: text("reason").notNull(),
  actorId: text("actor_id").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("record_revision_unique").on(table.recordId, table.revisionNumber)]);

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  recordId: text("record_id").notNull().references(() => evidenceRecords.id),
  reviewType: text("review_type", { enum: ["source", "definition", "legal", "publication", "correction"] }).notNull(),
  decision: text("decision", { enum: ["approved", "changes_requested", "rejected"] }).notNull(),
  note: text("note").notNull(),
  reviewerId: text("reviewer_id").notNull(),
  createdAt: text("created_at").notNull(),
});

export const corrections = sqliteTable("corrections", {
  id: text("id").primaryKey(),
  recordId: text("record_id").references(() => evidenceRecords.id),
  requesterContactHash: text("requester_contact_hash"),
  requestText: text("request_text").notNull(),
  supportingUrl: text("supporting_url"),
  status: text("status", { enum: ["received", "triaged", "accepted", "declined", "closed"] }).notNull().default("received"),
  publicResponse: text("public_response"),
  createdAt: text("created_at").notNull(),
  resolvedAt: text("resolved_at"),
});

export const schemes = sqliteTable("schemes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  responsibleBody: text("responsible_body").notNull(),
  category: text("category").notNull(),
  supportType: text("support_type").notNull(),
  status: text("status", { enum: ["open_doorway", "lender_mediated", "verify_current_terms", "legacy_successor_pending"] }).notNull(),
  amountDescription: text("amount_description").notNull(),
  interestDescription: text("interest_description").notNull(),
  collateralDescription: text("collateral_description").notNull(),
  limitation: text("limitation").notNull(),
  sourceId: text("source_id").notNull().references(() => sources.id),
  sourceCheckedAt: text("source_checked_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const schemeJurisdictions = sqliteTable("scheme_jurisdictions", {
  id: text("id").primaryKey(),
  schemeId: text("scheme_id").notNull().references(() => schemes.id),
  jurisdictionId: text("jurisdiction_id").notNull().references(() => jurisdictions.id),
  availabilityStatus: text("availability_status", { enum: ["national_route", "state_verified", "state_gap", "not_available"] }).notNull(),
  localAgency: text("local_agency"),
  localSourceId: text("local_source_id").references(() => sources.id),
  checkedAt: text("checked_at").notNull(),
}, (table) => [uniqueIndex("scheme_jurisdiction_unique").on(table.schemeId, table.jurisdictionId)]);

export const eligibilityRules = sqliteTable("eligibility_rules", {
  id: text("id").primaryKey(),
  schemeId: text("scheme_id").notNull().references(() => schemes.id),
  field: text("field").notNull(),
  operator: text("operator", { enum: ["equals", "includes", "minimum", "maximum", "required", "excludes"] }).notNull(),
  expectedValue: text("expected_value").notNull(),
  ruleText: text("rule_text").notNull(),
  sourceId: text("source_id").notNull().references(() => sources.id),
  sortOrder: integer("sort_order").notNull(),
});

export const applicationChannels = sqliteTable("application_channels", {
  id: text("id").primaryKey(),
  schemeId: text("scheme_id").notNull().references(() => schemes.id),
  channelType: text("channel_type", { enum: ["official_portal", "bank", "mission_office", "bank_mitra", "offline_office"] }).notNull(),
  label: text("label").notNull(),
  url: text("url"),
  instructions: text("instructions").notNull(),
  activeStatus: text("active_status", { enum: ["verified", "status_check_required", "closed"] }).notNull(),
  checkedAt: text("checked_at").notNull(),
});
