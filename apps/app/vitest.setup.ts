import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

import { cleanup } from '@repo/ui/tests/utils';

afterEach(() => cleanup());
