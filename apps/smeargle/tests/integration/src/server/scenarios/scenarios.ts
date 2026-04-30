import { Scenario } from '../../configs/scenarios';
import { standardDatabase } from './standard-scenario';

/** Returns the database for a given scenario. */
export function getScenarioDatabase(scenarios: Set<Scenario>) {
  return standardDatabase;
}
