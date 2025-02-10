import { createRouter } from '@/lib/create-app';

import * as handlers from './equipment.handlers';
import * as routes from './equipment.routes';

export const equipment = createRouter().openapi(routes.list, handlers.list);
