import { Context, Next } from 'hono';

import { AppBindings } from '@/types';

import configureOpenAPI from './configure-open-api';
import { STATUS_CODES } from './constants/http-status-codes';
import createApp from './create-app';

vi.mock('@/middlewares/db-connect', () => ({
    dbConnect: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('db', vi.fn());
        return next();
    },
}));

const app = createApp();
configureOpenAPI(app);

it('configures the /doc route', async () => {
    const res = await app.request('/doc');

    expect(res.status).toBe(STATUS_CODES.OK);

    if (res.status === STATUS_CODES.OK) {
        const data = await res.json();
        expect(data).toEqual({
            info: {
                title: 'Workout Tracker API',
                version: '0.0.0',
            },
            openapi: '3.0.0',
            components: expect.anything(),
            paths: expect.anything(),
        });
    }
});

it('configures the /reference route', async () => {
    const res = await app.request('/reference');

    expect(res.status).toBe(STATUS_CODES.OK);
});
