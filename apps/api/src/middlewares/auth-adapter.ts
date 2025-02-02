import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createMiddleware } from 'hono/factory';

import { hashPassword, verifyPassword } from '@/lib/auth/auth';
import { AppBindings } from '@/types';

export const authAdapter = createMiddleware<AppBindings>(async (c, next) => {
    c.set(
        'authAdapter',
        betterAuth({
            database: drizzleAdapter(c.get('db'), {
                provider: 'sqlite',
            }),
            baseURL: c.env.BASE_API_URL,
            emailAndPassword: {
                enabled: true,
                password: {
                    hash: hashPassword,
                    verify: verifyPassword,
                },
            },
        })
    );

    await next();
});
