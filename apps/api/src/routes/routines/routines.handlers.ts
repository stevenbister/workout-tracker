import { and, eq } from 'drizzle-orm';

import { routine } from '@/db/schema/routine';
import {
    type InsertRoutineExercise,
    routineExercise,
} from '@/db/schema/routine-exercise';
import {
    type InsertRoutineExerciseSet,
    routineExerciseSet,
} from '@/db/schema/routine-exercise-set';
import { routineGroup } from '@/db/schema/routine-group';
import { user as userSchema } from '@/db/schema/users';
import { STATUS } from '@/lib/constants/http-status-codes';
import { createRoutinesMap } from '@/lib/utils/create-routines-map';
import type { AppRouteHandler } from '@/types';

import type {
    CreateRoute,
    GetByIdRoute,
    GroupsRoute,
    ListRoute,
} from './routines.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');

    const routines = await db
        .select({
            id: routine.id,
            name: routine.name,
            description: routine.description,
            routineGroupId: routine.routineGroupId,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
        .where(eq(userSchema.id, user?.id ?? ''));

    const routineMap = await createRoutinesMap({ db, routines });

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
            routineGroupId: routine.routineGroupId,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
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

    const routineMap = await createRoutinesMap({
        db,
        routines,
        includeSets: true,
    });

    const [result] = Array.from(routineMap.values());

    return c.json(result, STATUS.OK.CODE);
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
    >[] = exercises.map(({ exerciseId, order }) => ({
        exerciseId,
        order,
        routineId: newRoutine.id,
    }));

    const newRoutineExercise = await db
        .insert(routineExercise)
        .values(insertRoutineExercise)
        .returning();

    const insertSets: Omit<
        InsertRoutineExerciseSet,
        'id' | 'createdAt' | 'updatedAt'
    >[] = exercises.flatMap(({ exerciseId, sets }) => {
        const routineExerciseId = newRoutineExercise.find(
            (e) => e.exerciseId === exerciseId
        )!.id;

        return sets.map((set) => ({
            ...set,
            routineExerciseId,
        }));
    });

    const newSets = await db
        .insert(routineExerciseSet)
        .values(insertSets)
        .returning();

    return c.json(
        {
            id: newRoutine.id,
            name: newRoutine.name,
            description: newRoutine?.description,
            exercises: newRoutineExercise.map(({ id, restTime }) => ({
                id,
                restTime,
                sets: newSets
                    .filter((set) => set.routineExerciseId === id)
                    .map(({ id, maxReps, minReps, setNumber, weight }) => ({
                        id,
                        maxReps,
                        minReps,
                        setNumber,
                        weight,
                    })),
            })),
        },
        STATUS.OK.CODE
    );
};

export const groups: AppRouteHandler<GroupsRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');

    const routines = await db
        .select({
            id: routine.id,
            name: routine.name,
            description: routine.description,
            routineGroupId: routine.routineGroupId,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
        .where(eq(userSchema.id, user?.id ?? ''));

    const routineMap = await createRoutinesMap({ db, routines });

    const groups = await db
        .select({
            id: routineGroup.id,
            name: routineGroup.name,
        })
        .from(routineGroup);

    const routineGroups = groups.map(({ id, name }) => {
        return {
            id,
            name,
            routines: Array.from(routineMap.values()).filter(
                (r) => r.routineGroupId === id
            ),
        };
    });

    return c.json(routineGroups, STATUS.OK.CODE);
};
