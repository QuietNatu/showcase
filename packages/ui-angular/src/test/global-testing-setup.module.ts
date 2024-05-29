import { NgModule } from '@angular/core';
import { NatuUiConfig, provideUiConfig } from '../lib/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [provideNoopAnimations(), provideUiConfig(config)],
})
export class GlobaltTestingSetupModule {}
