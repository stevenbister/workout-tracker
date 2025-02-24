import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';

import { ROUTES } from '@/constants';
import { Route as indexRoute } from '@/routes/_authenticated/index';

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'root', ROUTES.ROOT);
    vi.clearAllMocks();
});

it('renders the index route', async () => {
    const router = createRouter({ routeTree: indexRoute, history }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));

    expect(screen.getByText('index')).toBeInTheDocument();
});
