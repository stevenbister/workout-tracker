import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc.js';

// Setting return type like this to fix type-error
export type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
    baseURL: `${import.meta.env.VITE_API_URL}${API_PREFIX}/auth`, // the base url of your auth server
    fetchOptions: {
        headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
        },
    },
});
