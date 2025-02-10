import { afterAll, beforeAll } from 'vitest';

import { clearTables, seed } from './src/db/seed';
import { testDB } from './src/db/test/test-adapter';

beforeAll(async () => await seed(testDB));
afterAll(async () => await clearTables(testDB));
