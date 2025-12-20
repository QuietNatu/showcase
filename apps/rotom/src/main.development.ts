import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

async function enableMocking() {
  if (environment.enableMocking) {
    const { startWorker } = await import('./mocks/api/browser-development');
    await startWorker();
  }
}

void enableMocking()
  .then(() => bootstrapApplication(App, appConfig))
  .catch((error: unknown) => {
    // eslint-disable-next-line no-console -- should stay for now
    console.error(error);
  });
