import { createFileRoute } from '@tanstack/react-router';
import { useId } from 'react';

import { getExercise } from '@/api/exercises';
import { MuscleGroupList } from '@/components/muscle-group-list/muscle-group-list';
import content from '@/content/exercises.json';
import { getMetadata } from '@/utils/get-metadata';

export const Route = createFileRoute('/_authenticated/exercises/$exerciseId')({
    loader: async ({ params }) => await getExercise(params.exerciseId),
    component: RouteComponent,
    head: () => ({
        meta: getMetadata('exercises'),
    }),
});

function RouteComponent() {
    const { name, howTo, primaryMuscleGroups, secondaryMuscleGroups } =
        Route.useLoaderData();
    const muscleGroupsId = useId();
    const howToId = useId();

    return (
        <article>
            <h1 className="ta-center mb-l">{name}</h1>

            <section aria-labelledby={muscleGroupsId}>
                <h2 id={muscleGroupsId} className="sr-only">
                    {content.muscle_groups.heading}
                </h2>
                <dl>
                    <MuscleGroupList
                        muscleGroups={primaryMuscleGroups}
                        title={content.muscle_groups.primary}
                    />

                    <MuscleGroupList
                        muscleGroups={secondaryMuscleGroups}
                        title={content.muscle_groups.secondary}
                    />
                </dl>
            </section>

            <section aria-labelledby={howToId} className="stack stack--s mt-l">
                <h2 id={howToId} className="fw-400">
                    {content.how_to.heading}
                </h2>

                {howTo ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: howTo,
                        }}
                    />
                ) : null}
            </section>
        </article>
    );
}
