import type { Context, Next } from 'hono';
import { testClient } from 'hono/testing';

import {
    ALL_ROUTINES,
    CREATE_ROUTINE,
    ROUTINE_BY_ID,
} from '@repo/core/constants/paths';

import { mockSession, mockUser } from '@/__mocks__/session';
import { testDB } from '@/db/test/test-adapter';
import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { session } from '@/middlewares/session';
import type { AppBindings, DrizzleD1 } from '@/types';

import { routines } from './routines.index';
import type { InsertRoutineSchema } from './routines.routes';

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

const mockCreateRoutineInput: InsertRoutineSchema = {
    name: 'Mock workout',
    description: 'mock workout description',
    exercises: [
        {
            exerciseId: 1,
            order: 1,
            sets: [
                {
                    maxReps: 8,
                    minReps: 6,
                    setNumber: 1,
                    weight: 40,
                },
                {
                    maxReps: 8,
                    minReps: 6,
                    setNumber: 2,
                    weight: 40,
                },
            ],
        },
    ],
};

const client = testClient(createApp().route('/', routines));

const getAllRoute = client.api.v1.routines;
const getByIdRoute = client.api.v1.routines[':id'];
const createRoute = client.api.v1.routines.create;

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

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                    exercises: expect.arrayContaining([]),
                }),
            ])
        );
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

        expect(data).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                exercises: expect.arrayContaining([]),
            })
        );
    });
});

describe(CREATE_ROUTINE, () => {
    it('creates a new workout routine', async () => {
        const res = await createRoute.$post({
            json: mockCreateRoutineInput,
        });
        const data = await res.json();

        expect(res.status).toBe(STATUS.OK.CODE);

        const { name, description, exercises } = mockCreateRoutineInput;

        expect(data).toEqual({
            id: expect.any(Number),
            name,
            description,
            exercises: exercises.map(() => ({
                id: expect.any(Number),
                sets: expect.arrayContaining([
                    expect.objectContaining({
                        maxReps: expect.any(Number),
                        minReps: expect.any(Number),
                        setNumber: expect.any(Number),
                        weight: expect.any(Number),
                    }),
                ]),
            })),
        });
    });
});
