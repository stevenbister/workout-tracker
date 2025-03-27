import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';

import { type AuthClient, authClient } from '@repo/core/auth/client';

import { render, waitFor } from '@repo/ui/tests/utils';

import { ROUTES } from '@/constants';
import { Route as logoutRoute } from '@/routes/logout';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        signOut: vi.fn(),
    },
}));

const defaultSession = {
    data: null,
    error: null,
};

type SetupOptions = {
    signOut: ReturnType<AuthClient['signOut']>;
};

const router = createRouter({ routeTree: logoutRoute }) as never;

const setup = async (options?: SetupOptions) => {
    vi.mocked(authClient.signOut).mockReturnValueOnce(
        options?.signOut ?? defaultSession
    );

    await waitFor(() => render(<RouterProvider router={router} />));
};

let history: RouterHistory;

beforeEach(() => {
    history = createBrowserHistory();
    history.destroy();
    window.history.replaceState(null, 'logout', ROUTES.LOGOUT);
});

afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
});

it('redirects unauthenticated users to the login page when logout is successful', async () => {
    await setup({
        signOut: {
            data: {
                success: true,
            },
            error: null,
        },
    });

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
});

it('redirects unauthenticated users to the login page if an error occurs', async () => {
    await setup({
        signOut: {
            data: null,
            error: {
                code: 'FAILED_TO_GET_SESSION',
            },
        },
    });

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
});
