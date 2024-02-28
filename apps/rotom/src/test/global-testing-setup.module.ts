import { NgModule } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NatuUiConfig, provideUiConfig } from '@natu/ui-angular';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [provideNoopAnimations(), provideUiConfig(config)],
})
export class GlobaltTestingSetupModule {}
