import type { RequestHandler } from 'msw';
import { HttpResponse } from 'msw';

import { getGetProductsMockHandler } from '../../../../../src/shared/api/gen/endpoints/products/products.msw';
import { ProductScenario } from '../../configs/scenarios';
import { getTestScenariosHeader } from '../../utils/test-scenario';
import { getScenarioDatabase } from '../scenarios';

export const productHandlers: RequestHandler[] = [
  getGetProductsMockHandler(({ request }) => {
    const scenarios = getTestScenariosHeader(request.headers);

    if (scenarios.has(ProductScenario.GetProductsError)) {
      throw HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const database = getScenarioDatabase(scenarios);
    return database.products.all();
  }),
];
