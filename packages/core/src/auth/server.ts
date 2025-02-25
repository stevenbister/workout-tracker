import { betterAuth } from 'better-auth';
import type { DB } from 'better-auth/adapters/drizzle';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { API_PREFIX } from '../constants/misc.js';

type Options = {
    baseURL: string;
    hashFn: (password: string) => Promise<string>;
    verifyFn: ({
        hash,
        password,
    }: {
        hash: string;
        password: string;
    }) => Promise<boolean>;
};

export const getAuth = (db: DB, options: Options) => {
    if (!db) throw new Error('DB is required');

    const { baseURL, hashFn: hash, verifyFn: verify } = options;

    return betterAuth({
        database: drizzleAdapter(db, {
            provider: 'sqlite',
        }),
        baseURL,
        basePath: `${API_PREFIX}/auth`,
        // TODO: env var here
        trustedOrigins: ['http://localhost:5173'],
        emailAndPassword: {
            enabled: true,
            password: {
                hash,
                verify,
            },
        },
        rateLimit: {
            storage: 'database',
            modelName: 'rateLimit',
        },
    });
};
