import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

// eslint-disable-next-line vitest/require-hook -- setup breaks if done inside vitest hooks
setupTestBed({
  browserMode: true,
  teardown: { destroyAfterEach: false },
});
