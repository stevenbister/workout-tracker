import { createMiddleware } from 'hono/factory';

import { getAuth } from '@repo/core/auth/server';

import { hashPassword, verifyPassword } from '@/lib/auth/auth';
import type { AppBindings } from '@/types';

export const authAdapter = createMiddleware<AppBindings>(async (c, next) => {
    c.set(
        'authAdapter',
        getAuth(c.get('db'), {
            baseURL: c.env.BASE_API_URL,
            secret: c.env.BETTER_AUTH_SECRET,
            hashFn: hashPassword,
            verifyFn: verifyPassword,
            trustedOrigins: [c.env.BASE_CLIENT_URL],
        })
    );

    await next();
});
