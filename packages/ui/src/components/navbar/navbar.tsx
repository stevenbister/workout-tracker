import { Link } from '@tanstack/react-router';

import { Icon } from '../icon/icon';
import styles from './navbar.module.scss';

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
        <nav className={styles.navbar}>
            <ul>
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
            <Link to={route} className={styles['nav-item']}>
                <Icon spriteId={icon} className={styles.icon} />
                {name}
            </Link>
        </li>
    );
};
