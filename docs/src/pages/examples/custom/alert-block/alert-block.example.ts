import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSpecs,
  defaultBlockSpecs,
  DefaultSuggestionItem,
  insertOrUpdateBlock,
} from '@blocknote/core';
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
    [inputSlashMenuItems]="suggestionItem"
  />`,
})
export class AlertBlockExample {
  initialContent = [
    {
      type: 'alert',
      props: {
        type: 'warning',
      },
    },
    //TODO: remove cast
  ] as any;
  blockSpecs: BlockSpecs = {
    ...defaultBlockSpecs,
    alert: alertBlock,
  };
  insertAlert = (
    editor: BlockNoteEditor
  ): Omit<DefaultSuggestionItem, 'key'> => ({
    title: 'Alert',
    onItemClick: () => {
      insertOrUpdateBlock(editor, {
        type: 'alert' as never,
      });
    },
    badge: 'BAFD',
    subtext: 'SUBTEXT',
    aliases: [
      'alert',
      'notification',
      'emphasize',
      'warning',
      'error',
      'info',
      'success',
    ],
    group: 'Other',
  });
  suggestionItem: Array<
    (editor: BlockNoteEditor) => Omit<DefaultSuggestionItem, 'key'>
  > = [this.insertAlert];
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
