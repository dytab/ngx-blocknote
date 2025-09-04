import { BlockNoteEditor, BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';

export interface ResolveUrlResult {
  loadingState: 'loading' | 'loaded' | 'error';
  downloadUrl?: string;
}

export function useResolveUrl(
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>,
  fetchUrl: string
): Observable<ResolveUrlResult> {
  if (!fetchUrl) {
    return of({ loadingState: 'error' });
  }

  const resolveUrl = async (): Promise<string> => {
    if (editor.resolveFileUrl) {
      return await editor.resolveFileUrl(fetchUrl);
    }
    return fetchUrl;
  };

  return from(resolveUrl()).pipe(
    map((downloadUrl: string) => ({
      loadingState: 'loaded' as const,
      downloadUrl
    })),
    catchError(() => of({ loadingState: 'error' as const })),
    startWith({ loadingState: 'loading' as const })
  );
}
