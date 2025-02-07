import type { Context, Next } from 'hono';

import { mockSession, mockUser } from '@/__mocks__/session';
import type { AppBindings } from '@/types';

import configureOpenAPI from './configure-open-api';
import { STATUS } from './constants/http-status-codes';
import createApp from './create-app';

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

vi.mock('@/middlewares/session', () => ({
    session: (c: Context<AppBindings, string, object>, next: Next) => {
        c.set('user', mockUser);
        c.set('session', mockSession);
        return next();
    },
}));

const app = createApp();
configureOpenAPI(app);

it('configures the /doc route', async () => {
    const res = await app.request('/doc');

    expect(res.status).toBe(STATUS.OK.CODE);

    const data = await res.json();
    expect(data).toEqual({
        info: {
            title: 'Workout Tracker API',
            version: '0.0.0',
        },
        openapi: '3.0.0',
        components: expect.anything(),
        paths: expect.anything(),
    });
});

it('configures the /reference route', async () => {
    const res = await app.request('/reference');

    expect(res.status).toBe(STATUS.OK.CODE);
});
