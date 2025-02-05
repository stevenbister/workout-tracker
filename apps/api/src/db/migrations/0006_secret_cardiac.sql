PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercise_muscle_group` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`muscle_group_id` integer NOT NULL,
	`is_primary_muscle_group` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`muscle_group_id`) REFERENCES `muscle_group`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_exercise_muscle_group`("id", "exercise_id", "muscle_group_id", "is_primary_muscle_group") SELECT "id", "exercise_id", "muscle_group_id", "is_primary_muscle_group" FROM `exercise_muscle_group`;--> statement-breakpoint
DROP TABLE `exercise_muscle_group`;--> statement-breakpoint
ALTER TABLE `__new_exercise_muscle_group` RENAME TO `exercise_muscle_group`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_exercise_set` (
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
INSERT INTO `__new_exercise_set`("id", "workout_exercise_id", "set_number", "weight", "reps", "created_at", "updated_at") SELECT "id", "workout_exercise_id", "set_number", "weight", "reps", "created_at", "updated_at" FROM `exercise_set`;--> statement-breakpoint
DROP TABLE `exercise_set`;--> statement-breakpoint
ALTER TABLE `__new_exercise_set` RENAME TO `exercise_set`;--> statement-breakpoint
CREATE TABLE `__new_routine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`routine_group_id` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`routine_group_id`) REFERENCES `routine_group`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_routine`("id", "user_id", "name", "description", "routine_group_id", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "routine_group_id", "created_at", "updated_at" FROM `routine`;--> statement-breakpoint
DROP TABLE `routine`;--> statement-breakpoint
ALTER TABLE `__new_routine` RENAME TO `routine`;--> statement-breakpoint
CREATE TABLE `__new_routine_exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`routine_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` integer NOT NULL,
	`default_reps` integer DEFAULT 0 NOT NULL,
	`default_weight` real DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routine`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_routine_exercise`("id", "routine_id", "exercise_id", "order", "default_reps", "default_weight", "created_at", "updated_at") SELECT "id", "routine_id", "exercise_id", "order", "default_reps", "default_weight", "created_at", "updated_at" FROM `routine_exercise`;--> statement-breakpoint
DROP TABLE `routine_exercise`;--> statement-breakpoint
ALTER TABLE `__new_routine_exercise` RENAME TO `routine_exercise`;--> statement-breakpoint
CREATE TABLE `__new_workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`date` integer,
	`duration` integer NOT NULL,
	`notes` text,
	`routine_id` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`routine_id`) REFERENCES `routine`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_workout`("id", "user_id", "date", "duration", "notes", "routine_id", "created_at", "updated_at") SELECT "id", "user_id", "date", "duration", "notes", "routine_id", "created_at", "updated_at" FROM `workout`;--> statement-breakpoint
DROP TABLE `workout`;--> statement-breakpoint
ALTER TABLE `__new_workout` RENAME TO `workout`;--> statement-breakpoint
CREATE TABLE `__new_workout_exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`order` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_workout_exercise`("id", "workout_id", "exercise_id", "order", "created_at", "updated_at") SELECT "id", "workout_id", "exercise_id", "order", "created_at", "updated_at" FROM `workout_exercise`;--> statement-breakpoint
DROP TABLE `workout_exercise`;--> statement-breakpoint
ALTER TABLE `__new_workout_exercise` RENAME TO `workout_exercise`;