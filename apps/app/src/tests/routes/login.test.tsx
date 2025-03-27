import { RouterProvider, createRouter } from '@tanstack/react-router';

import { type AuthClient, authClient } from '@repo/core/auth/client';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { ROUTES } from '@/constants';
import { Route as loginRoute } from '@/routes/login';

vi.mock('@tanstack/react-router', async (importOriginal) => ({
    ...(await importOriginal()),
    useSearch: vi.fn(),
}));

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        getSession: vi.fn(),
        useSession: vi.fn().mockReturnValue({ data: null, error: null }),
        signIn: {
            email: vi.fn(),
        },
    },
}));

type SetupOptions = {
    getSession: ReturnType<AuthClient['getSession']>;
};

const defaultSession = {
    data: null,
    error: null,
};

const router = createRouter({ routeTree: loginRoute });

const setup = async (options?: SetupOptions) => {
    vi.mocked(authClient.getSession).mockReturnValueOnce(
        options?.getSession ?? defaultSession
    );

    await router.navigate({
        to: ROUTES.LOGIN,
    });

    await waitFor(() => render(<RouterProvider router={router as never} />));
};

afterEach(() => vi.clearAllMocks());

it('renders the login route', async () => {
    await setup();

    expect(
        await screen.findByRole('heading', {
            name: 'Login',
        })
    ).toBeInTheDocument();
});

it('redirects the user to the root page if they are authenticated', async () => {
    await setup({
        getSession: {
            data: {
                session: {},
            },
            error: null,
        },
    });

    expect(window.location.pathname).toBe(ROUTES.ROOT);
});
