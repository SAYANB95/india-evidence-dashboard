CREATE TABLE `application_channels` (
	`id` text PRIMARY KEY NOT NULL,
	`scheme_id` text NOT NULL,
	`channel_type` text NOT NULL,
	`label` text NOT NULL,
	`url` text,
	`instructions` text NOT NULL,
	`active_status` text NOT NULL,
	`checked_at` text NOT NULL,
	FOREIGN KEY (`scheme_id`) REFERENCES `schemes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `eligibility_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`scheme_id` text NOT NULL,
	`field` text NOT NULL,
	`operator` text NOT NULL,
	`expected_value` text NOT NULL,
	`rule_text` text NOT NULL,
	`source_id` text NOT NULL,
	`sort_order` integer NOT NULL,
	FOREIGN KEY (`scheme_id`) REFERENCES `schemes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scheme_jurisdictions` (
	`id` text PRIMARY KEY NOT NULL,
	`scheme_id` text NOT NULL,
	`jurisdiction_id` text NOT NULL,
	`availability_status` text NOT NULL,
	`local_agency` text,
	`local_source_id` text,
	`checked_at` text NOT NULL,
	FOREIGN KEY (`scheme_id`) REFERENCES `schemes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`jurisdiction_id`) REFERENCES `jurisdictions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`local_source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `scheme_jurisdiction_unique` ON `scheme_jurisdictions` (`scheme_id`,`jurisdiction_id`);--> statement-breakpoint
CREATE TABLE `schemes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`short_name` text NOT NULL,
	`responsible_body` text NOT NULL,
	`category` text NOT NULL,
	`support_type` text NOT NULL,
	`status` text NOT NULL,
	`amount_description` text NOT NULL,
	`interest_description` text NOT NULL,
	`collateral_description` text NOT NULL,
	`limitation` text NOT NULL,
	`source_id` text NOT NULL,
	`source_checked_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`source_id`) REFERENCES `sources`(`id`) ON UPDATE no action ON DELETE no action
);
