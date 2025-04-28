import type { RoutineGroups } from '@/types/api';

export const mockRoutineGroups: RoutineGroups = [
    {
        id: 1,
        name: 'PPL',
        routines: [
            {
                id: 1,
                name: 'Push',
                description: 'lorem ipsum',
                exercises: [
                    {
                        id: 1,
                        restTime: 120,
                        name: 'Barbell Bench Press',
                        sets: [
                            {
                                id: 1,
                                setNumber: 1,
                                weight: 100,
                                maxReps: 10,
                                minReps: 8,
                            },
                        ],
                    },
                    {
                        id: 2,
                        restTime: 240,
                        name: 'Barbell Deadlift',
                        sets: [
                            {
                                id: 1,
                                setNumber: 1,
                                weight: 100,
                                maxReps: 10,
                                minReps: 8,
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                name: 'Pull',
                description: 'lorem ipsum',
                exercises: [],
            },
            {
                id: 3,
                name: 'Legs',
                description: 'lorem ipsum',
                exercises: [],
            },
        ],
    },
];
