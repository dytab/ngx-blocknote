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
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from '@blocknote/core';
import { BnaFilePanelControllerDirective } from '../components/file-panel/bna-file-panel-controller.directive';
import { BnaFilePanelComponent } from '../components/file-panel/bna-file-panel.component';
import { BnaFormattingToolbarControllerDirective } from '../components/formatting-toolbar/bna-formatting-toolbar-controller.directive';
import { BnaFormattingToolbarComponent } from '../components/formatting-toolbar/bna-formatting-toolbar.component';
import { BnaBasicTextStyleButtonComponent } from '../components/formatting-toolbar/default-buttons/basic-text-style-button/bna-basic-text-style-button.component';
import { BnaColorStyleButtonComponent } from '../components/formatting-toolbar/default-buttons/color-style/bna-color-style-button.component';
import { BnaCreateLinkComponent } from '../components/formatting-toolbar/default-buttons/create-link/bna-create-link.component';
import { BnaTextAlignButtonComponent } from '../components/formatting-toolbar/default-buttons/text-align-button/bna-text-align-button.component';
import { BnaBlockTypeSelectComponent } from '../components/formatting-toolbar/default-selects/block-type-select/bna-block-type-select.component';
import { BnaDeleteLinkComponent } from '../components/link-toolbar/default-buttons/delete-link/bna-delete-link.component';
import { BnaEditLinkButtonComponent } from '../components/link-toolbar/default-buttons/edit-link/bna-edit-link-button.component';
import { BnaOpenLinkComponent } from '../components/link-toolbar/default-buttons/open-link/bna-open-link.component';
import { BnaLinkToolbarControllerDirective } from '../components/link-toolbar/link-toolbar-controller.directive';
import { BnaLinkToolbarComponent } from '../components/link-toolbar/link-toolbar.component';
import { BnaSideMenuControllerDirective } from '../components/side-menu/bna-side-menu-controller.directive';
import { BnaSideMenuComponent } from '../components/side-menu/bna-side-menu.component';
import { BnaAddBlockButtonComponent } from '../components/side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../components/side-menu/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSuggestionsMenuComponent } from '../components/suggestions-menu';
import { BnaSuggestionsMenuControllerDirective } from '../components/suggestions-menu/bna-suggestions-menu-controller.directive';
import { BnaTableHandlesController } from '../components/table-handles/bna-table-handles-controller.component';
import { BlockNoteEditorOptionsType } from '../interfaces/block-note-editor-options.type';
import { BlockNoteAngularService } from '../services/block-note-angular.service';
import {
  HlmButtonDirective,
  HlmCardDirective,
  HlmInputDirective,
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '../ui';
import { BnaViewControllerDirective } from './view/bna-view-controller.directive';
import { useSelectedBlocks } from '../util';

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
    BnaBasicTextStyleButtonComponent,
    HlmMenuComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuShortcutComponent,
    HlmMenuItemSubIndicatorComponent,
    BnaTextAlignButtonComponent,
    BnaFilePanelComponent,
    HlmInputDirective,
    BnaFilePanelControllerDirective,
    BnaFormattingToolbarComponent,
    BnaSideMenuComponent,
    BnaSuggestionsMenuComponent,
    BnaLinkToolbarControllerDirective,
    BnaLinkToolbarComponent,
    BnaCreateLinkComponent,
    BnaOpenLinkComponent,
    BnaEditLinkButtonComponent,
    BnaDeleteLinkComponent,
    BnaColorStyleButtonComponent,
    BnaBlockTypeSelectComponent,
    BnaTableHandlesController,
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

  editor = this.createEditor(undefined);

  constructor(private blockNoteAngularService: BlockNoteAngularService) {
    this.blockNoteAngularService.setEditor(this.editor);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.editor = this.createEditor(changes['initialContent'].currentValue);
      this.blockNoteAngularService.setOptions(this.options ?? {});
    } else if (changes['initialContent']) {
      this.updateEditorsInitialContent(changes['initialContent'].currentValue);
    }
  }

  createEditor(
    initialContent:
      | Block<BSchema, ISchema, SSchema>[]
      | PartialBlock<BSchema, ISchema, SSchema>[]
      | undefined
  ) {
    const schema = this.options?.schema;
    const editor = BlockNoteEditor.create({
      schema: schema ? schema : undefined,
      initialContent: initialContent,
      uploadFile: this.options?.uploadFile,
    });
    this.blockNoteAngularService.setEditor(editor);
    this.onEditorReady.emit(editor);
    this.createEditorListeners(editor);
    return editor;
  }

  private createEditorListeners(
    editor: BlockNoteEditor<BSchema, ISchema, SSchema>
  ) {
    editor.onChange((data) => {
      this.contentChanged.emit(data.document);
    });
    editor.onSelectionChange(() => {
      const selectedBlocks = useSelectedBlocks(editor);
      this.selectedBlocks.emit(selectedBlocks);
    });
  }

  private updateEditorsInitialContent(
    initialContent:
      | Block<BSchema, ISchema, SSchema>[]
      | PartialBlock<BSchema, ISchema, SSchema>[]
  ) {
    this.editor.replaceBlocks(
      [...this.editor.document],
      initialContent ?? [
        {
          type: 'paragraph',
        },
      ]
    );
  }
}
