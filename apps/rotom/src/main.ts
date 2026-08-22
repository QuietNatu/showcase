import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

// eslint-disable-next-line unicorn/prefer-await -- angular does not support top-level await
bootstrapApplication(App, appConfig).catch((error: unknown) => {
  // eslint-disable-next-line no-console -- should stay for now
  console.error(error);
});
