import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteViewDirective } from './block-note-view.directive';

describe('BlockNoteViewDirective', () => {
  let component: BlockNoteViewDirective;
  let fixture: ComponentFixture<BlockNoteViewDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockNoteViewDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockNoteViewDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
