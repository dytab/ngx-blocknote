import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  selector: 'bna-all-blocks-example',
  imports: [CommonModule, BnaEditorComponent],
  template: ` <bna-editor [initialContent]="initialContent" /> `,
})
export class AllBlocksExample {
  initialContent = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Blocks:',
          styles: { bold: true },
        },
      ],
    },
    {
      type: 'paragraph',
      content: 'Paragraph',
    },
    {
      type: 'heading',
      content: 'Heading',
    },
    {
      type: 'bulletListItem',
      content: 'Bullet List Item',
    },
    {
      type: 'numberedListItem',
      content: 'Numbered List Item',
    },
    {
      type: 'checkListItem',
      content: 'Check List Item',
    },
    {
      type: 'table',
      content: {
        type: 'tableContent',
        rows: [
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
        ],
      },
    },
    {
      type: 'file',
    },
    {
      type: 'image',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      },
    },
    {
      type: 'video',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      },
    },
    {
      type: 'audio',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      },
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Inline Content:',
          styles: { bold: true },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Styled Text',
          styles: {
            bold: true,
            italic: true,
            textColor: 'red',
            backgroundColor: 'blue',
          },
        },
        {
          type: 'text',
          text: ' ',
          styles: {},
        },
        {
          type: 'link',
          content: 'Link',
          href: 'https://www.blocknotejs.org',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    //TODO: remove casting
  ] as any;
}

export const allBlocksExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BnaEditorComponent } from '@dytab/block-note-angular';

@Component({
  standalone: true,
  imports: [CommonModule, BnaEditorComponent],
  template: \`
    <bna-editor
      [initialContent]="initialContent"
    />
  \`,
})
export class AllBlocksExample {
  initialContent = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Blocks:',
          styles: { bold: true },
        },
      ],
    },
    {
      type: 'paragraph',
      content: 'Paragraph',
    },
    {
      type: 'heading',
      content: 'Heading',
    },
    {
      type: 'bulletListItem',
      content: 'Bullet List Item',
    },
    {
      type: 'numberedListItem',
      content: 'Numbered List Item',
    },
    {
      type: 'checkListItem',
      content: 'Check List Item',
    },
    {
      type: 'table',
      content: {
        type: 'tableContent',
        rows: [
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
          {
            cells: ['Table Cell', 'Table Cell', 'Table Cell'],
          },
        ],
      },
    },
    {
      type: 'file',
    },
    {
      type: 'image',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      },
    },
    {
      type: 'video',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      },
    },
    {
      type: 'audio',
      props: {
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
        caption:
          'From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      },
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Inline Content:',
          styles: { bold: true },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Styled Text',
          styles: {
            bold: true,
            italic: true,
            textColor: 'red',
            backgroundColor: 'blue',
          },
        },
        {
          type: 'text',
          text: ' ',
          styles: {},
        },
        {
          type: 'link',
          content: 'Link',
          href: 'https://www.blocknotejs.org',
        },
      ],
    },
    {
      type: 'paragraph',
    },
    //TODO: remove casting
  ] as any;
}`;
