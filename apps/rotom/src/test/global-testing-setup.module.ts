import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  providers: [provideHttpClient()],
})
export class GlobaltTestingSetupModule {}
