import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

/**
 * TODO
 */
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}
