import { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import { drizzle } from 'drizzle-orm/d1';

import { authAdapter } from '@repo/core/auth/server';

import * as schema from '@/db/schema';

export type AppBindings = {
    Bindings: {
        NODE_ENV: string;
        DB: D1Database;
        BASE_API_URL: string;
        BETTER_AUTH_SECRET: string;
    };
    Variables: {
        db: ReturnType<typeof drizzle<typeof schema>>;
        authAdapter: ReturnType<typeof authAdapter>;
    };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;
