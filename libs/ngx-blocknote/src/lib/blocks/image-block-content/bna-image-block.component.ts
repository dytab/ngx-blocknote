import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { Subscription } from 'rxjs';
import { BnaResizableFileBlockWrapperComponent } from '../file-block-content/helpers/render/bna-resizable-file-block-wrapper.component';
import { BnaLinkWithCaptionComponent } from '../file-block-content/helpers/to-external-html/bna-link-with-caption.component';
import {
  ResolveUrlResult,
  useResolveUrl,
} from '../file-block-content/use-resolve-url.util';

@Component({
  selector: 'bna-image-preview',
  template: `
    <img
      class="bn-visual-media"
      [src]="imageSrc"
      [alt]="altText"
      contentEditable="false"
      draggable="false"
    />
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaImagePreviewComponent implements OnInit, OnDestroy {
  @Input() editor!: BlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >;
  @Input() block!: any; // ImageBlockConfig block

  imageSrc = '';
  altText = 'BlockNote image';
  private resolveUrlSubscription?: Subscription;

  ngOnInit(): void {
    this.altText = this.block?.props?.caption || 'BlockNote image';

    if (this.block?.props?.url) {
      this.resolveUrlSubscription = useResolveUrl(
        this.editor,
        this.block.props.url,
      ).subscribe((result: ResolveUrlResult) => {
        if (result.loadingState === 'loading') {
          this.imageSrc = this.block.props.url;
        } else if (result.loadingState === 'loaded' && result.downloadUrl) {
          this.imageSrc = result.downloadUrl;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.resolveUrlSubscription) {
      this.resolveUrlSubscription.unsubscribe();
    }
  }
}

@Component({
  selector: 'bna-image-to-external-html',
  template: `
    <ng-container *ngIf="!block?.props?.url">
      <p>Add image</p>
    </ng-container>

    <ng-container *ngIf="block?.props?.url">
      <!-- Image with caption as figure -->
      <figure *ngIf="block?.props?.showPreview && block?.props?.caption">
        <img
          [src]="block.props.url"
          [alt]="getAltText()"
          [width]="block.props.previewWidth"
        />
        <figcaption>{{ block.props.caption }}</figcaption>
      </figure>

      <!-- Image without caption -->
      <img
        *ngIf="block?.props?.showPreview && !block?.props?.caption"
        [src]="block.props.url"
        [alt]="getAltText()"
        [width]="block.props.previewWidth"
      />

      <!-- Link with caption (when not showing preview) -->
      <bna-link-with-caption
        *ngIf="!block?.props?.showPreview && block?.props?.caption"
        [caption]="block.props.caption"
      >
        <a [href]="block.props.url">{{
          block.props.name || block.props.url
        }}</a>
      </bna-link-with-caption>

      <!-- Link without caption (when not showing preview) -->
      <a
        *ngIf="!block?.props?.showPreview && !block?.props?.caption"
        [href]="block.props.url"
      >
        {{ block.props.name || block.props.url }}
      </a>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, BnaLinkWithCaptionComponent],
})
export class BnaImageToExternalHtmlComponent {
  @Input() block!: any; // ImageBlockConfig block

  getAltText(): string {
    return (
      this.block?.props?.name || this.block?.props?.caption || 'BlockNote image'
    );
  }
}

@Component({
  selector: 'bna-image-block',
  template: `
    <bna-resizable-file-block-wrapper
      [editor]="editor"
      [block]="block"
      [buttonText]="buttonText"
      [buttonIcon]="imageIconTemplate"
    >
      <bna-image-preview [editor]="editor" [block]="block"></bna-image-preview>
    </bna-resizable-file-block-wrapper>

    <ng-template #imageIconTemplate>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="9" cy="9" r="2"></circle>
        <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21"></path>
      </svg>
    </ng-template>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaResizableFileBlockWrapperComponent,
    BnaImagePreviewComponent,
  ],
})
export class BnaImageBlockComponent {
  @Input() editor!: BlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >;
  @Input() block!: any; // ImageBlockConfig block

  buttonText = 'Add Image'; // Fallback until i18n is implemented
}
