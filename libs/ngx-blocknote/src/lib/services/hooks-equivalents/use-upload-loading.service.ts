import { Injectable, signal, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { UseOnUploadStartService } from './use-on-upload-start.service';
import { UseOnUploadEndService } from './use-on-upload-end.service';

/**
 * Angular equivalent of React's useUploadLoading hook.
 * Tracks upload loading state for a specific block ID using signals.
 * This is a composite service that uses both UseOnUploadStartService and UseOnUploadEndService.
 */
@Injectable({
  providedIn: 'root'
})
export class UseUploadLoadingService {
  private useOnUploadStartService = inject(UseOnUploadStartService);
  private useOnUploadEndService = inject(UseOnUploadEndService);

  /**
   * Creates a signal that tracks upload loading state for a specific block ID.
   * Returns a signal that is true when upload is in progress, false otherwise.
   *
   * @param blockId - Optional block ID to track uploads for
   * @param editor - Optional editor instance (uses NgxBlocknoteService if not provided)
   * @returns Signal containing the loading state
   */
  createUploadLoadingSignal(
    blockId?: string,
    editor?: BlockNoteEditor<any, any, any>
  ) {
    const showLoader = signal(false);

    // Set up upload start listener
    this.useOnUploadStartService.setupOnUploadStartListener(
      (uploadBlockId) => {
        if (uploadBlockId === blockId) {
          showLoader.set(true);
        }
      },
      editor
    );

    // Set up upload end listener
    this.useOnUploadEndService.setupOnUploadEndListener(
      (uploadBlockId) => {
        if (uploadBlockId === blockId) {
          showLoader.set(false);
        }
      },
      editor
    );

    return showLoader.asReadonly();
  }

  /**
   * Creates a reactive effect-based upload loading signal.
   * This version automatically updates when dependencies change.
   *
   * @param blockIdFactory - Function that returns the block ID to track
   * @param editorFactory - Function that returns the editor to use
   * @returns Signal containing the loading state
   */
  createUploadLoadingEffect(
    blockIdFactory: () => string | undefined,
    editorFactory?: () => BlockNoteEditor<any, any, any> | undefined
  ) {
    const showLoader = signal(false);

    // Set up upload start effect
    this.useOnUploadStartService.createOnUploadStartEffect(
      () => (uploadBlockId) => {
        const blockId = blockIdFactory();
        if (uploadBlockId === blockId) {
          showLoader.set(true);
        }
      },
      editorFactory
    );

    // Set up upload end effect
    this.useOnUploadEndService.createOnUploadEndEffect(
      () => (uploadBlockId) => {
        const blockId = blockIdFactory();
        if (uploadBlockId === blockId) {
          showLoader.set(false);
        }
      },
      editorFactory
    );

    return showLoader.asReadonly();
  }
}

/**
 * Standalone function version for use without dependency injection
 */
export function useUploadLoading(
  blockId: string | undefined,
  editor: BlockNoteEditor<any, any, any>
): {
  showLoader: () => boolean;
  cleanup: () => void;
} {
  if (!editor) {
    throw new Error("'editor' is required as a function argument");
  }

  const showLoader = signal(false);

  // Set up upload start listener
  const startUnsubscribe = editor.onUploadStart((uploadBlockId) => {
    if (uploadBlockId === blockId) {
      showLoader.set(true);
    }
  });

  // Set up upload end listener
  const endUnsubscribe = editor.onUploadEnd((uploadBlockId) => {
    if (uploadBlockId === blockId) {
      showLoader.set(false);
    }
  });

  return {
    showLoader: showLoader.asReadonly(),
    cleanup: () => {
      startUnsubscribe();
      endUnsubscribe();
    }
  };
}
