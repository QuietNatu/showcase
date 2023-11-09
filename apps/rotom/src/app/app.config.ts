import { ApplicationConfig } from '@angular/core';
import { provideAppRouter } from './core/providers/router-provider';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAppRouter(), provideAnimations()],
};
