import { effect, signal, Signal } from '@angular/core';
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';

export interface LoadSuggestionMenuItemsResult<T> {
  items: T[];
  usedQuery: string | undefined;
  loadingState: 'loading-initial' | 'loading' | 'loaded';
}

export function createLoadSuggestionMenuItems<T>(
  querySignal: Signal<string>,
  getItems: (query: string) => Promise<T[]>,
): {
  items: Signal<T[]>;
  usedQuery: Signal<string | undefined>;
  loadingState: Signal<'loading-initial' | 'loading' | 'loaded'>;
} {
  const items = signal<T[]>([]);
  const usedQuery = signal<string | undefined>(undefined);
  const loadingState = signal<'loading-initial' | 'loading' | 'loaded'>(
    'loading-initial',
  );

  let currentRequestId = 0;

  effect(() => {
    const query = querySignal();
    const requestId = ++currentRequestId;

    loadingState.set(usedQuery() === undefined ? 'loading-initial' : 'loading');

    // Convert Promise to Observable and handle concurrent requests
    from(getItems(query))
      .pipe(
        tap((newItems) => {
          // Only update if this is still the latest request
          if (requestId === currentRequestId) {
            items.set(newItems || []);
            usedQuery.set(query);
            loadingState.set('loaded');
          }
        }),
        catchError((error) => {
          console.error('Error loading suggestion menu items:', error);
          if (requestId === currentRequestId) {
            loadingState.set('loaded');
          }
          return EMPTY;
        }),
      )
      .subscribe();
  });

  return {
    items: items.asReadonly(),
    usedQuery: usedQuery.asReadonly(),
    loadingState: loadingState.asReadonly(),
  };
}

/**
 * Alternative implementation using observables if preferred
 */
export function createLoadSuggestionMenuItemsObservable<T>(
  query$: Observable<string>,
  getItems: (query: string) => Promise<T[]>,
): Observable<LoadSuggestionMenuItemsResult<T>> {
  const usedQuerySubject = new BehaviorSubject<string | undefined>(undefined);

  return query$.pipe(
    switchMap((query) =>
      from(getItems(query)).pipe(
        tap(() => usedQuerySubject.next(query)),
        switchMap((items) => [
          {
            items: items || [],
            usedQuery: query,
            loadingState: 'loaded' as const,
          },
        ]),
        startWith({
          items: [] as T[],
          usedQuery: usedQuerySubject.value,
          loadingState:
            usedQuerySubject.value === undefined
              ? ('loading-initial' as const)
              : ('loading' as const),
        }),
        catchError((error) => {
          console.error('Error loading suggestion menu items:', error);
          return [
            {
              items: [] as T[],
              usedQuery: usedQuerySubject.value,
              loadingState: 'loaded' as const,
            },
          ];
        }),
      ),
    ),
  );
}
