import {
  addInlineContentAttributes,
  addInlineContentKeyboardShortcuts,
  camelToDataKebab,
  createInternalInlineContentSpec,
  createStronglyTypedTiptapNode,
  CustomInlineContentConfig,
  getInlineContentParseRules,
  InlineContentFromConfig,
  inlineContentToNodes,
  nodeToCustomInlineContent,
  PartialCustomInlineContentFromConfig,
  Props,
  PropSchema,
  propsToAttributes,
  StyleSchema,
  BlockNoteEditor,
  InlineContentSchemaWithInlineContent,
} from '@blocknote/core';
import {
  Component,
  ComponentRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  EnvironmentInjector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { renderToDOMSpec } from './@util/angular-render-util';

// Angular equivalent of React's ReactCustomInlineContentRenderProps
export interface AngularCustomInlineContentRenderProps<
  T extends CustomInlineContentConfig,
  S extends StyleSchema,
> {
  inlineContent: InlineContentFromConfig<T, S>;
  updateInlineContent: (
    update: PartialCustomInlineContentFromConfig<T, S>,
  ) => void;
  editor: BlockNoteEditor<
    any,
    InlineContentSchemaWithInlineContent<T['type'], T>,
    S
  >;
  contentRef: (node: HTMLElement | null) => void;
}

// Angular equivalent of React's ReactInlineContentImplementation
export interface AngularInlineContentImplementation<
  T extends CustomInlineContentConfig,
  S extends StyleSchema,
> {
  render: new (...args: any[]) => AngularInlineContentComponent<T, S>;
  // TODO: Add toExternalHTML support if needed
  // toExternalHTML?: new (...args: any[]) => AngularInlineContentComponent<T, S>;
}

// Base component interface that Angular inline content components should implement
export interface AngularInlineContentComponent<
  T extends CustomInlineContentConfig,
  S extends StyleSchema,
> {
  inlineContent: InlineContentFromConfig<T, S>;
  updateInlineContent: (update: PartialCustomInlineContentFromConfig<T, S>) => void;
  editor: BlockNoteEditor<any, InlineContentSchemaWithInlineContent<T['type'], T>, S>;
  contentRef: (node: HTMLElement | null) => void;
}

// Angular wrapper component equivalent to React's InlineContentWrapper
@Component({
  selector: 'bna-inline-content-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `<span
    class="bn-inline-content-section"
    [attr.data-inline-content-type]="inlineContentType"
  ><ng-content></ng-content></span>`,
})
export class BnaInlineContentWrapperComponent<
  IType extends string,
  PSchema extends PropSchema,
> {
  @Input() inlineContentType!: IType;
  @Input() inlineContentProps!: Props<PSchema>;
  @Input() propSchema!: PSchema;

  ngOnInit() {
    // Add data attributes programmatically since Angular doesn't support dynamic attr bindings easily
    if (this.inlineContentProps && this.propSchema) {
      this.setDataAttributes();
    }
  }

  private setDataAttributes() {
    // Add props as HTML attributes in kebab-case with "data-" prefix
    // Skip props set to their default values
    Object.entries(this.inlineContentProps)
      .filter(([prop, value]) => {
        const spec = this.propSchema[prop];
        return value !== spec.default;
      })
      .forEach(([prop, value]) => {
        const attrName = camelToDataKebab(prop);
        // This would need to be implemented with ElementRef/Renderer2 in a real component
        // For now, we'll handle it in the parent template
      });
  }
}

// Angular equivalent of React's createReactInlineContentSpec
export function createAngularInlineContentSpec<
  T extends CustomInlineContentConfig,
  S extends StyleSchema,
>(
  inlineContentConfig: T,
  inlineContentImplementation: AngularInlineContentImplementation<T, S>,
) {
  const node = createStronglyTypedTiptapNode({
    name: inlineContentConfig.type as T['type'],
    inline: true,
    group: 'inline',
    selectable: inlineContentConfig.content === 'styled',
    atom: inlineContentConfig.content === 'none',
    draggable: inlineContentConfig.draggable,
    content: (inlineContentConfig.content === 'styled'
      ? 'inline*'
      : '') as T['content'] extends 'styled' ? 'inline*' : '',

    addAttributes() {
      return propsToAttributes(inlineContentConfig.propSchema);
    },

    addKeyboardShortcuts() {
      return addInlineContentKeyboardShortcuts(inlineContentConfig);
    },

    parseHTML() {
      return getInlineContentParseRules(inlineContentConfig);
    },

    renderHTML({ node }) {
      const editor = this.options.editor;

      const ic = nodeToCustomInlineContent(
        node,
        editor.schema.inlineContentSchema,
        editor.schema.styleSchema,
      ) as any as InlineContentFromConfig<T, S>; // TODO: fix cast

      const ComponentClass = inlineContentImplementation.render;

      const output = renderToDOMSpec(
        (refCB) => {
          const injector = inject(EnvironmentInjector);

          // Create Angular component dynamically
          @Component({
            selector: 'temp-inline-content',
            template: '<bna-inline-content-wrapper><ng-container #content></ng-container></bna-inline-content-wrapper>',
            standalone: true,
            imports: [BnaInlineContentWrapperComponent],
          })
          class TempInlineContentComponent extends ComponentClass {
            inlineContent = ic;
            updateInlineContent = () => {
              // No-op for renderHTML
            };
            editor = editor;
            contentRef = refCB;
          }

          const componentRef = new TempInlineContentComponent();
          return componentRef as any;
        },
        editor,
      );

      return addInlineContentAttributes(
        output,
        inlineContentConfig.type,
        node.attrs as Props<T['propSchema']>,
        inlineContentConfig.propSchema,
      );
    },

    addNodeView() {
      const editor: BlockNoteEditor<any, any, any> = this.options.editor;

      return (props: any) => {
        let componentRef: ComponentRef<any> | undefined;
        let contentRefElement: HTMLElement | null = null;

        const ComponentClass = inlineContentImplementation.render;

        // Create Angular component for node view
        const injector = inject(EnvironmentInjector);

        @Component({
          selector: 'inline-content-node-view',
          template: `
            <bna-inline-content-wrapper
              [inlineContentProps]="inlineContentProps"
              [inlineContentType]="inlineContentType"
              [propSchema]="propSchema"
            >
              <ng-container #contentContainer></ng-container>
            </bna-inline-content-wrapper>
          `,
          standalone: true,
          imports: [BnaInlineContentWrapperComponent],
        })
        class InlineContentNodeViewComponent extends ComponentClass {
          inlineContentProps = props.node.attrs as Props<T['propSchema']>;
          inlineContentType = inlineContentConfig.type;
          propSchema = inlineContentConfig.propSchema;

          inlineContent = nodeToCustomInlineContent(
            props.node,
            editor.schema.inlineContentSchema,
            editor.schema.styleSchema,
          ) as any as InlineContentFromConfig<T, S>; // TODO: fix cast

          editor = editor;

          contentRef = (ref: HTMLElement | null) => {
            contentRefElement = ref;
          };

          updateInlineContent = (update: PartialCustomInlineContentFromConfig<T, S>) => {
            const content = inlineContentToNodes(
              [update],
              editor.pmSchema,
            );

            editor.transact((tr) =>
              tr.replaceWith(
                props.getPos(),
                props.getPos() + props.node.nodeSize,
                content,
              ),
            );
          };
        }

        try {
          componentRef = new InlineContentNodeViewComponent();
          const element = document.createElement('span');
          element.className = 'bn-ic-angular-node-view-renderer';

          // Mount the Angular component
          if (componentRef) {
            // This is a simplified mounting - in a real implementation,
            // you'd use Angular's component rendering system
            element.innerHTML = `<span class="bn-inline-content-section" data-inline-content-type="${inlineContentConfig.type}"></span>`;
          }

          return {
            dom: element,
            contentDOM: contentRefElement || element,
            destroy: () => {
              componentRef?.destroy?.();
            },
          };
        } catch (error) {
          console.error('Error creating Angular inline content node view:', error);
          return {
            dom: document.createElement('span'),
          };
        }
      };
    },
  });

  return createInternalInlineContentSpec(inlineContentConfig, {
    node: node,
  } as any);
}

/**
 * Utility function to create a simple Angular inline content component
 * This helps developers create custom inline content more easily
 */
export function createSimpleAngularInlineContent<
  T extends CustomInlineContentConfig,
  S extends StyleSchema,
>(
  template: string,
  componentLogic?: Partial<AngularInlineContentComponent<T, S>>
): new (...args: any[]) => AngularInlineContentComponent<T, S> {
  @Component({
    selector: 'simple-inline-content',
    template,
    standalone: true,
  })
  class SimpleInlineContentComponent implements AngularInlineContentComponent<T, S> {
    inlineContent!: InlineContentFromConfig<T, S>;
    updateInlineContent!: (update: PartialCustomInlineContentFromConfig<T, S>) => void;
    editor!: BlockNoteEditor<any, InlineContentSchemaWithInlineContent<T['type'], T>, S>;
    contentRef!: (node: HTMLElement | null) => void;

    constructor() {
      // Apply any custom logic provided
      if (componentLogic) {
        Object.assign(this, componentLogic);
      }
    }
  }

  return SimpleInlineContentComponent;
}
