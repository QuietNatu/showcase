import { NgModule } from '@angular/core';
import { NATU_UI_CONFIG, NatuUiConfig } from '../lib/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [provideNoopAnimations(), { provide: NATU_UI_CONFIG, useValue: config }],
})
export class GlobaltTestingSetupModule {}
