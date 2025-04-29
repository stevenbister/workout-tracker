import { client } from '@/api/client';

export type Response<T> = {
    data: T;
};

export const clientSpy = <T>(response: Response<T>) => {
    vi.spyOn(client, 'get').mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        json: () => Promise.resolve(response),
    }));
};
