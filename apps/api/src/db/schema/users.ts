import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type User = typeof users.$inferSelect;

export const users = sqliteTable('users', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
});
