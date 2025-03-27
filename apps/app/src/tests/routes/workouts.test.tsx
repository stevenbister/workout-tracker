import { RouterProvider, createRouter } from '@tanstack/react-router';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { RoutineGroup } from '@/components/routine-group/routine-group';
import { ROUTES } from '@/constants';
import content from '@/content/workouts.json';
import { mockRoutineGroups } from '@/mocks/routines';
import { Route } from '@/routes/_authenticated/workouts';

vi.mock('@repo/core/auth/client', () => ({
    authClient: {
        getSession: vi.fn(),
    },
}));

vi.mock('@/api/routines', () => ({
    getRoutineGroups: vi.fn().mockReturnValue(mockRoutineGroups),
}));

vi.mock('@/components/routine-group/routine-group', () => ({
    RoutineGroup: vi.fn().mockImplementation(() => <div />),
}));

const router = createRouter({ routeTree: Route });

const setup = async () => {
    await router.navigate({
        to: ROUTES.WORKOUTS,
    });

    return await waitFor(() =>
        render(<RouterProvider router={router as never} />)
    );
};

afterEach(() => vi.clearAllMocks());

it('renders the route heading', async () => {
    await setup();

    expect(
        screen.getByRole('heading', {
            level: 1,
            name: content.heading,
        })
    ).toBeInTheDocument();
});

it('renders the new routine button', async () => {
    await setup();

    expect(
        screen.getByRole('button', {
            name: content.new,
        })
    ).toBeInTheDocument();
});

it('renders the routine groups', async () => {
    await setup();

    for (const mockGroup of mockRoutineGroups) {
        expect(RoutineGroup).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                name: mockGroup.name,
                routines: mockGroup.routines,
            }),
            undefined
        );
    }
});
