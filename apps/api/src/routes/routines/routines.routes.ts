import { createRoute, z } from '@hono/zod-openapi';

import { ALL_ROUTINES } from '@repo/core/constants/paths';

import { routineSchema } from '@/db/schema/routine';
import { STATUS } from '@/lib/constants/http-status-codes';
import { jsonContent } from '@/lib/utils/jsonContent';

const tags = ['routines'];

export const list = createRoute({
    path: ALL_ROUTINES,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            z.array(
                routineSchema.pick({
                    id: true,
                    name: true,
                    description: true,
                })
            ),
            'List of all routines by user'
        ),
    },
});

export type ListRoute = typeof list;
