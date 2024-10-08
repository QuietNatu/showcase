import '@/styles/styles.scss';
import { createRoot } from 'react-dom/client';
import { App } from './app/app.tsx';
import { StrictMode, Suspense } from 'react';
import { AppI18nProvider } from './app/core/contexts/i18n/i18n-context.tsx';
import { AppConfigProvider } from './app/core/contexts/config/config-provider.tsx';

if (import.meta.env.DEV && import.meta.env.VITE_E2E !== 'true') {
  const { mockWorker } = await import('@/mocks/server/browser');

  await mockWorker.start({ onUnhandledRequest: 'bypass' });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppConfigProvider>
      <AppI18nProvider>
        {/* TODO: error boundary */}
        {/* TODO: better component */}
        <Suspense fallback="loading">
          <App />
        </Suspense>
      </AppI18nProvider>
    </AppConfigProvider>
  </StrictMode>,
);
