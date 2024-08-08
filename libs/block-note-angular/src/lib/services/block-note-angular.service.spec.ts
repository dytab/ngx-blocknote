import { TestBed } from '@angular/core/testing';

import { BlockNoteAngularService } from './block-note-angular.service';

describe('BlockNoteAngularService', () => {
  let service: BlockNoteAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockNoteAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
