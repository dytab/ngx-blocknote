import { Injectable, inject } from '@angular/core';
import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';
import { NgxBlocknoteService } from '../ngx-blocknote.service';

/**
 * Angular equivalent of React's useBlockNoteEditor hook.
 * Provides access to the current BlockNoteEditor instance.
 */
@Injectable({
  providedIn: 'root'
})
export class UseBlockNoteEditorService {
  private ngxBlocknoteService = inject(NgxBlocknoteService);

  /**
   * Gets the current BlockNoteEditor instance from the NgxBlocknoteService.
   * @returns The current editor instance or undefined if no editor is set
   */
  getEditor<
    BSchema extends BlockSchema = BlockSchema,
    ISchema extends InlineContentSchema = InlineContentSchema,
    SSchema extends StyleSchema = StyleSchema,
  >(): BlockNoteEditor<BSchema, ISchema, SSchema> | undefined {
    return this.ngxBlocknoteService.editor() as BlockNoteEditor<BSchema, ISchema, SSchema> | undefined;
  }

  /**
   * Gets the editor signal for reactive access.
   * Use this when you need to reactively respond to editor changes.
   */
  getEditorSignal() {
    return this.ngxBlocknoteService.editor;
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useBlockNoteEditor<
  BSchema extends BlockSchema = BlockSchema,
  ISchema extends InlineContentSchema = InlineContentSchema,
  SSchema extends StyleSchema = StyleSchema,
>(editor: BlockNoteEditor<BSchema, ISchema, SSchema>): BlockNoteEditor<BSchema, ISchema, SSchema> {
  return editor;
}
