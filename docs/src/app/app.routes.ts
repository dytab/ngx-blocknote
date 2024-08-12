import { Route } from '@angular/router';
import { SavingAndLoadingPage } from '../pages/examples/backend/saving-and-loading/saving-and-loading.page';
import { UploadFilePage } from '../pages/examples/backend/upload-file/upload-file.page';
import { AllBlocksPage } from '../pages/examples/basic/all-blocks/all-blocks.page';
import { BasicSetupPage } from '../pages/examples/basic/basic-setup/basic-setup.page';
import { BlocksJsonPage } from '../pages/examples/basic/blocks-json/blocks-json.page';
import { ManipulatingBlocksPage } from '../pages/examples/basic/manipulating-blocks/manipulating-blocks.page';
import { RemovingDefaultBlocksPage } from '../pages/examples/basic/removing-default-blocks/removing-default-blocks.page';
import { SelectionBlocksPage } from '../pages/examples/basic/selection-blocks/selection-blocks.page';
import { AlertBlockPage } from '../pages/examples/custom/alert-block/alert-block.page';
import { ApiContentBlockPage } from '../pages/examples/custom/api-content-block/api-content-block.page';
import { MentionsMenuPage } from '../pages/examples/custom/mentions-menu/mentions-menu.page';
import { ExamplesPage } from '../pages/examples/examples.page';
import { ConvertToHtmlPage } from '../pages/examples/interoperability/convert-to-html/convert-to-html.page';
import { AddingSideMenuDragHandleItemsPage } from '../pages/examples/ui-components/adding-side-menu-drag-handle-items/adding-side-menu-drag-handle-items.page';
import { FormattingSideMenuButtonsPage } from '../pages/examples/ui-components/formatting-side-menu-buttons/formatting-side-menu-buttons.page';
import { FormattingToolbarButtonsPage } from '../pages/examples/ui-components/formatting-toolbar-buttons/formatting-toolbar-buttons.page';
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
        path: 'basic/manipulating-blocks',
        component: ManipulatingBlocksPage,
      },
      {
        path: 'basic/removing-default-blocks',
        component: RemovingDefaultBlocksPage,
      },
      { path: 'backend/saving-and-loading', component: SavingAndLoadingPage },
      { path: 'backend/upload-files', component: UploadFilePage },
      {
        path: 'basic/selection-blocks',
        component: SelectionBlocksPage,
      },
      {
        path: 'custom/alert-block',
        component: AlertBlockPage,
      },
      {
        path: 'custom/api-content-block',
        component: ApiContentBlockPage,
      },
      {
        path: 'custom/mentions-menu',
        component: MentionsMenuPage,
      },
      {
        path: 'interoperability/convert-to-html',
        component: ConvertToHtmlPage,
      },
      {
        path: 'ui-components/formatting-toolbar-buttons',
        component: FormattingToolbarButtonsPage,
      },
      {
        path: 'ui-components/formatting-side-menu-buttons',
        component: FormattingSideMenuButtonsPage,
      },
      {
        path: 'ui-components/adding-side-menu-drag-handle-items',
        component: AddingSideMenuDragHandleItemsPage,
      },
      { path: '**', redirectTo: 'overview' },
    ],
  },
];
