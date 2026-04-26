import { RequestHandler } from 'msw';
import { productHandlers } from './product-handlers';

export const handlers: RequestHandler[] = [...productHandlers];
