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
  template: `<div
    class="w-full mx-auto px-4 sm:px-8 flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10"
  >
    <aside class="flex flex-col p-3">
      Basic
      <a hlmBtn variant="ghost" routerLink="basic/minimal" class="justify-start"
        >Basic Setup</a
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
      Custom
      <a
        hlmBtn
        variant="ghost"
        class="justify-start"
        routerLink="custom/alert-block"
        >Alert Block</a
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
    <main
      class="sticky top-0 overflow-hidden py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[minmax(0,1fr)_280px]"
    >
      <router-outlet class="hidden"></router-outlet>
    </main>
  </div>`,
})
export class ExamplesPage {}
