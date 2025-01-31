/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'hono';

import { STATUS } from '@/lib/constants/http-status-codes';

import { notFound } from './not-found';

const mockContext = () =>
    ({
        req: { path: '/test' },
        json: vi.fn(),
    }) as unknown as Context<any, any, object>;

it('returns the 404 status with the request path', () => {
    const c = mockContext();
    notFound(c);

    expect(c.json).toHaveBeenCalledWith(
        {
            message: `${STATUS.NOT_FOUND.MESSAGE} - ${c.req.path}`,
        },
        STATUS.NOT_FOUND.CODE
    );
});
