import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockNoteEditor, fileBlockConfig, BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import { BnaFileBlockWrapperComponent } from './helpers/render/bna-file-block-wrapper.component';
import { BnaLinkWithCaptionComponent } from './helpers/to-external-html/bna-link-with-caption.component';

@Component({
  selector: 'bna-file-to-external-html',
  template: `
    <ng-container *ngIf="!block?.props?.url">
      <p>Add file</p>
    </ng-container>

    <ng-container *ngIf="block?.props?.url">
      <bna-link-with-caption *ngIf="block?.props?.caption" [caption]="block.props.caption">
        <a [href]="block.props.url">{{ block.props.name || block.props.url }}</a>
      </bna-link-with-caption>

      <a *ngIf="!block?.props?.caption" [href]="block.props.url">
        {{ block.props.name || block.props.url }}
      </a>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, BnaLinkWithCaptionComponent]
})
export class BnaFileToExternalHtmlComponent {
  @Input() block!: any; // FileBlockConfig block
}

@Component({
  selector: 'bna-file-block',
  template: `
    <bna-file-block-wrapper
      [editor]="editor"
      [block]="block"
      [hasChildren]="false"
    ></bna-file-block-wrapper>
  `,
  standalone: true,
  imports: [
    CommonModule,
    BnaFileBlockWrapperComponent
  ]
})
export class BnaFileBlockComponent {
  @Input() editor!: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>;
  @Input() block!: any; // FileBlockConfig block
}
