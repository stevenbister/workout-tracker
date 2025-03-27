import { RouterProvider } from '@tanstack/react-router';

import { router } from '../../../.storybook/ts-router';
import { render, screen } from '../../tests/utils';
import type { RoutineCardProps } from './routine-card';
import { RoutineCard } from './routine-card';

const mockExerciseName = 'Upper A';
const mockExerciseList: string[] = [
    'Bench Press (Barbell)',
    'Seated Row (Machine)',
    'Incline Bench Press (Dumbbell)',
    'Chin up',
    'Triceps Pushdown (Cable)',
    'Bicep Curl (Dumbbell)',
];
const mockButtonLabel = 'Start routine';
const mockPath = '/workouts/upper-a';

const defaultProps: RoutineCardProps = {
    heading: mockExerciseName,
    exerciseList: mockExerciseList,
    button: {
        label: mockButtonLabel,
        onClick: vi.fn(),
    },
    link: {
        to: mockPath,
    },
};

const setup = (props?: Partial<RoutineCardProps>) =>
    render(
        <RouterProvider
            router={router}
            defaultComponent={() => (
                <RoutineCard {...defaultProps} {...props} />
            )}
        />
    );

it('renders the component', () => {
    setup();

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(
        screen.getByRole('link', {
            name: mockExerciseName,
        })
    ).toHaveAttribute('href', mockPath);
    expect(
        screen.getByRole('heading', {
            name: mockExerciseName,
            level: 2,
        })
    ).toBeInTheDocument();
    expect(screen.getByText(mockExerciseList.join(', '))).toBeInTheDocument();
    expect(
        screen.getByRole('button', {
            name: mockButtonLabel,
        })
    ).toBeInTheDocument();
});

it('does not render the exercises if there are none', () => {
    setup({
        exerciseList: [],
    });

    expect(
        screen.queryByText(mockExerciseList.join(', '))
    ).not.toBeInTheDocument();
});
