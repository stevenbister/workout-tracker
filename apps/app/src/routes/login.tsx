import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/components/login-form/login-form';

export const Route = createFileRoute('/login')({
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
