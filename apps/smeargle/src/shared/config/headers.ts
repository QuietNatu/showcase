export const AppRequestHeader = {
  TestScenarios: 'test-scenarios',
} as const;

export type AppRequestHeader = (typeof AppRequestHeader)[keyof typeof AppRequestHeader];
