import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

void import('./mocks/server/browser-development')
  .then(({ startWorker }) => startWorker())
  .then(() =>
    bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error(error);
    }),
  );
