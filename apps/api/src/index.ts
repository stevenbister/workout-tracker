import { API_PREFIX } from '@repo/core/constants/misc';

import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import { index } from './routes';

const app = createApp();

configureOpenAPI(app);

const routes = [index] as const;

// Better-auth handler
app.on(['POST', 'GET'], `${API_PREFIX}/auth/*`, (c) =>
    c.get('authAdapter').handler(c.req.raw)
);

routes.forEach((route) => {
    app.route('/', route);
});

export default app;
