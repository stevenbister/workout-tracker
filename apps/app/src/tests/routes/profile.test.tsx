import { RouterProvider, createRouter } from '@tanstack/react-router';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { ROUTES } from '@/constants';
import { Route } from '@/routes/_authenticated/profile';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        getSession: vi.fn(),
    },
}));

const router = createRouter({ routeTree: Route });

const setup = async () => {
    await router.navigate({
        to: ROUTES.PROFILE,
    });

    await waitFor(() => render(<RouterProvider router={router as never} />));
};

afterEach(() => vi.restoreAllMocks());

it('renders the profile route', async () => {
    await setup();

    expect(
        screen.getByText('Hello /_authenticated/profile!')
    ).toBeInTheDocument();
});
