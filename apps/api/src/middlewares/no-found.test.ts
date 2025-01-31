import { Context } from 'hono';

import { STATUS_CODES } from '@/lib/constants/http-status-codes';

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
            message: `Not found - ${c.req.path}`,
        },
        STATUS_CODES.NOT_FOUND
    );
});
