CREATE TABLE "editorial_action_attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"actor_id" text NOT NULL,
	"route" text NOT NULL,
	"attempted_at" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "editorial_attempt_actor_time_idx" ON "editorial_action_attempts" USING btree ("actor_id","attempted_at");