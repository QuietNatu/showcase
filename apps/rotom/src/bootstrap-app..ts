import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAppRouter } from './app/core/providers/router-provider';

/**
 * Initializes the application and set the providers for it.
 */
export function bootstrapApp() {
  bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule), provideAnimations(), provideAppRouter()],
  }).catch((error) => console.error(error));
}
