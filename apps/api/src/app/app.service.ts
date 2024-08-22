import { Injectable } from '@nestjs/common';
import { Block } from '@blocknote/core';
import { ServerBlockNoteEditor } from '@blocknote/server-util';

let serverBlockNoteEditor: ServerBlockNoteEditor;
eval(`import('@blocknote/server-util')`).then((module: any) => {
  serverBlockNoteEditor = module.ServerBlockNoteEditor;
});

@Injectable()
export class AppService {
  async getTestHtml(body: Block[]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const editor = serverBlockNoteEditor!.create({});
      return await editor.blocksToFullHTML(body);
  }
}
