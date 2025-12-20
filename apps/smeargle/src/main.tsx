import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.scss';
import { App } from './app/app.tsx';

if (import.meta.env.VITE_ENABLE_MOCKING === 'true') {
  const { startWorker } = await import('./mocks/api/browser-development.ts');
  await startWorker();
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it will always exist
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
