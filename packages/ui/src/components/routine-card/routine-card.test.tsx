import { renderWithRouter, screen } from '../../tests/utils';
import { Button } from '../button/button';
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
    button: <Button>{mockButtonLabel}</Button>,
    link: {
        to: mockPath,
    },
};

const setup = (props?: Partial<RoutineCardProps>) =>
    renderWithRouter(<RoutineCard {...defaultProps} {...props} />);

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
