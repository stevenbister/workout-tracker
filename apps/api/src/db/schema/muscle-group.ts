import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type MuscleGroup = typeof muscleGroup.$inferSelect;

export const muscleGroup = sqliteTable('muscle_group', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const muscleGroupSchema = createSelectSchema(muscleGroup);

export const insertMuscleGroupSchema = createInsertSchema(muscleGroup);
