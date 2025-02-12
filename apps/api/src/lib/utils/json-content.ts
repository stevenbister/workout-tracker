import type { ZodSchema } from '@/types.ts';

export const jsonContent = <T extends ZodSchema>(
    schema: T,
    description: string,
    required = false
) => {
    return {
        content: {
            'application/json': {
                schema,
            },
        },
        required,
        description,
    };
};
