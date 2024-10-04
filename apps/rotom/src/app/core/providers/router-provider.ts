import { EnvironmentProviders } from '@angular/core';
import { PreloadAllModules, Route, provideRouter, withPreloading } from '@angular/router';

const routes: Route[] = [];

/**
 * Sets up providers to enable routing in the app.
 */
export function provideAppRouter(): EnvironmentProviders {
  return provideRouter(routes, withPreloading(PreloadAllModules));
}
