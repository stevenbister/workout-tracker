import { config } from '@repo/eslint-config/react';
import pluginRouter from '@tanstack/eslint-plugin-router';

/** @type {import("eslint").Linter.Config} */
export default [
    ...pluginRouter.configs['flat/recommended'],
    ...config,
    {
        ignores: ['./src/routeTree.gen.ts'],
    },
];
