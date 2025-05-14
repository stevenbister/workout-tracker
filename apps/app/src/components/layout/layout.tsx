import type { ReactNode } from 'react';

import { authClient } from '@repo/core/auth/client';

import { Navbar } from '@repo/ui/components/navbar';
import { Toaster } from '@repo/ui/components/toast';
import { classList } from '@repo/ui/utils/class-list';

import { ROUTES } from '@/constants';

interface LayoutProps {
    children: ReactNode;
    justify?: 'start';
}

export const Layout = ({ children, justify }: LayoutProps) => {
    const { data } = authClient.useSession();

    const justifyVariants: Record<
        NonNullable<LayoutProps['justify']>,
        string
    > = {
        start: 'justify-start',
    };

    return (
        <>
            <main
                className={classList(
                    'flex flex-auto flex-col pb-32',
                    justify ? justifyVariants[justify] : 'justify-center',
                    'container'
                )}
            >
                {children}
            </main>

            {data?.session ? (
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
