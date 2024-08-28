import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/* TODO: missing watch mode for dev mode */
/* TODO: setup i18next */

// eslint-disable-next-line no-console
bootstrapApplication(AppComponent, appConfig).catch(console.error);
