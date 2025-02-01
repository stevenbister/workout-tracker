import { createAuthClient } from 'better-auth/react';

export const authClient = (baseURL: string) => {
    const client = createAuthClient({
        baseURL,
    });

    return client;
};
