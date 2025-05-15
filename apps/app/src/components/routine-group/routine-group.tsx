import { Disclosure } from '@repo/ui/components/disclosure';
import { RoutineCard } from '@repo/ui/components/routine-card';

import { ROUTES } from '@/constants';
import type { Routines } from '@/types/api';

import { StartRoutineButton } from '../start-routine-button/start-routine-button';

export interface RoutineGroupProps {
    name: string;
    routines: Routines;
}

export const RoutineGroup = ({ name, routines }: RoutineGroupProps) => (
    <Disclosure label={name}>
        <div className="stack">
            {routines.map(({ id, name, exercises }) => (
                <RoutineCard
                    key={id}
                    heading={name}
                    exerciseList={exercises.map(({ name }) => name)}
                    button={<StartRoutineButton />}
                    link={{
                        to: `${ROUTES.ROUTINES}/$routineId`,
                        params: { routineId: String(id) },
                        preload: 'viewport',
                    }}
                />
            ))}
        </div>
    </Disclosure>
);
