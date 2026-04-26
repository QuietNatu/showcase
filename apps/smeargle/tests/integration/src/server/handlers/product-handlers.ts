import { HttpResponse, RequestHandler } from 'msw';
import { getGetProductsMockHandler } from '../../../../../src/shared/api/gen/endpoints/products/products.msw';
import { ProductScenario } from '../../configs/scenarios';
import { AppRequestHeader } from '../../../../../src/shared/config/headers';
import { getScenarioDatabase } from '../scenarios/scenarios';

export const productHandlers: RequestHandler[] = [
  getGetProductsMockHandler(({ request }) => {
    const scenario = request.headers.get(AppRequestHeader.TestScenarioId);

    if (scenario === ProductScenario.GetProductsError) {
      // eslint-disable-next-line functional/no-throw-statements, @typescript-eslint/only-throw-error -- TODO
      throw HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const database = getScenarioDatabase(scenario);

    return database.products.all();
  }),
];
