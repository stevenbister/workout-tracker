import { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { AppBindings } from '@/types';

import { index } from './index';

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
        c.set('user', null);
        c.set('session', null);
        return next();
    },
}));

const client = testClient(createApp().route('/', index));

beforeEach(() => vi.clearAllMocks());

test('GET /', async () => {
    const res = await client.index.$get();

    expect(res.status).toBe(STATUS.OK.CODE);

    if (res.status === STATUS.OK.CODE) {
        const data = await res.json();
        expect(data).toEqual({ message: 'Workout Tracker Index' });
    }
});
