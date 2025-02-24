import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
    component: RouteComponent,
});

export function RouteComponent() {
    return <div>login</div>;
}
