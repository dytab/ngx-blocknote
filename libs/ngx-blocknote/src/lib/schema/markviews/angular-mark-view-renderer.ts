import { Type, ComponentRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

/**
 * Options for creating an Angular mark view
 */
export interface AngularMarkViewOptions {
  component: Type<any>;
  contentAs: string;
  viewContainerRef: ViewContainerRef;
  props?: Record<string, any>;
}

/**
 * Configuration for Angular mark view creation
 */
export interface AngularMarkViewConfig {
  editor: BlockNoteEditor<any, any, any>;
  inline: boolean;
  mark: any;
  options: AngularMarkViewOptions;
  view: any;
}

/**
 * Angular equivalent of React's MarkView for rendering custom marks
 */
export class AngularMarkView {
  private componentRef?: ComponentRef<any>;
  private contentElement?: HTMLElement;
  public dom: HTMLElement;

  constructor(private config: AngularMarkViewConfig) {
    // Create the DOM wrapper element
    this.dom = document.createElement(this.config.options.contentAs || 'span');
    this.dom.setAttribute('data-mark-view', 'true');
    this.dom.setAttribute('data-mark-type', this.config.mark.type.name);
  }

  /**
   * Renders the Angular component for the mark
   */
  render(): void {
    if (!this.config.options.viewContainerRef || !this.config.options.component) {
      return;
    }

    try {
      // Create the Angular component
      this.componentRef = this.config.options.viewContainerRef.createComponent(
        this.config.options.component
      );

      // Set up component inputs
      this.setupComponentInputs();

      // Handle content reference
      this.setupContentRef();

      // Append component DOM to wrapper
      if (this.componentRef.location?.nativeElement) {
        this.dom.appendChild(this.componentRef.location.nativeElement);
      }

      // Trigger change detection
      this.componentRef.changeDetectorRef?.detectChanges();
    } catch (error) {
      console.error('Failed to render Angular mark view:', error);
      // Fallback to simple span
      this.renderFallback();
    }
  }

  /**
   * Sets up component inputs from mark attributes and props
   */
  private setupComponentInputs(): void {
    if (!this.componentRef?.instance) return;

    const instance = this.componentRef.instance;

    // Set props from options
    if (this.config.options.props) {
      Object.entries(this.config.options.props).forEach(([key, value]) => {
        instance[key] = value;
      });
    }

    // Set mark-specific attributes
    if (this.config.mark.attrs) {
      Object.entries(this.config.mark.attrs).forEach(([key, value]) => {
        if (key === 'stringValue' && instance.value !== undefined) {
          instance.value = value;
        } else {
          instance[key] = value;
        }
      });
    }
  }

  /**
   * Sets up the content reference callback for the component
   */
  private setupContentRef(): void {
    if (!this.componentRef?.instance) return;

    const instance = this.componentRef.instance;

    if (typeof instance.contentRef === 'function') {
      // Create content element
      this.contentElement = document.createElement('span');
      this.contentElement.setAttribute('data-mark-content', 'true');

      // Pass content element to component
      instance.contentRef(this.contentElement);

      // If component didn't handle content element, append it to DOM
      if (!this.dom.contains(this.contentElement)) {
        this.dom.appendChild(this.contentElement);
      }
    }
  }

  /**
   * Renders a simple fallback when component creation fails
   */
  private renderFallback(): void {
    this.dom.textContent = '';
    this.contentElement = document.createElement('span');
    this.contentElement.setAttribute('data-mark-fallback', 'true');
    this.dom.appendChild(this.contentElement);
  }

  /**
   * Updates the mark view when mark attributes change
   */
  update(mark: any): boolean {
    if (!this.componentRef?.instance) {
      return false;
    }

    this.config.mark = mark;
    this.setupComponentInputs();
    this.componentRef.changeDetectorRef?.detectChanges();
    return true;
  }

  /**
   * Destroys the mark view and cleans up resources
   */
  destroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }

    if (this.contentElement) {
      this.contentElement.remove();
      this.contentElement = undefined;
    }
  }

  /**
   * Gets the content element for text insertion
   */
  getContentElement(): HTMLElement | undefined {
    return this.contentElement;
  }

  /**
   * Checks if the mark view is still valid
   */
  isValid(): boolean {
    return !!this.componentRef && !this.componentRef.hostView.destroyed;
  }
}
