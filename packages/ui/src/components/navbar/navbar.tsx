import { Link } from '@tanstack/react-router';

import { Icon } from '../icon/icon';

export interface NavItem {
    name: string;
    route: string;
    icon: string;
}

export interface NavbarProps {
    items: NavItem[];
}

export const Navbar = ({ items }: NavbarProps) => {
    return (
        <nav
            className="bg-global-bg border-t-global-border fixed bottom-0 left-0 w-full border-t-2"
            aria-label="Main navigation"
        >
            <ul className="flex list-none justify-evenly p-0">
                {items.map(({ name, route, icon }) => (
                    <NavItem
                        route={route}
                        name={name}
                        icon={icon}
                        key={route}
                    />
                ))}
            </ul>
        </nav>
    );
};

export interface NavItemProps extends NavItem {}

const NavItem = ({ name, route, icon }: NavItemProps) => {
    return (
        <li>
            <Link
                to={route}
                className="decoration-none text-global-text flex flex-col items-center p-2 text-xs"
            >
                <Icon
                    spriteId={icon}
                    style={{
                        ['--icon-size' as string]: '1.5rem',
                    }}
                />
                {name}
            </Link>
        </li>
    );
};
