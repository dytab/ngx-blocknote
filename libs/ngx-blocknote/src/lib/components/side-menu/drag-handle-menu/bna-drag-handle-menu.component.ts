import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  standalone: true,
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
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  openDragMenu() {
    this.editor().sideMenu.freezeMenu();
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
}
