import type { InsertExerciseMuscleGroup } from '@/db/schema/exercise-muscle-group';

export const exerciseMuscleGroupData: InsertExerciseMuscleGroup[] = [
    {
        id: 1,
        exerciseId: 1,
        muscleGroupId: 5,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 2,
        exerciseId: 1,
        muscleGroupId: 12,
    },
    {
        id: 3,
        exerciseId: 2,
        muscleGroupId: 10,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 4,
        exerciseId: 2,
        muscleGroupId: 1,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 5,
        exerciseId: 2,
        muscleGroupId: 17,
    },
    {
        id: 6,
        exerciseId: 2,
        muscleGroupId: 4,
    },
    {
        id: 7,
        exerciseId: 2,
        muscleGroupId: 2,
    },
    {
        id: 8,
        exerciseId: 3,
        muscleGroupId: 6,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 9,
        exerciseId: 3,
        muscleGroupId: 12,
    },
    {
        id: 10,
        exerciseId: 4,
        muscleGroupId: 13,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 11,
        exerciseId: 4,
        muscleGroupId: 9,
        isPrimaryMuscleGroup: true,
    },
    {
        id: 12,
        exerciseId: 4,
        muscleGroupId: 1,
    },
    {
        id: 13,
        exerciseId: 4,
        muscleGroupId: 10,
    },
];
