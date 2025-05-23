import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import vitestConfig from '@repo/vite-config/vitest';

import viteConfig from './vite.config.ts';

export default mergeConfig(
    viteConfig,
    defineConfig({
        ...vitestConfig,
        test: {
            ...vitestConfig.test,
            environment: 'jsdom',
            setupFiles: ['./vitest.setup.ts'],
            coverage: {
                ...vitestConfig.test?.coverage,
                exclude: [
                    ...configDefaults.coverage.exclude!,
                    './src/main.tsx',
                    './src/routes/__root.tsx',
                    './src/routeTree.gen.ts',
                    'src/**/constants.ts',
                    'src/types/*.ts',
                ],
            },
        },
    })
);
