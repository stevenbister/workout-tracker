import { RouterProvider, createRouter } from '@tanstack/react-router';

import { render, screen, waitFor } from '@repo/ui/tests/utils';

import { getRoutine } from '@/api/routines';
import { ExerciseTable } from '@/components/exercise-table/exercise-table';
import { ROUTES } from '@/constants';
import content from '@/content/routines.json';
import { mockRoutineGroups } from '@/mocks/routines';
import { Route as routineRoute } from '@/routes/_authenticated/routines/$routineId';

const mockRoutine = mockRoutineGroups[0]!.routines[0]!;

const router = createRouter({ routeTree: routineRoute });

vi.mock('@/api/routines', () => ({
    getRoutine: vi.fn(),
}));

vi.mock('@/components/exercise-table/exercise-table', () => ({
    ExerciseTable: vi.fn().mockImplementation(() => <div />),
}));

const setup = async () => {
    vi.mocked(getRoutine).mockReturnValue(mockRoutine);

    await router.navigate({
        to: `${ROUTES.ROUTINES}/1`,
    });

    await waitFor(() => render(<RouterProvider router={router as never} />));
};

afterEach(() => vi.clearAllMocks());

it('renders the start routine button', async () => {
    await setup();

    expect(
        screen.getByRole('button', {
            name: content.start,
        })
    ).toBeInTheDocument();
});

it('renders the edit routine button', async () => {
    await setup();

    expect(
        screen.getByRole('button', {
            name: content.edit,
        })
    ).toBeInTheDocument();
});

it('renders the routine name', async () => {
    await setup();

    expect(
        screen.getByRole('heading', {
            name: mockRoutine.name,
            level: 1,
        })
    ).toBeInTheDocument();
});

it('renders the exercise tables', async () => {
    await setup();

    for (const [i, mockExercise] of Object.entries(mockRoutine.exercises)) {
        expect(ExerciseTable).toHaveBeenNthCalledWith(
            Number(i) + 1,
            expect.objectContaining({
                exercise: mockExercise,
            }),
            undefined
        );
    }
});
