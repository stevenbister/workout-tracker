import { createMiddleware } from 'hono/factory';

import { authAdapter as auth } from '@repo/core/auth/server';

import { AppBindings } from '@/types';

export const authAdapter = createMiddleware<AppBindings>(async (c, next) => {
    c.set('authAdapter', auth(c.get('db'), c.env.BETTER_AUTH_URL));
    await next();
});
