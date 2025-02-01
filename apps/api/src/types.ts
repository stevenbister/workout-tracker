import { OpenAPIHono } from '@hono/zod-openapi';
import { drizzle } from 'drizzle-orm/d1';

import * as schema from '@/db/schema';

export type AppBindings = {
    Bindings: {
        NODE_ENV: string;
        DB: D1Database;
    };
    Variables: {
        db: ReturnType<typeof drizzle<typeof schema>>;
    };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;
