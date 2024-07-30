import { Route } from '@angular/router';
import { AllBlocksPage } from '../pages/examples/basic/all-blocks/all-blocks.page';
import { BasicSetupPage } from '../pages/examples/basic/basic-setup/basic-setup.page';
import { BlocksJsonPage } from '../pages/examples/basic/blocks-json/blocks-json.page';
import { AlertBlockPage } from '../pages/examples/custom/alert-block/alert-block.page';
import { ExamplesPage } from '../pages/examples/examples.page';
import { ConvertToHtmlPage } from '../pages/examples/interoperability/convert-to-html/convert-to-html.page';
import { OverviewPage } from '../pages/overview.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewPage },
  {
    path: 'examples',
    component: ExamplesPage,
    children: [
      { path: '', redirectTo: 'basic/minimal', pathMatch: 'full' },

      { path: 'basic/minimal', component: BasicSetupPage },
      { path: 'basic/blocks-json', component: BlocksJsonPage },
      {
        path: 'basic/all-blocks',
        component: AllBlocksPage,
      },
      {
        path: 'custom/alert-block',
        component: AlertBlockPage,
      },
      {
        path: 'interoperability/convert-to-html',
        component: ConvertToHtmlPage,
      },
    ],
  },
];
