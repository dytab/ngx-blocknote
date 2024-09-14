import { NgModule, signal } from '@angular/core';
import { NgxBlocknoteService } from './ngx-blocknote.service';
import { BlockNoteEditor } from '@blocknote/core';

class NgxBlocknoteServiceMock {
  editor = signal(BlockNoteEditor.create());
  selectedBlocks = signal([]);
  options = signal({});
}

@NgModule({
  providers: [
    { provide: NgxBlocknoteService, useClass: NgxBlocknoteServiceMock },
  ],
})
export class NgxBlockNoteTestingModule {}
