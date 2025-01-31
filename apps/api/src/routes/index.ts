import { createRoute } from '@hono/zod-openapi';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';
import { createRouter } from '@/lib/create-app';
import { messageSchema } from '@/lib/schemas/message-schema';

const message = 'Workout Tracker Index';

export const index = createRouter().openapi(
    createRoute({
        tags: ['index'],
        method: 'get',
        path: '/',
        responses: {
            [STATUS_CODES.OK]: {
                content: {
                    'application/json': {
                        schema: messageSchema(message),
                    },
                },
                description: message,
            },
        },
    }),
    (c) => c.json({ message }, STATUS_CODES.OK)
);
