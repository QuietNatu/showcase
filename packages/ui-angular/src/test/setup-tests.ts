import { beforeAll } from 'vitest';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

beforeAll(() => {
  setupTestBed({ browserMode: true });
});
