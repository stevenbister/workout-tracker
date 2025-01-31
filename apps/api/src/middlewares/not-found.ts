import type { NotFoundHandler } from 'hono';

import { STATUS } from '@/lib/constants/http-status-codes';

export const notFound: NotFoundHandler = (c) => {
    return c.json(
        {
            message: `Not found - ${c.req.path}`,
        },
        STATUS.NOT_FOUND.CODE
    );
};
