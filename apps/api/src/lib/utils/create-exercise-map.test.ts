import { seed } from '@/db/seed';
import { testDB } from '@/db/test/test-adapter';
import type { DrizzleD1 } from '@/types';

import { type ExerciseNoDates, createExerciseMap } from './create-exercise-map';

const mockExercises: ExerciseNoDates[] = [
    {
        id: 1,
        name: 'Barbell Bench Press',
        howTo: '',
    },
    {
        id: 2,
        name: 'Barbell Deadlift',
        howTo: '',
    },
    {
        id: 3,
        name: 'Barbell Overhead Press',
        howTo: '',
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
                    howTo: expect.any(String),
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
