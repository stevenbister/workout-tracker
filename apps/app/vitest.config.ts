import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

import vitestConfig from '@repo/vite-config/vitest';

export default mergeConfig(
    viteConfig,
    defineConfig({
        ...vitestConfig,
        test: {
            ...vitestConfig.test,
            coverage: {
                ...vitestConfig.test?.coverage,
                exclude: [
                    ...configDefaults.coverage.exclude!,
                    './src/main.tsx',
                ],
            },
        },
    })
);
