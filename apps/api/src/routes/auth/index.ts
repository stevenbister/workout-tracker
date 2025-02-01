import { createRouter } from '@/lib/create-app';

import * as handlers from './auth.handlers';
import * as routes from './auth.routes';

export const authRouter = createRouter()
    .openapi(routes.signUp, handlers.signUp)
    .openapi(routes.signIn, handlers.signIn)
    .openapi(routes.signOut, handlers.signOut);
