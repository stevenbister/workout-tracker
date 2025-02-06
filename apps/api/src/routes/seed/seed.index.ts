import { createRouter } from '@/lib/create-app';

import * as handlers from './seed.handlers';
import * as routes from './seed.routes';

export const seed = createRouter().openapi(routes.seed, handlers.seed);
