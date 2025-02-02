import bcrypt from 'bcryptjs';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createMiddleware } from 'hono/factory';

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
                    hash: async (password: string) => {
                        const salt = await bcrypt.genSalt(10);

                        return bcrypt.hash(password, salt);
                    },
                    verify: async ({ hash, password }) =>
                        await bcrypt.compare(password, hash),
                },
            },
        })
    );

    await next();
});
