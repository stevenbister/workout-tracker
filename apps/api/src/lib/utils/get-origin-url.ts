import type { Context } from 'hono';

import type { AppBindings } from '@/types';

export const getOriginUrl = (origin: string, c: Context<AppBindings>) => {
    if (!origin) return '';

    if (process.env.NODE_ENV === 'test') return '';

    if (c.env.ENV === 'preview') {
        const baseUrl = c.env.BASE_CLIENT_URL.replace('https://', '.');

        if (origin.endsWith(baseUrl)) return origin;
    }

    return c.env.BASE_CLIENT_URL;
};
