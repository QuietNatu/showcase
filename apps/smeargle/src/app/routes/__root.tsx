import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import appCss from '../../styles/styles.scss?url';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppLayout } from '../layouts/app-layout';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Smeargle' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <AppLayout>
          <Outlet />
        </AppLayout>

        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
