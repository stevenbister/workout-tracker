import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { ROUTES } from '@/constants';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ location }) => {
        const session = await authClient.getSession();

        if (session.error?.status === 401) {
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
    return <Outlet />;
}
