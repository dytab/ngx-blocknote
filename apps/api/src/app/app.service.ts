import { Injectable } from '@nestjs/common';
import {
  Block,
} from '@blocknote/core';

//CASE A IMPORT START
// import { type ServerBlockNoteEditor } from '@blocknote/server-util';
// let serverBlockNoteEditor: ServerBlockNoteEditor;
// eval(`import('@blocknote/server-util')`).then((module: any) => {
//   serverBlockNoteEditor = module.ServerBlockNoteEditor;
// });
//CASE A IMPORT END

//CASE B IMPORT START
// import { type ServerBlockNoteEditor } from '@blocknote/server-util';
//
// let serverBlockNoteEditor: ServerBlockNoteEditor;
// eval(`import('@blocknote/server-util')`).then((module: any) => {
//   serverBlockNoteEditor = module.ServerBlockNoteEditor;
// });
//
// let schema: BlockNoteSchema<any, any, any>;
// eval(`import('@blocknote/core')`).then((module: any) => {
//   schema = module.BlockNoteSchema;
// });
// import {
//   type BlockNoteSchema,
//   defaultBlockSpecs,
//   defaultInlineContentSpecs,
//   defaultStyleSpecs,
// } from '@blocknote/core';
//CASE B IMPORT END

//CASE C START
import serverUtils from '@blocknote/server-util';
//CASE C END

@Injectable()
export class AppService {
  /**
   * CASE A Only render blocks (EVAL)
   * PRO:
   * Works with eval but
   * CONS:
   * Do not seem to be possible to embed other blocks and schema
   */
  // async getTestHtml(body: Block[]) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   const editor = serverBlockNoteEditor!.create({});
  //
  //   return await editor.blocksToFullHTML(body);
  // }

  /**
   * CASE B Render blocks with custom config (EVAL)
   * PRO:
   * Works with eval but
   * CONS:
   * Do not seem to be possible to embed other blocks and schema
   */
  // async getTestHtml(body: Block[]) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   const schema = schema!.create({
  //     blockSpecs: {
  //       ...defaultBlockSpecs,
  //       table:undefined,
  //     },
  //     inlineContentSpecs: { ...defaultInlineContentSpecs },
  //     styleSpecs: { ...defaultStyleSpecs },
  //   });
  //
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   const editor = serverBlockNoteEditor!.create({schema});
  //
  //   return await editor.blocksToFullHTML(body);
  // }

  /**
   * CASE A Only render blocks (node 22.6) experimental esm loader
   * IMPORTANT start node 22.6 with flag "--experimental-require-module"
   * --> node --experimental-require-module ./node_modules/nx/bin/nx.js run api:serve
   * CONS:
   * Still not working
   */
  async getTestHtml(body: Block[]) {
    const editor = serverUtils.ServerBlockNoteEditor.create({});

    return await editor.blocksToFullHTML(body);
  }
}
