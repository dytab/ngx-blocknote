import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  BnaSuggestionsMenuComponent,
  BnaSuggestionsMenuControllerDirective,
  HlmButtonDirective,
} from '@dytab/block-note-angular';
import { Mention } from './mentions';

const getMentionMenuItems = (editor: typeof schema.BlockNoteEditor) => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
    },
  }));
};
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs, mention: Mention },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-mentions-menu-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButtonDirective,
    BnaSuggestionsMenuControllerDirective,
    BnaSuggestionsMenuComponent,
  ],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
    (onEditorReady)="onEditorReady($event)"
    ><bna-suggestions-menu-controller triggerCharacter="@">
      <div
        class="bg-background shadow-2xl shadow-neutral-500 rounded p-1 flex flex-col"
      >
        @for(item of items;track item.title){
        <button
          hlmBtn
          variant="ghost"
          size="sm"
          (mousedown)="item.onItemClick()"
        >
          {{ item.title }}
        </button>
        }
      </div>
    </bna-suggestions-menu-controller></bna-editor
  >`,
})
export class MentionsMenuExample {
  items: { title: string; onItemClick: () => void }[] = [];
  initialContent: PartialBlock<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema
  >[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'mention',
          props: {
            user: 'Steve',
          },
        },
        {
          type: 'text',
          text: ' <- This is an example mention',
          styles: {},
        },
      ],
    },
    {
      type: 'paragraph',
      content: "Press the '@' key to open the mentions menu and add another",
    },
    {
      type: 'paragraph',
    },
  ];
  options: BlockNoteEditorOptionsType = { schema };

  onEditorReady($event: BlockNoteEditor<any, any, any>) {
    this.items = getMentionMenuItems($event);
  }
}

export const mentionsMenuExampleCode = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  BnaSuggestionsMenuComponent,
  BnaSuggestionsMenuControllerDirective,
  HlmButtonDirective,
} from '@dytab/block-note-angular';
import { Mention } from './mentions';

const getMentionMenuItems = (editor: typeof schema.BlockNoteEditor) => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
    },
  }));
};
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs, mention: Mention },
  styleSpecs: { ...defaultStyleSpecs },
});
@Component({
  selector: 'bna-mentions-menu-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButtonDirective,
    BnaSuggestionsMenuControllerDirective,
    BnaSuggestionsMenuComponent,
  ],
  template: \`<bna-editor
    [initialContent]="initialContent"
    [options]="options"
    (onEditorReady)="onEditorReady($event)"
    ><bna-suggestions-menu-controller triggerCharacter="@">
      <div
        class="bg-background shadow-2xl shadow-neutral-500 rounded p-1 flex flex-col"
      >
        @for(item of items;track item.title){
        <button
          hlmBtn
          variant="ghost"
          size="sm"
          (mousedown)="item.onItemClick()"
        >
          {{ item.title }}
        </button>
        }
      </div>
    </bna-suggestions-menu-controller></bna-editor
  >\`,
})
export class MentionsMenuExample {
  items: { title: string; onItemClick: () => void }[] = [];
  initialContent: PartialBlock<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema
  >[] = [
    {
      type: 'paragraph',
      content: 'Welcome to this demo!',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'mention',
          props: {
            user: 'Steve',
          },
        },
        {
          type: 'text',
          text: ' <- This is an example mention',
          styles: {},
        },
      ],
    },
    {
      type: 'paragraph',
      content: "Press the '@' key to open the mentions menu and add another",
    },
    {
      type: 'paragraph',
    },
  ];
  options: BlockNoteEditorOptionsType = { schema };

  onEditorReady($event: BlockNoteEditor<any, any, any>) {
    this.items = getMentionMenuItems($event);
  }
}`;
