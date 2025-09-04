import {
  Injectable,
  InjectionToken,
  inject,
  Type,
  ComponentRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';

/**
 * Angular equivalent of React's ComponentsContext
 * Provides dependency injection for all BlockNote UI components
 */

// Base interfaces for common component props patterns
export interface BnaBaseComponentProps {
  className?: string;
}

export interface BnaButtonComponentProps extends BnaBaseComponentProps {
  onClick?: (event: MouseEvent) => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  icon?: TemplateRef<any>;
  label?: string;
}

export interface BnaToolbarRootProps extends BnaBaseComponentProps {
  variant?: 'default' | 'action-toolbar';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface BnaMenuItemProps extends BnaBaseComponentProps {
  onClick?: () => void;
  text: string;
  icon?: TemplateRef<any>;
  isSelected?: boolean;
  isDisabled?: boolean;
}

// Component type definitions for major UI sections
export interface BnaComponentProps {
  FormattingToolbar: {
    Root: BnaToolbarRootProps;
    Button: BnaButtonComponentProps & {
      mainTooltip?: string;
      secondaryTooltip?: string;
      variant?: 'default' | 'compact';
    };
    Select: BnaBaseComponentProps & {
      items: BnaMenuItemProps[];
      isDisabled?: boolean;
    };
  };

  LinkToolbar: {
    Root: BnaToolbarRootProps;
    Button: BnaButtonComponentProps;
    Select: BnaComponentProps['FormattingToolbar']['Select'];
  };

  SideMenu: {
    Root: BnaBaseComponentProps;
    Button: BnaButtonComponentProps & {
      onDragStart?: (event: DragEvent) => void;
      onDragEnd?: (event: DragEvent) => void;
      draggable?: boolean;
    };
  };

  SuggestionMenu: {
    Root: BnaBaseComponentProps & {
      id: string;
    };
    Item: BnaBaseComponentProps & {
      id: string;
      isSelected: boolean;
      onClick: () => void;
    };
    EmptyItem: BnaBaseComponentProps;
    Label: BnaBaseComponentProps;
    Loader: BnaBaseComponentProps;
  };

  FilePanel: {
    Root: BnaBaseComponentProps & {
      tabs: Array<{
        name: string;
        tabPanel: TemplateRef<any>;
      }>;
      openTab: string;
      setOpenTab: (name: string) => void;
      defaultOpenTab: string;
      loading: boolean;
    };
    Button: BnaButtonComponentProps;
    FileInput: BnaBaseComponentProps & {
      accept: string;
      value: File | null;
      placeholder: string;
      onChange: (file: File | null) => void;
    };
    TextInput: BnaBaseComponentProps & {
      value: string;
      placeholder: string;
      onChange: (value: string) => void;
      onKeyDown: (event: KeyboardEvent) => void;
    };
  };

  TableHandle: {
    Root: BnaBaseComponentProps & {
      draggable: boolean;
      onDragStart: (event: DragEvent) => void;
      onDragEnd: () => void;
      label?: string;
    };
    ExtendButton: BnaBaseComponentProps & {
      onClick: (event: MouseEvent) => void;
      onMouseDown: (event: MouseEvent) => void;
    };
  };

  Generic: {
    Menu: {
      Root: BnaBaseComponentProps & {
        position?: 'top' | 'right' | 'bottom' | 'left';
        onOpenChange?: (open: boolean) => void;
      };
      Item: BnaBaseComponentProps & {
        icon?: TemplateRef<any>;
        onClick?: () => void;
        checked?: boolean;
      };
      Divider: BnaBaseComponentProps;
      Label: BnaBaseComponentProps;
    };
    Form: {
      Root: BnaBaseComponentProps;
      TextInput: BnaBaseComponentProps & {
        name: string;
        label?: string;
        variant?: 'default' | 'large';
        icon?: TemplateRef<any>;
        autoFocus?: boolean;
        placeholder?: string;
        disabled?: boolean;
        value: string;
        onChange: (value: string) => void;
        onKeyDown: (event: KeyboardEvent) => void;
        onSubmit?: () => void;
      };
    };
  };
}

// Component registry for storing custom component implementations
export type BnaComponentRegistry = {
  [K in keyof BnaComponentProps]?: {
    [P in keyof BnaComponentProps[K]]?: Type<any>;
  };
};

/**
 * Injection token for BlockNote components context
 */
export const BNA_COMPONENTS_CONTEXT = new InjectionToken<BnaComponentRegistry>(
  'BNA_COMPONENTS_CONTEXT'
);

/**
 * Service for managing component dependencies in BlockNote Angular
 * This is the Angular equivalent of React's ComponentsContext
 */
@Injectable({
  providedIn: 'root',
})
export class BnaComponentsContextService {
  private componentRegistry: BnaComponentRegistry = {};
  private defaultComponents: Partial<BnaComponentRegistry> = {};

  /**
   * Register a component for a specific category and type
   */
  registerComponent<
    Category extends keyof BnaComponentProps,
    Component extends keyof BnaComponentProps[Category]
  >(
    category: Category,
    component: Component,
    componentType: Type<any>
  ) {
    if (!this.componentRegistry[category]) {
      this.componentRegistry[category] = {} as any;
    }
    (this.componentRegistry[category] as any)[component] = componentType;
  }

  /**
   * Get a component from the registry
   */
  getComponent<
    Category extends keyof BnaComponentProps,
    Component extends keyof BnaComponentProps[Category]
  >(
    category: Category,
    component: Component
  ): Type<any> | undefined {
    return this.componentRegistry[category]?.[component] as Type<any> | undefined;
  }

  /**
   * Get all components for a category
   */
  getCategoryComponents<Category extends keyof BnaComponentProps>(
    category: Category
  ): Partial<BnaComponentProps[Category]> | undefined {
    return this.componentRegistry[category] as Partial<BnaComponentProps[Category]> | undefined;
  }

  /**
   * Set default components (equivalent to React's default component providers)
   */
  setDefaultComponents(components: Partial<BnaComponentRegistry>) {
    this.defaultComponents = { ...this.defaultComponents, ...components };
  }

  /**
   * Get component with fallback to default
   */
  getComponentWithFallback<
    Category extends keyof BnaComponentProps,
    Component extends keyof BnaComponentProps[Category]
  >(
    category: Category,
    component: Component
  ): Type<any> | undefined {
    return (
      this.getComponent(category, component) ||
      this.defaultComponents[category]?.[component]
    );
  }

  /**
   * Create a component instance using ViewContainerRef
   */
  createComponent<T>(
    componentType: Type<T>,
    viewContainerRef: ViewContainerRef,
    props?: any
  ): ComponentRef<T> {
    const componentRef = viewContainerRef.createComponent(componentType);

    // Apply props to component instance
    if (props) {
      Object.keys(props).forEach(key => {
        if (componentRef.instance && key in componentRef.instance) {
          (componentRef.instance as any)[key] = props[key];
        }
      });
    }

    return componentRef;
  }

  /**
   * Register multiple components at once
   */
  registerComponents(components: BnaComponentRegistry) {
    Object.keys(components).forEach(category => {
      const categoryKey = category as keyof BnaComponentProps;
      const categoryComponents = components[categoryKey];

      if (categoryComponents) {
        Object.keys(categoryComponents).forEach(component => {
          const componentKey = component as keyof BnaComponentProps[typeof categoryKey];
          const componentType = categoryComponents[componentKey];

          if (componentType) {
            this.registerComponent(categoryKey, componentKey, componentType);
          }
        });
      }
    });
  }
}

/**
 * Angular equivalent of React's useComponentsContext hook
 */
export function useBnaComponentsContext(): BnaComponentsContextService {
  try {
    return inject(BnaComponentsContextService);
  } catch {
    // Create a new instance if not provided
    return new BnaComponentsContextService();
  }
}

/**
 * Utility function to inject a specific component
 */
export function useBnaComponent<
  Category extends keyof BnaComponentProps,
  Component extends keyof BnaComponentProps[Category]
>(
  category: Category,
  component: Component
): Type<any> | undefined {
  const context = useBnaComponentsContext();
  return context.getComponentWithFallback(category, component);
}

/**
 * Factory function for creating component context providers
 */
export function createBnaComponentsProvider(
  components: Partial<BnaComponentRegistry>
) {
  return {
    provide: BNA_COMPONENTS_CONTEXT,
    useValue: components,
  };
}
