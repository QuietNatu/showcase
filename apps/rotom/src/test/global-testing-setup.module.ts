import { APP_CONFIG } from '@/app/core/tokens/config';
import { appConfigMock } from '@/mocks/config';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NatuUiConfig, provideUiConfig } from '@natu/ui-angular';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNoopAnimations(),
    provideUiConfig(config),
    { provide: APP_CONFIG, useValue: appConfigMock },
  ],
})
export class GlobaltTestingSetupModule {}
