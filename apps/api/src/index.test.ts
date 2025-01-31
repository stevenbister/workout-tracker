import { Context, Next } from 'hono';

import { AppBindings } from '@/types';

import app from './index';

vi.mock('@/middlewares/db-connect', () => ({
    dbConnect: (c: Context<AppBindings, string, object>, next: Next) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        c.set<any>('db', vi.fn());
        return next();
    },
}));

const routes = [
    {
        path: '/*',
        method: 'ALL',
        handler: expect.any(Function),
    },
    {
        path: '/doc',
        method: 'GET',
        handler: expect.any(Function),
    },
    {
        path: '/reference',
        method: 'GET',
        handler: expect.any(Function),
    },
    {
        path: '/',
        method: 'GET',
        handler: expect.any(Function),
    },
];

it('loads the routes', () => {
    expect(app.routes).toEqual(routes);
});
