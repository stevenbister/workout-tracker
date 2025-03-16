import type {
    OpenAPIHono,
    RouteConfig,
    RouteHandler,
    z,
} from '@hono/zod-openapi';
import type { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import type { drizzle as drizzleD1 } from 'drizzle-orm/d1';

import type { getAuth } from '@repo/core/auth/server';

import type * as schema from '@/db/schema';

export type DrizzleD1 = ReturnType<typeof drizzleD1<typeof schema>>;
export type DrizzleSqlite = ReturnType<typeof drizzleSqlite<typeof schema>>;

export type Auth = ReturnType<typeof getAuth>;
export type AuthUser = Auth['$Infer']['Session']['user'];
export type AuthSession = Auth['$Infer']['Session']['session'];

export type AppBindings = {
    Bindings: {
        ENV: string;
        DB: D1Database;
        BASE_API_URL: string;
        BASE_CLIENT_URL: string;
        BETTER_AUTH_SECRET: string;
        API_KEY: string;
    };
    Variables: {
        db: DrizzleD1;
        authAdapter: Auth;
        user: AuthUser;
        session: AuthSession;
    };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;

export type ZodSchema = z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
