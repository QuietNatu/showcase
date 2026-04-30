import { HttpResponse, RequestHandler } from 'msw';
import { getGetProductsMockHandler } from '../../../../../src/shared/api/gen/endpoints/products/products.msw';
import { ProductScenario } from '../../configs/scenarios';
import { getScenarioDatabase } from '../scenarios/scenarios';
import { getTestScenariosHeader } from '../../utils/test-scenario';

export const productHandlers: RequestHandler[] = [
  getGetProductsMockHandler(({ request }) => {
    const scenarios = getTestScenariosHeader(request.headers);

    if (scenarios.has(ProductScenario.GetProductsError)) {
      // eslint-disable-next-line functional/no-throw-statements, @typescript-eslint/only-throw-error -- TODO
      throw HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const database = getScenarioDatabase(scenarios);
    return database.products.all();
  }),
];
