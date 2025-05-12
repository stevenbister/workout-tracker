import { RouterProvider, createRouter } from '@tanstack/react-router';

import { render, waitFor } from '@repo/ui/tests/utils';

import { client } from '@/api/client';

export type Response<T> = {
    data: T;
};

export const clientSpy = <T,>(response: Response<T>) => {
    vi.spyOn(client, 'get').mockImplementation(() => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        json: () => Promise.resolve(response),
    }));
};

export const mockRoute = async ({
    routeTree,
    route,
}: {
    routeTree: any;
    route: string;
}) => {
    const router = createRouter({ routeTree });

    await router.navigate({
        to: route,
    });

    await waitFor(() => render(<RouterProvider router={router as never} />));
};
