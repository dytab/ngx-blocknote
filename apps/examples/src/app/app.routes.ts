import { Route } from '@angular/router';
import { BasicMinimal } from '../basic/minimal/basic-minimal.component';
import { CustomAlertBlockPage } from '../custom/alert-block/custom-alert-block.page';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'basic/minimal', pathMatch: 'full' },
  { path: 'basic/minimal', component: BasicMinimal },
  {
    path: 'custom/alert-block',
    component: CustomAlertBlockPage,
  },
];
