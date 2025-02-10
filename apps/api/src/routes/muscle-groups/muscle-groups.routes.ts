import { createRoute, z } from '@hono/zod-openapi';

import { ALL_MUSCLE_GROUPS } from '@repo/core/constants/paths';

import { muscleGroupSchema } from '@/db/schema/muscle-group';
import { STATUS } from '@/lib/constants/http-status-codes';
import { jsonContent } from '@/lib/utils/jsonContent';

const tags = ['muscle-groups'];

export const list = createRoute({
    path: ALL_MUSCLE_GROUPS,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            z.array(
                muscleGroupSchema.pick({
                    id: true,
                    name: true,
                })
            ),
            'List of all muscle groups'
        ),
    },
});

export type ListRoute = typeof list;
