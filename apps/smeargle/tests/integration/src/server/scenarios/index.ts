import { Scenario } from '../../configs/scenarios';
import { defaultDatabase } from './default-scenario';

/** Picks the database based on the provided scenarios. */
export function getScenarioDatabase(scenarios: Set<Scenario>) {
  return defaultDatabase;
}
