import { AppRequestHeader } from '../../../../src/shared/config/headers';
import { Scenario } from '../configs/scenarios';

const SCENARIO_SEPARATOR = ',';

/**
 * Creates the header to be used to modify the responses of the mock server.
 */
export function createTestScenariosHeader(scenarios: Scenario[]): string {
  return scenarios.join(SCENARIO_SEPARATOR);
}

/**
 * Gets and transforms the test scenarios from the request headers.
 */
export function getTestScenariosHeader(headers: Headers): Set<Scenario> {
  const header = headers.get(AppRequestHeader.TestScenarios);
  return new Set(header?.split(SCENARIO_SEPARATOR)) as Set<Scenario>;
}
