import userEvent from '@testing-library/user-event';

import { render, screen } from '../../tests/utils';
import type { AlertProps } from './alert';
import { Alert } from './alert';

const mockOnClose = vi.fn();

const defaultProps: Partial<AlertProps> = {
    heading: 'Oops something went wrong',
    description: 'Please try again later',
};

const setup = (props?: Partial<AlertProps>) => ({
    user: userEvent.setup(),
    ...render(<Alert {...defaultProps} {...props} />),
});

it('renders the component with an alert role when status is "error"', () => {
    setup({ status: 'error' });

    expect(
        screen.getByRole('alert', {
            name: defaultProps.heading,
        })
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description!)).toBeInTheDocument();
});

it('calls onClose when the close button is clicked', async () => {
    const { user } = setup({ onClose: mockOnClose });

    await user.click(screen.getByRole('button'));

    expect(mockOnClose).toHaveBeenCalled();
});

it('does not render the alert content if there is no heading or description', () => {
    setup({ heading: undefined, description: undefined });

    expect(screen.queryByText(defaultProps.heading!)).not.toBeInTheDocument();
    expect(
        screen.queryByText(defaultProps.description!)
    ).not.toBeInTheDocument();
});
