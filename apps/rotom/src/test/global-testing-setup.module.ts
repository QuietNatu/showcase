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
  ],
})
export class GlobaltTestingSetupModule {}
