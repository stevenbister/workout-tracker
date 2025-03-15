import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc';
import { authClient } from './client';

vi.mock('better-auth/react');

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

it('creates auth client with correct baseURL', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    authClient;

    expect(createAuthClient).toHaveBeenNthCalledWith(1, {
        baseURL: `${apiUrl}${API_PREFIX}/auth`,
        fetchOptions: {
            headers: {
                'x-api-key': apiKey,
            },
        },
    });
});
