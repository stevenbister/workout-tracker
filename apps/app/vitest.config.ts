import { mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

import vitestConfig from '@repo/vite-config/vitest';

export default mergeConfig(viteConfig, vitestConfig);
