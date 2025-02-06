import { exercise, exerciseMuscleGroup, muscleGroup } from '@/db/schema';
import { exerciseData } from '@/db/seed/data/exercise';
import { exerciseMuscleGroupData } from '@/db/seed/data/exercise-muscle-group';
import { muscleGroupData } from '@/db/seed/data/muscle-groups';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppRouteHandler } from '@/types';

import type { SeedRoute } from './seed.routes';

export const seed: AppRouteHandler<SeedRoute> = async (c) => {
    if (process.env.NODE_ENV === 'production')
        return c.json(
            { message: STATUS.NOT_FOUND.MESSAGE },
            STATUS.NOT_FOUND.CODE
        );

    // const CHUNK_SIZE = 10;

    // function chunkArray<T>(array: T[], size: number): T[][] {
    //     const chunks: T[][] = [];
    //     for (let i = 0; i < array.length; i += size) {
    //         chunks.push(array.slice(i, i + size));
    //     }
    //     return chunks;
    // }

    // async function processInChunks<T>(
    //     items: T[],
    //     chunkSize: number,
    //     processFn: (chunk: T[]) => Promise<void>
    // ) {
    //     const chunks = chunkArray(items, chunkSize);
    //     for (const chunk of chunks) {
    //         await processFn(chunk);
    //     }
    // }

    const db = c.get('db');

    console.log('Seeding data 🌱');

    console.log('Resetting tables...');
    await db.delete(muscleGroup);
    await db.delete(exercise);
    await db.delete(exerciseMuscleGroup);
    console.log('Tables reset');

    console.log('Creating muscles...');
    await db.insert(muscleGroup).values(muscleGroupData);
    console.log('Muscles created');

    console.log('Creating exercises...');
    await db.insert(exercise).values(exerciseData);
    console.log('Exercises created');

    console.log('Creating exercise muscles...');
    await db.insert(exerciseMuscleGroup).values(exerciseMuscleGroupData);
    console.log('Exercise muscles created');

    console.log('Seeding complete 🌱');

    return c.json({ message: 'Success' }, STATUS.OK.CODE);
};
