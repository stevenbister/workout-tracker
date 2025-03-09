import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { Layout } from '@/components/layout/layout';
import { ROUTES } from '@/constants';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ location }) => {
        const { data } = await authClient.getSession();

        if (!data?.session)
            throw redirect({
                to: ROUTES.LOGIN,
                search: {
                    // Use the current location to power a redirect after login
                    // (Do not use `router.state.resolvedLocation` as it can
                    // potentially lag behind the actual current location)
                    redirect: location.href,
                },
            });
    },
    component: RouteComponent,
});

export function RouteComponent() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
