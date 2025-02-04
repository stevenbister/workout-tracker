import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type Exercise = typeof exercise.$inferSelect;

export const exercise = sqliteTable('exercise', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const exerciseSchema = createSelectSchema(exercise);

export const insertExerciseSchema = createInsertSchema(exercise);
