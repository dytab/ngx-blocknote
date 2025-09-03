import {
  applyNonSelectableBlockFix,
  BlockFromConfig,
  BlockNoteEditor,
  BlockSchemaWithBlock,
  camelToDataKebab,
  createInternalBlockSpec,
  createStronglyTypedTiptapNode,
  CustomBlockConfig,
  getBlockFromPos,
  getParseRules,
  inheritedProps,
  InlineContentSchema,
  mergeCSSClasses,
  PartialBlockFromConfig,
  Props,
  PropSchema,
  propsToAttributes,
  StyleSchema,
  wrapInBlockStructure,
} from '@blocknote/core';
import { NodeView } from '@tiptap/pm/view';
import { Type, ComponentRef, ViewContainerRef, ElementRef } from '@angular/core';

/**
 * Props passed to Angular custom block render components
 */
export interface AngularCustomBlockRenderProps<
  T extends CustomBlockConfig,
  I extends InlineContentSchema,
  S extends StyleSchema,
> {
  block: BlockFromConfig<T, I, S>;
  editor: BlockNoteEditor<BlockSchemaWithBlock<T['type'], T>, I, S>;
  contentRef: (node: HTMLElement | null) => void;
}

/**
 * Angular custom block implementation configuration
 */
export interface AngularCustomBlockImplementation<
  T extends CustomBlockConfig,
  I extends InlineContentSchema,
  S extends StyleSchema,
> {
  render: Type<any>; // Angular component type
  toExternalHTML?: Type<any>; // Angular component type for external HTML
  parse?: (
    el: HTMLElement,
  ) => PartialBlockFromConfig<T, I, S>['props'] | undefined;
}

/**
 * Angular NodeView class that handles rendering of custom blocks
 */
export class AngularBlockNodeView implements NodeView {
  dom: HTMLElement;
  contentDOM?: HTMLElement;
  private componentRef?: ComponentRef<any>;

  constructor(
    private node: any,
    private view: any,
    private getPos: () => number,
    private blockConfig: AngularCustomBlockImplementation<any, any, any>,
    private viewContainerRef: ViewContainerRef,
    private editor: BlockNoteEditor<any, any, any>
  ) {
    this.dom = document.createElement('div');
    this.dom.className = 'bn-block-outer';

    // Create block content wrapper
    const blockContent = document.createElement('div');
    blockContent.className = mergeCSSClasses(
      'bn-block-content',
      this.node.attrs.class || ''
    );

    // Set content type attribute
    blockContent.setAttribute('data-content-type', this.node.type.name);

    // Add props as HTML attributes
    this.addPropsAsAttributes(blockContent);

    this.dom.appendChild(blockContent);

    // Create Angular component
    this.renderComponent(blockContent);
  }

  private addPropsAsAttributes(element: HTMLElement): void {
    // Add props as HTML attributes in kebab-case with "data-" prefix
    Object.entries(this.node.attrs).forEach(([prop, value]) => {
      if (!inheritedProps.includes(prop) && value !== undefined) {
        element.setAttribute(camelToDataKebab(prop), String(value));
      }
    });
  }

  private renderComponent(container: HTMLElement): void {
    if (!this.blockConfig.render) return;

    // Create the Angular component
    this.componentRef = this.viewContainerRef.createComponent(this.blockConfig.render);

    // Set component inputs
    const componentInstance = this.componentRef.instance;
    if (componentInstance) {
      // Map the block data
      const block = this.getBlockFromNode();

      componentInstance.block = block;
      componentInstance.editor = this.editor;
      componentInstance.contentRef = (node: HTMLElement | null) => {
        if (node) {
          this.contentDOM = node;
        }
      };
    }

    // Append component's DOM to container
    if (this.componentRef.location?.nativeElement) {
      container.appendChild(this.componentRef.location.nativeElement);
    }
  }

  private getBlockFromNode(): any {
    const pos = this.getPos();
    return getBlockFromPos(pos, this.editor._tiptapEditor.state);
  }

  update(node: any): boolean {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;

    // Update component inputs
    if (this.componentRef?.instance) {
      const block = this.getBlockFromNode();
      this.componentRef.instance.block = block;
      this.componentRef.changeDetectorRef?.detectChanges();
    }

    return true;
  }

  destroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  ignoreMutation(): boolean {
    return true;
  }
}

/**
 * Creates a custom Angular block spec for use with BlockNote editor
 */
export function createAngularBlockSpec<
  T extends CustomBlockConfig,
  I extends InlineContentSchema,
  S extends StyleSchema,
>(
  blockConfig: T,
  blockImplementation: AngularCustomBlockImplementation<T, I, S>,
  viewContainerRef: ViewContainerRef
): any {
  const internalSpec = createInternalBlockSpec(blockConfig, {
    render: () => null, // Not used in Angular version
    toExternalHTML: blockImplementation.toExternalHTML
      ? () => null // Angular component handling
      : undefined,
    parse: blockImplementation.parse,
  });

  return createStronglyTypedTiptapNode({
    name: blockConfig.type,
    content: internalSpec.content,
    group: internalSpec.group,
    defining: true,
    selectable: false,

    addAttributes() {
      return propsToAttributes(blockConfig.propSchema);
    },

    parseHTML() {
      return getParseRules(blockConfig, internalSpec.parseHTML);
    },

    renderHTML({ HTMLAttributes }) {
      return wrapInBlockStructure(
        internalSpec.renderHTML(HTMLAttributes),
        blockConfig.type,
        HTMLAttributes
      );
    },

    addNodeView() {
      return ({ node, view, getPos, editor }) => {
        return new AngularBlockNodeView(
          node,
          view,
          getPos as () => number,
          blockImplementation,
          viewContainerRef,
          editor as any
        );
      };
    },

    addKeyboardShortcuts() {
      return {};
    },

    onUpdate() {
      applyNonSelectableBlockFix(this.editor);
    },
  });
}

/**
 * Wrapper component props interface for Angular blocks
 */
export interface BlockContentWrapperProps<
  BType extends string,
  PSchema extends PropSchema,
> {
  blockType: BType;
  blockProps: Props<PSchema>;
  propSchema: PSchema;
  isFileBlock?: boolean;
  domAttributes?: Record<string, string>;
}
