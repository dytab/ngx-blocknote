import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { BnaBlockColorStyleComponent } from './default-items/block-color-style/bna-block-color-style.component';
import { BnaDeleteBlockItemComponent } from './default-items/delete-block-item/bna-delete-block-item.component';
import { BnaTableColumnHeaderItemComponent } from './default-items/table-headers/bna-table-column-header-item.component';
import { BnaTableRowHeaderItemComponent } from './default-items/table-headers/bna-table-row-header-item.component';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  imports: [
    HlmButton,
    BrnMenuTrigger,
    HlmMenu,
    HlmMenuGroup,
    BnaDeleteBlockItemComponent,
    BnaBlockColorStyleComponent,
    BnaTableRowHeaderItemComponent,
    BnaTableColumnHeaderItemComponent,
    NgIcon,
    HlmIcon,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  ngxBlockNoteService = inject(NgxBlocknoteService);
  private elementRef = inject(ElementRef);

  editor = this.ngxBlockNoteService.editor;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    const editor = this.editor();
    if (!clickedInside && editor) {
      editor.sideMenu.unfreezeMenu();
    }
  }

  openDragMenu() {
    this.toggleMenuFrozenState();
  }

  private toggleMenuFrozenState() {
    const editor = this.editor();
    if (!editor) return;
    if (editor.sideMenu.view?.menuFrozen) {
      editor.sideMenu.unfreezeMenu();
    } else {
      editor.sideMenu.freezeMenu();
    }
  }

  dragStart($event: DragEvent) {
    const block = this.ngxBlockNoteService.sideMenuFocusedBlock();
    const editor = this.editor();
    if (!block || !editor) {
      return;
    }
    editor.sideMenu.blockDragStart($event, block as any);
  }

  dragEnd() {
    const editor = this.editor();
    if (!editor) return;
    editor.sideMenu.blockDragEnd();
  }

  onOutsideClick($event: MouseEvent) {
    console.log('outside click', $event);
  }
}
