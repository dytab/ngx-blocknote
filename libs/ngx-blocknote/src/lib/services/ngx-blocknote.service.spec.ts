import { TestBed } from '@angular/core/testing';
import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from '@blocknote/core';

import { NgxBlocknoteService } from './ngx-blocknote.service';

describe('NgxBlocknoteService', () => {
  let service: NgxBlocknoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NgxBlocknoteService] });
    service = TestBed.inject(
      NgxBlocknoteService<
        DefaultBlockSchema,
        DefaultInlineContentSchema,
        DefaultStyleSchema
      >,
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
