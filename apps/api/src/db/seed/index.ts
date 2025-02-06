import { exercise, exerciseMuscleGroup, muscleGroup } from '@/db/schema';
import type { DB } from '@/types';

import { exerciseData } from './data/exercise';
import { exerciseMuscleGroupData } from './data/exercise-muscle-group';
import { muscleGroupData } from './data/muscle-groups';

export const seed = async (db: DB) => {
    console.log('Seeding data 🌱');

    await clearTables(db);

    await db.insert(muscleGroup).values(muscleGroupData);
    await db.insert(exercise).values(exerciseData);
    await db.insert(exerciseMuscleGroup).values(exerciseMuscleGroupData);

    console.log('Seeding complete 🌱');
};

export const clearTables = async (db: DB) => {
    console.log('Resetting tables 🗑️');
    const schemas = [muscleGroup, exercise, exerciseMuscleGroup];

    for (const schema of schemas) {
        await db.delete(schema);
    }
    console.log('Tables reset 🗑️');
};
