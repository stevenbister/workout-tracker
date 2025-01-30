import vitestConfig from '@repo/vite-config/vitest';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

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
