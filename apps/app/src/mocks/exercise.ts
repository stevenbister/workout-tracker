import type { Exercise } from '@/types/api';

export const mockExercise: Exercise = {
    id: 1,
    name: 'Bench Press',
    howTo: '<p>Lie on a bench with your feet flat on the ground. Hold the barbell with both hands, slightly wider than shoulder-width apart. Lower the barbell to your chest, then press it back up to the starting position.</p>',
    primaryMuscleGroups: ['Chest'],
    secondaryMuscleGroups: ['Shoulders', 'Triceps'],
};
