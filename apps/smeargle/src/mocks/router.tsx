import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  FileBaseRouteOptions,
  RouterProvider,
} from '@tanstack/react-router';
import { routeTree as appRouteTree } from '../app/routeTree.gen';
import { RootContentLayout } from '../app/routes/-components/root-content-layout';

type MockRouteOptions = { path: string } & FileBaseRouteOptions<unknown>;

type Props = Readonly<{
  /** Initial entry of the history. Controls current shown route. */
  initialEntry: string;
  /** Creates a custom routeTree. Useful for testing components that rely on router data. */
  route?: MockRouteOptions;
}>;

// TODO: using the real router will likely lead to issues, for example with protected routes or with loaders. This should be re-evaluated in the future.

/**
 * Creates an in-memory mock router.
 *
 * Supports either using the app routeTree for testing index routes or using a custom route for testing components that rely on router data.
 */
export function MockRouter(props: Props) {
  const { initialEntry, route } = props;

  const routeTree = route
    ? createRouteTree(route)
    : appRouteTree
        // Use only the content inside the body as tests and storybook already add `<html>` and `<body>` tags.
        .update({ component: RootContentLayout });

  const router = createRouter({
    defaultPendingMs: 0,
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
    routeTree,
  });

  return <RouterProvider router={router} />;
}

function createRouteTree(routeOptions: MockRouteOptions) {
  const rootRoute = createRootRoute({
    component: RootContentLayout,
  });

  const route = createRoute({
    ...routeOptions,
    id: routeOptions.path,
    getParentRoute: () => rootRoute,
  });

  rootRoute.addChildren([route]);

  return rootRoute;
}
