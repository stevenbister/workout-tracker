import { eq, inArray } from 'drizzle-orm';

import type { Exercise } from '@/db/schema/exercise';
import { exercise } from '@/db/schema/exercise';
import type { Routine } from '@/db/schema/routine';
import { routineExercise } from '@/db/schema/routine-exercise';
import type { RoutineExerciseSet } from '@/db/schema/routine-exercise-set';
import { routineExerciseSet } from '@/db/schema/routine-exercise-set';
import type { DrizzleD1 } from '@/types';

export type ExerciseWithSets = Pick<Exercise, 'id' | 'name'> & {
    sets: Pick<
        RoutineExerciseSet,
        'id' | 'maxReps' | 'minReps' | 'setNumber' | 'weight'
    >[];
};

export type RoutineExerciseWithSets = Pick<
    Routine,
    'id' | 'name' | 'description'
> & {
    exercises: ExerciseWithSets[];
};

export const createRoutinesMap = async (
    db: DrizzleD1,
    routines: Pick<Routine, 'id' | 'name' | 'description'>[]
) => {
    const routineMap = new Map<number, RoutineExerciseWithSets>();
    const exerciseMap = new Map<number, Map<number, ExerciseWithSets>>();

    const routineIds = routines.map((r) => r.id);

    const routineExercises = await db
        .select()
        .from(routineExercise)
        .leftJoin(exercise, eq(routineExercise.exerciseId, exercise.id))
        .leftJoin(
            routineExerciseSet,
            eq(routineExercise.id, routineExerciseSet.routineExerciseId)
        )
        .where(inArray(routineExercise.routineId, routineIds));

    for (const { id, name, description } of routines) {
        routineMap.set(id, {
            id,
            name,
            description,
            exercises: [],
        });
    }

    for (const {
        routine_exercise,
        exercise,
        routine_exercise_set,
    } of routineExercises) {
        const routineId = routine_exercise.routineId;
        const exerciseId = exercise!.id;

        if (!exerciseMap.has(routineId)) exerciseMap.set(routineId, new Map());

        const routineExercisesMap = exerciseMap.get(routineId)!;

        if (!routineExercisesMap.has(exerciseId)) {
            routineExercisesMap.set(exerciseId, {
                id: exerciseId,
                name: exercise?.name ?? '',
                sets: [],
            });
        }

        if (routine_exercise_set) {
            routineExercisesMap.get(exerciseId)?.sets.push({
                id: routine_exercise_set.id,
                maxReps: routine_exercise_set.maxReps,
                minReps: routine_exercise_set.minReps,
                setNumber: routine_exercise_set.setNumber,
                weight: routine_exercise_set.weight,
            });
        }
    }

    for (const [routineId, exercisesMap] of exerciseMap) {
        const exercises = Array.from(exercisesMap.values());

        routineMap.get(routineId)!.exercises = exercises;
    }

    return routineMap;
};
