import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { routineGroup } from './routine-group';
import { user } from './users';

export type Routine = typeof routine.$inferSelect;

export const routine = sqliteTable('routine', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    description: text(),
    routineGroupId: integer('routine_group_id').references(
        () => routineGroup.id,
        { onDelete: 'cascade' }
    ),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const routineSchema = createSelectSchema(routine);

export const insertRoutineSchema = createInsertSchema(routine);
