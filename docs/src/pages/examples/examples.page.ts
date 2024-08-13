import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HlmButtonDirective } from '@dytab/block-note-angular';
import { exampleGroupedLinks } from './shared/examples';

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
  template: ` <div
    class="flex flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10"
  >
    <aside class="flex flex-col p-3">
      @for (exampleGroup of exampleGroupedLinks; track exampleGroup.groupName) {
      <div>{{ exampleGroup.groupName }}</div>
      @for (example of exampleGroup.links; track example.url) {
      <a
        hlmBtn
        variant="ghost"
        routerLinkActive="active-link"
        [routerLink]="example.url"
        class="justify-start"
        >{{ example.name }}</a
      >
      } }
    </aside>
    <main class="overflow-hidden py-6">
      <router-outlet class="hidden"></router-outlet>
    </main>
  </div>`,
})
export class ExamplesPage {
  protected readonly exampleGroupedLinks = exampleGroupedLinks;
}
