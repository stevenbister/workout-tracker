import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';

export const onError: ErrorHandler = (err, c) => {
    const currentStatus =
        'status' in err ? err.status : c.newResponse(null).status;

    const statusCode =
        currentStatus !== STATUS_CODES.OK
            ? (currentStatus as ContentfulStatusCode)
            : STATUS_CODES.INTERNAL_SERVER_ERROR;

    const env = c.env?.NODE_ENV ?? 'development';

    return c.json(
        {
            message: err.message,
            stack: env === 'production' ? undefined : err.stack,
        },
        statusCode
    );
};
