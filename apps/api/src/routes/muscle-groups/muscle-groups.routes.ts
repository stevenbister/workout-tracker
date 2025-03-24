import { createRoute, z } from '@hono/zod-openapi';

import { MUSCLE_GROUPS } from '@repo/core/constants/paths';

import { muscleGroupSchema } from '@/db/schema/muscle-group';
import { STATUS } from '@/lib/constants/http-status-codes';
import { headersSchema } from '@/lib/schemas/headers-schema';
import { jsonContent } from '@/lib/utils/json-content';

const tags = ['muscle-groups'];

export const list = createRoute({
    path: MUSCLE_GROUPS,
    method: 'get',
    tags,
    request: headersSchema,
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
