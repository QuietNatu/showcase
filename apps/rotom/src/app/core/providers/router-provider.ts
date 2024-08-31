import { EnvironmentProviders } from '@angular/core';
import { PreloadAllModules, Route, provideRouter, withPreloading } from '@angular/router';

const routes: Route[] = [];

export function provideAppRouter(): EnvironmentProviders {
  return provideRouter(routes, withPreloading(PreloadAllModules));
}
