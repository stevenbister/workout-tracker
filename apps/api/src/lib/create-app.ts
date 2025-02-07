import type { Hook } from '@hono/zod-openapi';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';

import { authAdapter } from '@/middlewares/auth-adapter';
import { dbConnect } from '@/middlewares/db-connect';
import { notFound } from '@/middlewares/not-found';
import { onError } from '@/middlewares/on-error';
import { session } from '@/middlewares/session';
import type { AppBindings } from '@/types';

import { checkIsAuthenticated } from '@/middlewares/check-is-authenticated';
import { AUTH } from '@repo/core/constants/paths';
import { except } from 'hono/combine';
import { secureHeaders } from 'hono/secure-headers';
import { STATUS } from './constants/http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultHook: Hook<any, any, any, any> = async (result, c) => {
    if (!result.success) {
        const { success, error } = result;

        return c.json(
            {
                success,
                error,
            },
            STATUS.UNPROCESSABLE_ENTITY.CODE
        );
    }
};

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    });
}

export default function createApp() {
    const app = createRouter();

    app.use(
        cors({
            // TODO: Update process.env references
            origin: (_, c) =>
                process.env.NODE_ENV === 'test' ? '' : c.env.BASE_CLIENT_URL,
            allowHeaders: ['Content-Type', 'Authorization'],
            allowMethods: ['POST', 'GET', 'OPTIONS'],
            exposeHeaders: ['Content-Length'],
            maxAge: 600,
            credentials: true,
        })
    );

    app.use(
        csrf({
            origin: (_, c) =>
                process.env.NODE_ENV === 'test'
                    ? 'http://localhost'
                    : c.env.BASE_CLIENT_URL,
        })
    );

    app.use(secureHeaders())

    app.use(dbConnect);
    app.use(authAdapter);

    app.use(session);

    app.use(logger());

    app.use("*", except(`${AUTH}/*`, checkIsAuthenticated));

    app.notFound(notFound);
    app.onError(onError);

    return app;
}
