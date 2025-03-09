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
};

it('calls betterAuth with correct options', async () => {
    getAuth(mockDB, mockOptions);

    expect(betterAuth).toHaveBeenNthCalledWith(1, {
        database: expect.any(Function),
        baseURL: mockOptions.baseURL,
        basePath: `${API_PREFIX}/auth`,
        trustedOrigins: ['http://localhost:5173'],
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
    });
});

it('throws error if DB is not provided', async () => {
    // @ts-expect-error - DB is required
    expect(() => getAuth(undefined, mockOptions)).toThrowError(
        'DB is required'
    );
});
