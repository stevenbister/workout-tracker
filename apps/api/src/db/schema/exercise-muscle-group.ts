import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { exercise } from './exercise';
import { muscleGroup } from './muscle-group';

export type ExerciseMuscleGroup = typeof exerciseMuscleGroup.$inferSelect;
export type InsertExerciseMuscleGroup = typeof exerciseMuscleGroup.$inferInsert;

export const exerciseMuscleGroup = sqliteTable('exercise_muscle_group', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id')
        .notNull()
        .references(() => exercise.id, { onDelete: 'cascade' }),
    muscleGroupId: integer('muscle_group_id')
        .notNull()
        .references(() => muscleGroup.id, { onDelete: 'cascade' }),
    isPrimaryMuscleGroup: integer('is_primary_muscle_group', {
        mode: 'boolean',
    }),
});

export const exerciseMuscleGroupSchema =
    createSelectSchema(exerciseMuscleGroup);

export const insertExerciseMuscleGroupSchema =
    createInsertSchema(exerciseMuscleGroup);
