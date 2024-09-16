import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  getDefaultSlashMenuItems,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/ngx-blocknote';
import { getHeadingSlashMenuItems, Heading } from '@dytab/blocknote-extensions';
import { HlmButtonDirective } from '@dytab/ui';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    heading: Heading,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-heading-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />`,
})
export class HeadingBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    { type: 'heading', props: { level: 1 }, content: 'Level 1' },
    { type: 'heading', props: { level: 2 }, content: 'Level 2' },
    { type: 'heading', props: { level: 3 }, content: 'Level 3' },
    { type: 'heading', props: { level: 4 }, content: 'Level 4' },
    { type: 'heading', props: { level: 5 }, content: 'Level 5' },
    { type: 'heading', props: { level: 6 }, content: 'Level 6' },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
    getSuggestionItems: (editor) => [
      ...getHeadingSlashMenuItems(editor),
      ...getDefaultSlashMenuItems(editor),
    ],
  };
}

export const headingBlockExampleCode = ``;
