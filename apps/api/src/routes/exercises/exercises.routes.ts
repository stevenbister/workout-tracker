import { createRoute, z } from '@hono/zod-openapi';

import { ALL_EXERCISES, EXERCISE_BY_ID } from '@repo/core/constants/paths';

import { exerciseSchema } from '@/db/schema/exercise';
import { STATUS } from '@/lib/constants/http-status-codes';
import { jsonContent } from '@/lib/utils/jsonContent';

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
    path: ALL_EXERCISES,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            exerciseWithMuscleGroupsSchema,
            'List of all exercises'
        ),
    },
});

export const getById = createRoute({
    path: EXERCISE_BY_ID,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            exerciseWithMuscleGroupsSchema,
            'Singular exercise'
        ),
    },
});

export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
