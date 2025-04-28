import { createFileRoute } from '@tanstack/react-router';
import { useId } from 'react';

import { Button } from '@repo/ui/components/button';

import { getRoutine } from '@/api/routines';
import { ExerciseTable } from '@/components/exercise-table/exercise-table';
import { StartRoutineButton } from '@/components/start-routine-button/start-routine-button';
import content from '@/content/routines.json';

export const Route = createFileRoute('/_authenticated/routines/$routineId')({
    loader: async ({ params }) => await getRoutine(params.routineId),
    component: RouteComponent,
    // TODO: Add head
});

function RouteComponent() {
    const { name, exercises } = Route.useLoaderData();
    const id = useId();

    return (
        <>
            <h1 className="mx-auto mb-l">{name}</h1>

            <StartRoutineButton />

            <Button variant="ghost" className="mt-s mb-l">
                {content.edit}
            </Button>

            <section aria-labelledby={id} className="stack">
                <h2 id={id} className="sr-only">
                    {content.section}
                </h2>

                {exercises.map((exercise) => (
                    <ExerciseTable exercise={exercise} key={exercise.id} />
                ))}
            </section>
        </>
    );
}
