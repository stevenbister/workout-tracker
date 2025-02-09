import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { equipment } from './equipment';
import { exercise } from './exercise';

export type ExerciseEquipment = typeof exerciseEquipment.$inferSelect;
export type InsertExerciseEquipment = typeof exerciseEquipment.$inferInsert;

export const exerciseEquipment = sqliteTable('exercise_equipment', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    exerciseId: integer('exercise_id')
        .notNull()
        .references(() => exercise.id, { onDelete: 'cascade' }),
    equipmentId: integer('equipment_id')
        .notNull()
        .references(() => equipment.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const exerciseEquipmentSchema = createSelectSchema(exerciseEquipment);

export const insertExerciseEquipmentSchema =
    createInsertSchema(exerciseEquipment);
