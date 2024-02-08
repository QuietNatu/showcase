import { NgModule } from '@angular/core';
import { NATU_UI_CONFIG, NatuUiConfig } from '@natu/ui-angular';

const config: NatuUiConfig = {
  tooltip: { hoverDelay: 0 },
};

@NgModule({
  providers: [{ provide: NATU_UI_CONFIG, useValue: config }],
})
export class GlobaltTestingSetupModule {}
