import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';

import { Route as loginRoute } from '../../routes/(auth)/login';

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'login', '/login');
    vi.clearAllMocks();
});

it('renders the login route', async () => {
    const router = createRouter({ routeTree: loginRoute, history }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));

    expect(screen.getByText('login')).toBeInTheDocument();
});
