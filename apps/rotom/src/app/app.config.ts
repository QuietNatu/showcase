import { ApplicationConfig } from '@angular/core';
import { provideAppRouter } from './core/providers/router-provider';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAppServiceWorker } from './core/providers/service-worker-provider';

export const appConfig: ApplicationConfig = {
  providers: [provideAppRouter(), provideAnimations(), provideAppServiceWorker()],
};
