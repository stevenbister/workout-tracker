import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { exercise } from './exercise';
import { routine } from './routine';

export type RoutineExercise = typeof routineExercise.$inferSelect;
export type InsertRoutineExercise = typeof routineExercise.$inferInsert;

export const routineExercise = sqliteTable('routine_exercise', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    routineId: integer('routine_id')
        .notNull()
        .references(() => routine.id, { onDelete: 'cascade' }),
    exerciseId: integer('exercise_id')
        .notNull()
        .references(() => exercise.id, { onDelete: 'cascade' }),
    order: integer('order').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const routineExerciseSchema = createSelectSchema(routineExercise);

export const insertRoutineExerciseSchema = createInsertSchema(routineExercise);
