import { createFileRoute, redirect } from '@tanstack/react-router';

import { authClient } from '@repo/core/auth/client';

import { Layout } from '@/components/layout/layout';
import { LoginForm } from '@/components/login-form/login-form';
import { ROUTES } from '@/constants';
import { getMetadata } from '@/utils/get-metadata';

export const Route = createFileRoute('/login')({
    beforeLoad: async () => {
        const auth = await authClient.getSession();

        if (auth?.data?.session)
            throw redirect({
                to: ROUTES.ROOT,
            });
    },
    head: () => ({
        meta: getMetadata('login'),
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Layout>
            <h1 className="mx-auto mb-8">Login</h1>
            <LoginForm />
        </Layout>
    );
}
