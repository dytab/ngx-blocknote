import { Component, computed, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-table-row-header-item',
  imports: [HlmButton],
  templateUrl: './bna-table-row-header-item.component.html',
})
export class BnaTableRowHeaderItemComponent {
  private ngxBlockNoteService = inject(NgxBlocknoteService);

  readonly dict = computed(() => this.ngxBlockNoteService.editor().dictionary);

  readonly show = computed(() => {
    const editor = this.ngxBlockNoteService.editor();
    const block = this.ngxBlockNoteService.sideMenuFocusedBlock() as any;
    if (!block || block.type !== 'table') {
      return false;
    }
    if (editor.settings.tables.headers === false) {
      return false;
    }
    return true;
  });

  readonly checked = computed(() => {
    const block = this.ngxBlockNoteService.sideMenuFocusedBlock() as any;
    if (!block || block.type !== 'table') {
      return false;
    }
    return Boolean(block.content?.headerRows);
  });

  toggleHeaderRow() {
    const editor = this.ngxBlockNoteService.editor();
    const current = this.ngxBlockNoteService.sideMenuFocusedBlock() as any;
    if (!current || current.type !== 'table') {
      return;
    }
    const latest = (editor.getBlock(current.id) as any) || current;
    const isHeaderRow = Boolean(latest.content?.headerRows);
    editor.updateBlock(latest, {
      ...latest,
      content: {
        ...latest.content,
        headerRows: isHeaderRow ? undefined : 1,
      },
    });
    editor.focus();
    editor.sideMenu.unfreezeMenu();
  }
}
