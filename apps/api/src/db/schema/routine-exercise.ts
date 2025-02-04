import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { exercise } from './exercise';
import { routine } from './routine';

export type RoutinrExercise = typeof routineExercise.$inferSelect;

export const routineExercise = sqliteTable('routine_exercise', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    routineId: integer('routine_id')
        .notNull()
        .references(() => routine.id),
    exerciseId: integer('exercise_id')
        .notNull()
        .references(() => exercise.id),
    order: integer('order').notNull(),
    defaultReps: integer('default_reps').notNull().default(0),
    defaultWeight: real('default_weight').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const routineExerciseSchema = createSelectSchema(routineExercise);

export const insertRoutinrExerciseSchema = createInsertSchema(routineExercise);
