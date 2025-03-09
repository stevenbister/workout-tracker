import {
    type RouterHistory,
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from '@tanstack/react-router';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { ROUTES } from '@/constants';
import { Route } from '@/routes/_authenticated/workouts';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        getSession: vi.fn(),
    },
}));

const setup = async () => {
    const router = createRouter({
        routeTree: Route,
    }) as never;

    await waitFor(() => render(<RouterProvider router={router} />));
};

let history: RouterHistory;

beforeEach(() => (history = createBrowserHistory()));

afterEach(() => {
    history.destroy();
    window.history.replaceState(null, 'root', ROUTES.WORKOUTS);
    vi.clearAllMocks();
    vi.restoreAllMocks();
});

it('renders the workout route', async () => {
    await setup();

    expect(
        screen.getByText('Hello /_authenticated/workouts!')
    ).toBeInTheDocument();
});
