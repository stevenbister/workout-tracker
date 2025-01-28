import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            include: ['./src/**/*.test.{ts,tsx}'],
            globals: true,
            environment: 'jsdom',
            setupFiles: ['@repo/core/setup-tests/react.ts'],
            coverage: {
                exclude: [
                    ...configDefaults.coverage.exclude!,
                    './src/**/*.stories.{ts,tsx}',
                ],
            },
        },
    })
);
