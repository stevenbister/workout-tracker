ALTER TABLE `routine_exercise` RENAME COLUMN "default_reps" TO "min_reps";--> statement-breakpoint
ALTER TABLE `routine_exercise` RENAME COLUMN "default_weight" TO "weight";--> statement-breakpoint
ALTER TABLE `routine_exercise` ADD `max_reps` integer DEFAULT 0 NOT NULL;