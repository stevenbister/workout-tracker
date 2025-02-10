import { createRouter } from '@/lib/create-app';

import * as handlers from './routines.handlers';
import * as routes from './routines.routes';

export const routines = createRouter().openapi(routes.list, handlers.list);
