import type { Context, Next } from 'hono';

import type { AppBindings } from '@/types';

import { session } from './session';

vi.mock('@/middlewares/auth-adapter', () => ({
    authAdapter: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('authAdapter', vi.fn());
        return next();
    },
}));

const mockContext = {
    req: {
        raw: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    },
    get: vi.fn(),
    set: vi.fn(),
} as unknown as Context<AppBindings, string, object>;

const mockNext = vi.fn();

type SetupOptions = {
    session?: {
        user: Partial<AppBindings['Variables']['user']>;
        session: Partial<AppBindings['Variables']['session']>;
    } | null;
};

const setup = async (options?: SetupOptions) => {
    const mockAuthAdapter = {
        api: {
            getSession: vi.fn().mockResolvedValue(options?.session ?? null),
        },
    };

    mockContext.get = vi.fn().mockReturnValue(mockAuthAdapter);

    await session(mockContext, mockNext);

    return {
        authAdapter: mockAuthAdapter,
    };
};

it('sets user and session to null if no session is found', async () => {
    await setup();

    expect(mockContext.set).toHaveBeenCalledWith('user', null);
    expect(mockContext.set).toHaveBeenCalledWith('session', null);
    expect(mockNext).toHaveBeenCalled();
});

it('sets user and session if session is found', async () => {
    const mockSession = {
        user: { id: 'user-id', name: 'Test User' },
        session: { id: 'session-id', token: 'session-token' },
    };

    await setup({
        session: mockSession,
    });

    expect(mockContext.set).toHaveBeenCalledWith('user', mockSession.user);
    expect(mockContext.set).toHaveBeenCalledWith(
        'session',
        mockSession.session
    );
    expect(mockNext).toHaveBeenCalled();
});

it('calls getSession with the correct headers', async () => {
    const { authAdapter } = await setup();

    expect(authAdapter.api.getSession).toHaveBeenCalledWith({
        headers: mockContext.req.raw.headers,
    });
});
