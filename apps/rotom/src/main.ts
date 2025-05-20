import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((error: unknown) => {
  // eslint-disable-next-line no-console -- should stay for now
  console.error(error);
});
