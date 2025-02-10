import { muscleGroup } from '@/db/schema';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppRouteHandler } from '@/types';

import type { ListRoute } from './muscle-groups.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');

    const muscleGroups = await db
        .select({ id: muscleGroup.id, name: muscleGroup.name })
        .from(muscleGroup);

    return c.json(muscleGroups, STATUS.OK.CODE);
};
