import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { ROUTES } from '@/constants';

export const Route = createFileRoute('/logout')({
    beforeLoad: async () => {
        const { data, error } = await authClient.signOut();

        if (!!data || error.code === 'FAILED_TO_GET_SESSION') {
            throw redirect({
                to: ROUTES.LOGIN,
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <>How did you get here!?</>;
}
