import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockSpecs, defaultBlockSpecs } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { alertBlock } from './alert-block';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  templateUrl: './custom-alert-block.page.html',
  styleUrl: './custom-alert-block.page.css',
})
export class CustomAlertBlockPage {
  initialContent = [
    {
      id: '262bf9c4-3c2a-4543-bc47-49976ec904c3',
      type: 'alert',
      props: {},
      content: [],
      children: [],
    },
    //TODO: remove cast
  ] as any;
  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    alert: alertBlock,
  };
}
