import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc.js';

// Setting return type like this to fix type-error
export type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
    // TODO: make this dynamic or update with env var
    baseURL: `http://localhost:8787${API_PREFIX}/auth`, // the base url of your auth server
});
