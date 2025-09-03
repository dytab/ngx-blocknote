import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockNoteEditor, audioBlockConfig, BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import { Subscription } from 'rxjs';
import { useResolveUrl, ResolveUrlResult } from '../file-block-content/use-resolve-url.util';
import { BnaFileBlockWrapperComponent } from '../file-block-content/helpers/render/bna-file-block-wrapper.component';

@Component({
  selector: 'bna-audio-preview',
  template: `
    <audio
      class="bn-audio"
      [src]="audioSrc"
      controls="true"
      contentEditable="false"
      draggable="false"
    ></audio>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BnaAudioPreviewComponent implements OnInit, OnDestroy {
  @Input() editor!: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>;
  @Input() block!: any; // AudioBlockConfig block

  audioSrc = '';
  private resolveUrlSubscription?: Subscription;

  ngOnInit(): void {
    if (this.block?.props?.url) {
      this.resolveUrlSubscription = useResolveUrl(this.editor, this.block.props.url)
        .subscribe((result: ResolveUrlResult) => {
          if (result.loadingState === 'loading') {
            this.audioSrc = this.block.props.url;
          } else if (result.loadingState === 'loaded' && result.downloadUrl) {
            this.audioSrc = result.downloadUrl;
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
  selector: 'bna-audio-to-external-html',
  template: `
    <ng-container *ngIf="!block?.props?.url">
      <p>Add audio</p>
    </ng-container>

    <ng-container *ngIf="block?.props?.url">
      <figure *ngIf="block?.props?.showPreview && block?.props?.caption">
        <audio [src]="block.props.url"></audio>
        <figcaption>{{ block.props.caption }}</figcaption>
      </figure>

      <div *ngIf="block?.props?.showPreview && !block?.props?.caption">
        <audio [src]="block.props.url"></audio>
      </div>

      <div *ngIf="!block?.props?.showPreview && block?.props?.caption">
        <a [href]="block.props.url">{{ block.props.name || block.props.url }}</a>
        <p>{{ block.props.caption }}</p>
      </div>

      <a *ngIf="!block?.props?.showPreview && !block?.props?.caption" [href]="block.props.url">
        {{ block.props.name || block.props.url }}
      </a>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class BnaAudioToExternalHtmlComponent {
  @Input() block!: any; // AudioBlockConfig block
}

@Component({
  selector: 'bna-audio-block',
  template: `
    <bna-file-block-wrapper
      [editor]="editor"
      [block]="block"
      [buttonText]="buttonText"
      [buttonIcon]="audioIconTemplate"
      [hasChildren]="true"
    >
      <bna-audio-preview
        [editor]="editor"
        [block]="block"
      ></bna-audio-preview>
    </bna-file-block-wrapper>

    <ng-template #audioIconTemplate>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="m19.07 4.93-2.12 2.12m0 0L19.07 9.17m-2.12-2.12L21 3m-4.05 4.05L21 11"></path>
      </svg>
    </ng-template>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaFileBlockWrapperComponent,
    BnaAudioPreviewComponent
  ]
})
export class BnaAudioBlockComponent {
  @Input() editor!: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>;
  @Input() block!: any; // AudioBlockConfig block

  buttonText = 'Add Audio'; // Fallback until i18n is implemented
}
