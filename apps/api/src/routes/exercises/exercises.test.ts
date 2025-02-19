import type { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { ALL_EXERCISES, EXERCISE_BY_ID } from '@repo/core/constants/paths';

import { mockApiKey, mockHeaders } from '@/__mocks__/headers';
import { mockSession, mockUser } from '@/__mocks__/session';
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

const client = testClient(createApp().route('/', exercises), {
    API_KEY: mockApiKey,
});
const getAllRoute = client.api.v1.exercises;
const getByIdRoute = client.api.v1.exercises[':id'];

type SetupOptions = {
    user?: typeof mockUser;
    session?: typeof mockSession;
    method?: 'post' | 'get';
};

const setup = (options?: SetupOptions) => {
    vi.mocked(session).mockImplementation(
        (c: Context<AppBindings, string, object>, next: Next) => {
            // @ts-expect-error -- only testing null here - normally wouldn't expect it
            c.set('user', options?.user ?? null);
            // @ts-expect-error -- only testing null here - normally wouldn't expect it
            c.set('session', options?.session ?? null);
            return next();
        }
    );
};

beforeEach(() => vi.resetAllMocks());

describe(ALL_EXERCISES, () => {
    it(`returns ${STATUS.UNAUTHORIZED.MESSAGE} if user is not logged in`, async () => {
        setup();
        const res = await getAllRoute.$get({ ...mockHeaders, query: {} });
        const data = await res.json();

        expect(res.status).toBe(STATUS.UNAUTHORIZED.CODE);

        expect(data).toEqual({
            message: STATUS.UNAUTHORIZED.MESSAGE,
        });
    });

    it('returns list of exercises', async () => {
        setup({
            user: mockUser,
            session: mockSession,
        });
        const res = await getAllRoute.$get({ ...mockHeaders, query: {} });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    equipment: expect.arrayContaining([expect.any(String)]),
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

    it('returns a number of items that match the limit', async () => {
        setup({
            user: mockUser,
            session: mockSession,
        });
        const res = await getAllRoute.$get({
            ...mockHeaders,
            query: {
                limit: '1',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);
        expect(data).toHaveLength(1);
    });

    it('returns an item with an index that matches the offset', async () => {
        setup({
            user: mockUser,
            session: mockSession,
        });
        const res = await getAllRoute.$get({
            ...mockHeaders,
            query: {
                limit: '1',
                offset: '4',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);
        expect(data[0]!.id).toBe(5);
    });
});

describe(EXERCISE_BY_ID, () => {
    it('returns a single item with an id that matches the param passed', async () => {
        setup({
            user: mockUser,
            session: mockSession,
        });
        const res = await getByIdRoute.$get({
            ...mockHeaders,
            param: {
                id: '1',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);
        expect(data).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                equipment: expect.arrayContaining([expect.any(String)]),
                primaryMuscleGroups: expect.arrayContaining([
                    expect.any(String),
                ]),
                secondaryMuscleGroups: expect.arrayContaining([
                    expect.any(String),
                ]),
            })
        );
    });
});
