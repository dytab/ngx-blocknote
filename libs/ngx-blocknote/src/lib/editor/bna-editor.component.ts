import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from '@blocknote/core';
import { BnaFilePanelControllerComponent } from '../components/file-panel/bna-file-panel-controller.component';
import { BnaFilePanelComponent } from '../components/file-panel/bna-file-panel.component';
import { BnaFormattingToolbarControllerComponent } from '../components/formatting-toolbar/bna-formatting-toolbar-controller.component';
import { BnaFormattingToolbarComponent } from '../components/formatting-toolbar/bna-formatting-toolbar.component';
import { BnaBasicTextStyleButtonComponent } from '../components/formatting-toolbar/default-buttons/basic-text-style-button/bna-basic-text-style-button.component';
import { BnaColorStyleButtonComponent } from '../components/formatting-toolbar/default-buttons/color-style/bna-color-style-button.component';
import { BnaCreateLinkComponent } from '../components/formatting-toolbar/default-buttons/create-link/bna-create-link.component';
import { BnaFileCaptionButtonComponent } from '../components/formatting-toolbar/default-buttons/file-caption-button/bna-file-caption-button.component';
import { BnaFileDeleteButtonComponent } from '../components/formatting-toolbar/default-buttons/file-delete-button/bna-file-delete-button.component';
import { BnaFileDownloadButtonComponent } from '../components/formatting-toolbar/default-buttons/file-download-button/bna-file-download-button.component';
import { BnaFilePreviewButtonComponent } from '../components/formatting-toolbar/default-buttons/file-preview-button/bna-file-preview-button.component';
import { BnaFileRenameButtonComponent } from '../components/formatting-toolbar/default-buttons/file-rename-button/bna-file-rename-button.component';
import { BnaFileReplaceButtonComponent } from '../components/formatting-toolbar/default-buttons/file-replace-button/bna-file-replace-button.component';
import { BnaTextAlignButtonComponent } from '../components/formatting-toolbar/default-buttons/text-align-button/bna-text-align-button.component';
import { BnaBlockTypeSelectComponent } from '../components/formatting-toolbar/default-selects/block-type-select/bna-block-type-select.component';
import { BnaDeleteLinkComponent } from '../components/link-toolbar/default-buttons/delete-link/bna-delete-link.component';
import { BnaEditLinkButtonComponent } from '../components/link-toolbar/default-buttons/edit-link/bna-edit-link-button.component';
import { BnaOpenLinkComponent } from '../components/link-toolbar/default-buttons/open-link/bna-open-link.component';
import { BnaLinkToolbarControllerDirective } from '../components/link-toolbar/link-toolbar-controller.component';
import { BnaLinkToolbarComponent } from '../components/link-toolbar/link-toolbar.component';
import { BnaSideMenuControllerComponent } from '../components/side-menu/bna-side-menu-controller.component';
import { BnaSideMenuComponent } from '../components/side-menu/bna-side-menu.component';
import { BnaAddBlockButtonComponent } from '../components/side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../components/side-menu/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSlashMenuComponent } from '../components/suggestions-menu';
import { BnaSlashMenuControllerComponent } from '../components/suggestions-menu/bna-slash-menu-controller.component';
import { BnaSuggestionsMenuControllerComponent } from '../components/suggestions-menu/bna-suggestions-menu-controller.component';
import { BnaTableHandlesController } from '../components/table-handles/bna-table-handles-controller.component';
import { BlockNoteEditorOptionsType } from '../interfaces/block-note-editor-options.type';
import { NgxBlocknoteService } from '../services/ngx-blocknote.service';
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
import { useSelectedBlocks } from '../util';
import { useEditorContentOrSelectionChange } from '../util/use-editor-content-or-selection-change';
import { BnaViewControllerDirective } from './view/bna-view-controller.directive';

type InitialContent<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> =
  | Block<BSchema, ISchema, SSchema>[]
  | PartialBlock<BSchema, ISchema, SSchema>[]
  | undefined;

