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
  BlockNoteEditorOptionsType,
  BnaAddBlockButtonComponent,
  BnaDragHandleMenuComponent,
  BnaEditorComponent,
  BnaSideMenuComponent,
  BnaSideMenuControllerComponent,
  NgxBlocknoteService,
} from '@dytab/ngx-blocknote';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
import {
  BrnDialogContent,
  BrnDialogDescription,
  BrnDialogTitle,
  BrnDialogTrigger,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogFooter,
  HlmDialogHeader,
} from '@spartan-ng/helm/dialog';
import { HlmInput } from '@spartan-ng/helm/input';
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
  imports: [
    BnaEditorComponent,
    HlmButton,
    BnaAddBlockButtonComponent,
    BnaDragHandleMenuComponent,
    BnaSideMenuComponent,
    BnaSideMenuControllerComponent,
    HlmDialog,
    HlmDialogContent,
    BrnDialogContent,
    HlmDialogHeader,
    BrnDialogTitle,
    BrnDialogDescription,
    BrnDialogTrigger,
    HlmDialogFooter,
    HlmCheckbox,
    ReactiveFormsModule,
    HlmInput,
  ],
  providers: [NgxBlocknoteService],
  template: `
    <bna-editor
      [initialContent]="initialContent"
      [options]="options"
      (editorReady)="onEditorReady($event)"
    >
      <bna-side-menu-controller>
        <bna-side-menu>
          <bna-add-block-btn />
          <bna-drag-handle-menu-btn>
            <hlm-dialog>
              <button
                hlmBtn
                hlmDialogTrigger
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
                    <label class="flex items-center" hlmLabel for="age">
                      <hlm-checkbox
                        formControlName="age"
                        class="mr-2"
                        id="age"
                      />
                      Age
                    </label>
                    <label class="flex items-center" hlmLabel for="address">
                      <hlm-checkbox
                        formControlName="address"
                        class="mr-2"
                        id="address"
                      />
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
    name: new FormControl(this.block?.props['name']),
    age: new FormControl(this.block?.props['age']),
    address: new FormControl(this.block?.props['address']),
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
