ALTER TABLE `exercise_set` RENAME TO `workout_exercise_set`;--> statement-breakpoint
CREATE TABLE `routine_exercise_set` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`routine_exercise_id` integer NOT NULL,
	`set_number` integer DEFAULT 1 NOT NULL,
	`min_reps` integer DEFAULT 0 NOT NULL,
	`max_reps` integer DEFAULT 0 NOT NULL,
	`weight` real DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`routine_exercise_id`) REFERENCES `routine_exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_workout_exercise_set` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_exercise_id` integer NOT NULL,
	`set_number` integer DEFAULT 1 NOT NULL,
	`weight` real DEFAULT 0 NOT NULL,
	`reps` integer DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`workout_exercise_id`) REFERENCES `workout_exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_workout_exercise_set`("id", "workout_exercise_id", "set_number", "weight", "reps", "created_at", "updated_at") SELECT "id", "workout_exercise_id", "set_number", "weight", "reps", "created_at", "updated_at" FROM `workout_exercise_set`;--> statement-breakpoint
DROP TABLE `workout_exercise_set`;--> statement-breakpoint
ALTER TABLE `__new_workout_exercise_set` RENAME TO `workout_exercise_set`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `routine_exercise` DROP COLUMN `min_reps`;--> statement-breakpoint
ALTER TABLE `routine_exercise` DROP COLUMN `max_reps`;--> statement-breakpoint
ALTER TABLE `routine_exercise` DROP COLUMN `weight`;