import { mockUser } from '@/__mocks__/session';
import type { InsertRoutine } from '@/db/schema/routine';

import { routineGroupData } from './routine-groups';

export const routineData: InsertRoutine[] = [
    {
        id: 1,
        name: 'Push',
        userId: mockUser!.id,
        description: 'lorem ipsum',
        routineGroupId: routineGroupData[0]!.id,
    },
    {
        id: 2,
        name: 'Pull',
        userId: mockUser!.id,
        description: 'lorem ipsum',
        routineGroupId: routineGroupData[0]!.id,
    },
    {
        id: 3,
        name: 'Legs',
        userId: mockUser!.id,
        description: 'lorem ipsum',
        routineGroupId: routineGroupData[0]!.id,
    },
    {
        id: 4,
        name: 'Full body',
        userId: '8910',
        description: 'lorem ipsum',
        routineGroupId: routineGroupData[1]!.id,
    },
];
