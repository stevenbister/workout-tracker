import type { Routine, RoutineGroups } from '@/types/api';

import { client } from './client';
import { getRoutine, getRoutineGroups } from './routines';

type Response<T> = {
    data: T;
};

const clientSpy = <T>(response: Response<T>) => {
    vi.spyOn(client, 'get').mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        json: () => Promise.resolve(response),
    }));
};

afterEach(() => vi.resetAllMocks());

describe('getRoutineGroups', () => {
    it('fetches routine groups from the API', async () => {
        const mockResponse: Response<RoutineGroups> = {
            data: [{ id: 1, name: 'Routine Group 1', routines: [] }],
        };

        clientSpy(mockResponse);

        const result = await getRoutineGroups();
        expect(result).toEqual(mockResponse);
    });
});

describe('getRoutine', () => {
    it('fetches a single routine from the API', async () => {
        const mockResponse: Response<Routine> = {
            data: {
                id: 1,
                name: 'Routine 1',
                description: 'Routine 1 description',
                exercises: [],
            },
        };

        clientSpy(mockResponse);

        const result = await getRoutine('1');
        expect(result).toEqual(mockResponse);
    });
});
