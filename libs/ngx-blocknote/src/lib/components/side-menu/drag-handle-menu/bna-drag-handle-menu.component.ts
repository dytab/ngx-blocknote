import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../ui';
import { BnaBlockColorStyleComponent } from './default-items/block-color-style/bna-block-color-style.component';
import { BnaDeleteBlockItemComponent } from './default-items/delete-block-item/bna-delete-block-item.component';

@Component({
  selector: 'bna-drag-handle-menu-btn',
  imports: [
    CommonModule,
    HlmButtonDirective,
    BrnMenuTriggerDirective,
    HlmIconComponent,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BnaDeleteBlockItemComponent,
    BnaBlockColorStyleComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  editor = this.ngxBlockNoteService.editor;
  constructor(
    public ngxBlockNoteService: NgxBlocknoteService,
    private elementRef: ElementRef,
  ) {}

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
