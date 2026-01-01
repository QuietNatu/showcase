import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouteComponent,
  RouterProvider,
} from '@tanstack/react-router';
import { ReactNode } from 'react';

type Props = Readonly<{
  /**
   * Initial entry of the history. Controls current shown route.
   * @default '/''
   */
  initialEntry?: string;
  /**
   * Path of the route
   * @default '/''
   */
  routePath?: string;
  /** Content to be rendered by the route */
  children: ReactNode;
}>;

type CreateRouteTreeOptions = {
  path: string;
  component: RouteComponent;
};

/**
 * Creates an in-memory mock router to test components that rely on the router.
 */
export function MockRouter(props: Props) {
  const { initialEntry = '/', routePath = '/', children } = props;

  const router = createRouter({
    defaultPendingMs: 0,
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
    routeTree: createRouteTree({ path: routePath, component: () => children }),
  });

  return <RouterProvider router={router} />;
}

function createRouteTree(routeOptions: CreateRouteTreeOptions) {
  const rootRoute = createRootRoute({ component: Outlet });

  const route = createRoute({
    ...routeOptions,
    getParentRoute: () => rootRoute,
  });

  rootRoute.addChildren([route]);

  return rootRoute;
}
