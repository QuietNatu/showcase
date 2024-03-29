/* @refresh reload */
import '@/styles/styles.scss';
import { render } from 'solid-js/web';
import { App } from './app/app';

if (import.meta.env.DEV && import.meta.env.VITE_E2E !== 'true') {
  const { mockWorker } = await import('@/mocks/server/browser');

  await mockWorker.start({ onUnhandledRequest: 'bypass' });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!;

render(() => <App />, root);
