import type { ReactNode } from 'react';

import { classList } from '@repo/ui/utils/class-list';

import styles from './layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <main className={classList(styles.layout, 'container')}>{children}</main>
);
