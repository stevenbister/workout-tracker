import { Hook, OpenAPIHono } from '@hono/zod-openapi';

import { dbConnect } from '@/middlewares/db-connect';
import { notFound } from '@/middlewares/not-found';
import { onError } from '@/middlewares/on-error';
import type { AppBindings } from '@/types';

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
    // TODO: Add pino logger
    // app.use(pinoLogger());

    app.use(dbConnect);
    app.notFound(notFound);
    app.onError(onError);
    return app;
}
