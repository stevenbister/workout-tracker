import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';
import { render, waitFor } from '@testing-library/react';

import { type AuthClient, authClient } from '@repo/core/auth/client';

import { ROUTES } from '../../constants';
import { Route as _authenticatedRoute } from '../../routes/_authenticated';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        getSession: vi.fn(),
    },
}));

type SetupOptions = {
    getSession: ReturnType<AuthClient['getSession']>;
};

const setup = async (options: SetupOptions) => {
    vi.mocked(authClient.getSession).mockReturnValueOnce(options?.getSession);

    const router = createRouter({
        routeTree: _authenticatedRoute,
    }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));
};

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'root', '/');
    vi.clearAllMocks();
    vi.restoreAllMocks();
});

it('redirects unauthenticated users to the login page', async () => {
    await setup({
        getSession: {
            data: null,
            error: {
                status: 401,
            },
        },
    });

    expect(window.location.pathname).toBe(ROUTES.LOGIN);
});

it('redirects user back to the original page if they are authenticated', async () => {
    await setup({
        getSession: {
            data: {},
            error: null,
        },
    });

    expect(window.location.pathname).toBe(ROUTES.ROOT);
});
