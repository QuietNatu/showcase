import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { NatuUiConfig, provideUiConfig } from '../lib/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

/**
 * Sets up default providers for all tests.
 */
@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNoopAnimations(),
    provideUiConfig(config),
  ],
})
export class GlobaltTestingSetupModule {}
