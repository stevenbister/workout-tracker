import { render, screen } from '@repo/ui/tests/utils';

import { StartRoutineButton } from './start-routine-button';

const setup = () => render(<StartRoutineButton />);

it('renders the component', () => {
    setup();

    expect(screen.getByRole('button')).toBeInTheDocument();
});
