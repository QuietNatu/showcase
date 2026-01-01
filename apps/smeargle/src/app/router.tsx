import { createRouter } from '@tanstack/react-router';
import { routeTree } from './route-tree.gen';

/**
 * TODO
 */
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPendingMs: 0,
    // Should be improved later
    defaultPendingComponent: () => <>Loading...</>,
    // Should be improved later
    defaultErrorComponent: ({ error, reset }) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>An unexpected error has occurred:</span>
        <output>{error.message}</output>
        <div>
          <button type="button" onClick={reset}>
            Reload
          </button>
        </div>
      </div>
    ),
  });

  return router;
}
