import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { user } from './users';

export type Account = typeof account.$inferSelect;

export const account = sqliteTable('account', {
    id: text().primaryKey(),
    userId: text()
        .notNull()
        .references(() => user.id),
    accountId: text().notNull(),
    providerId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    accessTokenExpiresAt: integer({ mode: 'timestamp' }),
    refreshTokenExpiresAt: integer({ mode: 'timestamp' }),
    scope: text(),
    idToken: text(),
    password: text(),
    createdAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: integer({ mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const accountSchema = createSelectSchema(account);

export const insertAccountSchema = createInsertSchema(account);
