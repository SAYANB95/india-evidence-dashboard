CREATE TABLE "public_action_attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_hash" text NOT NULL,
	"route" text NOT NULL,
	"attempted_at" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "public_attempt_actor_time_idx" ON "public_action_attempts" USING btree ("actor_hash","attempted_at");