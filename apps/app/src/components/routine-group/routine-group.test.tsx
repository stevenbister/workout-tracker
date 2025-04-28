import userEvent from '@testing-library/user-event';

import { renderWithRouter, screen } from '@repo/ui/tests/utils';

import type { Routine } from '@/types/api';

import { RoutineGroup, type RoutineGroupProps } from './routine-group';

const mockRoutines: Routine[] = [
    {
        id: 4,
        name: 'Full body',
        description: 'lorem ipsum',
        exercises: [
            {
                id: 1,
                name: 'Barbell Bench Press',
                restTime: 120,
            },
        ],
    },
    {
        id: 5,
        name: 'test 1',
        description: 'blah blah blah',
        exercises: [
            {
                id: 1,
                name: 'Dumbbell Bench Press',
                restTime: 120,
            },
        ],
    },
    {
        id: 6,
        name: 'test 2',
        description: 'blah blah blah',
        exercises: [
            {
                id: 1,
                name: 'Barbell Deadlift',
                restTime: 120,
            },
        ],
    },
];

const defaultProps: RoutineGroupProps = {
    name: 'test',
    routines: mockRoutines,
};

const setup = () => ({
    user: userEvent.setup(),
    ...renderWithRouter(<RoutineGroup {...defaultProps} />),
});

it('renders the group label', () => {
    setup();

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
});

it('renders the routines', async () => {
    const { user } = setup();

    await user.click(screen.getByText(defaultProps.name));

    for (const { name, exercises } of mockRoutines) {
        expect(
            screen.getByRole('link', {
                name,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', {
                name,
            })
        ).toBeInTheDocument();

        expect(screen.getByText(exercises[0]!.name!)).toBeInTheDocument();
    }
});
