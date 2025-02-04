import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc';
import { authClient } from './client';

vi.mock('better-auth/react');

it('creates auth client with correct baseURL', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    authClient;

    expect(createAuthClient).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
            baseURL: `http://localhost:8787${API_PREFIX}/auth`,
        })
    );
});
