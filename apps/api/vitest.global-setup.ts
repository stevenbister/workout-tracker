import { seed } from './src/db/seed';
import { testDB } from './src/db/test/test-adapter';

export default async function setup() {
    await seed(testDB);
}
