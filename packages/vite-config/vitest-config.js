import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./src/**/*.test.{ts,tsx}'],
        globals: true,
        environment: 'jsdom',
        setupFiles: ['@repo/core/tests/setup.ts'],
    },
});
