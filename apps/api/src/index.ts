import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import { index } from './routes';
import { authRouter } from './routes/auth';

const app = createApp();

configureOpenAPI(app);

const routes = [index, authRouter] as const;

routes.forEach((route) => {
    app.route('/', route);
});

export default app;
