import { betterAuth } from 'better-auth';

import { STATUS } from '@/lib/constants/http-status-codes';
import createApp from '@/lib/create-app';
import { AppBindings } from '@/types';

vi.mock('better-auth', () => ({
    betterAuth: vi.fn(),
}));

const mockAuthAdapter = vi.mocked(betterAuth).mockImplementation(vi.fn());

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

    expect(mockAuthAdapter).toHaveBeenCalledWith({
        database: expect.any(Function),
        baseURL: mockEnv.BASE_API_URL,
        emailAndPassword: {
            enabled: true,
            password: {
                hash: expect.any(Function),
                verify: expect.any(Function),
            },
        },
    });
});
