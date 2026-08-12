CREATE TABLE "application_channels" (
	"id" text PRIMARY KEY NOT NULL,
	"scheme_id" text NOT NULL,
	"channel_type" text NOT NULL,
	"label" text NOT NULL,
	"url" text,
	"instructions" text NOT NULL,
	"active_status" text NOT NULL,
	"checked_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "corrections" (
	"id" text PRIMARY KEY NOT NULL,
	"record_id" text,
	"requester_contact_hash" text,
	"request_text" text NOT NULL,
	"supporting_url" text,
	"status" text DEFAULT 'received' NOT NULL,
	"public_response" text,
	"created_at" text NOT NULL,
	"resolved_at" text
);
--> statement-breakpoint
CREATE TABLE "eligibility_rules" (
	"id" text PRIMARY KEY NOT NULL,
	"scheme_id" text NOT NULL,
	"field" text NOT NULL,
	"operator" text NOT NULL,
	"expected_value" text NOT NULL,
	"rule_text" text NOT NULL,
	"source_id" text NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evidence_records" (
	"id" text PRIMARY KEY NOT NULL,
	"jurisdiction_id" text NOT NULL,
	"topic" text NOT NULL,
	"measure" text NOT NULL,
	"title" text NOT NULL,
	"definition" text NOT NULL,
	"limitation" text NOT NULL,
	"evidence_status" text NOT NULL,
	"workflow_status" text DEFAULT 'draft' NOT NULL,
	"source_id" text,
	"owner" text,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL,
	"published_at" text
);
--> statement-breakpoint
CREATE TABLE "jurisdictions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"parent_id" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "observations" (
	"id" text PRIMARY KEY NOT NULL,
	"record_id" text NOT NULL,
	"source_id" text NOT NULL,
	"period_start" text,
	"period_end" text,
	"period_label" text NOT NULL,
	"value_numeric" double precision,
	"value_text" text,
	"unit" text,
	"denominator" text,
	"provisional" boolean DEFAULT false NOT NULL,
	"observed_at" text,
	"retrieved_at" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promises" (
	"id" text PRIMARY KEY NOT NULL,
	"record_id" text NOT NULL,
	"issuing_body" text NOT NULL,
	"commitment_text" text NOT NULL,
	"announcement_date" text NOT NULL,
	"baseline" text,
	"target" text NOT NULL,
	"deadline" text,
	"assessment_status" text NOT NULL,
	"rationale" text NOT NULL,
	"evidence_cutoff" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"record_id" text NOT NULL,
	"review_type" text NOT NULL,
	"decision" text NOT NULL,
	"note" text NOT NULL,
	"reviewer_id" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "revisions" (
	"id" text PRIMARY KEY NOT NULL,
	"record_id" text NOT NULL,
	"revision_number" integer NOT NULL,
	"changed_fields_json" text NOT NULL,
	"reason" text NOT NULL,
	"actor_id" text NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheme_jurisdictions" (
	"id" text PRIMARY KEY NOT NULL,
	"scheme_id" text NOT NULL,
	"jurisdiction_id" text NOT NULL,
	"availability_status" text NOT NULL,
	"local_agency" text,
	"local_source_id" text,
	"checked_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schemes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"responsible_body" text NOT NULL,
	"category" text NOT NULL,
	"support_type" text NOT NULL,
	"status" text NOT NULL,
	"amount_description" text NOT NULL,
	"interest_description" text NOT NULL,
	"collateral_description" text NOT NULL,
	"limitation" text NOT NULL,
	"source_id" text NOT NULL,
	"source_checked_at" text NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_checks" (
	"id" text PRIMARY KEY NOT NULL,
	"source_id" text NOT NULL,
	"checked_at" text NOT NULL,
	"status" text NOT NULL,
	"http_status" integer,
	"final_url" text,
	"response_ms" integer,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"publisher" text NOT NULL,
	"url" text NOT NULL,
	"source_type" text NOT NULL,
	"publication_date" text,
	"retrieved_at" text NOT NULL,
	"archived_url" text,
	"checksum" text,
	"last_checked_at" text,
	"link_status" text DEFAULT 'unchecked' NOT NULL,
	"http_status" integer,
	"consecutive_failures" integer DEFAULT 0 NOT NULL,
	"created_at" text NOT NULL,
	"updated_at" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "application_channels" ADD CONSTRAINT "application_channels_scheme_id_schemes_id_fk" FOREIGN KEY ("scheme_id") REFERENCES "public"."schemes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_record_id_evidence_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."evidence_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eligibility_rules" ADD CONSTRAINT "eligibility_rules_scheme_id_schemes_id_fk" FOREIGN KEY ("scheme_id") REFERENCES "public"."schemes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eligibility_rules" ADD CONSTRAINT "eligibility_rules_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_records" ADD CONSTRAINT "evidence_records_jurisdiction_id_jurisdictions_id_fk" FOREIGN KEY ("jurisdiction_id") REFERENCES "public"."jurisdictions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence_records" ADD CONSTRAINT "evidence_records_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "observations" ADD CONSTRAINT "observations_record_id_evidence_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."evidence_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "observations" ADD CONSTRAINT "observations_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promises" ADD CONSTRAINT "promises_record_id_evidence_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."evidence_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_record_id_evidence_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."evidence_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "revisions" ADD CONSTRAINT "revisions_record_id_evidence_records_id_fk" FOREIGN KEY ("record_id") REFERENCES "public"."evidence_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheme_jurisdictions" ADD CONSTRAINT "scheme_jurisdictions_scheme_id_schemes_id_fk" FOREIGN KEY ("scheme_id") REFERENCES "public"."schemes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheme_jurisdictions" ADD CONSTRAINT "scheme_jurisdictions_jurisdiction_id_jurisdictions_id_fk" FOREIGN KEY ("jurisdiction_id") REFERENCES "public"."jurisdictions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheme_jurisdictions" ADD CONSTRAINT "scheme_jurisdictions_local_source_id_sources_id_fk" FOREIGN KEY ("local_source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schemes" ADD CONSTRAINT "schemes_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "source_checks" ADD CONSTRAINT "source_checks_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "jurisdiction_name_unique" ON "jurisdictions" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "record_revision_unique" ON "revisions" USING btree ("record_id","revision_number");--> statement-breakpoint
CREATE UNIQUE INDEX "scheme_jurisdiction_unique" ON "scheme_jurisdictions" USING btree ("scheme_id","jurisdiction_id");--> statement-breakpoint
CREATE UNIQUE INDEX "source_url_unique" ON "sources" USING btree ("url");