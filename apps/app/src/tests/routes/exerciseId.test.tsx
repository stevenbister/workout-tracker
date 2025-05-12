import { screen } from '@repo/ui/tests/utils';

import { getExercise } from '@/api/exercises';
import { ROUTES } from '@/constants';
import content from '@/content/exercises.json';
import { mockExercise } from '@/mocks/exercise';
import { Route as exerciseIdRoute } from '@/routes/_authenticated/exercises/$exerciseId';
import type { Exercise } from '@/types/api';

import { renderMockRoute } from '../utils';

vi.mock('@/api/exercises', () => ({
    getExercise: vi.fn(),
}));

const setup = async () => {
    vi.mocked(getExercise).mockReturnValue(
        mockExercise as unknown as Promise<Exercise>
    );

    await renderMockRoute({
        routeTree: exerciseIdRoute,
        route: `${ROUTES.EXERCISES}/1`,
    });
};

afterEach(() => vi.clearAllMocks());

it('renders the exercise name', async () => {
    await setup();

    expect(
        screen.getByRole('heading', {
            name: mockExercise.name,
            level: 1,
        })
    ).toBeInTheDocument();
});

it('renders the target muscle groups', async () => {
    await setup();

    expect(
        screen.getByRole('region', {
            name: content.muscle_groups.heading,
        })
    ).toBeInTheDocument();

    expect(screen.getByText(content.muscle_groups.primary)).toBeInTheDocument();
    expect(
        screen.getByText(mockExercise.primaryMuscleGroups.join(', '))
    ).toBeInTheDocument();

    expect(
        screen.getByText(content.muscle_groups.secondary)
    ).toBeInTheDocument();
    expect(
        screen.getByText(mockExercise.secondaryMuscleGroups.join(', '))
    ).toBeInTheDocument();
});

it('renders the how to section', async () => {
    await setup();

    expect(
        screen.getByRole('region', {
            name: content.how_to.heading,
        })
    ).toBeInTheDocument();

    expect(
        screen.getByText((content) =>
            content.includes(mockExercise.howTo!.replace(/(<([^>]+)>)/gi, ''))
        )
    ).toBeInTheDocument();
});
