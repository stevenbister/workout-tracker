import {
    RouterProvider,
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter,
    useRouter,
} from '@tanstack/react-router';
import userEvent from '@testing-library/user-event';
import { HTTPError, type NormalizedOptions } from 'ky';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import data from '@/content/error.json';

import { ErrorComponent, type ErrorComponentProps } from './error-component';

const mockInvalidate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => ({
    ...(await importOriginal()),
    useRouter: vi.fn(),
}));

const mockTitle = 'Test Error';

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

const defaultProps: ErrorComponentProps = {
    title: mockTitle,
    error: new HTTPError(
        {} as Response,
        {} as Request,
        {} as NormalizedOptions
    ),
};

const setup = async (props?: Partial<ErrorComponentProps>) => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // @ts-expect-error -- not mocking out all of the required types
    vi.mocked(useRouter).mockImplementation(() => ({
        invalidate: mockInvalidate,
    }));

    return await waitFor(() => ({
        user: userEvent.setup(),
        ...render(
            <RouterProvider
                router={router}
                defaultComponent={() => (
                    <ErrorComponent {...defaultProps} {...props} />
                )}
            />
        ),
    }));
};

beforeEach(() => vi.restoreAllMocks());

it('renders the error component', async () => {
    await setup();

    expect(
        screen.getByRole('heading', {
            level: 1,
            name: mockTitle,
        })
    ).toBeInTheDocument();

    expect(
        screen.getByRole('heading', {
            level: 2,
            name: data.heading,
        })
    ).toBeInTheDocument();

    expect(screen.getByRole('group')).toHaveTextContent(data.more_details);

    expect(
        screen.getByRole('button', {
            name: data.cta,
        })
    ).toBeInTheDocument();
});

it('invalidates the route when the button is clicked', async () => {
    const { user } = await setup();

    await user.click(
        screen.getByRole('button', {
            name: data.cta,
        })
    );

    expect(mockInvalidate).toHaveBeenCalledTimes(1);
});

it('renders the default error message on non HTTPError instances', async () => {
    await setup({
        error: new Error('Test error'),
    });

    expect(
        screen.queryByRole('heading', {
            level: 1,
            name: mockTitle,
        })
    ).not.toBeInTheDocument();

    expect(
        screen.queryByRole('heading', {
            level: 2,
            name: data.heading,
        })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('group')).not.toBeInTheDocument();

    expect(
        screen.queryByRole('button', {
            name: data.cta,
        })
    ).not.toBeInTheDocument();
});
