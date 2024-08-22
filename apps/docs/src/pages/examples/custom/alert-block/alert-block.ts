import { createBlockSpec, defaultProps } from '@blocknote/core';

// The types of alerts that users can choose from
const alertTypes = {
  warning: {
    icon: '⚠️',
    color: '#e69819',
    backgroundColor: '#fff6e6',
  },
  error: {
    icon: '⛔',
    color: '#d80d0d',
    backgroundColor: '#ffe6e6',
  },
  info: {
    icon: 'ℹ️',
    color: '#507aff',
    backgroundColor: '#e6ebff',
  },
  success: {
    icon: '✅',
    color: '#0bc10b',
    backgroundColor: '#e6ffe6',
  },
};

export const alertBlock = createBlockSpec(
  {
    type: 'alert',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: 'warning',
        values: ['warning', 'error', 'info', 'success'] as const,
      },
    },
    content: 'inline',
  },
  {
    render: (block, editor) => {
      const alert = document.createElement('div');
      alert.className = 'alert';
      alert.style.width = '100%';
      alert.style.display = 'flex';
      alert.style.backgroundColor =
        alertTypes[block.props.type].backgroundColor;

      const dropdown = document.createElement('select');
      dropdown.contentEditable = 'false';
      dropdown.addEventListener('change', () => {
        editor.updateBlock(block, {
          type: 'alert',
          props: { type: dropdown.value as keyof typeof alertTypes },
        });
      });
      dropdown.options.add(
        new Option(
          alertTypes['warning'].icon,
          'warning',
          block.props.type === 'warning',
          block.props.type === 'warning'
        )
      );
      dropdown.options.add(
        new Option(
          alertTypes['error'].icon,
          'error',
          block.props.type === 'error',
          block.props.type === 'error'
        )
      );
      dropdown.options.add(
        new Option(
          alertTypes['info'].icon,
          'info',
          block.props.type === 'info',
          block.props.type === 'info'
        )
      );
      dropdown.options.add(
        new Option(
          alertTypes['success'].icon,
          'success',
          block.props.type === 'success',
          block.props.type === 'success'
        )
      );
      alert.appendChild(dropdown);

      const inlineContent = document.createElement('div');
      inlineContent.style.flexGrow = '1';

      alert.appendChild(inlineContent);

      return {
        dom: alert,
        contentDOM: inlineContent,
      };
    },
  }
);
