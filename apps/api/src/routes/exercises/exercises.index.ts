import { createRouter } from '@/lib/create-app';

import * as handlers from './exercises.handlers';
import * as routes from './exercises.routes';

export const exercises = createRouter()
    .openapi(routes.list, handlers.list)
    .openapi(routes.getById, handlers.getById);
