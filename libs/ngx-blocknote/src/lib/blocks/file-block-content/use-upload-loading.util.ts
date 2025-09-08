import { BlockNoteEditor, BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export function useOnUploadStart(
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>
): Observable<string | undefined> {
  return new Observable(subscriber => {
    const unsubscribe = editor.onUploadStart((blockId?: string) => {
      subscriber.next(blockId);
    });

    return () => {
      unsubscribe();
    };
  });
}

export function useOnUploadEnd(
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>
): Observable<string | undefined> {
  return new Observable(subscriber => {
    const unsubscribe = editor.onUploadEnd((blockId?: string) => {
      subscriber.next(blockId);
    });

    return () => {
      unsubscribe();
    };
  });
}

export function useUploadLoading(
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>,
  blockId?: string
): Observable<boolean> {
  const showLoaderSubject = new BehaviorSubject<boolean>(false);

  const uploadStart$ = useOnUploadStart(editor).pipe(
    map(uploadBlockId => uploadBlockId === blockId ? true : null)
  );

  const uploadEnd$ = useOnUploadEnd(editor).pipe(
    map(uploadBlockId => uploadBlockId === blockId ? false : null)
  );

  // Subscribe to upload events and update the loader state
  merge(uploadStart$, uploadEnd$).subscribe(loaderState => {
    if (loaderState !== null) {
      showLoaderSubject.next(loaderState);
    }
  });

  return showLoaderSubject.asObservable().pipe(
    distinctUntilChanged()
  );
}
