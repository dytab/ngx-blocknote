import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Host,
  input,
  Optional,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
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
  StyleSpecs,
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
import { BnaFormattingToolbarDirective } from '../../components/bna-formatting-toolbar/bna-formatting-toolbar.directive';
import { BnaSideMenuDirective } from '../../components/bna-side-menu/bna-side-menu.directive';
import { BnaAddBlockButtonComponent } from '../../components/bna-side-menu/default-buttons/add-block-button/bna-add-block-button.component';
import { BnaDragHandleMenuComponent } from '../../components/bna-side-menu/default-buttons/drag-handle-menu/bna-drag-handle-menu.component';
import { BnaSuggestionsMenuDirective } from '../../components/bna-suggestions-menu/bna-suggestions-menu.directive';
import { BnaViewDirective } from '../../components/bna-view/bna-view.directive';
import { BasicTextStyleButtonComponent } from '../../components/buttons/basic-text-style-button/basic-text-style-button.component';
import { TextAlignButtonComponent } from '../../components/buttons/text-align-button/text-align-button.component';

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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bna-editor',
  standalone: true,
  styleUrl: './bna-editor.component.css',
  templateUrl: './bna-editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BnaEditorComponent),
      multi: true,
    },
  ],
})
export class BnaEditorComponent implements ControlValueAccessor {
  formControl = input<FormControl>();
  formControlName = input<string>();
  labelForId = input<string>();
  blockSpecs = input<BlockSpecs>();
  inlineContentSpecs = input<InlineContentSpecs>();
  styleSpecs = input<StyleSpecs>();
  inputSlashMenuItems = input<DefaultSuggestionItem[]>();

  isDisabled = false;

  editor!: BlockNoteEditor;
  slashMenuItems: DefaultSuggestionItem[] = [];

  addedElement = 0;

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  get control() {
    return (
      this.formControl() ??
      this.controlContainer.control?.get(this.formControlName() as string)
    );
  }

  get invalid() {
    return this.control?.invalid;
  }

  get touched() {
    return this.control?.touched;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  onChange: any = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  onTouch: any = () => {};

  writeValue(outerValue: Block[]): void {
    //TODO: check how we can update the current editor with new content
    this.createEditor(outerValue);
  }

  createEditor(initialContent: Block[]) {
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
              ...defaultStyleSpecs,
            },
      }),
      initialContent: initialContent,
    }) as unknown as BlockNoteEditor;
    this.slashMenuItems = this.getSlashMenuItems(this.editor);
    this.editor.onChange((data) => {
      this.onChange(data.document);
    });
  }

  getSlashMenuItems(editor: BlockNoteEditor): DefaultSuggestionItem[] {
    const slashMenuItems = this.inputSlashMenuItems();
    return slashMenuItems
      ? slashMenuItems
      : [...getDefaultSlashMenuItems(editor)];
  }

  registerOnChange(fn: unknown) {
    this.onChange = fn;
  }

  registerOnTouched(fn: unknown) {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.editor.isEditable = !isDisabled;
  }
}
