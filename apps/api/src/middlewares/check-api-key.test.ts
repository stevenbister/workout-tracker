import type { Context } from 'hono';

import { mockApiKey } from '@/__mocks__/headers';
import { STATUS } from '@/lib/constants/http-status-codes';
import type { AppBindings } from '@/types';

import { checkApiKey } from './check-api-key';

const mockContext = () =>
    ({
        req: {
            path: '/test',
            header: vi.fn(),
        },
        json: vi.fn(),
        env: {
            API_KEY: mockApiKey,
        },
    }) as unknown as Context<AppBindings, string, object>;

beforeEach(() => vi.clearAllMocks());

it('returns unauthorized if the api key header does not match the api key', async () => {
    const c = mockContext();
    await checkApiKey(c, vi.fn());

    expect(c.json).toHaveBeenCalledWith(
        {
            message: `${STATUS.UNAUTHORIZED.MESSAGE}`,
        },
        STATUS.UNAUTHORIZED.CODE
    );
});
