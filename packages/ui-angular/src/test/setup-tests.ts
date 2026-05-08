import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { beforeAll } from 'vitest';

beforeAll(() => {
  setupTestBed({
    browserMode: true,
    teardown: { destroyAfterEach: false },
  });
});
