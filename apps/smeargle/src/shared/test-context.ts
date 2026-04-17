import { AsyncLocalStorage } from 'node:async_hooks';

// TODO: move file to a folder. maybe api?

type TestContextData = {
  testId?: string;
};

const testContext = new AsyncLocalStorage<TestContextData>();

/**
 * TODO
 */
export function runWithTestContext<T>(data: TestContextData, callback: () => T): T {
  return testContext.run(data, callback);
}

/**
 * TODO
 */
export function getTestData(): TestContextData | undefined {
  return testContext.getStore();
}
