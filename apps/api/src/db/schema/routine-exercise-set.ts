import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { routineExercise } from './routine-exercise';

export type RoutineExerciseSet = typeof routineExerciseSet.$inferSelect;
export type InsertRoutineExerciseSet = typeof routineExerciseSet.$inferInsert;

export const routineExerciseSet = sqliteTable('routine_exercise_set', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    routineExerciseId: integer('routine_exercise_id')
        .notNull()
        .references(() => routineExercise.id, { onDelete: 'cascade' }),
    setNumber: integer('set_number').notNull().default(1),
    minReps: integer('min_reps').notNull().default(0),
    maxReps: integer('max_reps').notNull().default(0),
    weight: real('weight').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const routineExerciseSetSchema = createSelectSchema(routineExerciseSet);

export const insertRoutineExerciseSetSchema =
    createInsertSchema(routineExerciseSet);
