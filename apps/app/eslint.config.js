import { config } from '@repo/eslint-config/react';

/** @type {import("eslint").Linter.Config} */
export default [
    ...config,
    {
        ignores: ['./src/routeTree.gen.ts'],
    },
];
