import userEvent from '@testing-library/user-event';

import { render, screen } from '../../tests/utils';
import type { DisclosureProps } from './disclosure';
import { Disclosure } from './disclosure';

const mockLabel = 'label';
const mockOnToggle = vi.fn();

const defaultProps: DisclosureProps = {
    label: mockLabel,
    children: <div>children</div>,
};

const setup = (props?: Partial<DisclosureProps>) => ({
    user: userEvent.setup(),
    ...render(<Disclosure {...defaultProps} {...props} />),
});

it('renders the component', () => {
    setup();

    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
});

it('renders the children when the disclosure is open', () => {
    setup({ isOpen: true });

    expect(screen.getByRole('group')).toHaveAttribute('open');
    expect(screen.getByText('children')).toBeInTheDocument();
});

it('calls onToggle when the disclosure is clicked', async () => {
    const { user } = setup({ onToggle: mockOnToggle });

    await user.click(screen.getByText(mockLabel));

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
});
