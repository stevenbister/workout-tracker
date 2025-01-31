import { z } from '@hono/zod-openapi';

export const messageSchema = (exampleMessage: string = 'Hello world') => {
    return z
        .object({
            message: z.string(),
        })
        .openapi({
            example: {
                message: exampleMessage,
            },
        });
};
