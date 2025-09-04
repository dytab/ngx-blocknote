import { ElementRef } from '@angular/core';

/**
 * Angular equivalent of React's mergeRefs utility.
 * In Angular, we work with ElementRef and ViewChildren differently,
 * but this utility helps when dealing with multiple reference callbacks.
 */

export type RefCallback<T = HTMLElement> = (instance: T | null) => void;
export type AngularRef<T = HTMLElement> = ElementRef<T> | RefCallback<T> | null;

/**
 * Merges multiple refs into a single callback ref.
 * This is useful when you need to pass a ref to multiple places.
 *
 * @param refs - Array of refs to merge (ElementRef, callback functions, or null)
 * @returns A callback function that calls all the provided refs
 */
export function mergeRefs<T = HTMLElement>(...refs: (AngularRef<T> | undefined)[]): RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        // It's a callback ref
        ref(instance);
      } else if (ref && 'nativeElement' in ref) {
        // It's an ElementRef
        // Note: We can't directly set the nativeElement, but we can use this
        // for compatibility. In practice, ElementRefs are usually set by Angular.
        // This case is mainly for type compatibility.
        if (instance && ref.nativeElement !== instance) {
          // Log warning since we can't actually change ElementRef.nativeElement
          console.warn('mergeRefs: Cannot modify ElementRef.nativeElement directly');
        }
      }
    });
  };
}

/**
 * Creates a ref callback that forwards to multiple Angular-specific references.
 * This version is more tailored to Angular patterns.
 *
 * @param refs - Array of ElementRef objects and/or callback functions
 * @returns A callback function suitable for Angular template ref variables
 */
export function forwardRef<T = HTMLElement>(...refs: (ElementRef<T> | RefCallback<T> | null | undefined)[]): (instance: T | null) => void {
  return mergeRefs(...refs);
}

/**
 * Utility to create a template ref callback that can be used in Angular templates.
 * This is helpful when you need to capture element references in components.
 *
 * Example usage in component:
 * ```typescript
 * export class MyComponent {
 *   private elementRef = createRefCallback<HTMLDivElement>((el) => {
 *     console.log('Element:', el);
 *   });
 *
 *   getRefCallback() {
 *     return this.elementRef;
 *   }
 * }
 * ```
 *
 * In template:
 * ```html
 * <div #myRef [ngStyle]="getRefCallback()(myRef?.nativeElement)">
 *   Content
 * </div>
 * ```
 */
export function createRefCallback<T = HTMLElement>(callback: RefCallback<T>): RefCallback<T> {
  return callback;
}

/**
 * Type-safe wrapper for ElementRef that provides null safety.
 * Helps with the common pattern of checking if ElementRef.nativeElement exists.
 */
export function safeElementRef<T extends HTMLElement = HTMLElement>(
  elementRef: ElementRef<T> | null | undefined
): T | null {
  return elementRef?.nativeElement || null;
}

/**
 * Combines multiple ElementRefs into a single array of native elements.
 * Useful when working with QueryList or multiple ViewChild references.
 */
export function combineElementRefs<T extends HTMLElement = HTMLElement>(
  ...elementRefs: (ElementRef<T> | null | undefined)[]
): T[] {
  return elementRefs
    .map(ref => safeElementRef(ref))
    .filter((el): el is T => el !== null);
}
