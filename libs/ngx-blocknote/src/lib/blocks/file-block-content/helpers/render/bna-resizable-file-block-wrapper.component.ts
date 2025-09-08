import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { Subscription } from 'rxjs';
import { useUploadLoading } from '../../use-upload-loading.util';
import { BnaFileBlockWrapperComponent } from './bna-file-block-wrapper.component';

interface ResizeParams {
  initialWidth: number;
  initialClientX: number;
  handleUsed: 'left' | 'right';
}

@Component({
  selector: 'bna-resizable-file-block-wrapper',
  template: `
    <bna-file-block-wrapper
      [editor]="editor"
      [block]="block"
      [buttonText]="buttonText"
      [buttonIcon]="buttonIcon"
      [hasChildren]="true"
      [onMouseEnter]="onWrapperMouseEnter"
      [onMouseLeave]="onWrapperMouseLeave"
      [customStyle]="wrapperStyle"
    >
      <div
        #visualMediaWrapper
        class="bn-visual-media-wrapper"
        style="position: relative"
      >
        <ng-content></ng-content>

        <!-- Resize handles -->
        <div
          *ngIf="hovered || resizeParams"
          class="bn-resize-handle"
          style="left: 4px"
          (mousedown)="onLeftResizeHandleMouseDown($event)"
        ></div>

        <div
          *ngIf="hovered || resizeParams"
          class="bn-resize-handle"
          style="right: 4px"
          (mousedown)="onRightResizeHandleMouseDown($event)"
        ></div>

        <!-- Overlay for capturing mouse events during resize -->
        <div
          *ngIf="resizeParams"
          style="position: absolute; height: 100%; width: 100%"
        ></div>
      </div>
    </bna-file-block-wrapper>
  `,
  standalone: true,
  imports: [CommonModule, BnaFileBlockWrapperComponent],
})
export class BnaResizableFileBlockWrapperComponent
  implements OnInit, OnDestroy
{
  @Input() editor!: BlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >;
  @Input() block!: any; // FileBlockConfig block
  @Input() buttonText!: string;
  @Input() buttonIcon!: TemplateRef<any>;

  @ViewChild('visualMediaWrapper', { static: false })
  visualMediaWrapperRef!: ElementRef<HTMLDivElement>;

  resizeParams: ResizeParams | undefined = undefined;
  width: number | undefined = undefined;
  hovered = false;
  showLoader = false;
  wrapperStyle: { [key: string]: any } | undefined = undefined;

  private uploadLoadingSubscription?: Subscription;
  private windowMouseMoveListener?: (event: MouseEvent) => void;
  private windowMouseUpListener?: () => void;

  ngOnInit(): void {
    this.width = this.block?.props?.previewWidth;

    // Subscribe to upload loading state
    if (this.editor && this.block?.id) {
      this.uploadLoadingSubscription = useUploadLoading(
        this.editor,
        this.block.id,
      ).subscribe((isLoading) => {
        this.showLoader = isLoading;
        this.updateWrapperStyle();
      });
    }

    this.updateWrapperStyle();
  }

  ngOnDestroy(): void {
    if (this.uploadLoadingSubscription) {
      this.uploadLoadingSubscription.unsubscribe();
    }
    this.removeWindowListeners();
  }

  onWrapperMouseEnter = (): void => {
    if (this.editor.isEditable) {
      this.hovered = true;
    }
  };

  onWrapperMouseLeave = (): void => {
    this.hovered = false;
  };

  onLeftResizeHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();

    if (this.visualMediaWrapperRef) {
      this.resizeParams = {
        handleUsed: 'left',
        initialWidth: this.visualMediaWrapperRef.nativeElement.clientWidth,
        initialClientX: event.clientX,
      };
      this.addWindowListeners();
    }
  }

  onRightResizeHandleMouseDown(event: MouseEvent): void {
    event.preventDefault();

    if (this.visualMediaWrapperRef) {
      this.resizeParams = {
        handleUsed: 'right',
        initialWidth: this.visualMediaWrapperRef.nativeElement.clientWidth,
        initialClientX: event.clientX,
      };
      this.addWindowListeners();
    }
  }

  private addWindowListeners(): void {
    this.windowMouseMoveListener = (event: MouseEvent) => {
      this.onWindowMouseMove(event);
    };
    this.windowMouseUpListener = () => {
      this.onWindowMouseUp();
    };

    window.addEventListener('mousemove', this.windowMouseMoveListener);
    window.addEventListener('mouseup', this.windowMouseUpListener);
  }

  private removeWindowListeners(): void {
    if (this.windowMouseMoveListener) {
      window.removeEventListener('mousemove', this.windowMouseMoveListener);
    }
    if (this.windowMouseUpListener) {
      window.removeEventListener('mouseup', this.windowMouseUpListener);
    }
  }

  private onWindowMouseMove(event: MouseEvent): void {
    if (!this.resizeParams) return;

    let newWidth: number;

    if (this.block?.props?.textAlignment === 'center') {
      if (this.resizeParams.handleUsed === 'left') {
        newWidth =
          this.resizeParams.initialWidth +
          (this.resizeParams.initialClientX - event.clientX) * 2;
      } else {
        newWidth =
          this.resizeParams.initialWidth +
          (event.clientX - this.resizeParams.initialClientX) * 2;
      }
    } else {
      if (this.resizeParams.handleUsed === 'left') {
        newWidth =
          this.resizeParams.initialWidth +
          this.resizeParams.initialClientX -
          event.clientX;
      } else {
        newWidth =
          this.resizeParams.initialWidth +
          event.clientX -
          this.resizeParams.initialClientX;
      }
    }

    // Min width in px
    const minWidth = 64;

    // Ensure the element is not wider than the editor and not narrower than minimum width
    const maxWidth =
      this.editor.domElement?.firstElementChild?.clientWidth ||
      Number.MAX_VALUE;
    this.width = Math.min(Math.max(newWidth, minWidth), maxWidth);
    this.updateWrapperStyle();
  }

  private onWindowMouseUp(): void {
    this.removeWindowListeners();
    this.resizeParams = undefined;

    // Update the block's previewWidth property
    if (this.width !== undefined) {
      (this.editor as any).updateBlock(this.block, {
        props: {
          previewWidth: this.width,
        },
      });
    }
  }

  private updateWrapperStyle(): void {
    if (
      this.block?.props?.url &&
      !this.showLoader &&
      this.block?.props?.showPreview
    ) {
      this.wrapperStyle = {
        width: this.width ? `${this.width}px` : 'fit-content',
      };
    } else {
      this.wrapperStyle = undefined;
    }
  }
}
