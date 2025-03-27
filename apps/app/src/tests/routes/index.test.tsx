import { RouterProvider, createRouter } from '@tanstack/react-router';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { Route as indexRoute } from '@/routes/_authenticated/index';

const router = createRouter({ routeTree: indexRoute });

afterEach(() => vi.clearAllMocks());

it('renders the index route', async () => {
    await router.navigate({
        to: '/',
    });

    await waitFor(() => render(<RouterProvider router={router as never} />));

    expect(screen.getByText('index')).toBeInTheDocument();
});
