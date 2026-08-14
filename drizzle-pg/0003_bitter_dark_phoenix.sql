CREATE TABLE "visitor_sessions" (
	"visitor_hash" text PRIMARY KEY NOT NULL,
	"first_seen_at" text NOT NULL,
	"last_seen_at" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "visitor_last_seen_idx" ON "visitor_sessions" USING btree ("last_seen_at");