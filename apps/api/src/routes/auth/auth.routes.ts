import { createRoute, z } from '@hono/zod-openapi';

import { STATUS } from '@/lib/constants/http-status-codes';
import { PREFIX } from '@/lib/constants/misc';
import { messageSchema } from '@/lib/schemas/message-schema';
import { jsonContent } from '@/lib/utils/jsonContent';

const tags = ['auth'];

export const signUp = createRoute({
    tags,
    method: 'post',
    path: `${PREFIX}/auth/sign-up`,
    request: {
        body: jsonContent(
            z
                .object({
                    email: z.string().email(),
                    password: z.string().min(8),
                    name: z.string().optional().default(''),
                })
                .openapi({
                    example: {
                        email: 'test@test.com',
                        password: 'password1234',
                        name: 'test',
                    },
                }),
            'The user to create'
        ),
    },
    responses: {
        [STATUS.OK.CODE]: jsonContent(
            z
                .object({
                    token: z.string().nullable(),
                    user: z.object({
                        id: z.string(),
                        email: z.string(),
                        name: z.string(),
                        image: z.string().nullable().optional(),
                        emailVerified: z.boolean(),
                        createdAt: z.string(),
                        updatedAt: z.string(),
                    }),
                })
                .openapi({
                    example: {
                        token: 'P3MNgjanZJ9JINj28nJfrsyUfLe6oUAP',
                        user: {
                            id: 'tfKg9riejdFHq5kEEGgxaG9vVrXlylWA',
                            email: 'test@test.com',
                            name: 'test',
                            image: null,
                            emailVerified: false,
                            createdAt: '2025-02-02T16:01:54.000Z',
                            updatedAt: '2025-02-02T16:01:54.000Z',
                        },
                    },
                }),
            'Successfully created user'
        ),
        [STATUS.UNPROCESSABLE_ENTITY.CODE]: jsonContent(
            z.object({
                success: z.boolean().openapi({
                    example: false,
                }),
                error: z.object({
                    issues: z.array(
                        z.object({
                            code: z.string(),
                            path: z.array(z.union([z.string(), z.number()])),
                            message: z.string().optional(),
                        })
                    ),
                    name: z.string(),
                }),
            }),
            'Validation error(s)'
        ),
        [STATUS.INTERNAL_SERVER_ERROR.CODE]: jsonContent(
            z.object({
                message: z.string(),
                stack: z.object({}),
            }),
            'Error'
        ),
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
