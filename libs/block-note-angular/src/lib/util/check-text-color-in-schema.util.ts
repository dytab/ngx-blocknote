import {
  BlockNoteEditor,
  BlockSchema,
  InlineContentSchema,
  StyleSchema,
} from '@blocknote/core';

export function checkColorInSchema<Color extends 'text' | 'background'>(
  color: Color,
  editor: BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>
): editor is BlockNoteEditor<
  BlockSchema,
  InlineContentSchema,
  Color extends 'text'
    ? {
        textColor: {
          type: 'textColor';
          propSchema: 'string';
        };
      }
    : {
        backgroundColor: {
          type: 'backgroundColor';
          propSchema: 'string';
        };
      }
> {
  return (
    `${color}Color` in editor.schema.styleSchema &&
    editor.schema.styleSchema[`${color}Color`].type === `${color}Color` &&
    editor.schema.styleSchema[`${color}Color`].propSchema === 'string'
  );
}
