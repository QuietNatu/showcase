import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

void import('./mocks/server/browser-development')
  .then(({ startWorker }) => startWorker())
  // eslint-disable-next-line no-console
  .then(() => bootstrapApplication(AppComponent, appConfig).catch(console.error));
