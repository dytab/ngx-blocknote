import { Component, Input, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockNoteEditor, BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import { Subscription, Observable } from 'rxjs';
import { useUploadLoading } from '../../use-upload-loading.util';
import { BnaAddFileButtonComponent } from './bna-add-file-button.component';
import { BnaFileNameWithIconComponent } from './bna-file-name-with-icon.component';

@Component({
  selector: 'bna-file-block-wrapper',
  template: `
    <div
      class="bn-file-block-content-wrapper"
      (mouseenter)="onMouseEnter && onMouseEnter()"
      (mouseleave)="onMouseLeave && onMouseLeave()"
      [style]="customStyle"
    >
      <!-- Show loader while a file is being uploaded -->
      <div *ngIf="showLoader" class="bn-file-loading-preview">
        Loading...
      </div>

      <!-- Show the add file button if the file has not been uploaded yet -->
      <bna-add-file-button
        *ngIf="!showLoader && block?.props?.url === ''"
        [editor]="editor"
        [block]="block"
        [buttonText]="buttonText"
        [buttonIcon]="buttonIcon"
      ></bna-add-file-button>

      <!-- Show the file preview, or the file name and icon -->
      <ng-container *ngIf="!showLoader && block?.props?.url !== ''">
        <!-- Show file name and icon if no preview or showPreview is false -->
        <bna-file-name-with-icon
          *ngIf="block?.props?.showPreview === false || !hasChildren"
          [block]="block"
        ></bna-file-name-with-icon>

        <!-- Show preview content if available -->
        <ng-content *ngIf="block?.props?.showPreview !== false && hasChildren"></ng-content>

        <!-- Show the caption if there is one -->
        <p *ngIf="block?.props?.caption" class="bn-file-caption">
          {{ block.props.caption }}
        </p>
      </ng-container>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaAddFileButtonComponent,
    BnaFileNameWithIconComponent
  ]
})
export class BnaFileBlockWrapperComponent implements OnInit, OnDestroy {
  @Input() editor!: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>;
  @Input() block!: any; // FileBlockConfig block
  @Input() buttonText?: string;
  @Input() buttonIcon?: TemplateRef<any>;
  @Input() hasChildren = false;
  @Input() onMouseEnter?: () => void;
  @Input() onMouseLeave?: () => void;
  @Input() customStyle?: { [key: string]: any };

  showLoader = false;
  private uploadLoadingSubscription?: Subscription;

  ngOnInit(): void {
    if (this.editor && this.block?.id) {
      this.uploadLoadingSubscription = useUploadLoading(this.editor, this.block.id)
        .subscribe(isLoading => {
          this.showLoader = isLoading;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.uploadLoadingSubscription) {
      this.uploadLoadingSubscription.unsubscribe();
    }
  }
}
