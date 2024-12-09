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
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '../../../ui';
import { BnaFormattingToolbarControllerComponent } from '../../formatting-toolbar/bna-formatting-toolbar-controller.component';
import { BnaFormattingToolbarComponent } from '../../formatting-toolbar/bna-formatting-toolbar.component';
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
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    BnaFormattingToolbarComponent,
    BnaFormattingToolbarControllerComponent,
    BnaDeleteBlockItemComponent,
    BnaBlockColorStyleComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  constructor(public ngxBlockNoteService: NgxBlocknoteService) {}

  openDragMenu() {
    const editor = this.ngxBlockNoteService.editor();
    editor.sideMenu.freezeMenu();
  }

  dragStart($event: DragEvent) {
    const editor = this.ngxBlockNoteService.editor();
    const block = this.ngxBlockNoteService.sideMenuFocusedBlock();
    if (!block) {
      return;
    }
    editor.sideMenu.blockDragStart($event, block as any);
  }

  dragEnd() {
    const editor = this.ngxBlockNoteService.editor();
    editor.sideMenu.blockDragEnd();
  }
}
