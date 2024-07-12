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
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  getDefaultSlashMenuItems,
  insertOrUpdateBlock,
  PartialBlock,
} from '@blocknote/core';
import { DefaultSuggestionItem } from '@blocknote/core/src/extensions/SuggestionMenu/DefaultSuggestionItem';
import { BlockNoteViewDirective } from '../../components/block-note-view/block-note-view.directive';
import { BlockNoteSideMenuDirective } from '../../components/side-menu/block-note-side-menu.directive';
import { AddBlockButtonComponent } from '../../components/side-menu/default-buttons/add-block-button/add-block-button.component';
import { DragHandleMenuComponent } from '../../components/side-menu/default-buttons/drag-handle-menu/drag-handle-menu.component';
import { BlockNoteSuggestionsMenuDirective } from '../../components/suggestions-menu/block-note-suggestions-menu.directive';

@Component({
  imports: [
    CommonModule,
    BlockNoteViewDirective,
    BlockNoteSideMenuDirective,
    AddBlockButtonComponent,
    DragHandleMenuComponent,
    BlockNoteSuggestionsMenuDirective,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'block-note',
  standalone: true,
  styleUrl: './block-note-editor.component.css',
  templateUrl: './block-note-editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BlockNoteEditorComponent),
      multi: true,
    },
  ],
})
export class BlockNoteEditorComponent implements ControlValueAccessor {
  formControl = input<FormControl>();
  formControlName = input<string>();
  labelForId = input<string>();

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
    const schema = BlockNoteSchema.create({
      blockSpecs: {
        // enable the default blocks if desired
        ...defaultBlockSpecs,

        // Add your own custom blocks:
        // customBlock: CustomBlock,
      },
      inlineContentSpecs: {
        // enable the default inline content if desired
        ...defaultInlineContentSpecs,

        // Add your own custom inline content:
        // customInlineContent: CustomInlineContent,
      },
      styleSpecs: {
        // enable the default styles if desired
        ...defaultStyleSpecs,

        // Add your own custom styles:
        // customStyle: CustomStyle
      },
    });

    this.editor = BlockNoteEditor.create({
      trailingBlock: false,
      schema,
      initialContent: initialContent,
    });
    this.slashMenuItems = this.getSlashMenuItems(this.editor);
    this.editor.onChange((data) => {
      this.onChange(data.document);
    });
  }

  getSlashMenuItems(editor: BlockNoteEditor) {
    return [...getDefaultSlashMenuItems(editor)];
  }

  addBlock(type: string) {
    // Block that the text cursor is currently in.
    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
    };

    this.addedElement += 1;
    // Inserting the new block after the current one.
    insertOrUpdateBlock(this.editor, helloWorldBlock);
    this.editor.suggestionMenus.closeMenu();
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
