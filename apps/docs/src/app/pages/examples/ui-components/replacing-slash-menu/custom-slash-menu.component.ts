import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { getDefaultSlashMenuItems } from '@blocknote/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'bna-custom-slash-menu',
  imports: [CommonModule, HlmButtonDirective],
  template: `
    <div
      class="h-full flex flex-col overflow-auto border border-border bg-background shadow-lg shadow-border rounded p-1 min-w-[250px]"
    >
      @for (item of customSlashItems; track item.key) {
        <button
          hlmBtn
          size="icon"
          variant="ghost"
          (mousedown)="addItem($event, item)"
          class="w-full"
        >
          {{ item.title }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class CustomSlashMenuComponent {
  customSlashItems = getDefaultSlashMenuItems(
    this.ngxBlockNoteService.editor(),
  );
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  addItem($event: Event, item: { title: string; onItemClick: () => void }) {
    $event.preventDefault();
    this.ngxBlockNoteService.editor().suggestionMenus.clearQuery();
    item.onItemClick();
    this.ngxBlockNoteService.editor().suggestionMenus.closeMenu();
    this.ngxBlockNoteService.editor().focus();
  }
}
