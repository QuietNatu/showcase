import { DefaultBodyType, PathParams, ResponseResolver } from 'msw';
import { HttpRequestResolverExtras } from 'node_modules/msw/lib/core/handlers/HttpHandler';

export type HttpResponseResolver<
  Params extends PathParams<keyof Params> = PathParams,
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  ResponseBodyType extends DefaultBodyType = undefined,
> = ResponseResolver<HttpRequestResolverExtras<Params>, RequestBodyType, ResponseBodyType>;
