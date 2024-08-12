import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  PartialBlock,
} from '@blocknote/core';
import {
  BlockNoteAngularService,
  BlockNoteEditorOptionsType,
  BnaAddBlockButtonComponent,
  BnaDeleteBlockItemComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerDirective,
  HlmButtonDirective,
  HlmCheckboxComponent,
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmInputDirective,
} from '@dytab/block-note-angular';
import {
  BrnDialogContentDirective,
  BrnDialogDescriptionDirective,
  BrnDialogTitleDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import { ResetBlockButtonComponent } from '../../ui-components/adding-side-menu-drag-handle-items/reset-block-button.component';
import { apiContentBlock } from './api-content-block';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    apiContent: apiContentBlock,
  },
  inlineContentSpecs: { ...defaultInlineContentSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});

@Component({
  selector: 'bna-api-content-block-example',
  standalone: true,
  imports: [
    CommonModule,
    BnaEditorComponent,
    HlmButtonDirective,
    BnaAddBlockButtonComponent,
    BnaDeleteBlockItemComponent,
    BnaDragHandleMenuComponent,
    BnaSideMenuComponent,
    BnaSideMenuControllerDirective,
    ResetBlockButtonComponent,
    HlmDialogComponent,
    HlmDialogContentComponent,
    BrnDialogContentDirective,
    HlmDialogHeaderComponent,
    BrnDialogTitleDirective,
    BrnDialogDescriptionDirective,
    BrnDialogTriggerDirective,
    HlmDialogFooterComponent,
    HlmCheckboxComponent,
    ReactiveFormsModule,
    HlmInputDirective,
  ],
  providers: [BlockNoteAngularService],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      [options]="options"
      (onEditorReady)="onEditorReady($event)"
    >
      <bna-side-menu-controller>
        <bna-side-menu>
          <bna-add-block-btn />
          <bna-drag-handle-menu-btn>
            <hlm-dialog>
              <button
                hlmBtn
                brnDialogTrigger
                variant="ghost"
                size="sm"
                class="justify-start w-full"
              >
                Configure Block
              </button>
              <hlm-dialog-content *brnDialogContent="let ctx">
                <form
                  [formGroup]="formGroup"
                  (ngSubmit)="updateBlockConfiguration(); ctx.close()"
                >
                  <hlm-dialog-header>
                    <h3 brnDialogTitle hlm>Configure Block</h3>
                    <p brnDialogDescription hlm>
                      Toggle which content which should be rendered
                    </p>

                    <label class="flex items-center" hlmLabel>
                      Name:
                      <input
                        hlmInput
                        [size]="'sm'"
                        formControlName="name"
                        class="mr-2"
                      />
                    </label>
                    <label class="flex items-center" hlmLabel>
                      <hlm-checkbox formControlName="age" class="mr-2" />
                      Age
                    </label>
                    <label class="flex items-center" hlmLabel>
                      <hlm-checkbox formControlName="address" class="mr-2" />
                      Address
                    </label>
                  </hlm-dialog-header>
                  <hlm-dialog-footer>
                    <button hlmBtn type="submit">Save changes</button>
                  </hlm-dialog-footer>
                </form>
              </hlm-dialog-content>
            </hlm-dialog>
          </bna-drag-handle-menu-btn>
        </bna-side-menu>
      </bna-side-menu-controller>
    </bna-editor>
  `,
})
export class ApiContentBlockExample {
  @Input() block?: Block<any, any, any>;
  @Input() editor?: BlockNoteEditor<typeof schema.blockSchema>;

  formGroup = new FormGroup({
    name: new FormControl(this.block?.props.name),
    age: new FormControl(this.block?.props.age),
    address: new FormControl(this.block?.props.address),
  });

  initialContent: PartialBlock<typeof schema.blockSchema>[] = [
    {
      type: 'apiContent',
      props: {
        name: 'Max Mustermann',
        age: true,
      },
    },
    {
      type: 'apiContent',
    },
  ];
  options: BlockNoteEditorOptionsType<
    typeof schema.blockSchema,
    typeof schema.inlineContentSchema,
    typeof schema.styleSchema
  > = {
    schema,
  };

  updateBlockConfiguration() {
    if (!this.block || !this.editor) return;

    const formValues = this.formGroup.value;
    this.editor.updateBlock(this.block, {
      props: { ...formValues },
    });
    this.editor.sideMenu.unfreezeMenu();
  }

  onEditorReady(editor: BlockNoteEditor<typeof schema.blockSchema>) {
    this.editor = editor;
    this.editor.sideMenu.onUpdate((state) => {
      this.block = state.block;
      this.formGroup.patchValue(this.block?.props);
    });
  }
}

export const apiContentBlockExampleCode = ``;
