import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import appCss from '../../styles/styles.scss?url';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

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
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
        <Scripts />
      </body>
    </html>
  );
}
