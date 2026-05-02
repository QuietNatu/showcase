import { AsyncLocalStorage } from 'node:async_hooks';

type TestContextData = {
  testScenariosHeader?: string;
};

const apiTestContext = new AsyncLocalStorage<TestContextData>();

/**
 * Executes a callback function within an API test context.
 * This enables API test data to be propagated without passing it directly.
 */
export function runWithApiTestContext<T>(data: TestContextData, callback: () => T): T {
  return apiTestContext.run(data, callback);
}

/** Retrieves the current API test context data. */
export function getApiTestData(): TestContextData | undefined {
  return apiTestContext.getStore();
}
