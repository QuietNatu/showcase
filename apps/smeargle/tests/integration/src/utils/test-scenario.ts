import { AppRequestHeader } from '../../../../src/shared/config/headers';
import { Scenario } from '../configs/scenarios';

const SCENARIO_SEPARATOR = ',';

/**
 * TODO:
 */
export function createTestScenariosHeader(scenarios: Scenario[]): string {
  return scenarios.join(SCENARIO_SEPARATOR);
}

/**
 * TODO:
 */
export function getTestScenariosHeader(headers: Headers): Set<Scenario> {
  const header = headers.get(AppRequestHeader.TestScenarios);
  return new Set(header?.split(SCENARIO_SEPARATOR)) as Set<Scenario>;
}
