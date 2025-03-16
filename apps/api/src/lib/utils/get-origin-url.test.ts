import type { Context } from 'hono';

import type { AppBindings } from '@/types';

import { getOriginUrl } from './get-origin-url';

const mockOrigin = 'https://localhost';

const mockContext = (env: string) =>
    ({
        env: {
            ENV: env,
            BASE_CLIENT_URL: mockOrigin,
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
    }) as unknown as Context<AppBindings, any, {}>;

const setup = (env: string) => {
    const c = mockContext(env);

    return getOriginUrl(mockOrigin, c);
};

it('returns empty string if is test env', () => {
    const result = setup('test');

    expect(result).toBe('');
});

it.each(['preview', 'production'])('returns the origin if is %s env', (env) => {
    process.env.NODE_ENV = '';
    const result = setup(env);

    expect(result).toBe(mockOrigin);
    process.env.NODE_ENV = 'test';
});
