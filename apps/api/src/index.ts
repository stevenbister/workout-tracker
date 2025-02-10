import { AUTH } from '@repo/core/constants/paths';

import configureOpenAPI from '@/lib/configure-open-api';
import createApp from '@/lib/create-app';
import { index } from '@/routes';
import { exercises } from '@/routes/exercises/exercises.index';
import { muscleGroups } from '@/routes/muscle-groups/muscle-groups.index';
import { seed } from '@/routes/seed/seed.index';

const app = createApp();

configureOpenAPI(app);

const routes = [index, seed, exercises, muscleGroups] as const;

// Better-auth handler
app.on(['POST', 'GET'], `${AUTH}/*`, (c) =>
    c.get('authAdapter').handler(c.req.raw)
);

routes.forEach((route) => {
    app.route('/', route);
});

export default app;
