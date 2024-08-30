import { Block } from '@blocknote/core';
import serverUtils from '@blocknote/server-util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getTestHtml(body: Block[]) {
    const editor = serverUtils.ServerBlockNoteEditor.create({});
    return await editor.blocksToFullHTML(body);
  }
}
