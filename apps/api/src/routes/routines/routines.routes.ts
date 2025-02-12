import { createRoute, z } from '@hono/zod-openapi';

import {
    ALL_ROUTINES,
    CREATE_ROUTINE,
    ROUTINE_BY_ID,
} from '@repo/core/constants/paths';

import { insertRoutineSchema, routineSchema } from '@/db/schema/routine';
import {
    insertRoutineExerciseSchema,
    routineExerciseSchema,
} from '@/db/schema/routine-exercise';
import { STATUS } from '@/lib/constants/http-status-codes';
import { errorSchema } from '@/lib/schemas/error-schema';
import { messageSchema } from '@/lib/schemas/message-schema';
import { jsonContent } from '@/lib/utils/json-content';

const tags = ['routines'];

const modifiedRoutineSchema = routineSchema.pick({
    id: true,
    name: true,
    description: true,
});

const modifiedInsertRoutineSchema = insertRoutineSchema
    .pick({
        name: true,
        description: true,
    })
    .merge(
        z.object({
            exercises: z.array(
                insertRoutineExerciseSchema.pick({
                    exerciseId: true,
                    order: true,
                    defaultReps: true,
                    defaultWeight: true,
                })
            ),
        })
    );

export const list = createRoute({
    path: ALL_ROUTINES,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            z.array(modifiedRoutineSchema),
            'List of all routines by user'
        ),
    },
});

export const getById = createRoute({
    path: ROUTINE_BY_ID,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            modifiedRoutineSchema,
            'Singular routine'
        ),
        [STATUS.NOT_FOUND.CODE]: jsonContent(
            messageSchema(`${STATUS.NOT_FOUND.MESSAGE} - path/to/route`),
            'Routine not found'
        ),
    },
});

export const create = createRoute({
    path: CREATE_ROUTINE,
    method: 'post',
    tags,
    request: {
        body: jsonContent(
            modifiedInsertRoutineSchema,
            'The routine to create',
            true
        ),
    },
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            modifiedRoutineSchema.merge(
                z.object({
                    exercises: z.array(routineExerciseSchema),
                })
            ),
            'The created routine'
        ),
        [STATUS.NOT_IMPLEMENTED.CODE]: jsonContent(
            messageSchema('Unable to create new routine'),
            'Unable to create new routine'
        ),
        [STATUS.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
            errorSchema(modifiedInsertRoutineSchema),
            'The validation error(s)'
        ),
    },
});

export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
