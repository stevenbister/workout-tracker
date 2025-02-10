import { equipment } from '@/db/schema/equipment';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppRouteHandler } from '@/types';

import type { ListRoute } from './equipment.routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const db = c.get('db');

    const equipmentList = await db
        .select({ id: equipment.id, name: equipment.name })
        .from(equipment);

    return c.json(equipmentList, STATUS.OK.CODE);
};
