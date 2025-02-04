import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc.js';

// Setting return type like this to fix type-error
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient(
    {
        // TODO: make this dynamic or update with env var
        baseURL: `http://localhost:8787${API_PREFIX}/auth`, // the base url of your auth server
    }
);
