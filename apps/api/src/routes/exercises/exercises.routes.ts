import { createRoute, z } from '@hono/zod-openapi';

import { EXERCISES } from '@repo/core/constants/paths';

import { exerciseSchema } from '@/db/schema/exercise';
import { STATUS } from '@/lib/constants/http-status-codes';
import { headersSchemaWithCookie } from '@/lib/schemas/headers-schema';
import { jsonContent } from '@/lib/utils/json-content';

const tags = ['exercises'];

const exerciseWithMuscleGroupsSchema = z.array(
    exerciseSchema
        .pick({
            id: true,
            name: true,
        })
        .merge(
            z.object({
                primaryMuscleGroups: z.array(z.string()),
                secondaryMuscleGroups: z.array(z.string()),
            })
        )
);

export const list = createRoute({
    path: EXERCISES,
    method: 'get',
    tags,
    request: {
        ...headersSchemaWithCookie,
        query: z.object({
            limit: z.string().optional(),
            offset: z.string().optional(),
        }),
    },
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            exerciseWithMuscleGroupsSchema,
            'List of all exercises'
        ),
    },
});

export const getById = createRoute({
    path: `${EXERCISES}/:id`,
    method: 'get',
    tags,
    request: headersSchemaWithCookie,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            exerciseWithMuscleGroupsSchema,
            'Singular exercise'
        ),
    },
});

export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
