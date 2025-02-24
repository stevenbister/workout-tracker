import type { RouterHistory } from '@tanstack/react-router';
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';

import { ROUTES } from '../../constants';
import { Route as loginRoute } from '../../routes/login';

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'login', ROUTES.LOGIN);
    vi.clearAllMocks();
});

it('renders the login route', async () => {
    const router = createRouter({ routeTree: loginRoute, history }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));

    expect(screen.getByText('login')).toBeInTheDocument();
});
