import { Injectable, computed, inject } from '@angular/core';
import { Dictionary } from '@blocknote/core';
import { NgxBlocknoteService } from '../services/ngx-blocknote.service';

/**
 * Angular service that provides access to the BlockNote dictionary for internationalization.
 * Similar to the React useDictionary hook.
 */
@Injectable({
  providedIn: 'root',
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
    // Return a minimal dictionary that satisfies the interface
    // The actual dictionary structure may be more complex, but this provides a fallback
    return {
      slash_menu: {
        heading: {
          title: 'Heading 1',
          subtext: 'Used for a top-level heading',
          aliases: ['h', 'heading1', 'h1'],
          group: 'Headings',
        },
        heading_2: {
          title: 'Heading 2',
          subtext: 'Used for key sections',
          aliases: ['h2', 'heading2', 'subheading'],
          group: 'Headings',
        },
        heading_3: {
          title: 'Heading 3',
          subtext: 'Used for subsections and group headings',
          aliases: ['h3', 'heading3', 'subheading'],
          group: 'Headings',
        },
        numbered_list: {
          title: 'Numbered List',
          subtext: 'Used to display a numbered list',
          aliases: ['ol', 'li', 'list', 'numberedlist', 'ordered list'],
          group: 'Lists',
        },
        bullet_list: {
          title: 'Bullet List',
          subtext: 'Used to display an unordered list',
          aliases: ['ul', 'li', 'list', 'bulletlist', 'unordered list'],
          group: 'Lists',
        },
        check_list: {
          title: 'Check List',
          subtext: 'Used to display a list with checkboxes',
          aliases: ['todo', 'task', 'checklist', 'check list', 'tasklist'],
          group: 'Lists',
        },
        paragraph: {
          title: 'Paragraph',
          subtext: 'Used for the body of your document',
          aliases: ['p', 'paragraph'],
          group: 'Basic blocks',
        },
        table: {
          title: 'Table',
          subtext: 'Used for tabular content',
          aliases: ['table'],
          group: 'Advanced',
        },
        image: {
          title: 'Image',
          subtext: 'Insert an image',
          aliases: ['image', 'img', 'picture', 'media'],
          group: 'Media',
        },
        video: {
          title: 'Video',
          subtext: 'Insert a video',
          aliases: ['video', 'vid', 'media'],
          group: 'Media',
        },
        audio: {
          title: 'Audio',
          subtext: 'Insert an audio file',
          aliases: ['audio', 'sound', 'media'],
          group: 'Media',
        },
        file: {
          title: 'File',
          subtext: 'Insert a file',
          aliases: ['file', 'upload', 'document'],
          group: 'Media',
        },
        heading_4: {
          title: 'Heading 4',
          subtext: 'Used for minor section headings',
          aliases: ['h4', 'heading4'],
          group: 'Headings',
        },
        heading_5: {
          title: 'Heading 5',
          subtext: 'Used for minor section headings',
          aliases: ['h5', 'heading5'],
          group: 'Headings',
        },
        heading_6: {
          title: 'Heading 6',
          subtext: 'Used for minor section headings',
          aliases: ['h6', 'heading6'],
          group: 'Headings',
        },
        code_block: {
          title: 'Code Block',
          subtext: 'Insert a code block',
          aliases: ['code', 'codeblock'],
          group: 'Advanced',
        },
        toggle_blocks: {
          title: 'Toggle List',
          subtext: 'Insert a toggle list',
          aliases: ['toggle'],
          group: 'Lists',
        },
        alert_info: {
          title: 'Info Alert',
          subtext: 'Insert an info alert',
          aliases: ['info'],
          group: 'Advanced',
        },
        alert_warning: {
          title: 'Warning Alert',
          subtext: 'Insert a warning alert',
          aliases: ['warning'],
          group: 'Advanced',
        },
        alert_error: {
          title: 'Error Alert',
          subtext: 'Insert an error alert',
          aliases: ['error'],
          group: 'Advanced',
        },
        alert_success: {
          title: 'Success Alert',
          subtext: 'Insert a success alert',
          aliases: ['success'],
          group: 'Advanced',
        },
        emoji: {
          title: 'Emoji',
          subtext: 'Insert an emoji',
          aliases: ['emoji', 'smiley'],
          group: 'Other',
        },
      },
      placeholders: {
        default: 'Enter text or type "/" for commands',
        heading: 'Heading',
        bulletListItem: 'List item',
        numberedListItem: 'List item',
        checkListItem: 'List item',
      },
      file_blocks: {
        image: { add_button_text: 'Add Image' },
        video: { add_button_text: 'Add Video' },
        audio: { add_button_text: 'Add Audio' },
        file: { add_button_text: 'Add File' },
      },
      side_menu: {
        add_block_label: 'Add block',
        drag_handle_label: 'Open block menu',
      },
      drag_handle: {
        delete_menuitem: 'Delete',
        colors_menuitem: 'Colors',
      },
      table_handle: {
        delete_column_menuitem: 'Delete Column',
        delete_row_menuitem: 'Delete Row',
        add_left_menuitem: 'Add Column Left',
        add_right_menuitem: 'Add Column Right',
        add_above_menuitem: 'Add Row Above',
        add_below_menuitem: 'Add Row Below',
      },
      formatting_toolbar: {
        bold: { tooltip: 'Bold' },
        italic: { tooltip: 'Italic' },
        underline: { tooltip: 'Underline' },
        strike: { tooltip: 'Strikethrough' },
        code: { tooltip: 'Code' },
        colors: { tooltip: 'Colors' },
        link: { tooltip: 'Create Link' },
        file_caption: { tooltip: 'Edit Caption' },
        file_replace: { tooltip: 'Replace File' },
        file_rename: { tooltip: 'Rename' },
        file_download: { tooltip: 'Download' },
        file_delete: { tooltip: 'Delete' },
        file_preview: { tooltip: 'Preview' },
        nest_block: { tooltip: 'Nest Block' },
        unnest_block: { tooltip: 'Unnest Block' },
        align_left: 'Align Left',
        align_center: 'Align Center',
        align_right: 'Align Right',
        align_justify: 'Align Justify',
        table_cell_merge: { tooltip: 'Merge Cells' },
      },
      suggestion_menu: {
        no_items_title: 'No items found',
        loading: 'Loading...',
      },
      color_picker: {
        text_title: 'Text',
        background_title: 'Background',
        colors: {
          default: 'Default',
          gray: 'Gray',
          brown: 'Brown',
          red: 'Red',
          orange: 'Orange',
          yellow: 'Yellow',
          green: 'Green',
          blue: 'Blue',
          purple: 'Purple',
          pink: 'Pink',
        },
      },
      link_toolbar: {
        delete: { tooltip: 'Remove link' },
        edit: { tooltip: 'Edit link' },
        open: { tooltip: 'Open link in new tab' },
        form: {
          title_placeholder: 'Edit link',
          url_placeholder: 'Enter URL',
        },
      },
      toggle_blocks: {
        expanded_button: 'Expanded',
        collapsed_button: 'Collapsed',
      },
      generic: {
        ctrl_shortcut: (key: string) => `Ctrl+${key}`,
        cmd_shortcut: (key: string) => `Cmd+${key}`,
        shift_shortcut: (key: string) => `Shift+${key}`,
        unknown: 'Unknown',
      },
    } as Dictionary;
  }
}
