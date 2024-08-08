import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
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
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';
import { BnaFilePanelControllerDirective } from '../components/bna-file-panel/bna-file-panel-controller.directive';
import { BnaFilePanelComponent } from '../components/bna-file-panel/bna-file-panel.component';
import { BnaFormattingToolbarControllerDirective } from '../components/bna-formatting-toolbar/bna-formatting-toolbar-controller.directive';
import { BnaFormattingToolbarComponent } from '../components/bna-formatting-toolbar/bna-formatting-toolbar.component';
import { BnaSideMenuControllerDirective } from '../components/bna-side-menu/bna-side-menu-controller.directive';
import { BnaSideMenuComponent } from '../components/bna-side-menu/bna-side-menu.component';
import { BnaAddBlockButtonComponent } from '../components/bna-side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../components/bna-side-menu/default-buttons/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSuggestionsMenuControllerDirective } from '../components/bna-suggestions-menu/bna-suggestions-menu-controller.directive';
import { BnaViewControllerDirective } from '../components/bna-view/bna-view-controller.directive';
import { BasicTextStyleButtonComponent } from '../components/buttons/basic-text-style-button/basic-text-style-button.component';
import { TextAlignButtonComponent } from '../components/buttons/text-align-button/text-align-button.component';
import { BlockNoteEditorOptionsType } from '../interfaces/block-note-editor-options.type';
import { BlockNoteAngularService } from '../services/block-note-angular.service';

@Component({
  imports: [
    CommonModule,
    BnaViewControllerDirective,
    BnaSideMenuControllerDirective,
    BnaAddBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaSuggestionsMenuControllerDirective,
    BnaFormattingToolbarControllerDirective,
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
    BnaFilePanelComponent,
    HlmInputDirective,
    BnaFilePanelControllerDirective,
    BnaFormattingToolbarComponent,
    BnaSideMenuComponent,
  ],
  providers: [BlockNoteAngularService],
  selector: 'bna-editor',
  standalone: true,
  styleUrl: './bna-editor.component.css',
  templateUrl: './bna-editor.component.html',
})
export class BnaEditorComponent<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema
> implements OnChanges, OnInit
{
  @Input()
  options?: BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>;

  // TODO: move to reusable type
  @Input()
  initialContent:
    | Block<BSchema, ISchema, SSchema>[]
    | PartialBlock<BSchema, ISchema, SSchema>[]
    | undefined = undefined;

  contentChanged = output<Block<BSchema, ISchema, SSchema>[]>();
  selectedBlocks = output<Block<BSchema, ISchema, SSchema>[]>();
  onEditorReady = output<BlockNoteEditor<BSchema, ISchema, SSchema>>();

  editor!: BlockNoteEditor<BSchema, ISchema, SSchema>;
  slashMenuItems: Omit<DefaultSuggestionItem, 'key'>[] = [];

  //TODO: remove relying on init flag
  isInitialized = false;

  constructor(private blockNoteAngularService: BlockNoteAngularService) {}

  ngOnInit() {
    this.createEditor(this.initialContent);
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialContent']) {
      // TODO: try to type the current value (currently any)
      this.createEditor(changes['initialContent'].currentValue);
      this.isInitialized = true;
    }
  }

  createEditor(
    initialContent:
      | Block<BSchema, ISchema, SSchema>[]
      | PartialBlock<BSchema, ISchema, SSchema>[]
      | undefined
  ) {
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
      uploadFile: this.options?.uploadFile,
    });
    this.blockNoteAngularService.setEditor(this.editor);
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
