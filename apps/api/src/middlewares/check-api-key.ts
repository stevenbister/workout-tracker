import { createMiddleware } from 'hono/factory';

import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppBindings } from '@/types';

export const checkApiKey = createMiddleware<AppBindings>(async (c, next) => {
    if (c.req.header('x-api-key') !== c.env.API_KEY)
        return c.json(
            {
                message: STATUS.UNAUTHORIZED.MESSAGE,
            },
            STATUS.UNAUTHORIZED.CODE
        );

    await next();
});
