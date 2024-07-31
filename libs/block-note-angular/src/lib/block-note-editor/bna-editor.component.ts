import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges
} from '@angular/core';
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  BlockSpecs,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  DefaultSuggestionItem,
  getDefaultSlashMenuItems,
  InlineContentSpecs,
  StyleSpecs
} from '@blocknote/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent
} from '@spartan-ng/ui-menu-helm';
import {
  BnaFormattingToolbarDirective
} from '../components/bna-formatting-toolbar/bna-formatting-toolbar.directive';
import {
  BnaSideMenuDirective
} from '../components/bna-side-menu/bna-side-menu.directive';
import {
  BnaAddBlockButtonComponent
} from '../components/bna-side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import {
  BnaDragHandleMenuComponent
} from '../components/bna-side-menu/default-buttons/drag-handle-menu/bna-drag-handle-menu.component';
import {
  BnaSuggestionsMenuDirective
} from '../components/bna-suggestions-menu/bna-suggestions-menu.directive';
import { BnaViewDirective } from '../components/bna-view/bna-view.directive';
import {
  BasicTextStyleButtonComponent
} from '../components/buttons/basic-text-style-button/basic-text-style-button.component';
import {
  TextAlignButtonComponent
} from '../components/buttons/text-align-button/text-align-button.component';

@Component({
  imports: [
    CommonModule,
    BnaViewDirective,
    BnaSideMenuDirective,
    BnaAddBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaSuggestionsMenuDirective,
    BnaFormattingToolbarDirective,
    HlmCardDirective,
    HlmButtonDirective,
    BasicTextStyleButtonComponent,
    HlmMenuComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuShortcutComponent,
    HlmMenuItemSubIndicatorComponent,
    TextAlignButtonComponent
  ],
  selector: 'bna-editor',
  standalone: true,
  styleUrl: './bna-editor.component.css',
  templateUrl: './bna-editor.component.html'
})
export class BnaEditorComponent implements OnChanges{
  initialContent = input<Block[]>();
  blockSpecs = input<BlockSpecs>();
  inlineContentSpecs = input<InlineContentSpecs>();
  styleSpecs = input<StyleSpecs>();
  inputSlashMenuItems = input<Array<(editor: BlockNoteEditor) => Omit<DefaultSuggestionItem, 'key'>>>();

  contentChanged = output<Block[]>();
  onEditorReady = output<BlockNoteEditor>();

  editor!: BlockNoteEditor;
  slashMenuItems: Omit<DefaultSuggestionItem, 'key'>[] = [];

  //TODO: remove relying on init flag
  isInitialized = false;

  ngOnChanges(changes: SimpleChanges){
    if (changes['initialContent']){
      //TODO: remove casting
      this.createEditor(changes['initialContent'].currentValue as any);
      this.isInitialized = true;
    }
  }

  createEditor(initialContent: Block[]){
    const blockSpecs = this.blockSpecs();
    const inlineContentSpecs = this.inlineContentSpecs();
    const styleSpecs = this.styleSpecs();
    this.editor = BlockNoteEditor.create({
      trailingBlock: false,
      schema: BlockNoteSchema.create({
        blockSpecs: blockSpecs ? blockSpecs : { ...defaultBlockSpecs },
        inlineContentSpecs: inlineContentSpecs
          ? inlineContentSpecs
          : { ...defaultInlineContentSpecs },
        styleSpecs: styleSpecs
          ? styleSpecs
          : {
            ...defaultStyleSpecs
          }
      }),
      initialContent: initialContent
    }) as unknown as BlockNoteEditor;
    this.onEditorReady.emit(this.editor);
    this.slashMenuItems = this.getSlashMenuItems(this.editor);
    this.editor.onChange((data) => {
      //TODO: remove casting
      this.contentChanged.emit(data.document as any);
    });
  }

  getSlashMenuItems(editor: BlockNoteEditor): Omit<DefaultSuggestionItem, 'key'>[]{
    const slashMenuItems = this.inputSlashMenuItems();
    if (slashMenuItems){
      const customSlashMenuItem = slashMenuItems.map(a => a(this.editor));
      return [...getDefaultSlashMenuItems(editor), ...customSlashMenuItem];
    }

    return [...getDefaultSlashMenuItems(editor)];
  }
}
