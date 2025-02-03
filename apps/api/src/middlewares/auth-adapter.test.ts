import { getAuth } from '@repo/core/auth/server';

import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { AppBindings } from '@/types';

vi.mock('@repo/core/auth/server', () => ({
    getAuth: vi.fn(),
}));

const mockAuthAdapter = vi.mocked(getAuth).mockImplementation(vi.fn());

const mockEnv: Partial<AppBindings['Bindings']> = {
    BASE_API_URL: 'http://localhost:8787',
};

const app = createApp();
app.get('/', (c) => {
    const auth = c.get('authAdapter');
    return c.json({ authConnected: !!auth });
});

beforeEach(() => vi.clearAllMocks());

it('calls the auth adapter', async () => {
    const res = await app.request('/', {}, mockEnv);

    expect(res.status).toBe(STATUS.OK.CODE);

    expect(mockAuthAdapter).toHaveBeenCalledTimes(1);
});
