import { BlockNoteEditor } from '@blocknote/core';
import { Component, createComponent, EnvironmentInjector, inject, ApplicationRef } from '@angular/core';
import { ComponentRef } from '@angular/core';

/**
 * Angular equivalent of ReactRenderUtil.ts
 * Renders Angular components to DOM specs for use in BlockNote schema
 */

export function renderToDOMSpec(
  componentFactory: (refCallback: (ref: HTMLElement | null) => void) => ComponentRef<any>,
  editor: BlockNoteEditor<any, any, any> | undefined,
): { dom: HTMLElement; contentDOM?: HTMLElement } {
  let contentDOM: HTMLElement | undefined;
  const div = document.createElement('div');

  let componentRef: ComponentRef<any> | undefined;

  if (editor?.elementRenderer) {
    // Use editor's element renderer if available
    // This maintains Angular context within the existing application tree
    editor.elementRenderer(
      componentFactory((el) => (contentDOM = el || undefined)),
      div,
    );
  } else {
    // If no editor is provided, create component directly
    // This is used for headless editors or server-side rendering

    if (!editor?.headless) {
      throw new Error(
        'elementRenderer not available, expected headless editor'
      );
    }

    try {
      componentRef = componentFactory((el) => (contentDOM = el || undefined));
      if (componentRef.location?.nativeElement) {
        div.appendChild(componentRef.location.nativeElement);
      }
    } catch (error) {
      console.warn('AngularInlineContentSpec: renderHTML() failed', error);
      return {
        dom: document.createElement('span'),
      };
    }
  }

  if (!div.childElementCount) {
    console.warn('AngularInlineContentSpec: renderHTML() failed - no child elements');
    return {
      dom: document.createElement('span'),
    };
  }

  // Clone the DOM so we can clean up the component reference
  contentDOM?.setAttribute('data-tmp-find', 'true');
  const cloneRoot = div.cloneNode(true) as HTMLElement;
  const dom = cloneRoot.firstElementChild! as HTMLElement;
  const contentDOMClone = cloneRoot.querySelector(
    '[data-tmp-find]'
  ) as HTMLElement | null;
  contentDOMClone?.removeAttribute('data-tmp-find');

  // Clean up component reference
  componentRef?.destroy();

  return {
    dom,
    contentDOM: contentDOMClone || undefined,
  };
}

/**
 * Helper function to create Angular component from template dynamically
 * This is used when we need to render Angular components in BlockNote schema
 */
export function createAngularComponent<T>(
  template: string,
  selector: string,
  componentClass: new (...args: any[]) => T,
  injector: EnvironmentInjector
): ComponentRef<T> {
  @Component({
    selector,
    template,
    standalone: true,
  })
  class DynamicComponent extends componentClass {}

  return createComponent(DynamicComponent, {
    environmentInjector: injector,
  });
}

/**
 * Utility function to render Angular component to HTML string
 * Useful for server-side rendering or static HTML generation
 */
export function renderToHTML<T>(
  component: ComponentRef<T>,
  applicationRef?: ApplicationRef
): string {
  if (applicationRef) {
    applicationRef.attachView(component.hostView);
  }

  const hostElement = component.location.nativeElement;
  return hostElement.outerHTML;
}
