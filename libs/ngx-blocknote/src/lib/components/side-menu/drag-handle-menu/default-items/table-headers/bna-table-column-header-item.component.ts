import { Component, computed, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgxBlocknoteService } from '../../../../../services';

@Component({
  selector: 'bna-table-column-header-item',
  imports: [HlmButton],
  templateUrl: './bna-table-column-header-item.component.html',
})
export class BnaTableColumnHeaderItemComponent {
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
    return Boolean(block.content?.headerCols);
  });

  toggleHeaderColumn() {
    const editor = this.ngxBlockNoteService.editor();
    const current = this.ngxBlockNoteService.sideMenuFocusedBlock() as any;
    if (!current || current.type !== 'table') {
      return;
    }
    const latest = (editor.getBlock(current.id) as any) || current;
    const isHeaderCol = Boolean(latest.content?.headerCols);
    editor.updateBlock(latest, {
      ...latest,
      content: {
        ...latest.content,
        headerCols: isHeaderCol ? undefined : 1,
      },
    });
    editor.focus();
    editor.sideMenu.unfreezeMenu();
  }
}
