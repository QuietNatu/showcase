import { PreloadAllModules, Route, provideRouter, withPreloading } from '@angular/router';

const routes: Route[] = [];

export const provideAppRouter = () => provideRouter(routes, withPreloading(PreloadAllModules));
