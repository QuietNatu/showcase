import { environment } from '@/environments/environment';
import { EnvironmentProviders } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

/**
 * Sets up providers to register the apps service worker.
 */
export function provideAppServiceWorker(): EnvironmentProviders {
  return provideServiceWorker('ngsw-worker.js', {
    enabled: environment.isProd === true,
    registrationStrategy: 'registerWhenStable:30000',
  });
}
