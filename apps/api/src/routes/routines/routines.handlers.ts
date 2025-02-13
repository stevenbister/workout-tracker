import { and, eq } from 'drizzle-orm';

import { routine } from '@/db/schema/routine';
import {
    type InsertRoutineExercise,
    routineExercise,
} from '@/db/schema/routine-exercise';
import { user as userSchema } from '@/db/schema/users';
import { STATUS } from '@/lib/constants/http-status-codes';
import { createRoutinesMap } from '@/lib/utils/create-routines-map';
import type { AppRouteHandler } from '@/types';

import type { CreateRoute, GetByIdRoute, ListRoute } from './routines.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');

    const routines = await db
        .select({
            id: routine.id,
            name: routine.name,
            description: routine.description,
            exercises: routineExercise,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
        .leftJoin(routineExercise, eq(routine.id, routineExercise.routineId))
        .where(eq(userSchema.id, user?.id ?? ''));

    const routineMap = await createRoutinesMap(routines);

    const result = Array.from(routineMap.values());

    return c.json(result, STATUS.OK.CODE);
};

export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');
    const { id } = c.req.param();

    const routines = await db
        .select({
            id: routine.id,
            name: routine.name,
            description: routine.description,
            exercises: routineExercise,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
        .leftJoin(routineExercise, eq(routine.id, routineExercise.routineId))
        .where(
            and(eq(userSchema.id, user?.id ?? ''), eq(routine.id, parseInt(id)))
        );

    if (routines.length === 0)
        return c.json(
            {
                message: `${STATUS.NOT_FOUND.MESSAGE} - ${c.req.path}`,
            },
            STATUS.NOT_FOUND.CODE
        );

    const routineMap = await createRoutinesMap(routines);

    const result = Array.from(routineMap.values());

    return c.json(result[0], STATUS.OK.CODE);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');
    const body = c.req.valid('json');

    const { name, description, exercises } = body;

    const [newRoutine] = await db
        .insert(routine)
        .values({
            userId: user.id,
            name,
            description,
        })
        .returning();

    if (!newRoutine) {
        return c.json(
            {
                message: 'Unable to create new routine',
            },
            STATUS.NOT_IMPLEMENTED.CODE
        );
    }

    const insertRoutineExercise: Omit<
        InsertRoutineExercise,
        'id' | 'createdAt' | 'updatedAt'
    >[] = exercises.map((exercise) => ({
        ...exercise,
        routineId: newRoutine.id,
    }));

    const newRoutineExercise = await db
        .insert(routineExercise)
        .values(insertRoutineExercise)
        .returning();

    return c.json(
        {
            id: newRoutine.id,
            name: newRoutine.name,
            description: newRoutine?.description,
            exercises: newRoutineExercise,
        },
        STATUS.OK.CODE
    );
};
