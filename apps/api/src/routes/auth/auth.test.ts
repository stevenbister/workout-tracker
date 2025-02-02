import { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import createApp from '@/lib/create-app';
import { AppBindings } from '@/types';

import { authRouter } from './index';

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

const mockUser = {
    email: 'test@test.com',
    password: 'password1234',
    name: 'test',
};

const client = testClient(createApp().route('/', authRouter));
const route = client.api.v1.auth;

it('successfully creates a user', async () => {
    const res = await route['sign-up'].$post({
        json: mockUser,
    });

    console.log(res);
});
