import type { Routine } from '@/db/schema/routine';
import type { RoutineExercise } from '@/db/schema/routine-exercise';

export type RoutineWithExercises = Pick<
    Routine,
    'id' | 'name' | 'description'
> & {
    exercises: RoutineExercise | null;
};

export const createRoutinesMap = async (routines: RoutineWithExercises[]) => {
    const routineMap = new Map();

    for (const row of routines) {
        const { id, name, description, exercises } = row;
        if (!routineMap.has(id)) {
            routineMap.set(id, { id, name, description, exercises: [] });
        }

        if (exercises) routineMap.get(id).exercises.push(exercises);
    }

    return routineMap;
};
