import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockNoteAngularService } from '../../../services/block-note-angular.service';
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
import { BnaFormattingToolbarControllerDirective } from '../../formatting-toolbar/bna-formatting-toolbar-controller.directive';
import { BnaFormattingToolbarComponent } from '../../formatting-toolbar/bna-formatting-toolbar.component';
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
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    BnaFormattingToolbarComponent,
    BnaFormattingToolbarControllerDirective,
    BnaDeleteBlockItemComponent,
    BnaBlockColorStyleComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  constructor(public blockNoteAngularService: BlockNoteAngularService) {}

  openDragMenu() {
    const editor = this.blockNoteAngularService.editor();
    editor.sideMenu.freezeMenu();
  }

  dragStart($event: DragEvent) {
    const editor = this.blockNoteAngularService.editor();
    editor.sideMenu.blockDragStart($event);
  }

  dragEnd() {
    const editor = this.blockNoteAngularService.editor();
    editor.sideMenu.blockDragEnd();
  }
}
