import { NgModule, signal } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { NgxBlocknoteService } from './ngx-blocknote.service';

const editor = BlockNoteEditor.create();
const mock: Partial<NgxBlocknoteService> = {
  editor: signal(editor),
  selectedBlocks: signal([]),
  options: signal({}),
};

@NgModule({ providers: [{ provide: NgxBlocknoteService, useValue: mock }] })
export class NgxBlockNoteTestingModule {}
