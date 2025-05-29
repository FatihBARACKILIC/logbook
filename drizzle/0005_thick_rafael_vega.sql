ALTER TABLE "contents" ALTER COLUMN "season" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "contents" ALTER COLUMN "season" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contents" ALTER COLUMN "episode" SET NOT NULL;