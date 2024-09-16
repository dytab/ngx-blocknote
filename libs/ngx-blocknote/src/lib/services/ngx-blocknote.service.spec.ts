import { TestBed } from '@angular/core/testing';

import { NgxBlocknoteService } from './ngx-blocknote.service';

describe('NgxBlocknoteService', () => {
  let service: NgxBlocknoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NgxBlocknoteService] });
    service = TestBed.inject(
      NgxBlocknoteService,
      //TODO: remove this strange cast
    ) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
