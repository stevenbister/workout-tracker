import { createMiddleware } from 'hono/factory';

import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppBindings } from '@/types';

export const checkIsUserAuthenticated = createMiddleware<AppBindings>(
    async (c, next) => {
        if (!c.get('user'))
            return c.json(
                {
                    message: STATUS.UNAUTHORIZED.MESSAGE,
                },
                STATUS.UNAUTHORIZED.CODE
            );

        await next();
    }
);
