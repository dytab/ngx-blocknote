import {
  BlockFromConfig,
  createBlockSpec, FileBlockConfig,
  Props, PropSchema
} from '@blocknote/core/src/schema';
import type {
  BlockNoteEditor
} from '@blocknote/core/src/editor/BlockNoteEditor';
import { defaultProps } from '@blocknote/core/src/blocks/defaultProps';

export const alertPropSchema = {
  textAlignment: defaultProps.textAlignment,
  backgroundColor: defaultProps.backgroundColor,
  // File name.
  name: {
    default: "" as const,
  },
  // File url.
  url: {
    default: "" as const,
  },
  // File caption.
  caption: {
    default: "" as const,
  },

  showPreview: {
    default: true,
  },
  // File preview width in px.
  previewWidth: {
    default: 512,
  },
} satisfies PropSchema;

export const alertBlockConfig = {
  type: "alert" as const,
  propSchema: alertPropSchema,
  content: "none",
  isFileBlock: true,
  fileBlockAcceptMimeTypes: ["alert/*"],
} satisfies FileBlockConfig;

const alertRender = (
  block: BlockFromConfig<typeof alertBlockConfig, any, any>,
  editor: BlockNoteEditor<any, any, any>
) => {
  const div = document.createElement('p');
  div.textContent = 'ALERT';

  return {
    dom: div
  };
};

const alertToExternalHTML = (
  block: BlockFromConfig<typeof alertBlockConfig, any, any>
) => {
  const div = document.createElement('p');
  div.textContent = 'Add Alert';

  return {
    dom: div
  };
};

export const alertParse = (
  element: HTMLElement
): Partial<Props<typeof alertBlockConfig.propSchema>> | undefined => {
  return undefined
}

export const alertBlock = createBlockSpec(alertBlockConfig, {
  render: alertRender,
  parse: alertParse,
  toExternalHTML: alertToExternalHTML
});
