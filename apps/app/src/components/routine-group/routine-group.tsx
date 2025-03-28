import { Disclosure } from '@repo/ui/components/disclosure';
import { RoutineCard } from '@repo/ui/components/routine-card';

import content from '@/content/workouts.json';
import type { Routines } from '@/types/api';

export interface RoutineGroupProps {
    name: string;
    routines: Routines;
}

export const RoutineGroup = ({ name, routines }: RoutineGroupProps) => (
    <Disclosure label={name}>
        <div className="stack stack--s mt-3xs">
            {routines.map(({ id, name, exercises }) => (
                <RoutineCard
                    key={id}
                    heading={name}
                    exerciseList={exercises.map(({ name }) => name)}
                    button={{
                        label: content.start,
                    }}
                    link={{
                        // @ts-expect-error -- we've not made the routes yet
                        to: `/routines/${id}`,
                    }}
                />
            ))}
        </div>
    </Disclosure>
);
