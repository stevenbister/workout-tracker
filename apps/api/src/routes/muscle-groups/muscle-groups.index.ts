import { createRouter } from '@/lib/create-app';

import * as handlers from './muscle-groups.handlers';
import * as routes from './muscle-groups.routes';

export const muscleGroups = createRouter().openapi(routes.list, handlers.list);
