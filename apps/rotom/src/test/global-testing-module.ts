import { NgModule, provideZonelessChangeDetection } from '@angular/core';

/**
 * Sets up default providers for all tests.
 */
@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class GlobalTestingModule {}
