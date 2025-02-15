import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { workoutExercise } from './workout-exercise';

export type WorkoutExerciseSet = typeof workoutExerciseSet.$inferSelect;

export const workoutExerciseSet = sqliteTable('workout_exercise_set', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    workoutExerciseId: integer('workout_exercise_id')
        .notNull()
        .references(() => workoutExercise.id, { onDelete: 'cascade' }),
    setNumber: integer('set_number').notNull().default(1),
    weight: real('weight').notNull().default(0),
    reps: integer('reps').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const workoutExerciseSetSchema = createSelectSchema(workoutExerciseSet);

export const insertWorkoutExerciseSetSchema =
    createInsertSchema(workoutExerciseSet);
