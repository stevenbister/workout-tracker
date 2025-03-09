import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
    component: RouteComponent,
});

export function RouteComponent() {
    return <div>Hello /_authenticated/profile!</div>;
}
