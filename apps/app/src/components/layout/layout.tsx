import type { ReactNode } from 'react';

import { authClient } from '@repo/core/auth/client';

import { Navbar } from '@repo/ui/components/navbar';
import { Toaster } from '@repo/ui/components/toast';
import { classList } from '@repo/ui/utils/class-list';

import { ROUTES } from '@/constants';

import styles from './layout.module.scss';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    // TODO: maybe this could go into a provider so we only call it once
    const session = authClient.useSession();

    return (
        <>
            <main className={classList(styles.layout, 'container')}>
                {children}
            </main>

            {session.data ? (
                <Navbar
                    items={[
                        {
                            name: 'Home',
                            route: ROUTES.ROOT,
                            icon: 'home',
                        },
                        {
                            name: 'Workouts',
                            route: ROUTES.WORKOUTS,
                            icon: 'barbell',
                        },
                        {
                            name: 'Profile',
                            route: ROUTES.PROFILE,
                            icon: 'user',
                        },
                    ]}
                />
            ) : null}

            <Toaster />
        </>
    );
};
