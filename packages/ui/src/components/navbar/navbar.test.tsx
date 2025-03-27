import { renderWithRouter, screen } from '../../tests/utils';
import type { NavItem, NavbarProps } from './navbar';
import { Navbar } from './navbar';

const mockNavItems: NavItem[] = [
    {
        name: 'Home',
        route: '/',
        icon: 'home',
    },
    {
        name: 'Workouts',
        route: '/workouts',
        icon: 'barbell',
    },
    {
        name: 'Profile',
        route: '/profile',
        icon: 'user',
    },
];

const defaultProps: NavbarProps = {
    items: mockNavItems,
};

const setup = (props?: Partial<NavbarProps>) =>
    renderWithRouter(<Navbar {...defaultProps} {...props} />);

it('renders the component with nav items', () => {
    setup();

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    for (const item of mockNavItems)
        expect(screen.getByRole('link', { name: item.name })).toHaveAttribute(
            'href',
            item.route
        );
});
