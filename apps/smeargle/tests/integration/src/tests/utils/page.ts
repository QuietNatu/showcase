import type { Page } from '@playwright/test';
import type { Scenario } from '../../configs/scenarios';
import { AppRequestHeader } from '../../../../../src/shared/config/headers';
import { createTestScenariosHeader } from '../../utils/test-scenario';

/** Sets the test scenario to be used by the mock server. */
export async function setTestScenario(page: Page, ...scenarios: Scenario[]) {
  await page.setExtraHTTPHeaders({
    [AppRequestHeader.TestScenarios]: createTestScenariosHeader(scenarios),
  });
}
