import { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';
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

const client = testClient(createApp().route('/', index));

beforeEach(() => vi.clearAllMocks());

test('GET /', async () => {
    const res = await client.index.$get();

    expect(res.status).toBe(STATUS_CODES.OK);

    if (res.status === STATUS_CODES.OK) {
        const data = await res.json();
        expect(data).toEqual({ message: 'Workout Tracker Index' });
    }
});
