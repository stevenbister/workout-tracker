import { seed } from '@/db/seed';
import { testDB } from '@/db/test/test-adapter';
import type { DrizzleD1 } from '@/types';

import { createExerciseMap } from './create-exercise-map';

const mockExercises = [
    {
        id: 1,
        name: 'Barbell Bench Press',
    },
    {
        id: 2,
        name: 'Barbell Deadlift',
    },
    {
        id: 3,
        name: 'Barbell Overhead Press',
    },
];

beforeAll(async () => await seed(testDB));

beforeEach(() => vi.resetAllMocks());

it('returns a map of exercises with muscle groups', async () => {
    const exerciseMap = await createExerciseMap(
        testDB as unknown as DrizzleD1,
        mockExercises
    );

    const entries = [...exerciseMap.entries()];

    expect(entries).toEqual(
        expect.arrayContaining([
            [
                expect.any(Number),
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
            ],
        ])
    );
});
