import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type RoutineGroup = typeof routineGroup.$inferSelect;

export const routineGroup = sqliteTable('routine_group', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const routineGroupSchema = createSelectSchema(routineGroup);

export const insertRoutineGroupSchema = createInsertSchema(routineGroup);
