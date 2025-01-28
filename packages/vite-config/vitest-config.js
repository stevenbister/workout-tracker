import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./src/**/*.test.{ts,tsx}'],
        globals: true,
        environment: 'jsdom',
        setupFiles: ['../../packages/vite-config/tests/setup.js'],
        coverage: {
            reporter: ['text', 'json', 'json-summary'],
            reportOnFailure: true,
        },
    },
});
