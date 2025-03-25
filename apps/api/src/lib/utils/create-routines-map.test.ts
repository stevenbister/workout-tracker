import type { Routine } from '@/db/schema/routine';
import { testDB } from '@/db/test/test-adapter';
import type { DrizzleD1 } from '@/types';

import { createRoutinesMap } from './create-routines-map';

const mockDB = testDB as unknown as DrizzleD1;
const mockRoutines: Pick<Routine, 'id' | 'name' | 'description'>[] = [
    {
        id: 1,
        name: 'Routine 1',
        description: 'Description 1',
    },
    {
        id: 1,
        name: 'Routine 1',
        description: 'Description 1',
    },
    {
        id: 2,
        name: 'Routine 2',
        description: 'Description 2',
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
        exercises: expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
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
    const routines: Pick<Routine, 'id' | 'name' | 'description'>[] = [
        {
            id: 3,
            name: 'Routine 3',
            description: 'Description 3',
        },
    ];

    const routineMap = await createRoutinesMap({ db: mockDB, routines });

    expect(routineMap.size).toBe(1);
    expect(routineMap.get(routines[0]!.id)).toEqual({
        id: routines[0]!.id,
        name: routines[0]!.name,
        description: routines[0]!.description,
        exercises: [],
    });
});

it('handles an empty array of routines', async () => {
    const routines: Pick<Routine, 'id' | 'name' | 'description'>[] = [];

    const routineMap = await createRoutinesMap({ db: mockDB, routines });

    expect(routineMap.size).toBe(0);
});
