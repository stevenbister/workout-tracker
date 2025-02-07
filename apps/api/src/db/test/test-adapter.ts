import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import path from 'node:path';

import * as schema from '@/db/schema';

const sqlite = new Database(path.resolve(__dirname, 'test.db'), {
    fileMustExist: true,
});

export const testDB = drizzle({
    client: sqlite,
    schema,
    casing: 'snake_case',
});
