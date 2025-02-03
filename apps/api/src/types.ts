import type {
    OpenAPIHono,
    RouteConfig,
    RouteHandler,
    z,
} from '@hono/zod-openapi';
import type { drizzle } from 'drizzle-orm/d1';

import type { getAuth } from '@repo/core/auth/server';

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
        authAdapter: ReturnType<typeof getAuth>;
    };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;

export type ZodSchema = z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
