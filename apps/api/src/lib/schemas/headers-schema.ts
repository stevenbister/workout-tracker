import { z } from '@hono/zod-openapi';

const cookieSchema = z.object({
    Cookie: z.string(),
});

export const headersSchema = {
    headers: z.object({
        'x-api-key': z.string(),
    }),
};

export const headersSchemaWithCookie = {
    headers: headersSchema.headers.merge(cookieSchema),
};
