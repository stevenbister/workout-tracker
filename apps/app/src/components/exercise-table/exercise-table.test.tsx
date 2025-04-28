import { render, screen } from '@repo/ui/tests/utils';

import type { RoutineExercise } from '@/types/api';

import { ExerciseTable, type ExerciseTableProps } from './exercise-table';

const exercise: RoutineExercise = {
    id: 1,
    name: 'Bench Press',
    restTime: 120,
    sets: [
        { id: 1, setNumber: 1, weight: 100, maxReps: 10, minReps: 8 },
        { id: 2, setNumber: 2, weight: 110, maxReps: 11, minReps: 9 },
    ],
};

const defaultProps: ExerciseTableProps = {
    exercise,
};

const setup = (props?: Partial<ExerciseTableProps>) =>
    render(<ExerciseTable {...defaultProps} {...props} />);

it('renders the exercise table', () => {
    setup();

    screen.debug();

    expect(
        screen.getByRole('heading', {
            name: exercise.name,
            level: 2,
        })
    );

    expect(screen.getByText('2min 0s')).toBeInTheDocument();

    expect(
        screen.getByRole('columnheader', { name: 'Set' })
    ).toBeInTheDocument();
    expect(
        screen.getByRole('columnheader', { name: 'KG' })
    ).toBeInTheDocument();
    expect(
        screen.getByRole('columnheader', { name: 'Reps' })
    ).toBeInTheDocument();

    for (const set of exercise.sets!) {
        expect(
            screen.getByRole('cell', {
                name: `${set.setNumber}`,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('cell', {
                name: `${set.weight}`,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('cell', {
                name: `${set.minReps} - ${set.maxReps}`,
            })
        ).toBeInTheDocument();
    }
});

it('does not render the table if there are no sets', () => {
    setup({ exercise: { ...exercise, sets: [] } });

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
});
