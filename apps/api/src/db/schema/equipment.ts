import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export type Equipment = typeof equipment.$inferSelect;
export type InsertEquipment = typeof equipment.$inferInsert;

export const equipment = sqliteTable('equipment', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text().notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const equipmentSchema = createSelectSchema(equipment);

export const insertEquipmentSchema = createInsertSchema(equipment);
