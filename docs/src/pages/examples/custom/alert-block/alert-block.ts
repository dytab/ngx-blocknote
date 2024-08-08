import {
  BlockFromConfig,
  BlockNoteEditor,
  createBlockSpec,
  Props,
  PropSchema,
} from '@blocknote/core';
import {
  lucideAlertTriangle,
  lucideCheckCircle,
  lucideCircleOff,
  lucideInfo,
} from '@ng-icons/lucide';

// The types of alerts that users can choose from.
export const alertTypes = [
  {
    title: 'Warning',
    value: 'warning',
    icon: lucideAlertTriangle,
    color: '#e69819',
    backgroundColor: {
      light: '#fff6e6',
      dark: '#805d20',
    },
  },
  {
    title: 'Error',
    value: 'error',
    icon: lucideCircleOff,
    color: '#d80d0d',
    backgroundColor: {
      light: '#ffe6e6',
      dark: '#802020',
    },
  },
  {
    title: 'Info',
    value: 'info',
    icon: lucideInfo,
    color: '#507aff',
    backgroundColor: {
      light: '#e6ebff',
      dark: '#203380',
    },
  },
  {
    title: 'Success',
    value: 'success',
    icon: lucideCheckCircle,
    color: '#0bc10b',
    backgroundColor: {
      light: '#e6ffe6',
      dark: '#208020',
    },
  },
] as const;

export const alertPropSchema = {
  type: {
    default: 'warning',
    values: alertTypes.map((type) => type.value),
  },
} satisfies PropSchema;

export const alertBlockConfig = {
  type: 'alert' as const,
  propSchema: alertPropSchema,
  content: 'inline',
} as const;

const alertRender = (
  block: BlockFromConfig<typeof alertBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.padding = '4px 8px';
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  const alertType = alertTypes.find((type) => type.value === block.props.type);
  if (!alertType) {
    return {
      dom: div,
    };
  }
  div.style.color = alertType.color;
  div.style.backgroundColor = alertType.backgroundColor.light;

  // Create a select element.
  const selectElement = document.createElement('select');

  // Populate the select element with options.
  alertTypes.forEach((alertType) => {
    const option = document.createElement('option');

    option.value = alertType.value;
    option.text = alertType.title;

    // Mark the current alertType as selected in the dropdown.
    if (alertType.value === block.props.type) {
      option.selected = true;
    }

    selectElement.appendChild(option);
  });

  // Handle the change event.
  selectElement.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLSelectElement;
    editor.updateBlock(block, {
      type: 'alert',
      props: { type: target.value },
    });
  });

  // Style the dropdown
  selectElement.style.position = 'absolute';
  selectElement.style.right = '100px';

  // Add the select element to the div.
  div.appendChild(selectElement);

  const iconElement = document.createElement('span');
  iconElement.innerHTML = alertType.icon;
  iconElement.style.marginRight = '8px';
  div.appendChild(iconElement);

  const textElement = document.createElement('span');
  textElement.classList.add('inline-content');
  textElement.textContent = 'Hello world';
  div.appendChild(textElement);

  return {
    dom: div,
  };
};

export const alertParse = (
  element: HTMLElement
): Partial<Props<typeof alertBlockConfig.propSchema>> | undefined => {
  return undefined;
};

export const alertBlock = createBlockSpec(alertBlockConfig, {
  render: alertRender,
  parse: alertParse,
});
