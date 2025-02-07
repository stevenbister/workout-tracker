import type { AuthSession, AuthUser } from '@/types';

export const mockUser: AuthUser = {
    id: '1234',
    name: 'Test McGee',
    email: 'test@test.com',
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const mockSession: AuthSession = {
    id: '4567',
    token: 'adofjasdlfkhasdf',
    userId: mockUser.id,
    ipAddress: null,
    userAgent: null,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};
