import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { user } from './users';

export type Session = typeof session.$inferSelect;

export const session = sqliteTable('session', {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => user.id),
    token: text().notNull(),
    expiresAt: integer({ mode: 'timestamp' }).notNull(),
    createdAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const sessionSchema = createSelectSchema(session);

export const insertSessionSchema = createInsertSchema(session);
