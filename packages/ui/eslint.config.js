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
        },
    },
];
export default config;
