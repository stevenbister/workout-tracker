import { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { STATUS } from '@/lib/constants/http-status-codes';
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

const mockSignUpEmail = vi.fn().mockResolvedValue({
    status: 'success',
    data: {
        user: {
            id: '123',
            email: 'test@test.com',
            name: 'test',
        },
    },
});

vi.mock('@/middlewares/auth-adapter', () => ({
    authAdapter: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('authAdapter', {
            api: {
                signUpEmail: mockSignUpEmail,
            },
        });
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

describe('sign-up', () => {
    it('successfully creates a user', async () => {
        const res = await route['sign-up'].$post({
            json: mockUser,
        });

        expect(mockSignUpEmail).toHaveBeenCalledWith({
            body: mockUser,
        });

        expect(res.status).toBe(STATUS.OK.CODE);

        const data = await res.json();

        expect(data).toEqual({
            status: 'success',
            data: {
                user: {
                    id: '123',
                    email: mockUser.email,
                    name: mockUser.name,
                },
            },
        });
    });
});
