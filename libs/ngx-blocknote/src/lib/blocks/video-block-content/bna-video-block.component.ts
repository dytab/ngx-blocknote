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
import {
  ResolveUrlResult,
  useResolveUrl,
} from '../file-block-content/use-resolve-url.util';

@Component({
  selector: 'bna-video-preview',
  template: `
    <video
      class="bn-visual-media"
      [src]="videoSrc"
      controls="true"
      contentEditable="false"
      draggable="false"
    ></video>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaVideoPreviewComponent implements OnInit, OnDestroy {
  @Input() editor!: BlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >;
  @Input() block!: any; // VideoBlockConfig block

  videoSrc = '';
  private resolveUrlSubscription?: Subscription;

  ngOnInit(): void {
    if (this.block?.props?.url) {
      this.resolveUrlSubscription = useResolveUrl(
        this.editor,
        this.block.props.url,
      ).subscribe((result: ResolveUrlResult) => {
        if (result.loadingState === 'loading') {
          this.videoSrc = this.block.props.url;
        } else if (result.loadingState === 'loaded' && result.downloadUrl) {
          this.videoSrc = result.downloadUrl;
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
  selector: 'bna-video-to-external-html',
  template: `
    <ng-container *ngIf="!block?.props?.url">
      <p>Add video</p>
    </ng-container>

    <ng-container *ngIf="block?.props?.url">
      <figure *ngIf="block?.props?.showPreview && block?.props?.caption">
        <video [src]="block.props.url"></video>
        <figcaption>{{ block.props.caption }}</figcaption>
      </figure>

      <div *ngIf="block?.props?.showPreview && !block?.props?.caption">
        <video [src]="block.props.url"></video>
      </div>

      <div *ngIf="!block?.props?.showPreview && block?.props?.caption">
        <a [href]="block.props.url">{{
          block.props.name || block.props.url
        }}</a>
        <p>{{ block.props.caption }}</p>
      </div>

      <a
        *ngIf="!block?.props?.showPreview && !block?.props?.caption"
        [href]="block.props.url"
      >
        {{ block.props.name || block.props.url }}
      </a>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BnaVideoToExternalHtmlComponent {
  @Input() block!: any; // VideoBlockConfig block
}

@Component({
  selector: 'bna-video-block',
  template: `
    <bna-resizable-file-block-wrapper
      [editor]="editor"
      [block]="block"
      [buttonText]="buttonText"
      [buttonIcon]="videoIconTemplate"
    >
      <bna-video-preview [editor]="editor" [block]="block"></bna-video-preview>
    </bna-resizable-file-block-wrapper>

    <ng-template #videoIconTemplate>
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
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    </ng-template>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaResizableFileBlockWrapperComponent,
    BnaVideoPreviewComponent,
  ],
})
export class BnaVideoBlockComponent {
  @Input() editor!: BlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >;
  @Input() block!: any; // VideoBlockConfig block

  buttonText = 'Add Video'; // Fallback until i18n is implemented
}
