import { eq, inArray } from 'drizzle-orm';

import { exercise, exerciseMuscleGroup, muscleGroup } from '@/db/schema';
import type { AppRouteHandler } from '@/types';

import type { ListRoute } from './exercises.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');

    const exercisesMap = new Map<
        number,
        {
            id: number;
            name: string;
            primaryMuscleGroups: string[];
            secondaryMuscleGroups: string[];
        }
    >();

    const exercises = await db
        .select({
            id: exercise.id,
            name: exercise.name,
        })
        .from(exercise);
    // TODO: Pagination

    const exerciseIds = exercises.map((e) => e.id);

    const muscleGroups = await db
        .select({
            exerciseId: exerciseMuscleGroup.exerciseId,
            muscleGroupName: muscleGroup.name,
            isPrimaryMuscleGroup: exerciseMuscleGroup.isPrimaryMuscleGroup,
        })
        .from(exerciseMuscleGroup)
        .innerJoin(
            muscleGroup,
            eq(exerciseMuscleGroup.muscleGroupId, muscleGroup.id)
        )
        .where(inArray(exerciseMuscleGroup.exerciseId, exerciseIds));

    for (const exercise of exercises) {
        const { id, name } = exercise;
        exercisesMap.set(id, {
            id,
            name,
            primaryMuscleGroups: [],
            secondaryMuscleGroups: [],
        });
    }

    for (const muscleGroup of muscleGroups) {
        const { isPrimaryMuscleGroup, exerciseId, muscleGroupName } =
            muscleGroup;
        if (isPrimaryMuscleGroup) {
            exercisesMap
                .get(exerciseId)!
                .primaryMuscleGroups.push(muscleGroupName);
        } else {
            exercisesMap
                .get(exerciseId)!
                .secondaryMuscleGroups.push(muscleGroupName);
        }
    }

    return c.json([...exercisesMap.values()]);
};
