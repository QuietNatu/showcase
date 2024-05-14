import { environment } from '@/environments/environment';
import { provideServiceWorker } from '@angular/service-worker';

export function provideAppServiceWorker() {
  return provideServiceWorker('ngsw-worker.js', {
    enabled: environment.isProd === true,
    registrationStrategy: 'registerWhenStable:30000',
  });
}
