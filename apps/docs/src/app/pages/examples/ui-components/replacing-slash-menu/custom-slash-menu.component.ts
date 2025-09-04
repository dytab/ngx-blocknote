import { Component, inject } from '@angular/core';
import { getDefaultSlashMenuItems } from '@blocknote/core';
import { NgxBlocknoteService } from '@dytab/ngx-blocknote';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'bna-custom-slash-menu',
  imports: [HlmButton],
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
  public ngxBlockNoteService = inject(NgxBlocknoteService);

  editor = this.ngxBlockNoteService.editor();

  customSlashItems = this.editor ? getDefaultSlashMenuItems(this.editor) : [];

  addItem($event: Event, item: { title: string; onItemClick: () => void }) {
    $event.preventDefault();
    if (!this.editor) return;
    this.editor.suggestionMenus.clearQuery();
    item.onItemClick();
    this.editor.suggestionMenus.closeMenu();
    this.editor.focus();
  }
}
