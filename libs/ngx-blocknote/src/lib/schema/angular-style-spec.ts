import {
  StyleConfig,
  addStyleAttributes,
  createInternalStyleSpec,
  getStyleParseRules,
  stylePropsToAttributes,
  type BlockNoteEditor,
} from '@blocknote/core';
import { Mark } from '@tiptap/react';
import { Type, ComponentRef, ViewContainerRef } from '@angular/core';
import { AngularMarkView } from './markviews/angular-mark-view-renderer';

/**
 * Props passed to Angular custom style render components
 */
export interface AngularCustomStyleRenderProps {
  contentRef: (el: HTMLElement | null) => void;
  value?: string;
}

/**
 * Angular custom style implementation configuration
 */
export interface AngularCustomStyleImplementation<T extends StyleConfig> {
  render: Type<any>; // Angular component type
}

/**
 * Creates a custom Angular style spec for inline text styling
 */
export function createAngularStyleSpec<T extends StyleConfig>(
  styleConfig: T,
  styleImplementation: AngularCustomStyleImplementation<T>,
  viewContainerRef: ViewContainerRef
) {
  const mark = Mark.create({
    name: styleConfig.type,

    addAttributes() {
      return stylePropsToAttributes(styleConfig.propSchema);
    },

    parseHTML() {
      return getStyleParseRules(styleConfig);
    },

    renderHTML({ mark }) {
      const props: any = {};

      if (styleConfig.propSchema === 'string') {
        props.value = mark.attrs.stringValue;
      }

      // For server-side rendering or static HTML generation
      // Create a simple wrapper element
      const element = document.createElement('span');
      element.setAttribute('data-style-type', styleConfig.type);

      if (styleConfig.propSchema === 'string' && mark.attrs.stringValue) {
        element.setAttribute('data-style-value', mark.attrs.stringValue);
      }

      return addStyleAttributes(
        ['span', {
          'data-style-type': styleConfig.type,
          ...(styleConfig.propSchema === 'string' && mark.attrs.stringValue ?
            { 'data-style-value': mark.attrs.stringValue } : {})
        }],
        styleConfig.type,
        mark.attrs.stringValue,
        styleConfig.propSchema,
      );
    },
  });

  // Register Angular MarkView for dynamic rendering
  mark.config.addMarkView =
    (editor: BlockNoteEditor<any, any, any>) => (mark: any, view: any) => {
      const markView = new AngularMarkView({
        editor,
        inline: true,
        mark,
        options: {
          component: styleImplementation.render,
          contentAs: 'span',
          viewContainerRef,
          props: styleConfig.propSchema === 'string' ?
            { value: mark.attrs.stringValue } : {}
        },
        view,
      });
      markView.render();
      return markView;
    };

  return createInternalStyleSpec(styleConfig, {
    mark,
  });
}

/**
 * Base class for Angular style components
 * Custom style components should extend this or implement AngularCustomStyleRenderProps
 */
export abstract class BaseAngularStyleComponent implements AngularCustomStyleRenderProps {
  contentRef: (el: HTMLElement | null) => void = () => {
    // Default empty implementation - subclasses can override
  };
  value?: string;

  abstract render(): void;
}
