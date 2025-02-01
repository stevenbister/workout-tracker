import { OpenAPIHono } from '@hono/zod-openapi';
import { drizzle } from 'drizzle-orm/d1';

import * as schema from '@/db/schema';

export type AppBindings = {
    Bindings: {
        NODE_ENV: string;
        DB: D1Database;
        BETTER_AUTH_URL: string;
        BETTER_AUTH_SECRET: string;
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
