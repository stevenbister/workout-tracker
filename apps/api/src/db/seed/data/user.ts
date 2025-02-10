import { mockUser } from '@/__mocks__/session';
import type { InsertUser, User } from '@/db/schema/users';

export const userData: InsertUser[] = [
    mockUser as User,
    {
        ...(mockUser as User),
        id: '8910',
        name: 'User 2',
        email: 'User-2@email.com',
    },
];
