export const ProductScenario = {
  GetProductsError: 'GET_PRODUCTS_ERROR',
} as const;

export type ProductScenario = (typeof ProductScenario)[keyof typeof ProductScenario];

export const Scenario = {
  Default: 'DEFAULT',
  ...ProductScenario,
} as const;

export type Scenario = (typeof Scenario)[keyof typeof Scenario];
