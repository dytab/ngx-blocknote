import { Route } from '@angular/router';
import { ExamplesPage } from './pages/examples/examples.page';
import { exampleLinks } from './pages/examples/shared/examples';
import { OverviewPage } from './pages/overview.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewPage, title: 'Overview' },
  {
    path: 'examples',
    component: ExamplesPage,
    children: [
      { path: '', redirectTo: 'basic/minimal', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview' },
      ...exampleLinks.map((example) => ({
        path: example.url,
        component: example.component,
      })),
    ],
  },
];
