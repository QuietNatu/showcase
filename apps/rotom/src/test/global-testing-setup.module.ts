import { NgModule } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NATU_UI_CONFIG, NatuUiConfig } from '@natu/ui-angular';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [provideNoopAnimations(), { provide: NATU_UI_CONFIG, useValue: config }],
})
export class GlobaltTestingSetupModule {}
