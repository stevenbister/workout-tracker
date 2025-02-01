import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type Verification = typeof verification.$inferSelect;

export const verification = sqliteTable('verification', {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: integer({ mode: 'timestamp' }).notNull(),
    createdAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const verificationSchema = createSelectSchema(verification);

export const insertUserSchema = createInsertSchema(verification);
