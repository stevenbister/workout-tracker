import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { Layout } from '@/components/layout/layout';
import { LoginForm } from '@/components/login-form/login-form';
import { ROUTES } from '@/constants';

export const Route = createFileRoute('/login')({
    beforeLoad: async () => {
        const auth = await authClient.getSession();

        if (auth?.data?.session)
            throw redirect({
                to: ROUTES.ROOT,
            });
    },
    component: RouteComponent,
});

export function RouteComponent() {
    return (
        <Layout>
            <h1 className="mx-auto mb-2xl">Login</h1>
            <LoginForm />
        </Layout>
    );
}
