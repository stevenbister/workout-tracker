import { render, screen } from '@testing-library/react';

import type { SpinnerProps } from './spinner';
import { Spinner } from './spinner';

const defaultProps = {};

const setup = (props?: Partial<SpinnerProps>) =>
    render(<Spinner {...defaultProps} {...props} />);

it('renders the component', () => {
    setup();

    expect(screen.getByRole('status')).toBeInTheDocument();
});
