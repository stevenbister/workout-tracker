import type { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import { ALL_ROUTINES, ROUTINE_BY_ID } from '@repo/core/constants/paths';

import { mockSession, mockUser } from '@/__mocks__/session';
import type { Routine } from '@/db/schema/routine';
import { routineData } from '@/db/seed/data/routine';
import { testDB } from '@/db/test/test-adapter';
import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { session } from '@/middlewares/session';
import type { AppBindings, DrizzleD1 } from '@/types';

import { routines } from './routines.index';

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

const mockRoutineData: Partial<Routine>[] = routineData
    .filter(({ userId }) => userId === mockUser!.id)
    .map(({ id, name, description }) => ({
        id,
        name,
        description,
    }));

const client = testClient(createApp().route('/', routines));
const getAllRoute = client.api.v1.routines;
const getByIdRoute = client.api.v1.routines[':id'];

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

describe(ALL_ROUTINES, () => {
    it('returns list of routines linked to the current user', async () => {
        const res = await getAllRoute.$get();
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);

        expect(data).toEqual(mockRoutineData);
    });
});

describe(ROUTINE_BY_ID, () => {
    it('returns a single routine by its id', async () => {
        const res = await getByIdRoute.$get({
            param: {
                id: '1',
            },
        });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);

        expect(data).toEqual(mockRoutineData[0]);
    });
});
