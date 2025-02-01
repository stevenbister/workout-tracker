import { betterAuth } from 'better-auth';
import { DB, drizzleAdapter } from 'better-auth/adapters/drizzle';

export const authAdapter = (db: DB, baseURL: string) =>
    betterAuth({
        database: drizzleAdapter(db, {
            provider: 'sqlite',
        }),
        baseURL,
        emailAndPassword: {
            enabled: true,
        },
    });
