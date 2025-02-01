import { createRoute } from '@hono/zod-openapi';

import { STATUS } from '@/lib/constants/http-status-codes';
import { PREFIX } from '@/lib/constants/misc';
import { messageSchema } from '@/lib/schemas/message-schema';

const tags = ['auth'];

export const signUp = createRoute({
    tags,
    method: 'get',
    path: `${PREFIX}/auth/sign-up`,
    responses: {
        [STATUS.OK.CODE]: {
            content: {
                'application/json': {
                    schema: messageSchema('test'),
                },
            },
            description: 'test',
        },
    },
});

export const signIn = createRoute({
    tags,
    method: 'get',
    path: `${PREFIX}/auth/sign-in`,
    responses: {
        [STATUS.OK.CODE]: {
            content: {
                'application/json': {
                    schema: messageSchema('test'),
                },
            },
            description: 'test',
        },
    },
});

export const signOut = createRoute({
    tags,
    method: 'get',
    path: `${PREFIX}/auth/sign-out`,
    responses: {
        [STATUS.OK.CODE]: {
            content: {
                'application/json': {
                    schema: messageSchema('test'),
                },
            },
            description: 'test',
        },
    },
});

export type SignUpRoute = typeof signUp;
export type SignInRoute = typeof signIn;
export type SignOutRoute = typeof signOut;
