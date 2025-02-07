import { exercise, exerciseMuscleGroup, muscleGroup } from '@/db/schema';
import type { DrizzleD1, DrizzleSqlite } from '@/types';

import { exerciseData } from './data/exercise';
import { exerciseMuscleGroupData } from './data/exercise-muscle-group';
import { muscleGroupData } from './data/muscle-groups';

export const seed = async (db: DrizzleD1 | DrizzleSqlite) => {
    console.log('Seeding data 🌱');

    await clearTables(db);

    await db.insert(muscleGroup).values(muscleGroupData);
    await db.insert(exercise).values(exerciseData);
    await db.insert(exerciseMuscleGroup).values(exerciseMuscleGroupData);

    console.log('Seeding complete 🌱');
};

export const clearTables = async (db: DrizzleD1 | DrizzleSqlite) => {
    console.log('Resetting tables 🗑️');
    const schemas = [muscleGroup, exercise, exerciseMuscleGroup];

    for (const schema of schemas) {
        await db.delete(schema);
    }
    console.log('Tables reset 🗑️');
};
