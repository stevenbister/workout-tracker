import { exercise, exerciseMuscleGroup, muscleGroup } from '@/db/schema';
import type { DrizzleD1, DrizzleSqlite } from '@/types';

import { equipment } from '../schema/equipment';
import { exerciseEquipment } from '../schema/exercise-equipment';
import { equipmentData } from './data/equipment';
import { exerciseData } from './data/exercise';
import { exerciseEquipmentData } from './data/exercise-equipment';
import { exerciseMuscleGroupData } from './data/exercise-muscle-group';
import { muscleGroupData } from './data/muscle-groups';

const schemas = [
    {
        schema: muscleGroup,
        data: muscleGroupData,
    },
    {
        schema: exercise,
        data: exerciseData,
    },
    {
        schema: exerciseMuscleGroup,
        data: exerciseMuscleGroupData,
    },
    {
        schema: equipment,
        data: equipmentData,
    },
    {
        schema: exerciseEquipment,
        data: exerciseEquipmentData,
    },
];

export const seed = async (db: DrizzleD1 | DrizzleSqlite) => {
    await clearTables(db);

    console.log('Seeding data 🌱');

    await insertData(db);

    console.log('Seeding complete 🌱');
};

const insertData = async (db: DrizzleD1 | DrizzleSqlite) => {
    for (const { schema, data } of schemas)
        await db.insert(schema).values(data);
};

export const clearTables = async (db: DrizzleD1 | DrizzleSqlite) => {
    console.log('Resetting tables 🗑️');

    for (const { schema } of schemas) await db.delete(schema);

    console.log('Tables reset 🗑️');
};
