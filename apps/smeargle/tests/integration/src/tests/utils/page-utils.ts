import { Page } from '@playwright/test';
import { Scenario } from '../../configs/scenarios';
import { AppRequestHeader } from '../../../../../src/shared/config/headers';

/** Sets the test scenario to be used by the mock server. */
export async function setTestScenario(page: Page, scenario: Scenario) {
  await page.setExtraHTTPHeaders({ [AppRequestHeader.TestScenarioId]: scenario });
}
