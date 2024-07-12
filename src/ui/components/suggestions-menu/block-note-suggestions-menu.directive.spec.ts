import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockNoteSuggestionsMenuDirective } from './block-note-suggestions-menu.directive';

describe('BlockNoteSuggestionsMenuComponent', () => {
  let component: BlockNoteSuggestionsMenuDirective;
  let fixture: ComponentFixture<BlockNoteSuggestionsMenuDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockNoteSuggestionsMenuDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockNoteSuggestionsMenuDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
