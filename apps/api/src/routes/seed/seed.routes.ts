import { createRoute } from '@hono/zod-openapi';

import { API_PREFIX } from '@repo/core/constants/misc';

import { STATUS } from '@/lib/constants/http-status-codes';
import { messageSchema } from '@/lib/schemas/message-schema';
import { jsonContent } from '@/lib/utils/json-content';

export const seed = createRoute({
    path: `${API_PREFIX}/seed`,
    method: 'get',
    tags: ['seed'],
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            messageSchema('Success'),
            'Seeds the database'
        ),
        [STATUS.NOT_FOUND.CODE]: jsonContent(
            messageSchema(STATUS.NOT_FOUND.MESSAGE),
            STATUS.NOT_FOUND.MESSAGE
        ),
    },
});

export type SeedRoute = typeof seed;
