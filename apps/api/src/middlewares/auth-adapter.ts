import { createMiddleware } from 'hono/factory';

import { getAuth } from '@repo/core/auth/server';

import { hashPassword, verifyPassword } from '@/lib/auth/auth';
import type { AppBindings } from '@/types';

export const authAdapter = createMiddleware<AppBindings>(async (c, next) => {
    c.set(
        'authAdapter',
        getAuth(c.get('db'), {
            baseURL: c.env.BASE_API_URL,
            hashFn: hashPassword,
            verifyFn: verifyPassword,
        })
    );

    await next();
});
