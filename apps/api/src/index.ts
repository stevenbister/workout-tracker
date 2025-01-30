import { Hono } from 'hono';

import { dbConnect } from './middlewares/db-connect';
import { Bindings } from './types';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', dbConnect, async (c) => {
    const db = c.var.db;
    const users = await db.query.users.findMany();

    return c.json(users);
});

export default app;
