import { createRoute, z } from '@hono/zod-openapi';

import { ALL_ROUTINES, ROUTINE_BY_ID } from '@repo/core/constants/paths';

import { routineSchema } from '@/db/schema/routine';
import { STATUS } from '@/lib/constants/http-status-codes';
import { messageSchema } from '@/lib/schemas/message-schema';
import { jsonContent } from '@/lib/utils/jsonContent';

const tags = ['routines'];

const modifiedRoutineSchema = routineSchema.pick({
    id: true,
    name: true,
    description: true,
});

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

export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
