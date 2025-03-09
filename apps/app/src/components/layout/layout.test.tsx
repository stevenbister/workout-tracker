import {
    RouterProvider,
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router';

import { type AuthClient, authClient } from '@repo/core/auth/client';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { Layout } from './layout';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        useSession: vi.fn(),
    },
}));

type SetupOptions = {
    useSession: ReturnType<AuthClient['useSession']>;
};

const defaultSession = {
    data: null,
    error: null,
} as SetupOptions['useSession'];

const mockRootRoute = createRootRoute();
const mockRoute = createRoute({
    path: '/test',
    getParentRoute: () => mockRootRoute,
});
mockRootRoute.addChildren([mockRoute]);

const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/test'] }),
    routeTree: mockRootRoute,
}) as never;

const setup = async (options?: SetupOptions) => {
    vi.mocked(authClient.useSession).mockReturnValueOnce(
        options?.useSession ?? defaultSession
    );

    return await waitFor(() =>
        render(
            <RouterProvider
                router={router}
                defaultComponent={() => (
                    <Layout>
                        <div>Test</div>
                    </Layout>
                )}
            />
        )
    );
};

it('renders the layout with children', () => {
    setup();

    expect(screen.getByText('Test')).toBeInTheDocument();
});

it("does not render the navbar if there isn't a user session", () => {
    setup();

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

it('renders the navbar if there is a user session', () => {
    setup({
        useSession: {
            data: {
                session: {},
            },
            error: null,
        } as SetupOptions['useSession'],
    });

    expect(
        screen.queryByRole('navigation', {
            name: 'Main navigation',
        })
    ).toBeInTheDocument();
});
