import {
  Component,
  Input,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
  filenameFromURL,
  Block,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../../../services/ngx-blocknote.service';
import { BnaDictionaryService } from '../../../i18n/bna-dictionary.service';
import { BnaComponentsContextService } from '../../../editor/bna-components-context.service';

/**
 * Angular equivalent of React's EmbedTab component
 * Provides a URL input form for embedding files in blocks
 */
@Component({
  selector: 'bna-embed-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bn-tab-panel">
      <input
        type="text"
        class="bn-text-input"
        [placeholder]="embedUrlPlaceholder()"
        [(ngModel)]="currentURL"
        (keydown)="handleURLEnter($event)"
        data-test="embed-input"
      />
      <button
        type="button"
        class="bn-button"
        (click)="handleURLClick()"
        data-test="embed-input-button"
      >
        {{ embedButtonText() }}
      </button>
    </div>
  `,
  styleUrls: ['./bna-embed-tab.component.css']
})
export class BnaEmbedTabComponent<
  B extends BlockSchema = DefaultBlockSchema,
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
> {
  @Input() block!: Block<B, I, S>;

  private ngxBlocknoteService = inject(NgxBlocknoteService);
  private dictionaryService = inject(BnaDictionaryService);
  private componentsContext = inject(BnaComponentsContextService);

  // Signal for current URL input
  currentURL = signal<string>('');

  // Computed properties for translations
  embedUrlPlaceholder = signal('Enter URL to embed...');
  embedButtonText = signal('Embed');

  ngOnInit() {
    // Set up dictionary translations
    const dict = this.dictionaryService.getDictionary();
    if (dict?.file_panel?.embed?.url_placeholder) {
      this.embedUrlPlaceholder.set(dict.file_panel.embed.url_placeholder);
    }

    // Set embed button text based on block type
    if (dict?.file_panel?.embed?.embed_button) {
      const blockType = this.block?.type || 'file';
      const buttonText = dict.file_panel.embed.embed_button[blockType] ||
                        dict.file_panel.embed.embed_button['file'] ||
                        'Embed';
      this.embedButtonText.set(buttonText);
    }
  }

  /**
   * Handles URL input changes
   */
  handleURLChange(url: string) {
    this.currentURL.set(url);
  }

  /**
   * Handles Enter key press in URL input
   */
  handleURLEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.embedFile();
    }
  }

  /**
   * Handles embed button click
   */
  handleURLClick() {
    this.embedFile();
  }

  /**
   * Embeds the file with current URL
   */
  private embedFile() {
    const editor = this.ngxBlocknoteService.editor();
    const url = this.currentURL();

    if (!editor || !url.trim()) {
      return;
    }

    // Update block with filename and URL
    editor.updateBlock(this.block, {
      props: {
        name: filenameFromURL(url),
        url: url.trim(),
      } as any,
    });
  }
}