@Component({
  imports: [
    CommonModule,
    BnaViewControllerDirective,
    BnaSideMenuControllerComponent,
    BnaAddBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaSuggestionsMenuControllerComponent,
    BnaFormattingToolbarControllerComponent,
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
    BnaFilePanelControllerComponent,
    BnaFormattingToolbarComponent,
    BnaSideMenuComponent,
    BnaSlashMenuComponent,
    BnaLinkToolbarControllerDirective,
    BnaLinkToolbarComponent,
    BnaCreateLinkComponent,
    BnaOpenLinkComponent,
    BnaEditLinkButtonComponent,
    BnaDeleteLinkComponent,
    BnaColorStyleButtonComponent,
    BnaBlockTypeSelectComponent,
    BnaTableHandlesController,
    BnaFileDeleteButtonComponent,
    BnaFileDownloadButtonComponent,
    BnaFileRenameButtonComponent,
    BnaFileCaptionButtonComponent,
    BnaFileReplaceButtonComponent,
    BnaFilePreviewButtonComponent,
    BnaSlashMenuControllerComponent,
  ],
  providers: [
    NgxBlocknoteService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BnaEditorComponent),
      multi: true,
    },
  ],
  selector: 'bna-editor',
  standalone: true,
  styleUrl: './bna-editor.component.css',
  templateUrl: './bna-editor.component.html',
})
export class BnaEditorComponent<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
  >
  implements OnChanges, ControlValueAccessor, OnInit
{
  @Input()
  options?: BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>;
  @Input()
  initialContent?: InitialContent<BSchema, ISchema, SSchema>;

  contentChanged = output<Block<BSchema, ISchema, SSchema>[]>();
  selectedBlocks = output<Block<BSchema, ISchema, SSchema>[]>();
  onEditorReady = output<BlockNoteEditor<BSchema, ISchema, SSchema>>();

  private hasCustomEditor = false;

  suggestionMenuShown = signal(false);
  filePanelShown = signal(false);
  formattingToolbarShown = signal(false);
  sideMenuShown = signal(false);
  linkToolbarShown = signal(false);

  private onChangeCallbackListeners: Array<() => void | undefined> = [];

  @Input()
  set editor(editor: BlockNoteEditor<BSchema, ISchema, SSchema>) {
    this._editor = editor;
    this.hasCustomEditor = true;
    this.ngxBlockNoteService.setEditor(editor);
    this.createEditorListeners(editor);
  }

  get editor(): BlockNoteEditor<BSchema, ISchema, SSchema> {
    return this._editor;
  }

  private _editor: BlockNoteEditor<BSchema, ISchema, SSchema> =
    this.createEditor(undefined);

  firstTimeInitialized = false;

  constructor(private ngxBlockNoteService: NgxBlocknoteService) {
    this.ngxBlockNoteService.setEditor(this.editor);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function
  onTouch: any = () => {};

  writeValue(initialContent: InitialContent<BSchema, ISchema, SSchema>): void {
    this.updateEditorsInitialContent(initialContent);
  }
  registerOnChange(fn: unknown): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: unknown): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.editor.isEditable = !isDisabled;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.hasCustomEditor && changes['options']) {
      this.editor = this.createEditor(undefined);
      this.onEditorReady.emit(this.editor);
      this.firstTimeInitialized = true;

      this.ngxBlockNoteService.setOptions(this.options ?? {});
    }
    //just update the options, when a custom editor is used. Suggestion menu depends on it
    if (this.hasCustomEditor && changes['options']) {
      this.ngxBlockNoteService.setOptions(this.options ?? {});
    }

    if (!changes['options'] && !this.firstTimeInitialized) {
      this.firstTimeInitialized = true;
      this.onEditorReady.emit(this.editor);
    }

    if (changes['initialContent']) {
      this.updateEditorsInitialContent(changes['initialContent'].currentValue);
    }
  }

  ngOnInit() {
    //do not remove this, this needs to be here, because it does not fire in onChanges, if there are no inputs
    if (!this.firstTimeInitialized) {
      this.firstTimeInitialized = true;
      this.onEditorReady.emit(this.editor);
    }
  }

  createEditor(
    initialContent:
      | Block<BSchema, ISchema, SSchema>[]
      | PartialBlock<BSchema, ISchema, SSchema>[]
      | undefined,
  ) {
    const schema = this.options?.schema;
    const editor = BlockNoteEditor.create({
      schema: schema
        ? schema
        : (BlockNoteSchema.create({
            blockSpecs: { ...defaultBlockSpecs },
            inlineContentSpecs: { ...defaultInlineContentSpecs },
            styleSpecs: {
              ...defaultStyleSpecs,
            },
            // in this case the user did not give a blocknote schema so we want to use the default one
            //TODO: remove casting
          }) as unknown as BlockNoteSchema<BSchema, ISchema, SSchema>),
      initialContent: initialContent,
      uploadFile: this.options?.uploadFile,
    });
    this.ngxBlockNoteService.setEditor(editor);
    this.createEditorListeners(editor);
    return editor;
  }

  private createEditorListeners(
    editor: BlockNoteEditor<BSchema, ISchema, SSchema>,
  ) {
    this.cleanupOnChangeListeners();
    this.registerChangeListener(
      editor.onChange((data) => {
        this.contentChanged.emit(data.document);
        this.onChange(data.document);
      }),
      editor.onSelectionChange(() => {
        const selectedBlocks = useSelectedBlocks(editor);
        this.selectedBlocks.emit(selectedBlocks);
      }),
      editor.suggestionMenus.onUpdate('/', (state) => {
        this.suggestionMenuShown.set(state.show);
      }),
      ...useEditorContentOrSelectionChange(() => {
        const selectedBlocks = useSelectedBlocks(editor);
        this.ngxBlockNoteService.selectedBlocks.set(selectedBlocks);
      }, editor),
      editor.filePanel?.onUpdate((state) => {
        this.filePanelShown.set(state.show);
      }),
      editor.formattingToolbar.onUpdate((state) => {
        this.formattingToolbarShown.set(state.show);
      }),
      editor.sideMenu.onUpdate((state) => {
        this.sideMenuShown.set(state.show);
      }),
      editor.linkToolbar.onUpdate((state) => {
        this.linkToolbarShown.set(state.show);
      }),
    );
  }

  private registerChangeListener(...callbacks: ((() => void) | undefined)[]) {
    const definedCallbacks = callbacks.filter(
      (callback) => callback !== undefined,
    );
    this.onChangeCallbackListeners.push(...definedCallbacks);
  }

  private cleanupOnChangeListeners() {
    this.onChangeCallbackListeners.forEach((fn) => fn());
    this.onChangeCallbackListeners = [];
  }

  private updateEditorsInitialContent(
    initialContent: InitialContent<BSchema, ISchema, SSchema>,
  ) {
    return this.editor.replaceBlocks(
      [...this.editor.document],
      initialContent ?? [
        {
          type: 'paragraph',
        },
      ],
    );
  }
}
