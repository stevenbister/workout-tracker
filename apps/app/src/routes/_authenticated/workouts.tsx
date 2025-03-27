import { createFileRoute } from '@tanstack/react-router';
import { useId } from 'react';

import { Button } from '@repo/ui/components/button';
import { Icon } from '@repo/ui/components/icon';

import { getRoutineGroups } from '@/api/routines';
import { ErrorComponent } from '@/components/error-component/error-component';
import { RoutineGroup } from '@/components/routine-group/routine-group';
import metaData from '@/content/metadata.json';
import content from '@/content/workouts.json';

export const Route = createFileRoute('/_authenticated/workouts')({
    loader: async () => await getRoutineGroups(),
    head: () => ({
        meta: [
            {
                title: `${metaData.routes.workouts.title} | ${metaData.appName}`,
            },
        ],
    }),
    component: RouteComponent,
    errorComponent: ({ error }) => (
        <ErrorComponent error={error} title={content.heading} />
    ),
});

function RouteComponent() {
    const data = Route.useLoaderData();
    const id = useId();

    return (
        <>
            <h1 className="mx-auto mb-l">{content.heading}</h1>

            <Button>
                {content.new}
                <Icon spriteId="plus" />
            </Button>

            <section className="stack stack--s mt-l" aria-labelledby={id}>
                <h2 id={id} className="sr-only">
                    {content.routine_folders}
                </h2>

                {data.map(({ id, name, routines }) => (
                    <RoutineGroup key={id} name={name} routines={routines} />
                ))}
            </section>
        </>
    );
}
