import { createAuthClient } from 'better-auth/react';

import { API_PREFIX } from '../constants/misc.js';

export const authClient = createAuthClient({
    // TODO: make this dynamic or update with env var
    baseURL: `http://localhost:8787${API_PREFIX}/auth`, // the base url of your auth server
});
