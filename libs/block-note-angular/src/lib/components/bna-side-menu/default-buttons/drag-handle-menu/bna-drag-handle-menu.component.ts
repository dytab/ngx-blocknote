import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideGripVertical } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
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
} from '../../../../ui';
import { BnaFormattingToolbarControllerDirective } from '../../../bna-formatting-toolbar/bna-formatting-toolbar-controller.directive';
import { BnaFormattingToolbarComponent } from '../../../bna-formatting-toolbar/bna-formatting-toolbar.component';
import { BnaBasicTextStyleButtonComponent } from '../../../buttons/basic-text-style-button/bna-basic-text-style-button.component';
import { BnaTextAlignButtonComponent } from '../../../buttons/text-align-button/bna-text-align-button.component';
import { BnaDeleteBlockItemComponent } from '../bna-delete-block-item/bna-delete-block-item.component';

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
    BnaBasicTextStyleButtonComponent,
    BnaFormattingToolbarComponent,
    BnaFormattingToolbarControllerDirective,
    BnaTextAlignButtonComponent,
    BnaDeleteBlockItemComponent,
  ],
  templateUrl: './bna-drag-handle-menu.component.html',
  styleUrl: './bna-drag-handle-menu.component.css',
  providers: [provideIcons({ lucideGripVertical })],
})
export class BnaDragHandleMenuComponent {
  constructor(public blockNoteAngularService: BlockNoteAngularService) {}

  openDragMenu() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
  }

  dragStart($event: DragEvent) {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    editor.sideMenu.blockDragStart($event);
  }

  dragEnd() {
    const editor = this.blockNoteAngularService.editor();
    if (!editor) {
      return;
    }
    editor.sideMenu.blockDragEnd();
  }
}
