import type { Page } from '@playwright/test';

import { AppRequestHeader } from '../../../../../src/shared/config/headers';
import type { Scenario } from '../../configs/scenarios';
import { createTestScenariosHeader } from '../../utils/test-scenario';

/** Sets the test scenario to be used by the mock server. */
export async function setTestScenario(page: Page, ...scenarios: Scenario[]) {
  await page.setExtraHTTPHeaders({
    [AppRequestHeader.TestScenarios]: createTestScenariosHeader(scenarios),
  });
}
