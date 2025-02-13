import { mockUser } from '@/__mocks__/session';
import type { InsertRoutine } from '@/db/schema/routine';

export const routineData: InsertRoutine[] = [
    {
        id: 1,
        name: 'Push',
        userId: mockUser!.id,
        description: 'lorem ipsum',
    },
    {
        id: 2,
        name: 'Pull',
        userId: mockUser!.id,
        description: 'lorem ipsum',
    },
    {
        id: 3,
        name: 'Legs',
        userId: mockUser!.id,
        description: 'lorem ipsum',
    },
    {
        id: 4,
        name: 'Full body',
        userId: '8910',
        description: 'lorem ipsum',
    },
];
