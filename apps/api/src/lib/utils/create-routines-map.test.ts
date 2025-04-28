import { testDB } from '@/db/test/test-adapter';
import type { DrizzleD1 } from '@/types';

import { type RoutineProps, createRoutinesMap } from './create-routines-map';

const mockDB = testDB as unknown as DrizzleD1;
const mockRoutines: RoutineProps[] = [
    {
        id: 1,
        name: 'Routine 1',
        description: 'Description 1',
        routineGroupId: 1,
    },
    {
        id: 1,
        name: 'Routine 1',
        description: 'Description 1',
        routineGroupId: 1,
    },
    {
        id: 2,
        name: 'Routine 2',
        description: 'Description 2',
        routineGroupId: 1,
    },
];

it('returns a map with routines and their exercises', async () => {
    const routineMap = await createRoutinesMap({
        db: mockDB,
        routines: mockRoutines,
    });

    expect(routineMap.size).toBe(2);
    expect(routineMap.get(mockRoutines[0]!.id)).toEqual({
        id: mockRoutines[0]!.id,
        name: mockRoutines[0]!.name,
        description: mockRoutines[0]!.description,
        routineGroupId: mockRoutines[0]!.routineGroupId,
        exercises: expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
            }),
        ]),
    });
});

it('returns sets as part of the exercises when requested', async () => {
    const routineMap = await createRoutinesMap({
        db: mockDB,
        routines: mockRoutines,
        includeSets: true,
    });

    expect(routineMap.size).toBe(2);
    expect(routineMap.get(mockRoutines[0]!.id)).toEqual({
        id: mockRoutines[0]!.id,
        name: mockRoutines[0]!.name,
        description: mockRoutines[0]!.description,
        routineGroupId: mockRoutines[0]!.routineGroupId,
        exercises: expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                restTime: expect.any(Number),
                sets: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        maxReps: expect.any(Number),
                        minReps: expect.any(Number),
                        setNumber: expect.any(Number),
                        weight: expect.any(Number),
                    }),
                ]),
            }),
        ]),
    });
});

it('handles routines with no exercises', async () => {
    const routines: RoutineProps[] = [
        {
            id: 3,
            name: 'Routine 3',
            description: 'Description 3',
            routineGroupId: 1,
        },
    ];

    const routineMap = await createRoutinesMap({ db: mockDB, routines });

    expect(routineMap.size).toBe(1);
    expect(routineMap.get(routines[0]!.id)).toEqual({
        id: routines[0]!.id,
        name: routines[0]!.name,
        description: routines[0]!.description,
        routineGroupId: routines[0]!.routineGroupId,
        exercises: [],
    });
});

it('handles an empty array of routines', async () => {
    const routines: RoutineProps[] = [];

    const routineMap = await createRoutinesMap({ db: mockDB, routines });

    expect(routineMap.size).toBe(0);
});
