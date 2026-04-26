import { standardDatabase } from './standard-scenario';

/** Returns the database for a given scenario. */
export function getScenarioDatabase(scenario: string | null) {
  // TODO: databases are not enough to define scenarios (like errors)
  return standardDatabase;
}
