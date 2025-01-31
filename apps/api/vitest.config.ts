import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

import vitestConfig from '@repo/vite-config/vitest';

export default defineConfig({
    test: {
        ...vitestConfig.test,
        coverage: {
            ...vitestConfig.test?.coverage,
            exclude: [
                ...configDefaults.coverage.exclude!,
                './*.config.ts',
                'src/**/constants.ts',
                'src/{env,types}.ts',
                'src/db/schema',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
