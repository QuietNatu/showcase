import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

/**
 * Sets up default providers for all tests.
 */
@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // this will not be required with zoneless
    // https://angular.dev/guide/testing/components-scenarios#automatic-change-detection
    { provide: ComponentFixtureAutoDetect, useValue: true },
  ],
})
export class GlobalTestingModule {}
