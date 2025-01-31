import type { NotFoundHandler } from 'hono';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';

export const notFound: NotFoundHandler = (c) => {
    return c.json(
        {
            message: `Not found - ${c.req.path}`,
        },
        STATUS_CODES.NOT_FOUND
    );
};
