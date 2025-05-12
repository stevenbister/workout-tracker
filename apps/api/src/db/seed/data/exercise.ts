import type { InsertExercise } from '@/db/schema/exercise';

export const exerciseData: InsertExercise[] = [
    {
        id: 1,
        name: 'Barbell Bench Press',
        howTo: '<ol><li>Stand underneath a pull-up bar.</li><li>Reach up and grab the bar with an even, overhand grip. Have your hands slightly wider than shoulder width apart.</li><li>Bring your shoulders back and engage your abs.</li><li>Bend your knees to lift your feet off the floor and hang from the bar.</li><li>Take a breath and pull yourself up by bending your elbows.</li><li>Move up as much as possible -- ideally, until your chin is over the bar.</li><li>Hold the top position for a moment.</li><li>Lower yourself slowly by extending your elbows and exhale on the way down.</li></ol>',
    },
    {
        id: 2,
        name: 'Barbell Deadlift',
    },
    {
        id: 3,
        name: 'Barbell Overhead Press',
    },
    {
        id: 4,
        name: 'Barbell Curl',
    },
    {
        id: 5,
        name: 'Barbell Squat',
    },
];
