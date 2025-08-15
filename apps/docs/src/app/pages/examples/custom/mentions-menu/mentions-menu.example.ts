import { Component, computed, signal } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  filterSuggestionItems,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  BnaSuggestionsMenuControllerComponent,
} from '@dytab/ngx-blocknote';
import { HlmButton } from '@spartan-ng/helm/button';
import { Mention } from './mentions';

const getMentionMenuItems = (editor: typeof schema.BlockNoteEditor) => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.suggestionMenus.clearQuery();
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
      editor.suggestionMenus.closeMenu();
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
  imports: [
    BnaEditorComponent,
    HlmButton,
    BnaSuggestionsMenuControllerComponent,
  ],
  template: `<bna-editor
    [initialContent]="initialContent"
    [options]="options"
    (editorReady)="onEditorReady($event)"
    ><bna-suggestions-menu-controller triggerCharacter="@">
      <div
        class="bg-background shadow-2xl shadow-neutral-500 rounded p-1 flex flex-col"
      >
        @for (item of filteredItems(); track item.title) {
          <button
            hlmBtn
            variant="ghost"
            size="sm"
            (mousedown)="addItem($event, item)"
          >
            {{ item.title }}
          </button>
        }
      </div>
    </bna-suggestions-menu-controller></bna-editor
  >`,
})
export class MentionsMenuExample {
  query = signal('');
  filteredItems = computed(() => {
    return filterSuggestionItems(this.items, this.query());
  });
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
    $event.suggestionMenus.onUpdate('@', (state) => {
      this.query.set(state.query);
    });
  }

  addItem($event: Event, item: { title: string; onItemClick: () => void }) {
    $event.preventDefault();
    item.onItemClick();
  }
}

export const mentionsMenuExampleCode = `import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  filterSuggestionItems,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteEditorOptionsType,
  BnaEditorComponent,
  BnaSuggestionsMenuComponent,
  BnaSuggestionsMenuControllerDirective,
  HlmButton,
} from '@dytab/ngx-blocknote';
import { Mention } from './mentions';

const getMentionMenuItems = (editor: typeof schema.BlockNoteEditor) => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.suggestionMenus.clearQuery();
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
      editor.suggestionMenus.closeMenu();
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
    HlmButton,
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
        @for(item of filteredItems();track item.title){
        <button hlmBtn variant="ghost" size="sm" (mousedown)="addItem($event,item)">
          {{ item.title }}
        </button>
        }
      </div>
    </bna-suggestions-menu-controller></bna-editor
  >\`,
})
export class MentionsMenuExample {
  query = signal('');
  filteredItems = computed(() => {
    return filterSuggestionItems(this.items, this.query());
  });
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
    $event.suggestionMenus.onUpdate('@', (state) => {
      this.query.set(state.query);
    });

  addItem($event: Event, item:{title:string, onItemClick: () => void} ) {
    $event.preventDefault()
    item.onItemClick();
  }
}`;
