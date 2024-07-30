import { Route } from '@angular/router';
import { DefaultSchemaShowcasePage } from '../basic/default-schema-showcase/default-schema-showcase.page';
import { BasicMinimalPage } from '../basic/minimal/basic-minimal.page';
import { CustomAlertBlockPage } from '../custom/alert-block/custom-alert-block.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'basic/minimal', pathMatch: 'full' },
  { path: 'basic/minimal', component: BasicMinimalPage },
  {
    path: 'basic/all-blocks',
    component: DefaultSchemaShowcasePage,
  },
  {
    path: 'custom/alert-block',
    component: CustomAlertBlockPage,
  },
];
