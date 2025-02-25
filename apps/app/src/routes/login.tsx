import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { LoginForm } from '@/components/login-form/login-form';
import { ROUTES } from '@/constants';

export const Route = createFileRoute('/login')({
    beforeLoad: async () => {
        const session = await authClient.getSession();

        if (session.data) {
            throw redirect({
                to: ROUTES.ROOT,
            });
        }
    },
    component: RouteComponent,
});

export function RouteComponent() {
    return (
        <>
            <h1>Login</h1>
            <LoginForm />
        </>
    );
}
