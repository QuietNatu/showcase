import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/app';
import './index.scss';

if (import.meta.env.DEV && import.meta.env.VITE_E2E !== 'true') {
  const { mockWorker } = await import('@/mocks/server/browser');

  await mockWorker.start({ onUnhandledRequest: 'bypass' });
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
