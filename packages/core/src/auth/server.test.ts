import { betterAuth } from 'better-auth';
import type { DB } from 'better-auth/adapters/drizzle';

import { API_PREFIX } from '../constants/misc';
import { getAuth } from './server';

vi.mock('better-auth');

const mockDB: DB = {
    prepare: vi.fn(),
    dump: vi.fn(),
    batch: vi.fn(),
    exec: vi.fn(),
};

const mockOptions = {
    baseURL: 'https://example.com',
    hashFn: vi.fn(),
    verifyFn: vi.fn(),
    trustedOrigins: ['http://localhost:5173'],
    secret: 'secret',
};

it('calls betterAuth with correct options', async () => {
    getAuth(mockDB, mockOptions);

    expect(betterAuth).toHaveBeenNthCalledWith(1, {
        database: expect.any(Function),
        baseURL: mockOptions.baseURL,
        basePath: `${API_PREFIX}/auth`,
        secret: mockOptions.secret,
        trustedOrigins: mockOptions.trustedOrigins,
        session: {
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60,
            },
        },
        emailAndPassword: {
            enabled: true,
            password: {
                hash: mockOptions.hashFn,
                verify: mockOptions.verifyFn,
            },
        },
        rateLimit: {
            storage: 'database',
            modelName: 'rateLimit',
        },
        advanced: {
            crossSubDomainCookies: {
                enabled: true,
            },
        },
    });
});

it('throws error if DB is not provided', async () => {
    // @ts-expect-error - DB is required
    expect(() => getAuth(undefined, mockOptions)).toThrowError(
        'DB is required'
    );
});
