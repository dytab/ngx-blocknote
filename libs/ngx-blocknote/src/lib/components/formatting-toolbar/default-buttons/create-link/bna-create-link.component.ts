import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLink } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { BlockNoteAngularService } from '../../../../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmIconComponent,
  HlmMenuComponent,
  HlmMenuGroupComponent,
} from '../../../../ui';
import { BnaLinkFormComponent } from '../../../link-toolbar/link-form/bna-link-form.component';

@Component({
  selector: 'bna-create-link',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconComponent,
    HlmMenuComponent,
    BrnMenuTriggerDirective,
    HlmMenuGroupComponent,
    BnaLinkFormComponent,
  ],
  templateUrl: './bna-create-link.component.html',
  styleUrl: './bna-create-link.component.css',
  providers: [
    provideIcons({
      lucideLink,
    }),
  ],
})
export class BnaCreateLinkComponent {
  initialValue = this.getInitialValue();

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.blockNoteAngularService.editor().onSelectionChange(() => {
      this.initialValue = this.getInitialValue();
    });
  }

  private getInitialValue() {
    const editor = this.blockNoteAngularService.editor();

    return {
      url: editor.getSelectedLinkUrl(),
      text: editor.getSelectedText(),
    };
  }
}
