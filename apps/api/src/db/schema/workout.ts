import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { routine } from './routine';
import { user } from './users';

// Individual workout session
export type Workout = typeof workout.$inferSelect;

export const workout = sqliteTable('workout', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    date: integer('date', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    duration: integer('duration', { mode: 'timestamp' }).notNull(),
    notes: text('notes'),
    routineId: integer('routine_id').references(() => routine.id, {
        onDelete: 'cascade',
    }),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const workoutSchema = createSelectSchema(workout);

export const insertWorkoutSchema = createInsertSchema(workout);
