import { render, screen } from '@/tests/utils';

import { Button, type ButtonProps } from './button';

const setup = (props?: Partial<Omit<ButtonProps, 'children'>>) =>
    render(<Button {...props}>Button</Button>);

beforeEach(() => vi.resetAllMocks());

it.each(['button', 'link'])('renders the component as a %s', (type) => {
    setup({
        as: type === 'link' ? 'a' : type,
        href: type === 'link' ? '/' : undefined,
    });

    expect(screen.getByRole(type)).toBeInTheDocument();
});

it.each(['success', 'danger'])(
    'renders the component with the %s status',
    (status) => {
        setup({ status: status as 'success' | 'danger' });

        expect(screen.getByRole('button')).toHaveClass(`_${status}_e5c1c9`);
    }
);

it('renders the component with the ghost variant', () => {
    setup({ variant: 'ghost' });

    expect(screen.getByRole('button')).toHaveClass('_ghost_e5c1c9');
});

it('renders the spinner when isLoading is true', () => {
    setup({ isLoading: true });

    expect(
        screen.getByRole('button', {
            name: 'Loading',
        })
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
});
