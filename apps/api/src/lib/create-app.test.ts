import { Context, Next, ValidationTargets } from 'hono';
import { ZodError } from 'zod';

import { AppBindings } from '@/types';

import { STATUS } from './constants/http-status-codes';
import createApp, { defaultHook } from './create-app';

vi.mock('@/middlewares/db-connect', () => ({
    dbConnect: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('db', vi.fn());
        return next();
    },
}));

vi.mock('@/middlewares/auth-adapter', () => ({
    authAdapter: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('authAdapter', vi.fn());
        return next();
    },
}));

type SetupOptions = {
    route?: string;
    throwError?: boolean;
};

const setup = async (options?: SetupOptions) => {
    const app = createApp();

    app.get('/', (c) => {
        const db = c.get('db');

        if (options?.throwError) {
            throw new Error('Error');
        }

        return c.json({ dbConnected: !!db });
    });

    const res = await app.request(options?.route ?? '/', {});

    return res;
};

beforeEach(() => vi.clearAllMocks());

it('sets up the dbConnect middleware', async () => {
    const res = await setup();

    expect(res.status).toBe(STATUS.OK.CODE);

    const data = await res.json();
    expect(data).toEqual({ dbConnected: true });
});

it('returns 404 for unknown routes', async () => {
    const res = await setup({
        route: '/unknown-route',
    });

    expect(res.status).toBe(STATUS.NOT_FOUND.CODE);

    const data = await res.json();
    expect(data).toEqual({
        message: `${STATUS.NOT_FOUND.MESSAGE} - /unknown-route`,
    });
});

it('returns error code when errors are thrown', async () => {
    const res = await setup({
        throwError: true,
    });

    expect(res.status).toBe(STATUS.INTERNAL_SERVER_ERROR.CODE);

    const data = await res.json();
    expect(data).toEqual({ message: 'Error', stack: expect.any(String) });
});

it('handles validation errors with defaultHook', async () => {
    const app = createApp();

    app.post('/test-validation', (c) => {
        const result: {
            target: keyof ValidationTargets;
            success: false;
            error: ZodError;
        } = {
            target: 'json',
            success: false,
            error: 'Validation error' as unknown as ZodError,
        };
        return defaultHook(result, c);
    });

    const res = await app.request('/test-validation', {
        method: 'POST',
    });

    expect(res.status).toBe(STATUS.UNPROCESSABLE_ENTITY.CODE);

    const data = await res.json();
    expect(data).toEqual({ success: false, error: 'Validation error' });
});
