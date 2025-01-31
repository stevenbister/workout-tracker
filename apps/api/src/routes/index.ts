import { createRoute } from '@hono/zod-openapi';

import { STATUS } from '@/lib/constants/http-status-codes';
import { createRouter } from '@/lib/create-app';
import { messageSchema } from '@/lib/schemas/message-schema';

const message = 'Workout Tracker Index';

export const index = createRouter().openapi(
    createRoute({
        tags: ['index'],
        method: 'get',
        path: '/',
        responses: {
            [STATUS.OK.CODE]: {
                content: {
                    'application/json': {
                        schema: messageSchema(message),
                    },
                },
                description: message,
            },
        },
    }),
    (c) => c.json({ message }, STATUS.OK.CODE)
);
