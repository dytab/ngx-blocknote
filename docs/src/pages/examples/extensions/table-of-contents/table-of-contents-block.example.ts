import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Block,
  BlockFromConfig,
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  insertOrUpdateBlock,
  PartialBlock
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  HlmButtonDirective
} from '@dytab/block-note-angular';
import { Heading, TableOfContentBlock } from '@dytab/block-note-extensions';
import * as _ from 'lodash';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    tableOfContents: TableOfContentBlock,
    heading: Heading
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs }
});

@Component({
  selector: 'bna-table-of-contents-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      [options]="options"
      (onEditorReady)="onEditorReady($event)"
    />`
})
export class TableOfContentsBlockExample{
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    { type: 'tableOfContents' },
    { type: 'heading', props: { level: 1 }, content: 'First Heading 1' },
    { type: 'heading', props: { level: 2 }, content: 'Level 2' },
    { type: 'heading', props: { level: 3 }, content: 'Level 3' },
    { type: 'heading', props: { level: 4 }, content: 'Level 4' },
    { type: 'heading', props: { level: 5 }, content: 'Level 5' },
    { type: 'heading', props: { level: 6 }, content: 'Level 6' },
    { type: 'heading', props: { level: 1 }, content: 'Second Heading 1' },
    { type: 'heading', props: { level: 2 }, content: '(1.1)' },
    { type: 'heading', props: { level: 2 }, content: '(1.2)' }
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema: schema,
    inputSlashMenuItems: [
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
        onItemClick: () => {
          insertOrUpdateBlock(editor, {
            type: 'tableOfContents'
          });
        },
        key: 'table-of-contents',
        group: 'Special',
        title: 'Table of Contents'
      })
    ]
  };

  private previousHeadingBlocks: BlockFromConfig<any, any, any>[] = [];

  onEditorReady(editor: BlockNoteEditor<any, any, any>){
    editor.onEditorContentChange(() => {
      const tableOfContentBlock = editor.document.find(blocks => blocks.type === 'tableOfContents');
      if (tableOfContentBlock){
        const headingBlocks = (
          editor.document as Block<any, any, any>[]
        ).filter((block) => block.type === 'heading') as any;

        const areBlocksEqual = _.isEqual(headingBlocks, this.previousHeadingBlocks)
        if (!areBlocksEqual){
          //TODO somehow the TableOfContentBlock render function gets an
          // outdated editor whe triggering any updating or inserting blocks
          this.previousHeadingBlocks = headingBlocks;
          const { id, ...a } = tableOfContentBlock
          editor.insertBlocks([a], tableOfContentBlock);
        }
      }
    });
  }
}

export const tableOfContentsBlockExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
} from '@dytab/block-note-angular';
import { HlmButtonDirective } from '@dytab/block-note-angular';
import { alertBlock } from './alert-block';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: alertBlock,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-alert-block-example',
  standalone: true,
  imports: [CommonModule, BnaEditorComponent, HlmButtonDirective],
  template: \`<bna-editor
    [initialContent]="initialContent"
    [options]="options"
  />\`,
})
export class AlertBlockExample {
  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    {
      type: 'alert',
      props: {
        type: 'warning',
      },
    },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
    inputSlashMenuItems: [
      (
        editor: BlockNoteEditor<
          typeof schema.blockSchema,
          typeof schema.inlineContentSchema,
          typeof schema.styleSchema
        >
      ) => ({
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
      }),
    ],
  };
}`;
