import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            include: ['./src/**/*.test.{ts,tsx}'],
            globals: true,
            environment: 'jsdom',
            setupFiles: ['@repo/core/tests/setup.ts'],
        },
    })
);
