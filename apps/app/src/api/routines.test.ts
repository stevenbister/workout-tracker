import { client } from './client';
import { getRoutineGroups } from './routines';

afterEach(() => vi.resetAllMocks());

it('fetches routine groups from the API', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Routine Group 1' }] };
    vi.spyOn(client, 'get').mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        json: () => Promise.resolve(mockResponse),
    }));

    const result = await getRoutineGroups();
    expect(result).toEqual(mockResponse);
});
