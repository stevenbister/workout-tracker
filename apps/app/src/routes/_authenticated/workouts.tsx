import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/workouts')({
    component: RouteComponent,
});

export function RouteComponent() {
    return <div>Hello /_authenticated/workouts!</div>;
}
