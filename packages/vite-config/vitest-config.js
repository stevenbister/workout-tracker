import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['./src/**/*.test.{ts,tsx}'],
        globals: true,
        coverage: {
            enabled: true,
            reporter: ['text', 'html', 'json', 'json-summary'],
            reportOnFailure: true,
            thresholds: {
                lines: 80,
                branches: 80,
                functions: 80,
                statements: 80,
            },
        },
    },
});
