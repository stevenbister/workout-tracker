import { eq, inArray } from 'drizzle-orm';

import type { Exercise } from '@/db/schema/exercise';
import { exercise } from '@/db/schema/exercise';
import { type Routine } from '@/db/schema/routine';
import {
    type RoutineExercise,
    routineExercise,
} from '@/db/schema/routine-exercise';
import type { RoutineExerciseSet } from '@/db/schema/routine-exercise-set';
import { routineExerciseSet } from '@/db/schema/routine-exercise-set';
import type { DrizzleD1, Nullable } from '@/types';

export type RoutineProps = Pick<
    Routine,
    'id' | 'name' | 'description' | 'routineGroupId'
>;

export type ExerciseWithSets = Pick<Exercise, 'id' | 'name'> &
    Pick<RoutineExercise, 'restTime'> & {
        sets?: Pick<
            RoutineExerciseSet,
            'id' | 'maxReps' | 'minReps' | 'setNumber' | 'weight'
        >[];
    };

export type RoutineExerciseWithSets = RoutineProps & {
    exercises: ExerciseWithSets[];
};

type RoutineExercises = {
    exercise: Nullable<Exercise>;
    routine_exercise: RoutineExercise;
    routine_exercise_set?: RoutineExerciseSet;
}[];

export const createRoutinesMap = async ({
    db,
    routines,
    includeSets = false,
}: {
    db: DrizzleD1;
    routines: RoutineProps[];
    includeSets?: boolean;
}) => {
    const routineMap = new Map<number, RoutineExerciseWithSets>();
    const exerciseMap = new Map<number, Map<number, ExerciseWithSets>>();

    const routineIds = routines.map(({ id }) => id);

    const query = db
        .select()
        .from(routineExercise)
        .leftJoin(exercise, eq(routineExercise.exerciseId, exercise.id))
        .where(inArray(routineExercise.routineId, routineIds));

    if (includeSets) {
        query.leftJoin(
            routineExerciseSet,
            eq(routineExercise.id, routineExerciseSet.routineExerciseId)
        );
    }

    const routineExercises: RoutineExercises = await query;

    for (const { id, name, description, routineGroupId } of routines) {
        routineMap.set(id, {
            id,
            name,
            description,
            routineGroupId,
            exercises: [],
        });
    }

    for (const routineExercise of routineExercises) {
        const routineId = routineExercise.routine_exercise.routineId;
        const exerciseId = routineExercise.exercise!.id;

        if (!exerciseMap.has(routineId)) exerciseMap.set(routineId, new Map());

        const routineExercisesMap = exerciseMap.get(routineId)!;

        if (
            !routineExercisesMap.has(exerciseId) &&
            routineExercise.routine_exercise_set
        ) {
            routineExercisesMap.set(exerciseId, {
                id: exerciseId,
                name: routineExercise.exercise?.name ?? '',
                restTime: routineExercise.routine_exercise?.restTime,
                sets: [],
            });
        } else if (!routineExercisesMap.has(exerciseId)) {
            routineExercisesMap.set(exerciseId, {
                id: exerciseId,
                name: routineExercise.exercise?.name ?? '',
                restTime: routineExercise.routine_exercise?.restTime,
            });
        }

        if (routineExercise?.routine_exercise_set) {
            const { id, maxReps, minReps, setNumber, weight } =
                routineExercise.routine_exercise_set;

            routineExercisesMap.get(exerciseId)?.sets?.push({
                id,
                maxReps,
                minReps,
                setNumber,
                weight,
            });
        }
    }

    for (const [routineId, exercisesMap] of exerciseMap) {
        const exercises = Array.from(exercisesMap.values());

        routineMap.get(routineId)!.exercises = exercises;
    }

    return routineMap;
};
