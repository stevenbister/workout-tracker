import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

import vitestConfig from '@repo/vite-config/vitest';

export default defineConfig({
    test: {
        ...vitestConfig.test,
        globalSetup: ['./vitest.global-setup.ts'],
        coverage: {
            ...vitestConfig.test?.coverage,
            exclude: [
                ...configDefaults.coverage.exclude!,
                './*.config.ts',
                './vitest.*.ts',
                'src/**/constants.ts',
                'src/{env,types}.ts',
                'src/db',
                'src/routes/seed',
                'src/index.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
