import { render, screen } from '@repo/ui/tests/utils';

import {
    MuscleGroupList,
    type MuscleGroupListProps,
} from './muscle-group-list';

const mockMuscleGroups: string[] = ['Chest', 'Back', 'Legs'];
const mockTitle = 'Muscle Groups';

const defaultProps: MuscleGroupListProps = {
    muscleGroups: mockMuscleGroups,
    title: mockTitle,
};

const setup = () => render(<MuscleGroupList {...defaultProps} />);

it('renders the component', () => {
    setup();

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockMuscleGroups.join(', '))).toBeInTheDocument();
});
