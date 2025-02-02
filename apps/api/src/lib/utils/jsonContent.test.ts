import { z } from 'zod';

import { jsonContent } from './jsonContent';

describe('jsonContent', () => {
    it('should return the correct content and description', () => {
        const schema = z.object({
            name: z.string(),
            age: z.number(),
        });
        const description = 'A sample description';

        const result = jsonContent(schema, description);

        expect(result).toEqual({
            content: {
                'application/json': {
                    schema,
                },
            },
            description,
        });
    });

    it('should work with different schemas', () => {
        const schema = z.object({
            title: z.string(),
            completed: z.boolean(),
        });
        const description = 'Another sample description';

        const result = jsonContent(schema, description);

        expect(result).toEqual({
            content: {
                'application/json': {
                    schema,
                },
            },
            description,
        });
    });

    it('should handle empty schemas', () => {
        const schema = z.object({});
        const description = 'Empty schema description';

        const result = jsonContent(schema, description);

        expect(result).toEqual({
            content: {
                'application/json': {
                    schema,
                },
            },
            description,
        });
    });
});
