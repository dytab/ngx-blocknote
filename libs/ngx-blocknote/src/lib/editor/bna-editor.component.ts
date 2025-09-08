import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  inject,
  input,
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
import { BnaLinkToolbarControllerComponent } from '../components/link-toolbar/link-toolbar-controller.component';
import { BnaLinkToolbarComponent } from '../components/link-toolbar/link-toolbar.component';
import { BnaSideMenuControllerComponent } from '../components/side-menu/bna-side-menu-controller.component';
import { BnaSideMenuComponent } from '../components/side-menu/bna-side-menu.component';
import { BnaAddBlockButtonComponent } from '../components/side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../components/side-menu/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSlashMenuComponent } from '../components/suggestions-menu';
import { BnaSlashMenuControllerComponent } from '../components/suggestions-menu/bna-slash-menu-controller.component';
import { BnaTableHandlesControllerComponent } from '../components/table-handles/bna-table-handles-controller.component';
import { BlockNoteEditorOptionsType } from '../interfaces/block-note-editor-options.type';
import { NgxBlocknoteService } from '../services/ngx-blocknote.service';
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
  selector: 'bna-editor',
  templateUrl: './bna-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BnaViewControllerDirective,
    BnaSideMenuControllerComponent,
    BnaAddBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaFormattingToolbarControllerComponent,
    BnaBasicTextStyleButtonComponent,
    BnaTextAlignButtonComponent,
    BnaFilePanelComponent,
    BnaFilePanelControllerComponent,
    BnaFormattingToolbarComponent,
    BnaSideMenuComponent,
    BnaSlashMenuComponent,
    BnaLinkToolbarControllerComponent,
    BnaLinkToolbarComponent,
    BnaCreateLinkComponent,
    BnaOpenLinkComponent,
    BnaEditLinkButtonComponent,
    BnaDeleteLinkComponent,
    BnaColorStyleButtonComponent,
    BnaBlockTypeSelectComponent,
    BnaTableHandlesControllerComponent,
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
})
export class BnaEditorComponent<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
  >
  implements OnChanges, ControlValueAccessor, OnInit
{
  private ngxBlockNoteService = inject(
    NgxBlocknoteService<BSchema, ISchema, SSchema>,
  );

  readonly options =
    input<BlockNoteEditorOptionsType<BSchema, ISchema, SSchema>>();
  readonly initialContent = input<InitialContent<BSchema, ISchema, SSchema>>();
  readonly customEditor = input<BlockNoteEditor<BSchema, ISchema, SSchema>>();

  contentChanged = output<Block<BSchema, ISchema, SSchema>[]>();
  selectedBlocks = output<Block<BSchema, ISchema, SSchema>[]>();
  editorReady = output<BlockNoteEditor<BSchema, ISchema, SSchema>>();

  private hasCustomEditor = false;
  private _editor: BlockNoteEditor<BSchema, ISchema, SSchema> =
    this.createEditor(undefined);

  suggestionMenuShown = signal(false);
  filePanelShown = signal(false);
  formattingToolbarShown = signal(false);
  sideMenuShown = signal(false);
  linkToolbarShown = signal(false);
  isDisabled = signal(false);

  private onChangeCallbackListeners: Array<() => void | undefined> = [];

  get editor(): BlockNoteEditor<BSchema, ISchema, SSchema> {
    return this._editor;
  }

  firstTimeInitialized = false;

  constructor() {
    this.ngxBlockNoteService.setEditor(this.editor);

    // Handle editor input changes with effect
    effect(() => {
      const customEditor = this.customEditor();
      if (customEditor) {
        this._editor = customEditor;
        this.hasCustomEditor = true;
        this.ngxBlockNoteService.setEditor(customEditor);
        this.createEditorListeners(customEditor);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: Block<BSchema, ISchema, SSchema>[]) => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: () => void = () => {};

  writeValue(initialContent: InitialContent<BSchema, ISchema, SSchema>): void {
    this.updateEditorsInitialContent(initialContent);
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    this.editor.isEditable = !isDisabled;
  }

  ngOnChanges(changes: SimpleChanges) {
    const options = this.options();
    if (!this.hasCustomEditor && changes['options']) {
      this._editor = this.createEditor(undefined);
      this.editorReady.emit(this.editor);
      this.firstTimeInitialized = true;

      this.ngxBlockNoteService.setOptions(options ?? {});
    }
    //just update the options, when a custom editor is used. Suggestion menu depends on it
    if (this.hasCustomEditor && changes['options']) {
      this.ngxBlockNoteService.setOptions(options ?? {});
    }

    if (!changes['options'] && !this.firstTimeInitialized) {
      this.firstTimeInitialized = true;
      this.editorReady.emit(this.editor);
    }

    if (changes['initialContent']) {
      this.updateEditorsInitialContent(changes['initialContent'].currentValue);
    }
  }

  ngOnInit() {
    //do not remove this, this needs to be here, because it does not fire in onChanges, if there are no inputs
    if (!this.firstTimeInitialized) {
      this.firstTimeInitialized = true;
      this.editorReady.emit(this.editor);
    }
  }

  createEditor(
    initialContent:
      | Block<BSchema, ISchema, SSchema>[]
      | PartialBlock<BSchema, ISchema, SSchema>[]
      | undefined,
  ) {
    const options = this.options();
    const schema = options?.schema;
    const editor = BlockNoteEditor.create({
      schema: schema
        ? schema
        : (BlockNoteSchema.create({
            blockSpecs: { ...defaultBlockSpecs },
            inlineContentSpecs: { ...defaultInlineContentSpecs },
            styleSpecs: {
              ...defaultStyleSpecs,
            },
            // in this case the user did not give a blocknote schema, so we want to use the default one
          }) as unknown as BlockNoteSchema<BSchema, ISchema, SSchema>),
      initialContent: initialContent,
      uploadFile: options?.uploadFile,
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
