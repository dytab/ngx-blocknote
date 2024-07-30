import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHighlightOptions({
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
      },
    }),
  ],
};
