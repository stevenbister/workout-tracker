import { eq } from 'drizzle-orm';

import { routine } from '@/db/schema/routine';
import { user as userSchema } from '@/db/schema/users';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppRouteHandler } from '@/types';

import type { ListRoute } from './routines.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');
    const user = c.get('user');

    const routines = await db
        .select({
            id: routine.id,
            name: routine.name,
            description: routine.description,
            userId: routine.userId,
        })
        .from(routine)
        .leftJoin(userSchema, eq(routine.userId, userSchema.id))
        .where(eq(userSchema.id, user?.id ?? ''));

    return c.json(routines, STATUS.OK.CODE);
};
