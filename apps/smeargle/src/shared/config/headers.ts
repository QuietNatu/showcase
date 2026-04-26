export const AppRequestHeader = {
  TestScenarioId: 'test-scenario-id',
} as const;

export type AppRequestHeader = (typeof AppRequestHeader)[keyof typeof AppRequestHeader];
