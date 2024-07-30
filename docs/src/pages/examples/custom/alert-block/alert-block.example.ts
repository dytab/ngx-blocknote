import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockSpecs, defaultBlockSpecs } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { alertBlock } from './alert-block';

@Component({
  selector: 'bna-alert-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `<bna-editor
    [initialContent]="initialContent"
    [blockSpecs]="blockSpecs"
  />`,
})
export class AlertBlockExample {
  initialContent = [
    {
      type: 'alert',
    },
    //TODO: remove cast
  ] as any;
  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    alert: alertBlock,
  };
}

export const alertBlockExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockSpecs, defaultBlockSpecs } from '@blocknote/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { alertBlock } from './alert-block';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`<bna-editor
    [initialContent]="initialContent"
    [blockSpecs]="blockSpecs"
  />\`,
})
export class AlertBlockExample {
  initialContent = [
    {
      type: 'alert',
    },
    //TODO: remove cast
  ] as any;
  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    alert: alertBlock,
  };
}`;
