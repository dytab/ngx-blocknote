import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  BlockSchema,
  DefaultBlockSchema,
  defaultBlockSpecs,
  DefaultInlineContentSchema,
  defaultInlineContentSpecs,
  DefaultStyleSchema,
  defaultStyleSpecs,
  DefaultSuggestionItem,
  getDefaultSlashMenuItems,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
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
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';
import { BnaFormattingToolbarDirective } from '../components/bna-formatting-toolbar/bna-formatting-toolbar.directive';
import { BnaSideMenuDirective } from '../components/bna-side-menu/bna-side-menu.directive';
import { BnaAddBlockButtonComponent } from '../components/bna-side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../components/bna-side-menu/default-buttons/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSuggestionsMenuDirective } from '../components/bna-suggestions-menu/bna-suggestions-menu.directive';
import { BnaViewDirective } from '../components/bna-view/bna-view.directive';
import { BasicTextStyleButtonComponent } from '../components/buttons/basic-text-style-button/basic-text-style-button.component';
import { TextAlignButtonComponent } from '../components/buttons/text-align-button/text-align-button.component';
import { BlockNoteEditorOptionsType } from '../interfaces/block-note-editor-options.type';

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
    TextAlignButtonComponent,
  ],
  selector: 'bna-editor',
  standalone: true,
  styleUrl: './bna-editor.component.css',
  templateUrl: './bna-editor.component.html',
})
export class BnaEditorComponent<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema
> implements OnChanges
{
  @Input()
  options?: BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>;
  @Input()
  initialContent!:
    | Block<BSchema, ISchema, SSchema>[]
    | PartialBlock<BSchema, ISchema, SSchema>[]
    | undefined;

  contentChanged = output<Block<BSchema, ISchema, SSchema>[]>();
  selectedBlocks = output<Block<BSchema, ISchema, SSchema>[]>();
  onEditorReady = output<BlockNoteEditor<BSchema, ISchema, SSchema>>();

  editor!: BlockNoteEditor<BSchema, ISchema, SSchema>;
  slashMenuItems: Omit<DefaultSuggestionItem, 'key'>[] = [];

  //TODO: remove relying on init flag
  isInitialized = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialContent']) {
      this.createEditor(changes['initialContent'].currentValue);
      this.isInitialized = true;
    }
  }

  createEditor(initialContent: Block<BSchema, ISchema, SSchema>[]) {
    const schema = this.options?.schema;
    this.editor = BlockNoteEditor.create({
      trailingBlock: false,
      schema: schema
        ? schema
        : (BlockNoteSchema.create({
            blockSpecs: { ...defaultBlockSpecs },
            inlineContentSpecs: { ...defaultInlineContentSpecs },
            styleSpecs: {
              ...defaultStyleSpecs,
            },
            // in this case the user did not gave a block note schema so we want to use the default one
            //TODO: remove casting
          }) as unknown as BlockNoteSchema<BSchema, ISchema, SSchema>),
      initialContent: initialContent,
    });
    this.onEditorReady.emit(this.editor);
    this.slashMenuItems = this.getSlashMenuItems(this.editor);
    this.editor.onChange((data) => {
      this.contentChanged.emit(data.document);
    });
    this.editor.onSelectionChange((change) => {
      const selection = this.editor.getSelection();
      let selectedBlocks = [];
      // instead.
      if (selection !== undefined) {
        selectedBlocks = selection.blocks;
      } else {
        selectedBlocks = [this.editor.getTextCursorPosition().block];
      }
      this.selectedBlocks.emit(selectedBlocks);
    });
  }

  getSlashMenuItems(
    editor: BlockNoteEditor<BSchema, ISchema, SSchema>
  ): Omit<DefaultSuggestionItem, 'key'>[] {
    const slashMenuItems = this.options?.inputSlashMenuItems;
    if (slashMenuItems) {
      const customSlashMenuItem = slashMenuItems.map((a) => a(this.editor));
      return [...getDefaultSlashMenuItems(editor), ...customSlashMenuItem];
    }

    return [...getDefaultSlashMenuItems(editor)];
  }
}
