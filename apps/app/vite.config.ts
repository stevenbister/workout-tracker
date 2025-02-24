import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'node:path';
import { defineConfig } from 'vite';

import config from '@repo/vite-config/vite';

export default defineConfig({
    ...config,
    plugins: [
        TanStackRouterVite({ autoCodeSplitting: true }),
        ...config.plugins,
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
