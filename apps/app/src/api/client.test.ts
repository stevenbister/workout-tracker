import { client } from './client';

const mockResponseMessage = { message: 'mock response message' };

afterEach(() => vi.resetAllMocks());

it('fetches data', async () => {
    vi.spyOn(client, 'get').mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        json: () => Promise.resolve(mockResponseMessage),
    }));

    const json = await client.get('').json();

    expect(json).toEqual(mockResponseMessage);
});
