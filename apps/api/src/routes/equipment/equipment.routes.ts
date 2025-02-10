import { createRoute, z } from '@hono/zod-openapi';

import { ALL_EQUIPMENT } from '@repo/core/constants/paths';

import { equipmentSchema } from '@/db/schema/equipment';
import { STATUS } from '@/lib/constants/http-status-codes';
import { jsonContent } from '@/lib/utils/jsonContent';

const tags = ['equipment'];

export const list = createRoute({
    path: ALL_EQUIPMENT,
    method: 'get',
    tags,
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            z.array(
                equipmentSchema.pick({
                    id: true,
                    name: true,
                })
            ),
            'List of all equipment'
        ),
    },
});

export type ListRoute = typeof list;
