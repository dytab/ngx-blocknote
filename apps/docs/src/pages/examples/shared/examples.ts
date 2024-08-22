import { SavingAndLoadingPage } from '../backend/saving-and-loading/saving-and-loading.page';
import { UploadFilePage } from '../backend/upload-file/upload-file.page';
import { AllBlocksPage } from '../basic/all-blocks/all-blocks.page';
import { BasicSetupPage } from '../basic/basic-setup/basic-setup.page';
import { BlocksJsonPage } from '../basic/blocks-json/blocks-json.page';
import { ManipulatingBlocksPage } from '../basic/manipulating-blocks/manipulating-blocks.page';
import { RemovingDefaultBlocksPage } from '../basic/removing-default-blocks/removing-default-blocks.page';
import { SelectionBlocksPage } from '../basic/selection-blocks/selection-blocks.page';
import { AlertBlockPage } from '../custom/alert-block/alert-block.page';
import { ApiContentBlockPage } from '../custom/api-content-block/api-content-block.page';
import { MentionsMenuPage } from '../custom/mentions-menu/mentions-menu.page';
import { HeadingBlockPage } from '../extensions/heading/heading-block.page';
import { PageBreakBlockPage } from '../extensions/page-break/page-break-block.page';
import { TableOfContentsBlockPage } from '../extensions/table-of-contents/table-of-contents-block.page';
import { ConvertToHtmlPage } from '../interoperability/convert-to-html/convert-to-html.page';
import { AddingSideMenuDragHandleItemsPage } from '../ui-components/adding-side-menu-drag-handle-items/adding-side-menu-drag-handle-items.page';
import { FormattingSideMenuButtonsPage } from '../ui-components/formatting-side-menu-buttons/formatting-side-menu-buttons.page';
import { FormattingToolbarButtonsPage } from '../ui-components/formatting-toolbar-buttons/formatting-toolbar-buttons.page';
import { Example, ExampleGroup } from './example.type';
import { FormPage } from '../basic/form/form.page';
import { ServerSideRenderingPage } from '../backend/server-side-rendering/server-side-rendering.page';

//This will be added to The app routes and also to the links in the examples
export const exampleLinks: Example[] = [
  {
    groupName: 'Basic',
    url: 'basic/minimal',
    name: 'Basic Setup',
    component: BasicSetupPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/manipulating-blocks',
    name: 'Manipulating Blocks',
    component: ManipulatingBlocksPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/removing-default-blocks',
    name: 'Removing Default Blocks',
    component: RemovingDefaultBlocksPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/selection-blocks',
    name: 'Displaying Selected Blocks',
    component: SelectionBlocksPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/blocks-json',
    name: 'Displaying Document JSON',
    component: BlocksJsonPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/all-blocks',
    name: 'Default Schema Showcase',
    component: AllBlocksPage,
  },
  {
    groupName: 'Basic',
    url: 'basic/form',
    name: 'Form',
    component: FormPage,
  },
  {
    groupName: 'Backend',
    url: 'backend/saving-and-loading',
    name: 'Saving & Loading',
    component: SavingAndLoadingPage,
  },
  {
    groupName: 'Backend',
    url: 'backend/upload-files',
    name: 'Upload Files',
    component: UploadFilePage,
  },
  {
    groupName: 'Backend',
    url: 'backend/server-side-rendering',
    name: 'Server Side Rendering',
    component: ServerSideRenderingPage,
  },
  {
    groupName: 'Custom',
    url: 'custom/alert-block',
    name: 'Alert Block',
    component: AlertBlockPage,
  },
  {
    groupName: 'Custom',
    url: 'custom/api-content-block',
    name: 'Api Content Block',
    component: ApiContentBlockPage,
  },
  {
    groupName: 'Custom',
    url: 'custom/mentions-menu',
    name: 'Mentions Menu',
    component: MentionsMenuPage,
  },
  {
    groupName: 'Extensions',
    url: 'extensions/heading-block',
    name: 'Heading Block',
    component: HeadingBlockPage,
  },
  {
    groupName: 'Extensions',
    url: 'extensions/table-of-contents',
    name: 'Table Of Contents',
    component: TableOfContentsBlockPage,
  },
  {
    groupName: 'Extensions',
    url: 'extensions/page-break',
    name: 'Page Break',
    component: PageBreakBlockPage,
  },
  {
    groupName: 'Interoperability',
    url: 'interoperability/convert-to-html',
    name: 'Converting Blocks to HTML',
    component: ConvertToHtmlPage,
  },
  {
    groupName: 'Ui Components',
    url: 'ui-components/formatting-toolbar-buttons',
    name: 'Adding Formatting Toolbar Buttons',
    component: FormattingToolbarButtonsPage,
  },
  {
    groupName: 'Ui Components',
    url: 'ui-components/formatting-side-menu-buttons',
    name: 'Adding Block Side Menu Buttons',
    component: FormattingSideMenuButtonsPage,
  },
  {
    groupName: 'Ui Components',
    url: 'ui-components/adding-side-menu-drag-handle-items',
    name: 'Adding Drag Handle Menu Items',
    component: AddingSideMenuDragHandleItemsPage,
  },
];

function groupByGroupName(links: Example[]): ExampleGroup[] {
  const groups: Record<string, Example[]> = links.reduce((acc, link) => {
    if (!acc[link.groupName]) {
      acc[link.groupName] = [];
    }

    acc[link.groupName].push(link);

    return acc;
  }, {} as Record<string, Example[]>);

  return Object.entries(groups).map(([groupName, links]) => ({
    groupName,
    links,
  }));
}

export const exampleGroupedLinks = groupByGroupName(exampleLinks);
