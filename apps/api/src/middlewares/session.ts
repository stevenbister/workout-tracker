/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createMiddleware } from 'hono/factory';

import type { AppBindings } from '@/types';

export const session = createMiddleware<AppBindings>(async (c, next) => {
    const session = await c
        .get('authAdapter')
        .api.getSession({ headers: c.req.raw.headers });

    if (!session) {
        // @ts-ignore
        c.set('user', null);
        // @ts-ignore
        c.set('session', null);

        return next();
    }

    c.set('user', session.user);
    c.set('session', session.session);

    return next();
});
