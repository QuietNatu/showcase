import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAppRouter } from './core/providers/router-provider';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAppServiceWorker } from './core/providers/service-worker-provider';
import { provideAppI18n } from './core/providers/i18n-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAppRouter(),
    provideAnimations(),
    provideAppServiceWorker(),
    provideAppI18n(),
  ],
};
