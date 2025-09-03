import { Injectable, inject, computed } from '@angular/core';
import { Dictionary } from '@blocknote/core';
import { NgxBlocknoteService } from '../services/ngx-blocknote.service';

/**
 * Angular service that provides access to the BlockNote dictionary for internationalization.
 * Similar to the React useDictionary hook.
 */
@Injectable({
  providedIn: 'root'
})
export class BnaDictionaryService {
  private ngxBlocknoteService = inject(NgxBlocknoteService);

  /**
   * Computed signal that returns the current dictionary from the BlockNote editor.
   * Updates automatically when the editor changes.
   */
  dictionary = computed(() => {
    const editor = this.ngxBlocknoteService.editor();
    return editor?.dictionary || this.getDefaultDictionary();
  });

  /**
   * Gets the current dictionary object.
   * @returns The BlockNote dictionary for the current editor
   */
  getDictionary(): Dictionary {
    return this.dictionary();
  }

  /**
   * Fallback dictionary with basic English translations.
   * Used when no editor is available or editor doesn't have a dictionary.
   */
  private getDefaultDictionary(): Dictionary {
    return {
      slash_menu: {
        heading: { title: 'Heading 1', subtext: 'Used for a top-level heading', aliases: ['h', 'heading1', 'h1'] },
        heading_2: { title: 'Heading 2', subtext: 'Used for key sections', aliases: ['h2', 'heading2', 'subheading'] },
        heading_3: { title: 'Heading 3', subtext: 'Used for subsections and group headings', aliases: ['h3', 'heading3', 'subheading'] },
        numbered_list: { title: 'Numbered List', subtext: 'Used to display a numbered list', aliases: ['ol', 'li', 'list', 'numberedlist', 'ordered list'] },
        bullet_list: { title: 'Bullet List', subtext: 'Used to display an unordered list', aliases: ['ul', 'li', 'list', 'bulletlist', 'unordered list'] },
        check_list: { title: 'Check List', subtext: 'Used to display a list with checkboxes', aliases: ['todo', 'task', 'checklist', 'check list', 'tasklist'] },
        paragraph: { title: 'Paragraph', subtext: 'Used for the body of your document', aliases: ['p', 'paragraph'] },
        table: { title: 'Table', subtext: 'Used for tabular content', aliases: ['table'] },
        image: { title: 'Image', subtext: 'Insert an image', aliases: ['image', 'img', 'picture', 'media'] },
        video: { title: 'Video', subtext: 'Insert a video', aliases: ['video', 'vid', 'media'] },
        audio: { title: 'Audio', subtext: 'Insert an audio file', aliases: ['audio', 'sound', 'media'] },
        file: { title: 'File', subtext: 'Insert a file', aliases: ['file', 'upload', 'document'] }
      },
      placeholders: {
        default: 'Enter text or type "/" for commands',
        heading: 'Heading',
        bulletListItem: 'List item',
        numberedListItem: 'List item',
        checkListItem: 'List item'
      },
      file_blocks: {
        image: {
          add_button_text: 'Add Image'
        },
        video: {
          add_button_text: 'Add Video'
        },
        audio: {
          add_button_text: 'Add Audio'
        },
        file: {
          add_button_text: 'Add File'
        }
      },
      side_menu: {
        add_block_label: 'Add block',
        drag_handle_label: 'Open block menu'
      },
      drag_handle: {
        delete_menuitem: 'Delete',
        colors_menuitem: 'Colors'
      },
      table_handle: {
        delete_column_menuitem: 'Delete Column',
        delete_row_menuitem: 'Delete Row',
        add_left_menuitem: 'Add Column Left',
        add_right_menuitem: 'Add Column Right',
        add_above_menuitem: 'Add Row Above',
        add_below_menuitem: 'Add Row Below',
        split_cell_menuitem: 'Split Cell'
      },
      formatting: {
        bold: { tooltip: 'Bold', text: 'Bold' },
        italic: { tooltip: 'Italic', text: 'Italic' },
        underline: { tooltip: 'Underline', text: 'Underline' },
        strike: { tooltip: 'Strikethrough', text: 'Strikethrough' },
        code: { tooltip: 'Code', text: 'Code' },
        colors: { tooltip: 'Colors', text: 'Colors' },
        link: { tooltip: 'Create Link', text: 'Link' },
        file_caption: { tooltip: 'Edit Caption', text: 'Caption' },
        file_replace: { tooltip: 'Replace File', text: 'Replace' },
        file_rename: { tooltip: 'Rename', text: 'Rename' },
        file_download: { tooltip: 'Download', text: 'Download' },
        file_delete: { tooltip: 'Delete', text: 'Delete' },
        file_preview: { tooltip: 'Preview', text: 'Preview' },
        nest_block: { tooltip: 'Nest Block', text: 'Nest' },
        unnest_block: { tooltip: 'Unnest Block', text: 'Unnest' }
      },
      link_toolbar: {
        delete: { tooltip: 'Remove link', text: 'Remove link' },
        edit: { tooltip: 'Edit link', text: 'Edit link' },
        open: { tooltip: 'Open link in new tab', text: 'Open link' },
        form: {
          title_placeholder: 'Edit link',
          url_placeholder: 'Enter URL'
        }
      },
      generic: {
        ctrl_shortcut: (key: string) => `Ctrl+${key}`,
        cmd_shortcut: (key: string) => `Cmd+${key}`,
        shift_shortcut: (key: string) => `Shift+${key}`,
        unknown: 'Unknown'
      }
    } as Dictionary;
  }
}
