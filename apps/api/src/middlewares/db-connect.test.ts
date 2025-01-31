import { drizzle } from 'drizzle-orm/d1';

import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { AppBindings } from '@/types';

vi.mock('drizzle-orm/d1', () => ({
    drizzle: vi.fn(),
}));

const mockDbClient = vi.mocked(drizzle).mockImplementation(vi.fn());

const mockEnv: Partial<AppBindings['Bindings']> = {
    DB: {
        prepare: vi.fn(),
        dump: vi.fn(),
        batch: vi.fn(),
        exec: vi.fn(),
    },
};

const app = createApp();
app.get('/', (c) => {
    const db = c.get('db');
    return c.json({ dbConnected: !!db });
});

beforeEach(() => vi.clearAllMocks());

it('calls drizzle db connector', async () => {
    const res = await app.request('/', {}, mockEnv);

    expect(res.status).toBe(STATUS.OK.CODE);

    expect(mockDbClient).toHaveBeenCalledWith(mockEnv.DB, {
        schema: expect.any(Object),
        casing: 'snake_case',
    });
});
