import { config as reactConfig } from '@repo/eslint-config/react';

/** @type {import("eslint").Linter.Config} */
const config = [
    ...reactConfig,
    {
        rules: {
            ...reactConfig.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@testing-library/react',
                            message:
                                "Please do not import from '@testing-library/react'. Import from '@/tests/utils' instead.",
                        },
                    ],
                },
            ],
        },
    },
];
export default config;
