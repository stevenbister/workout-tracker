import type { ReactNode } from 'react';

import { Toaster } from '@repo/ui/components/toast';
import { classList } from '@repo/ui/utils/class-list';

import styles from './layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <>
        <main className={classList(styles.layout, 'container')}>
            {children}
        </main>
        <Toaster />
    </>
);
