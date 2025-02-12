import { z } from '@hono/zod-openapi';

import { errorSchema } from './error-schema';

describe('errorSchema', () => {
    it('returns a schema with success and error properties', () => {
        const testSchema = z.object({
            name: z.string(),
        });

        const result = errorSchema(testSchema);

        expect(result.shape).toHaveProperty('success');
        expect(result.shape).toHaveProperty('error');
    });

    it('handles array schemas correctly', () => {
        const arraySchema = z.array(
            z.object({
                name: z.string(),
            })
        );

        const result = errorSchema(arraySchema);

        expect(result.shape).toHaveProperty('success');
        expect(result.shape).toHaveProperty('error');
    });
});
