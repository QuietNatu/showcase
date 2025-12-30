import { delay, http } from 'msw';
import { getGetProductsMockHandler } from '../../../gen/api/endpoints/products/products.msw';
import { mockDatabase } from '../database/database';

export const handlers = [
  getGetProductsMockHandler(() => {
    return mockDatabase.products.all();
  }),
];

/** Handlers with an initial delay to simulate real network requests */
export const developmentHandlers = [http.all('*', async () => delay(500)), ...handlers];
