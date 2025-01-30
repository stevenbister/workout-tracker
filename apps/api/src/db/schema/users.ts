import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable('users', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
});

export const usersSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users);
