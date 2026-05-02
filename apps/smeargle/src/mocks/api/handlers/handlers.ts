import { delay, http } from 'msw';
import { mockDatabase } from '../database/database';
import { getGetProductsMockHandler } from '../../../shared/api/gen/endpoints/products/products.msw';

export const handlers = [
  getGetProductsMockHandler(() => {
    return mockDatabase.products.all();
  }),
];

/** Handlers with an initial delay to simulate real network requests */
export const developmentHandlers = [http.all('*', async () => delay(500)), ...handlers];
