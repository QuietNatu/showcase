/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app/app';
import './index.css';

if (import.meta.env.DEV) {
  const { mockWorker } = await import('@/mocks/server/browser');

  await mockWorker.start({ onUnhandledRequest: 'bypass' });
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!;

render(() => <App />, root);
