import createApp from './lib/create-app';

const app = createApp();

app.get('/', async (c) => {
    const db = c.var.db;
    const users = await db.query.users.findMany();

    return c.json(users);
});

// TODO: Configure open api

export default app;
