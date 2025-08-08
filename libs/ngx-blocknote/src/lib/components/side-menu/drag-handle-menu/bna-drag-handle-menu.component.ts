import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BrnMenuTrigger } from '@spartan-ng/brain/menu';
import { HlmMenu, HlmMenuGroup } from '@spartan-ng/helm/menu';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { BnaBlockColorStyleComponent } from './default-items/block-color-style/bna-block-color-style.component';
import { BnaDeleteBlockItemComponent } from './default-items/delete-block-item/bna-delete-block-item.component';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  imports: [
    HlmButton,
    BrnMenuTrigger,
    HlmMenu,
    HlmMenuGroup,
    BnaDeleteBlockItemComponent,
    BnaBlockColorStyleComponent,
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
    if (!clickedInside) {
      this.editor().sideMenu.unfreezeMenu();
    }
  }

  openDragMenu() {
    this.toggleMenuFrozenState();
  }

  private toggleMenuFrozenState() {
    if (this.editor().sideMenu.view?.menuFrozen) {
      this.editor().sideMenu.unfreezeMenu();
    } else {
      this.editor().sideMenu.freezeMenu();
    }
  }

  dragStart($event: DragEvent) {
    const block = this.ngxBlockNoteService.sideMenuFocusedBlock();
    if (!block) {
      return;
    }
    this.editor().sideMenu.blockDragStart($event, block as any);
  }

  dragEnd() {
    this.editor().sideMenu.blockDragEnd();
  }

  onOutsideClick($event: MouseEvent) {
    console.log('outside click', $event);
  }
}
