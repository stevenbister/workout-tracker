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
                'src/{env,types}.ts',
            ],
        },
    },
});
