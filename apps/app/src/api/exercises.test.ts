import type { Response } from '@/tests/utils';
import { clientSpy } from '@/tests/utils';
import type { Exercise } from '@/types/api';

import { getExercise } from './exercises';

afterEach(() => vi.resetAllMocks());

describe('getExercise', () => {
    it('fetches a single exercise from the API', async () => {
        const mockResponse: Response<Exercise> = {
            data: {
                id: 1,
                name: 'Barbell Bench Press',
                howTo: 'mock how to',
                primaryMuscleGroups: ['chest'],
                secondaryMuscleGroups: ['triceps'],
            },
        };

        clientSpy(mockResponse);

        const result = await getExercise('1');
        console.log(result);

        expect(result).toEqual(mockResponse);
    });
});
