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
                        name: 'Barbell Bench Press',
                    },
                    {
                        id: 2,
                        name: 'Barbell Deadlift',
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
