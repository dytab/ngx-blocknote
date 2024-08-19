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
} from '@dytab/block-note-angular';
import {
  getPageBreakSuggestionItem,
  PageBreak,
} from '@dytab/block-note-extensions';
import { HlmButtonDirective } from '@dytab/ui';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    pageBreak: PageBreak,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-page-break-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />`,
})
export class PageBreakBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    { type: 'heading', content: 'First Page', props: { level: 1 } },
    {
      type: 'paragraph',
      content:
        'Here is a content before the page break. This should be on the first page',
    },
    { type: 'pageBreak' },
    { type: 'heading', content: 'Second Page', props: { level: 1 } },
    {
      type: 'paragraph',
      content:
        'Here is a content after the page break. This should be on the second page',
    },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
    getSuggestionItems: (editor) => [
      getPageBreakSuggestionItem(editor),
      ...getDefaultSlashMenuItems(editor),
    ],
  };
}

export const pageBreakBlockExampleCode = ``;
