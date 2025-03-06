import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';

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

const setup = async (options?: SetupOptions) => {
    vi.mocked(authClient.getSession).mockReturnValueOnce(
        options?.getSession ?? defaultSession
    );

    const router = createRouter({
        routeTree: loginRoute,
    }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));
};

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'login', ROUTES.LOGIN);
    vi.clearAllMocks();
});

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
                user: {},
            },
            error: null,
        },
    });

    expect(window.location.pathname).toBe(ROUTES.ROOT);
});
