import { drizzle } from 'drizzle-orm/d1';
import { createMiddleware } from 'hono/factory';

import * as schema from '@/db/schema';
import { Bindings } from '@/types';

export const dbConnect = createMiddleware<{
    Bindings: Bindings;
    Variables: {
        db: ReturnType<typeof drizzle<typeof schema>>;
    };
}>(async (c, next) => {
    c.set(
        'db',
        drizzle(c.env.DB, {
            schema,
            casing: 'snake_case',
        })
    );
    await next();
});
