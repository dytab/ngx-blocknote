/**
 * Utility functions for handling null editor checks in NgxBlocknote components
 */

import { BlockNoteEditor } from '@blocknote/core';

/**
 * Type guard to check if editor is not null
 */
export function isEditorValid(
  editor: BlockNoteEditor<any, any, any> | null,
): editor is BlockNoteEditor<any, any, any> {
  return editor !== null;
}

/**
 * Safely executes a function with the editor if it's not null
 * @param editor The editor that might be null
 * @param fn Function to execute with the editor
 * @param fallback Optional fallback value if editor is null
 */
export function withEditor<T>(
  editor: BlockNoteEditor<any, any, any> | null,
  fn: (editor: BlockNoteEditor<any, any, any>) => T,
  fallback?: T,
): T | undefined {
  if (isEditorValid(editor)) {
    return fn(editor);
  }
  return fallback;
}

/**
 * Safely gets a property from the editor, returning fallback if editor is null
 */
export function getEditorProperty<T>(
  editor: BlockNoteEditor<any, any, any> | null,
  getter: (editor: BlockNoteEditor<any, any, any>) => T,
  fallback: T,
): T {
  return isEditorValid(editor) ? getter(editor) : fallback;
}
