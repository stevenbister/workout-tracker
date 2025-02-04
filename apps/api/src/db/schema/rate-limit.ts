import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type RateLimit = typeof rateLimit.$inferSelect;

export const rateLimit = sqliteTable('rate_limit', {
    id: text('id').primaryKey(),
    key: text('key'),
    count: integer('count'),
    lastRequest: integer('last_request'),
});

export const rateLimitSchema = createSelectSchema(rateLimit);

export const insertRateLimitSchema = createInsertSchema(rateLimit);
