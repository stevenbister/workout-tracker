import type { RoutineWithExercises } from './create-routines-map';
import { createRoutinesMap } from './create-routines-map';

it('creates a map with routines and their exercises', async () => {
    const mockRoutines = [
        {
            id: 1,
            name: 'Routine 1',
            description: 'Description 1',
            exercises: {
                id: 1,
                routineId: 1,
                name: 'Exercise 1',
            },
        },
        {
            id: 1,
            name: 'Routine 1',
            description: 'Description 1',
            exercises: {
                id: 2,
                routineId: 1,
                name: 'Exercise 2',
            },
        },
        {
            id: 2,
            name: 'Routine 2',
            description: 'Description 2',
            exercises: {
                id: 3,
                routineId: 2,
                name: 'Exercise 3',
            },
        },
    ] as unknown as RoutineWithExercises[];

    const routineMap = await createRoutinesMap(mockRoutines);

    expect(routineMap.size).toBe(2);
    expect(routineMap.get(1)).toEqual({
        id: mockRoutines[0]!.id,
        name: mockRoutines[0]!.name,
        description: mockRoutines[0]!.description,
        exercises: [
            {
                id: mockRoutines[0]!.exercises!.id,
                routineId: mockRoutines[0]!.exercises!.routineId,
                name: mockRoutines[0]!.exercises!.name,
            },
            {
                id: mockRoutines[1]!.exercises!.id,
                routineId: mockRoutines[1]!.exercises!.routineId,
                name: mockRoutines[1]!.exercises!.name,
            },
        ],
    });
    expect(routineMap.get(2)).toEqual({
        id: mockRoutines[2]!.id,
        name: mockRoutines[2]!.name,
        description: mockRoutines[2]!.description,
        exercises: [
            {
                id: mockRoutines[2]!.exercises!.id,
                routineId: mockRoutines[2]!.exercises!.routineId,
                name: mockRoutines[2]!.exercises!.name,
            },
        ],
    });
});

// it('should handle routines with no exercises', async () => {
//     const routines = [
//         {
//             id: 1,
//             name: 'Routine 1',
//             description: 'Description 1',
//             exercises: null,
//         },
//     ];

//     const routineMap = await createRoutinesMap(routines);

//     expect(routineMap.size).toBe(1);
//     expect(routineMap.get(1)).toEqual({
//         id: 1,
//         name: 'Routine 1',
//         description: 'Description 1',
//         exercises: [],
//     });
// });

// it('should handle an empty array of routines', async () => {
//     const routines: RoutineWithExercises[] = [];

//     const routineMap = await createRoutinesMap(routines);

//     expect(routineMap.size).toBe(0);
// });
