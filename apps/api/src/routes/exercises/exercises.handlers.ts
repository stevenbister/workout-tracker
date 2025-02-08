import { eq } from 'drizzle-orm';

import { exercise } from '@/db/schema';
import { createExerciseMap } from '@/lib/utils/create-exercise-map';
import type { AppRouteHandler } from '@/types';

import type { GetByIdRoute, ListRoute } from './exercises.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');
    const { limit, offset } = c.req.query();

    const exercises = await db
        .select({
            id: exercise.id,
            name: exercise.name,
        })
        .from(exercise)
        .limit(parseInt(limit ?? ''))
        .offset(parseInt(offset ?? ''));

    const exercisesMap = await createExerciseMap(db, exercises);

    return c.json([...exercisesMap.values()]);
};

export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
    const db = c.get('db');
    const { id } = c.req.param();

    const exercises = await db
        .select()
        .from(exercise)
        .where(eq(exercise.id, parseInt(id)));

    const exercisesMap = await createExerciseMap(db, exercises);

    return c.json([...exercisesMap.values()]);
};
