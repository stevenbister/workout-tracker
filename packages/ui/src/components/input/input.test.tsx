import { render, screen } from '../../tests/utils';
import type { InputProps } from './input';
import { Input } from './input';

const mockValidationMessage = 'Please enter a valid email address';

const defaultProps = {
    label: 'Label',
};

const setup = (props?: Partial<InputProps>) =>
    render(<Input {...defaultProps} {...props} />);

it('renders the component', () => {
    setup();

    expect(
        screen.getByRole('textbox', {
            name: defaultProps.label,
        })
    ).toBeInTheDocument();
});

it('renders the component with a validation message', () => {
    setup({
        type: 'email',
        state: 'invalid',
        validationMessage: mockValidationMessage,
    });

    expect(
        screen.getByRole('textbox', {
            name: defaultProps.label,
            description: mockValidationMessage,
        })
    ).toBeInTheDocument();
});
