import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

import { cleanup } from './src/tests/utils';

afterEach(() => cleanup());
