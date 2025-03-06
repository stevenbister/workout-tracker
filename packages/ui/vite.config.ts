import { defineConfig } from 'vite';

import config from '@repo/vite-config/vite';

import createSpritesheet from './plugins/create-spritesheet';

export default defineConfig({
    ...config,
    plugins: [
        ...config.plugins,
        createSpritesheet({
            targets: [{ src: 'src/icons', dest: 'static' }],
            hook: 'buildStart',
        }),
    ],
});
