import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HlmButtonDirective,
    RouterLink,
    RouterLinkActive,
  ],
  host: {
    class: 'block py-3 mx-auto max-w-[90rem]',
  },
  template: `<div
    class="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10"
  >
    <aside class="flex flex-col p-3">
      Basic
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/minimal"
        class="justify-start"
        >Basic Setup</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/manipulating-blocks"
        class="justify-start"
        >Manipulating Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/removing-default-blocks"
        class="justify-start"
        >Removing Default Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/selection-blocks"
        class="justify-start"
        >Displaying Selected Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/blocks-json"
        class="justify-start"
        >Displaying Document JSON</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="basic/all-blocks"
        class="justify-start"
        >Default Schema Showcase</a
      >

      Backend
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="backend/saving-and-loading"
        class="justify-start"
        >Saving & Loading</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        routerLink="backend/upload-files"
        class="justify-start"
        >Upload Files</a
      >

      Custom
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="custom/alert-block"
        >Alert Block</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="custom/api-content-block"
        >Api Content Block</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="custom/mentions-menu"
        >Mentions Menu</a
      >
      Extensions
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="extensions/heading-block"
        >Heading Block</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="extensions/table-of-contents"
        >Table Of Contents</a
      >
      Interoperability
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="interoperability/convert-to-html"
        >Converting Blocks to HTML</a
      >
      Ui Components
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="ui-components/formatting-toolbar-buttons"
        >Adding Formatting Toolbar Buttons</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLinkActive="active-link"
        routerLink="ui-components/formatting-side-menu-buttons"
        >Adding Block Side Menu Buttons</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLink="ui-components/adding-side-menu-drag-handle-items"
        routerLinkActive="active-link"
        >Adding Drag Handle Menu Items</a
      >
    </aside>
    <main class="overflow-hidden py-6">
      <router-outlet class="hidden"></router-outlet>
    </main>
  </div>`,
})
export class ExamplesPage {}
