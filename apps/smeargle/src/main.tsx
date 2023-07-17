import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import './index.css';
import { StrictMode } from 'react';

if (import.meta.env.DEV) {
  const { mockWorker } = await import('@/mocks/server/browser');

  await mockWorker.start({ onUnhandledRequest: 'bypass' });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
