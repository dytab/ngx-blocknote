import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
  Block,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { BnaDictionaryService } from '../../../i18n/bna-dictionary.service';
import { BnaComponentsContextService } from '../../../editor/bna-components-context.service';

/**
 * Angular equivalent of React's UploadTab component
 * Provides file upload functionality with error handling and loading states
 */
@Component({
  selector: 'bna-upload-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bn-tab-panel">
      <div class="bn-file-input-wrapper">
        <input
          type="file"
          class="bn-file-input"
          [accept]="acceptedFileTypes()"
          (change)="handleFileChange($event)"
          data-test="upload-input"
          id="file-upload-input"
          #fileInput
        />
        <label class="bn-file-input-label" for="file-upload-input">
          <span class="bn-file-input-placeholder">
            {{ filePlaceholder() }}
          </span>
          <span class="bn-file-input-button">Choose File</span>
        </label>
      </div>

      @if (uploadFailed()) {
        <div class="bn-error-text">
          {{ uploadErrorMessage() }}
        </div>
      }

      @if (isUploading()) {
        <div class="bn-upload-progress">
          <div class="bn-upload-spinner"></div>
          <span>Uploading...</span>
        </div>
      }
    </div>
  `,
  styleUrls: ['./bna-upload-tab.component.css']
})
export class BnaUploadTabComponent<
  B extends BlockSchema = DefaultBlockSchema,
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> implements OnInit, OnDestroy {
  @Input() block!: Block<B, I, S>;
  @Input() setLoading?: (loading: boolean) => void;
  @Output() loadingChange = new EventEmitter<boolean>();

  private ngxBlocknoteService = inject(NgxBlocknoteService);
  private dictionaryService = inject(BnaDictionaryService);
  private componentsContext = inject(BnaComponentsContextService);

  // Signals for component state
  uploadFailed = signal<boolean>(false);
  isUploading = signal<boolean>(false);
  selectedFile = signal<File | null>(null);

  // Computed properties for translations
  filePlaceholder = signal('Choose file to upload...');
  uploadErrorMessage = signal('Upload failed. Please try again.');

  // Computed property for accepted file types
  acceptedFileTypes = computed(() => {
    const editor = this.ngxBlocknoteService.editor();
    if (!editor || !this.block) {
      return '*/*';
    }

    const config = editor.schema.blockSchema[this.block.type];
    if (config.isFileBlock && config.fileBlockAccept?.length) {
      return config.fileBlockAccept.join(',');
    }
    return '*/*';
  });

  private uploadFailedTimeout?: NodeJS.Timeout;

  ngOnInit() {
    // Set up dictionary translations
    const dict = this.dictionaryService.getDictionary();
    if (dict?.file_panel?.upload) {
      const blockType = this.block?.type || 'file';
      const placeholder = dict.file_panel.upload.file_placeholder?.[blockType] ||
                         dict.file_panel.upload.file_placeholder?.['file'] ||
                         'Choose file to upload...';
      this.filePlaceholder.set(placeholder);

      if (dict.file_panel.upload.upload_error) {
        this.uploadErrorMessage.set(dict.file_panel.upload.upload_error);
      }
    }
  }

  ngOnDestroy() {
    if (this.uploadFailedTimeout) {
      clearTimeout(this.uploadFailedTimeout);
    }
  }

  /**
   * Handles file input change event
   */
  async handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      return;
    }

    this.selectedFile.set(file);
    await this.uploadFile(file);

    // Reset input value to allow uploading the same file again
    input.value = '';
  }

  /**
   * Uploads the selected file
   */
  private async uploadFile(file: File) {
    const editor = this.ngxBlocknoteService.editor();
    if (!editor || !editor.uploadFile) {
      console.warn('Upload functionality not available');
      return;
    }

    this.setLoadingState(true);
    this.uploadFailed.set(false);

    try {
      let updateData = await editor.uploadFile(file, this.block.id);

      // Handle different response types
      if (typeof updateData === 'string') {
        // Received a URL
        updateData = {
          props: {
            name: file.name,
            url: updateData,
          },
        };
      }

      // Update the block with the upload result
      editor.updateBlock(this.block, updateData);

    } catch (error) {
      console.error('File upload failed:', error);
      this.uploadFailed.set(true);

      // Clear error message after 3 seconds
      if (this.uploadFailedTimeout) {
        clearTimeout(this.uploadFailedTimeout);
      }
      this.uploadFailedTimeout = setTimeout(() => {
        this.uploadFailed.set(false);
      }, 3000);

    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Sets the loading state and notifies parent components
   */
  private setLoadingState(loading: boolean) {
    this.isUploading.set(loading);
    this.loadingChange.emit(loading);

    // Call external setLoading callback if provided
    if (this.setLoading) {
      this.setLoading(loading);
    }
  }

  /**
   * Gets file size in human readable format
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
