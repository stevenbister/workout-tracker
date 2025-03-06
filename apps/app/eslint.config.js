import { config } from '@repo/eslint-config/react';
import pluginRouter from '@tanstack/eslint-plugin-router';

/** @type {import("eslint").Linter.Config} */
export default [
    ...pluginRouter.configs['flat/recommended'],
    ...config,
    {
        ignores: ['./src/routeTree.gen.ts'],
        rules: {
            ...config.rules,
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@testing-library/react',
                            message:
                                "Please do not import from '@testing-library/react'. Import from '@repo/ui/tests/utils' instead.",
                        },
                    ],
                },
            ],
        },
    },
];
