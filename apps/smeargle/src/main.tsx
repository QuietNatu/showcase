import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.scss';
import { App } from './app/app.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it will always exist
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
