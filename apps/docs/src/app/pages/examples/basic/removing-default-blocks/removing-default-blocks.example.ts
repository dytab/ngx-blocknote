import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ui';

@Component({
  selector: 'bna-removing-default-blocks-example',
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor [initialContent]="initialContent" [options]="options" />
  `,
})
export class RemovingDefaultBlocksExample {
  initialContent = undefined;
  options: BlockNoteEditorOptionsType = {
    schema: BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        audio: undefined as never,
        image: undefined as never,
      },
    }),
  };
}

export const removingDefaultBlocksExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/ngx-blocknote';
import { HlmButtonDirective } from '@dytab/ngx-blocknote';

@Component({
  selector: 'bna-removing-default-blocks-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \` <bna-editor [initialContent]="initialContent" [options]="options"/> \`,
})
export class RemovingDefaultBlocksExample {
  initialContent = undefined;
  options: BlockNoteEditorOptionsType = {
    schema: BlockNoteSchema.create({
      blockSpecs: {
        ...defaultBlockSpecs,
        audio: undefined as never,
        image: undefined as never,
      },
    }),
  };
}`;
