CREATE TABLE `corrections` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text,
	`requester_contact_hash` text,
	`request_text` text NOT NULL,
	`supporting_url` text,
	`status` text DEFAULT 'received' NOT NULL,
	`public_response` text,
	`created_at` text NOT NULL,
	`resolved_at` text,
	FOREIGN KEY (`record_id`) REFERENCES `evidence_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `evidence_records` (
	`id` text PRIMARY KEY NOT NULL,
	`jurisdiction_id` text NOT NULL,
	`topic` text NOT NULL,
	`measure` text NOT NULL,
	`title` text NOT NULL,
	`definition` text NOT NULL,
	`limitation` text NOT NULL,
	`evidence_status` text NOT NULL,
	`workflow_status` text DEFAULT 'draft' NOT NULL,
	`source_id` text,
	`owner` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`published_at` text,
	FOREIGN KEY (`jurisdiction_id`) REFERENCES `jurisdictions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `jurisdictions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`parent_id` text,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jurisdiction_name_unique` ON `jurisdictions` (`name`);--> statement-breakpoint
CREATE TABLE `observations` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`source_id` text NOT NULL,
	`period_start` text,
	`period_end` text,
	`period_label` text NOT NULL,
	`value_numeric` real,
	`value_text` text,
	`unit` text,
	`denominator` text,
	`provisional` integer DEFAULT false NOT NULL,
	`observed_at` text,
	`retrieved_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `evidence_records`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `promises` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`issuing_body` text NOT NULL,
	`commitment_text` text NOT NULL,
	`announcement_date` text NOT NULL,
	`baseline` text,
	`target` text NOT NULL,
	`deadline` text,
	`assessment_status` text NOT NULL,
	`rationale` text NOT NULL,
	`evidence_cutoff` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `evidence_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`review_type` text NOT NULL,
	`decision` text NOT NULL,
	`note` text NOT NULL,
	`reviewer_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `evidence_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`revision_number` integer NOT NULL,
	`changed_fields_json` text NOT NULL,
	`reason` text NOT NULL,
	`actor_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`record_id`) REFERENCES `evidence_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `record_revision_unique` ON `revisions` (`record_id`,`revision_number`);--> statement-breakpoint
CREATE TABLE `sources` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`publisher` text NOT NULL,
	`url` text NOT NULL,
	`source_type` text NOT NULL,
	`publication_date` text,
	`retrieved_at` text NOT NULL,
	`archived_url` text,
	`checksum` text,
	`last_checked_at` text,
	`link_status` text DEFAULT 'unchecked' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `source_url_unique` ON `sources` (`url`);