import type { TestProject } from 'vitest/node';

import { seed } from './src/db/seed';
import { testDB } from './src/db/test/test-adapter';

export default function setup(project: TestProject) {
    project.onTestsRerun(async () => {
        await seed(testDB);
    });
}
