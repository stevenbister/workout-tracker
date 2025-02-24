import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
    component: RouteComponent,
});

export function RouteComponent() {
    return <>index</>;
}
