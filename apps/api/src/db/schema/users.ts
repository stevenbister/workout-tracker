import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type User = typeof user.$inferSelect;

export const user = sqliteTable('user', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: integer({ mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const usersSchema = createSelectSchema(user);

export const insertUserSchema = createInsertSchema(user);
