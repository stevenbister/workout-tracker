ALTER TABLE `account` RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE `account` RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN "expires_at" TO "expiresAt";--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE `verification` RENAME COLUMN "expires_at" TO "expiresAt";--> statement-breakpoint
ALTER TABLE `verification` RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE `verification` RENAME COLUMN "updated_at" TO "updatedAt";