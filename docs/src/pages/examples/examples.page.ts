import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

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
      <a hlmBtn variant="ghost" routerLink="basic/minimal" class="justify-start"
        >Basic Setup</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="basic/manipulating-blocks"
        class="justify-start"
        >Manipulating Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="basic/removing-default-blocks"
        class="justify-start"
        >Removing Default Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="basic/selection-blocks"
        class="justify-start"
        >Displaying Selected Blocks</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="basic/blocks-json"
        class="justify-start"
        >Displaying Document JSON</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="basic/all-blocks"
        class="justify-start"
        >Default Schema Showcase</a
      >

      Backend
      <a
        hlmBtn
        variant="ghost"
        routerLink="backend/saving-and-loading"
        class="justify-start"
        >Saving & Loading</a
      >
      <a
        hlmBtn
        variant="ghost"
        routerLink="backend/upload-files"
        class="justify-start"
        >Upload Files</a
      >

      Custom
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLink="custom/alert-block"
        >Alert Block</a
      >
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLink="custom/api-content-block"
        >Api Content Block</a
      >
      Interoperability
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLink="interoperability/convert-to-html"
        >Converting Blocks to HTML</a
      >
    </aside>
    <main class="overflow-hidden py-6">
      <router-outlet class="hidden"></router-outlet>
    </main>
  </div>`,
})
export class ExamplesPage {}
