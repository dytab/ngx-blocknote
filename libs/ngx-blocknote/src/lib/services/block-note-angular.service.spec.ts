import { TestBed } from '@angular/core/testing';

import { BlockNoteAngularService } from './block-note-angular.service';

describe('BlockNoteAngularService', () => {
  let service: BlockNoteAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BlockNoteAngularService] });
    service = TestBed.inject(
      BlockNoteAngularService
      //TODO: remove this strange cast
    ) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});