import { eq, inArray } from 'drizzle-orm';

import { equipment } from '@/db/schema/equipment';
import type { Exercise } from '@/db/schema/exercise';
import { exerciseEquipment as exerciseEquipmentSchema } from '@/db/schema/exercise-equipment';
import { exerciseMuscleGroup } from '@/db/schema/exercise-muscle-group';
import { muscleGroup } from '@/db/schema/muscle-group';
import type { DrizzleD1 } from '@/types';

export type ExerciseNoDates = Omit<Exercise, 'createdAt' | 'updatedAt'>;

type ExerciseWithMuscleGroups = ExerciseNoDates & {
    equipment: string[];
    primaryMuscleGroups: string[];
    secondaryMuscleGroups: string[];
};

export const createExerciseMap = async (
    db: DrizzleD1,
    exercises: ExerciseNoDates[]
) => {
    const exercisesMap = new Map<number, ExerciseWithMuscleGroups>();

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

    const exerciseEquipment = await db
        .select({
            exerciseId: exerciseEquipmentSchema.exerciseId,
            equipmentName: equipment.name,
        })
        .from(exerciseEquipmentSchema)
        .innerJoin(
            equipment,
            eq(exerciseEquipmentSchema.equipmentId, equipment.id)
        );

    for (const exercise of exercises) {
        const { id, name, howTo } = exercise;

        exercisesMap.set(id, {
            id,
            name,
            howTo,
            equipment: [],
            primaryMuscleGroups: [],
            secondaryMuscleGroups: [],
        });
    }

    for (const eqp of exerciseEquipment) {
        const { exerciseId, equipmentName } = eqp;

        const exercise = exercisesMap.get(exerciseId);

        exercise?.equipment.push(equipmentName);
    }

    for (const muscleGroup of muscleGroups) {
        const { isPrimaryMuscleGroup, exerciseId, muscleGroupName } =
            muscleGroup;

        const exercise = exercisesMap.get(exerciseId);

        if (isPrimaryMuscleGroup) {
            exercise?.primaryMuscleGroups.push(muscleGroupName);
        } else {
            exercise?.secondaryMuscleGroups.push(muscleGroupName);
        }
    }

    return exercisesMap;
};
