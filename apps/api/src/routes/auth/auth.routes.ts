import { createRoute, z } from '@hono/zod-openapi';

import { STATUS } from '@/lib/constants/http-status-codes';
import { PREFIX } from '@/lib/constants/misc';
import { messageSchema } from '@/lib/schemas/message-schema';

const tags = ['auth'];

export const signUp = createRoute({
    tags,
    method: 'post',
    path: `${PREFIX}/auth/sign-up`,
    request: {
        // TODO: Add schema
        body: {
            content: {
                // TODO: Make a helper for application/json
                'application/json': {
                    schema: z
                        .object({
                            email: z.string().email(),
                            // TODO: need to get an error message out of this
                            password: z.string().min(8),
                            name: z.string(),
                        })
                        .openapi({
                            example: {
                                email: 'test@test.com',
                                password: 'password1234',
                                name: 'test',
                            },
                        }),
                },
            },
        },
    },
    responses: {
        [STATUS.OK.CODE]: {
            content: {
                'application/json': {
                    schema: messageSchema('Success'),
                },
            },
            description: 'Sign up a user',
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
