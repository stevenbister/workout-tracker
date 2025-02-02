import { APIError } from 'better-auth/api';
import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { STATUS } from '@/lib/constants/http-status-codes';

export const onError: ErrorHandler = (err, c) => {
    const currentStatus =
        'status' in err ? err.status : c.newResponse(null).status;

    const statusCode =
        currentStatus !== STATUS.OK.CODE
            ? (currentStatus as ContentfulStatusCode)
            : STATUS.INTERNAL_SERVER_ERROR.CODE;

    const env = c.env?.NODE_ENV ?? 'development';

    if (err instanceof APIError) {
        return c.json(
            {
                message: err.body.message,
                stack: env === 'production' ? undefined : err,
            },
            STATUS.INTERNAL_SERVER_ERROR.CODE
        );
    }

    return c.json(
        {
            message: err.message,
            stack: env === 'production' ? undefined : err.stack,
        },
        statusCode
    );
};
