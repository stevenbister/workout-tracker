import bcrypt from 'bcryptjs';
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
            password: {
                hash: async (password: string) => {
                    const salt = await bcrypt.genSalt(10);

                    return bcrypt.hash(password, salt);
                },
                verify: async ({ hash, password }) =>
                    await bcrypt.compare(password, hash),
            },
        },
    });
