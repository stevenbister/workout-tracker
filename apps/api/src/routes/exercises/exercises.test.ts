import type { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { GET_ALL_EXERCISES } from '@repo/core/constants/paths';

import { mockSession, mockUser } from '@/__mocks__/session';
import { seed } from '@/db/seed';
import { testDB } from '@/db/test/test-adapter';
import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { session } from '@/middlewares/session';
import type { AppBindings, DrizzleD1 } from '@/types';

import { exercises } from './exercises.index';

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

const client = testClient(createApp().route('/', exercises));
const route = client.api.v1.exercises;

type SetupOptions = {
    user?: typeof mockUser;
    session?: typeof mockSession;
    method?: 'post' | 'get';
};

const setup = async (options?: SetupOptions) => {
    vi.mocked(session).mockImplementation(
        (c: Context<AppBindings, string, object>, next: Next) => {
            c.set('user', options?.user ?? null);
            c.set('session', options?.session ?? null);
            return next();
        }
    );

    const res = await route.$get();
    const data = await res.json();

    return {
        res,
        data,
    };
};

beforeAll(async () => await seed(testDB));

beforeEach(() => vi.resetAllMocks());

describe(GET_ALL_EXERCISES, () => {
    it(`returns ${STATUS.UNAUTHORIZED.MESSAGE} if user is not logged in`, async () => {
        const { res, data } = await setup();

        expect(res.status).toBe(STATUS.UNAUTHORIZED.CODE);

        expect(data).toEqual({
            message: STATUS.UNAUTHORIZED.MESSAGE,
        });
    });

    it('returns list of exercises', async () => {
        const { res, data } = await setup({
            user: mockUser,
            session: mockSession,
        });

        expect(res.status).toBe(STATUS.OK.CODE);

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    primaryMuscleGroups: expect.arrayContaining([
                        expect.any(String),
                    ]),
                    secondaryMuscleGroups: expect.arrayContaining([
                        expect.any(String),
                    ]),
                }),
            ])
        );
    });
});
