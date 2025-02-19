import { createRoute, z } from '@hono/zod-openapi';

import { ALL_EQUIPMENT } from '@repo/core/constants/paths';

import { equipmentSchema } from '@/db/schema/equipment';
import { STATUS } from '@/lib/constants/http-status-codes';
import { headersSchema } from '@/lib/schemas/headers-schema';
import { jsonContent } from '@/lib/utils/json-content';

const tags = ['equipment'];

export const list = createRoute({
    path: ALL_EQUIPMENT,
    method: 'get',
    tags,
    request: headersSchema,
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
