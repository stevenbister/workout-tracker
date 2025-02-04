import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { exercise } from './exercise';
import { workout } from './workout';

// exercises performed in a workout
export type WorkoutExercise = typeof workoutExercise.$inferSelect;

export const workoutExercise = sqliteTable('workout_exercise', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    workoutId: integer('workout_id')
        .notNull()
        .references(() => workout.id),
    exerciseId: integer('exercise_id')
        .notNull()
        .references(() => exercise.id),
    order: integer('order').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const workoutExerciseSchema = createSelectSchema(workoutExercise);

export const insertWorkoutExerciseSchema = createInsertSchema(workoutExercise);
