import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { Navbar } from '@repo/ui/components/navbar';

import { Layout } from '@/components/layout/layout';
import { ROUTES } from '@/constants';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ location }) => {
        // TODO: Can we do something to speed this up? Currently running it on every route change which is adding a noticeable delay
        // Perhaps we check for the cookie first
        // If the cookie is present, we can assume the session is valid,
        // Then if there's no cookie or the cookie has expired then we can check the session using this method
        const session = await authClient.getSession();

        if (session.error?.status === 401 || !session?.data) {
            throw redirect({
                to: ROUTES.LOGIN,
                search: {
                    // Use the current location to power a redirect after login
                    // (Do not use `router.state.resolvedLocation` as it can
                    // potentially lag behind the actual current location)
                    redirect: location.href,
                },
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
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
        </>
    );
}
