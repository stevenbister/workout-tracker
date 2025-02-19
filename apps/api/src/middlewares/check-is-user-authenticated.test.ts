import type { Context } from 'hono';

import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppBindings } from '@/types';

import { checkIsUserAuthenticated } from './check-is-user-authenticated';

const mockContext = () =>
    ({
        req: { path: '/test' },
        json: vi.fn(),
        get: () => null,
    }) as unknown as Context<AppBindings, string, object>;

beforeEach(() => vi.clearAllMocks());

it('returns unauthorized if c.get(user) returns null', async () => {
    const c = mockContext();
    await checkIsUserAuthenticated(c, async () => {});

    expect(c.json).toHaveBeenCalledWith(
        {
            message: `${STATUS.UNAUTHORIZED.MESSAGE}`,
        },
        STATUS.UNAUTHORIZED.CODE
    );
});
