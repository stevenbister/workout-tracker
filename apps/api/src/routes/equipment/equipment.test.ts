import type { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { ALL_EQUIPMENT } from '@repo/core/constants/paths';

import { mockSession, mockUser } from '@/__mocks__/session';
import { testDB } from '@/db/test/test-adapter';
import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { session } from '@/middlewares/session';
import type { AppBindings, DrizzleD1 } from '@/types';

import { equipment } from './equipment.index';

vi.mock('@/middlewares/db-connect', () => ({
    dbConnect: (c: Context<AppBindings, string, object>, next: Next) => {
        c.set('db', testDB as unknown as DrizzleD1);
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

vi.mock('@/middlewares/session');

const client = testClient(createApp().route('/', equipment));
const getAllRoute = client.api.v1.equipment;

beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(session).mockImplementation(
        (c: Context<AppBindings, string, object>, next: Next) => {
            c.set('user', mockUser);
            c.set('session', mockSession);
            return next();
        }
    );
});

describe(ALL_EQUIPMENT, () => {
    it('returns list of muscle groups', async () => {
        const res = await getAllRoute.$get();
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                }),
            ])
        );
    });
});
